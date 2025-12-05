import { prisma } from "@/lib/db";
import { sendOTP } from "@/lib/sms";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { mobile } = await req.json();
        
        // اعتبارسنجی شماره موبایل
        if (!mobile || !/^09\d{9}$/.test(mobile)) {
            return NextResponse.json({ error: "شماره موبایل نامعتبر است" }, { status: 400 });
        }

        // تولید کد ۵ رقمی
        const code = Math.floor(10000 + Math.random() * 90000).toString();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // ۲ دقیقه اعتبار

        // ذخیره کد در دیتابیس
        await prisma.oTP.upsert({
            where: { mobile },
            update: { code, expiresAt },
            create: { mobile, code, expiresAt },
        });

        // تلاش برای ارسال پیامک
        const sent = await sendOTP(mobile, code);

        if (sent) {
            return NextResponse.json({ success: true });
        } else {
            // ✅ تغییر مهم: 
            // اگر در محیط توسعه (Dev) هستیم، حتی اگر ارسال پیامک شکست خورد (مثلا قالب نبود)،
            // چون کد در ترمینال چاپ شده، عملیات را موفق اعلام می‌کنیم تا بتوانید تست کنید.
            if (process.env.NODE_ENV !== "production") {
                console.warn("⚠️ SMS Failed (Template Error?) but bypassed in DEV mode.");
                return NextResponse.json({ success: true });
            }
            
            // در محیط واقعی (Production) اگر پیامک نرود، خطا می‌دهیم
            return NextResponse.json({ error: "خطا در ارسال پیامک" }, { status: 500 });
        }

    } catch (error) {
        console.error("OTP Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}