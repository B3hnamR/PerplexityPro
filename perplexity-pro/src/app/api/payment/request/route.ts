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

        const { amount, description, email, mobile, quantity } = validation.data;
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
            // 1. تلاش برای رزرو لینک
            const availableLinks = await tx.downloadLink.findMany({
                where: { status: "AVAILABLE" },
                take: qty,
            });

            let linkIds: string[] = [];
            
            if (availableLinks.length >= qty) {
                linkIds = availableLinks.map(l => l.id);
                await tx.downloadLink.updateMany({
                    where: { id: { in: linkIds } },
                    data: { status: "RESERVED" }
                });
            }

            // 2. درخواست پرداخت
            const payment = await requestPayment(amount, description, callbackUrl, email || undefined, mobile);
            
            if (!payment.data || payment.data.code !== 100) {
                throw new Error("PAYMENT_FAILED");
            }

            const trackingCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            
            // 3. ایجاد سفارش (بدون customData و فیلدهای اضافی)
            const order = await tx.order.create({
                data: {
                    amount,
                    quantity: qty,
                    customerEmail: email || "",
                    customerPhone: mobile,
                    userId: userId,
                    refId: payment.data.authority,
                    trackingCode,
                    status: "PENDING",
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
        return NextResponse.json({ error: "خطا در ارتباط با درگاه پرداخت" }, { status: 500 });
    }
}