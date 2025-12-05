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
            return NextResponse.json({ error: "اطلاعات وارد شده معتبر نیست", details: validation.error.format() }, { status: 400 });
        }

        const { amount, description, email, mobile, customData, quantity } = validation.data;
        const qty = quantity || 1;

        // ✅ 1. چک کردن موجودی انبار (مهم)
        const availableStock = await prisma.downloadLink.count({
            where: { status: "AVAILABLE" }
        });

        if (availableStock < qty) {
            return NextResponse.json({ error: "متاسفانه موجودی انبار کافی نیست." }, { status: 400 });
        }

        // ✅ 2. استفاده از متغیر محیطی برای آدرس بازگشت
        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const callbackUrl = `${baseUrl}/api/payment/verify`;

        // درخواست به زرین‌پال
        const response = await requestPayment(amount, description, callbackUrl, email || undefined, mobile);

        if (response.data && response.data.code === 100) {
            const trackingCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

            await prisma.order.create({
                data: {
                    amount,
                    quantity: qty,
                    customerEmail: email || "", // ذخیره رشته خالی اگر ایمیل نبود
                    customerPhone: mobile,
                    refId: response.data.authority,
                    trackingCode,
                    customData: customData ? JSON.stringify(customData) : null,
                    status: "PENDING",
                },
            });

            return NextResponse.json({
                url: getPaymentUrl(response.data.authority),
                authority: response.data.authority,
            });
        } else {
            return NextResponse.json({ error: "خطا در اتصال به درگاه بانکی", details: response }, { status: 400 });
        }
    } catch (error) {
        console.error("Payment Request Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}