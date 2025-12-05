// کلید API شما (بهتر است در فایل .env هم قرار دهید، اما اینجا به عنوان پیش‌فرض گذاشتم)
const SMSIR_API_KEY = process.env.SMSIR_API_KEY || "vbMPwuG9HBURZdD6xBlZDB8FgyMtqMyV4fgSKJeBmXbwZAfp";
const VERIFY_TEMPLATE_ID = Number(process.env.SMSIR_VERIFY_TEMPLATE_ID || 100000); // شناسه قالب پیش‌فرض

export async function sendOTP(mobile: string, code: string) {
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
        return data.status === 1;
    } catch (error) {
        console.error("SMS Send Error:", error);
        return false;
    }
}

export async function sendOrderNotification(mobile: string, trackingCode: string) {
    // برای ارسال پیامک اطلاع‌رسانی (مثل تحویل دستی)
    // نیاز به یک قالب جداگانه در sms.ir دارید (مثلاً با شناسه دیگر)
    // فعلاً از همان متد verify استفاده می‌کنیم یا می‌توانید از متد bulk استفاده کنید
    // این یک نمونه ساده با فرض وجود قالب است:
    /*
    return await fetch("https://api.sms.ir/v1/send/verify", {
        // ... تنظیمات مربوط به قالب اطلاع‌رسانی
    });
    */
    console.log(`SMS Notification to ${mobile}: Order ${trackingCode} is ready.`);
    return true;
}