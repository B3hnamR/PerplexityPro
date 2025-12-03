import { NextResponse } from "next/server";
import { requestPayment, getPaymentUrl } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import { paymentSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        if (!rateLimit(ip, 5, 60000)) { // 5 requests per minute
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }

        const body = await req.json();

        // Validate input
        const validation = paymentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "Validation Error", details: validation.error.format() }, { status: 400 });
        }

        const { amount, description, email, mobile, customData, quantity = 1 } = validation.data;

        // Validate required custom fields from DB
        const requiredFields = await prisma.customField.findMany({ where: { required: true } });
        for (const field of requiredFields) {
            const val = (customData as Record<string, string> | undefined)?.[field.name];
            if (!val || String(val).trim() === "") {
                return NextResponse.json({ error: `لطفاً فیلد الزامی ${field.label} را تکمیل کنید` }, { status: 400 });
            }
        }

        // Hardcoded callback URL for local development
        const callbackUrl = "http://localhost:3000/api/payment/verify";

        const response = await requestPayment(amount, description, callbackUrl, email, mobile);

        if (response.data && response.data.code === 100) {
            // Generate short tracking code
            const trackingCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

            // Save pending order to DB
            await prisma.order.create({
                data: {
                    amount,
                    quantity,
                    customerEmail: email,
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
            return NextResponse.json({ error: "Payment request failed", details: response }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
