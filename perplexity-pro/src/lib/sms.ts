const SMSIR_API_KEY = process.env.SMSIR_API_KEY || "";
const VERIFY_TEMPLATE_ID = Number(process.env.SMSIR_VERIFY_TEMPLATE_ID || 100000);

export async function sendOTP(mobile: string, code: string) {
    // ✅ تغییر مهم: همیشه در محیط توسعه کد را لاگ کن (حتی اگر API Key باشد)
    if (process.env.NODE_ENV !== "production") {
        console.log("------------------------------------------------");
        console.log(`🔐 DEV OTP for ${mobile}:`);
        console.log(`👉 ${code} 👈`);
        console.log("------------------------------------------------");
    }

    // اگر کلید نباشد، موفقیت آمیز برگردان (شبیه‌سازی)
    if (!SMSIR_API_KEY) {
        return true;
    }

    try {
        const response = await fetch("https://api.sms.ir/v1/send/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": SMSIR_API_KEY,
            },
            body: JSON.stringify({
                mobile: mobile,
                templateId: VERIFY_TEMPLATE_ID,
                parameters: [
                    { name: "code", value: code }
                ],
            }),
        });
        
        const data = await response.json();
        
        // لاگ کردن پاسخ برای دیباگ
        if (process.env.NODE_ENV !== "production") {
            console.log("SMS Provider Response:", data);
        }

        return data.status === 1;
    } catch (error) {
        console.error("SMS Send Error:", error);
        return false;
    }
}

export async function sendOrderNotification(mobile: string, trackingCode: string) {
    console.log("------------------------------------------------");
    console.log(`📢 Notification for ${mobile}: Order ${trackingCode} is ready.`);
    console.log("------------------------------------------------");
    
    // اینجا می‌توانید در آینده لاجیک ارسال واقعی پیامک اطلاع‌رسانی را اضافه کنید
    return true;
}