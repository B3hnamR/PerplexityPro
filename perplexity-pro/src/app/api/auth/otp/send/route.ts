import { prisma } from "@/lib/db";
import { sendOTP } from "@/lib/sms";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { mobile } = await req.json();
        
        // اعتبارسنجی شماره موبایل ایران
        if (!mobile || !/^09\d{9}$/.test(mobile)) {
            return NextResponse.json({ error: "شماره موبایل معتبر نیست" }, { status: 400 });
        }

        // تولید کد ۵ رقمی تصادفی
        const code = Math.floor(10000 + Math.random() * 90000).toString();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // اعتبار: ۲ دقیقه

        // ذخیره یا آپدیت کد در دیتابیس
        await prisma.oTP.upsert({
            where: { mobile },
            update: { code, expiresAt },
            create: { mobile, code, expiresAt },
        });

        // ارسال پیامک
        const sent = await sendOTP(mobile, code);

        if (sent) {
            return NextResponse.json({ success: true });
        } else {
            // فال‌بک برای دولوپ: اگر API ست نشده بود، کد را در ریسپانس بفرست (فقط برای تست)
            if (process.env.NODE_ENV !== "production" && !process.env.SMSIR_API_KEY) {
                return NextResponse.json({ success: true, devCode: code });
            }
            return NextResponse.json({ error: "خطا در ارسال پیامک" }, { status: 500 });
        }

    } catch (error) {
        console.error("OTP Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}