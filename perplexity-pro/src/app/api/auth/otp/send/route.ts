import { prisma } from "@/lib/db";
import { sendOTP } from "@/lib/sms";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { mobile } = await req.json();
        
        // اعتبارسنجی ساده موبایل
        if (!mobile || !/^09\d{9}$/.test(mobile)) {
            return NextResponse.json({ error: "شماره موبایل نامعتبر است" }, { status: 400 });
        }

        // تولید کد ۵ رقمی
        const code = Math.floor(10000 + Math.random() * 90000).toString();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // ۲ دقیقه اعتبار

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
            // برای حالت توسعه اگر API Key ست نباشد، موفق در نظر می‌گیریم (کد در کنسول لاگ می‌شود)
            if (process.env.NODE_ENV === "development") {
                return NextResponse.json({ success: true, devCode: code });
            }
            return NextResponse.json({ error: "خطا در ارسال پیامک" }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}