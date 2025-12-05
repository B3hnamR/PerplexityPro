import { NextResponse } from "next/server";
import { requestPayment, getPaymentUrl } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import { paymentSchema } from "@/lib/validations";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const session = await auth();

        const validation = paymentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.error.format() }, { status: 400 });
        }

        const { amount, description, email, mobile, customData, quantity } = validation.data;
        const qty = quantity || 1;

        // پیدا کردن کاربر
        let userId = session?.user?.id;
        if (!userId && mobile) {
            const user = await prisma.user.findUnique({ where: { mobile } });
            if (user) userId = user.id;
        }

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const callbackUrl = `${baseUrl}/api/payment/verify`;

        const result = await prisma.$transaction(async (tx) => {
            // 1. بررسی موجودی (بدون خطا دادن در صورت کمبود)
            const availableLinks = await tx.downloadLink.findMany({
                where: { status: "AVAILABLE" },
                take: qty,
            });

            let linkIds: string[] = [];
            
            // ✅ فقط اگر موجودی کافی بود رزرو انجام بده
            if (availableLinks.length >= qty) {
                linkIds = availableLinks.map(l => l.id);
                
                // رزرو لینک‌ها
                await tx.downloadLink.updateMany({
                    where: { id: { in: linkIds } },
                    data: { status: "RESERVED" }
                });
            } 
            // در غیر این صورت (موجودی کم یا صفر)، هیچ لینکی رزرو نمی‌شود و linkIds خالی می‌ماند
            // و سفارش به صورت "تحویل دستی" پردازش خواهد شد.

            // 2. درخواست به زرین‌پال
            const payment = await requestPayment(amount, description, callbackUrl, email || undefined, mobile);
            
            if (!payment.data || payment.data.code !== 100) {
                throw new Error("PAYMENT_FAILED");
            }

            const trackingCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            
            // 3. ایجاد سفارش
            const order = await tx.order.create({
                data: {
                    amount,
                    quantity: qty,
                    customerEmail: email || "",
                    customerPhone: mobile,
                    userId: userId,
                    refId: payment.data.authority,
                    trackingCode,
                    customData: customData ? JSON.stringify(customData) : null,
                    status: "PENDING",
                    // اگر لینکی رزرو شده بود وصل کن، اگر نه هیچی (که یعنی تحویل دستی)
                    links: linkIds.length > 0 ? {
                        connect: linkIds.map(id => ({ id }))
                    } : undefined
                },
            });

            return { url: getPaymentUrl(payment.data.authority) };
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Payment Request Error:", error);
        // خطای درگاه را جداگانه هندل می‌کنیم، اما خطای موجودی دیگر نداریم
        return NextResponse.json({ error: "خطا در ارتباط با درگاه پرداخت" }, { status: 500 });
    }
}