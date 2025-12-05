import { NextResponse } from "next/server";
import { requestPayment, getPaymentUrl } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import { paymentSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // اعتبارسنجی ورودی
        const validation = paymentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.error.format() }, { status: 400 });
        }

        const { amount, description, email, mobile, customData, quantity } = validation.data;
        const qty = quantity || 1;

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const callbackUrl = `${baseUrl}/api/payment/verify`;

        // ✅ شروع تراکنش دیتابیس برای رزرو محصول
        // این کار باعث می‌شود در ترافیک بالا، لینک تکراری فروخته نشود
        const result = await prisma.$transaction(async (tx) => {
            // 1. پیدا کردن لینک‌های آزاد
            const availableLinks = await tx.downloadLink.findMany({
                where: { status: "AVAILABLE" },
                take: qty,
            });

            if (availableLinks.length < qty) {
                throw new Error("NO_STOCK");
            }

            const linkIds = availableLinks.map(l => l.id);

            // 2. رزرو کردن لینک‌ها (تغییر وضعیت به RESERVED)
            await tx.downloadLink.updateMany({
                where: { id: { in: linkIds } },
                data: { status: "RESERVED" } // موقتا رزرو می‌شوند
            });

            // 3. درخواست به زرین‌پال
            const payment = await requestPayment(amount, description, callbackUrl, email || undefined, mobile);
            
            if (!payment.data || payment.data.code !== 100) {
                throw new Error("PAYMENT_FAILED");
            }

            // 4. ایجاد سفارش
            const trackingCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            
            const order = await tx.order.create({
                data: {
                    amount,
                    quantity: qty,
                    customerEmail: email || "",
                    customerPhone: mobile,
                    refId: payment.data.authority,
                    trackingCode,
                    customData: customData ? JSON.stringify(customData) : null,
                    status: "PENDING",
                    // همین الان لینک‌های رزرو شده را به سفارش متصل می‌کنیم
                    links: {
                        connect: linkIds.map(id => ({ id }))
                    }
                },
            });

            return { url: getPaymentUrl(payment.data.authority), orderId: order.id };
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Payment Request Error:", error);

        if (error.message === "NO_STOCK") {
            return NextResponse.json({ error: "متاسفانه موجودی انبار تمام شده است." }, { status: 400 });
        }
        
        return NextResponse.json({ error: "خطا در برقراری ارتباط با درگاه" }, { status: 500 });
    }
}