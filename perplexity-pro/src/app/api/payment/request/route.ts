import { NextResponse } from "next/server";
import { requestPayment, getPaymentUrl } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import { paymentSchema } from "@/lib/validations";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const session = await auth(); // دریافت سشن کاربر

        const validation = paymentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.error.format() }, { status: 400 });
        }

        const { amount, description, email, mobile, customData, quantity } = validation.data;
        const qty = quantity || 1;

        // پیدا کردن کاربر لاگین شده یا کاربر بر اساس موبایل
        let userId = session?.user?.id;
        
        if (!userId && mobile) {
            const user = await prisma.user.findUnique({ where: { mobile } });
            if (user) userId = user.id;
        }

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const callbackUrl = `${baseUrl}/api/payment/verify`;

        const result = await prisma.$transaction(async (tx) => {
            const availableLinks = await tx.downloadLink.findMany({
                where: { status: "AVAILABLE" },
                take: qty,
            });

            if (availableLinks.length < qty) {
                throw new Error("NO_STOCK");
            }

            const linkIds = availableLinks.map(l => l.id);
            await tx.downloadLink.updateMany({
                where: { id: { in: linkIds } },
                data: { status: "RESERVED" }
            });

            const payment = await requestPayment(amount, description, callbackUrl, email || undefined, mobile);
            
            if (!payment.data || payment.data.code !== 100) {
                throw new Error("PAYMENT_FAILED");
            }

            const trackingCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            
            await tx.order.create({
                data: {
                    amount,
                    quantity: qty,
                    customerEmail: email || "",
                    customerPhone: mobile,
                    userId: userId, // ✅ اتصال سفارش به کاربر
                    refId: payment.data.authority,
                    trackingCode,
                    customData: customData ? JSON.stringify(customData) : null,
                    status: "PENDING",
                    links: {
                        connect: linkIds.map(id => ({ id }))
                    }
                },
            });

            return { url: getPaymentUrl(payment.data.authority) };
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Payment Request Error:", error);
        if (error.message === "NO_STOCK") {
            return NextResponse.json({ error: "موجودی انبار کافی نیست" }, { status: 400 });
        }
        return NextResponse.json({ error: "خطا در ارتباط با درگاه" }, { status: 500 });
    }
}