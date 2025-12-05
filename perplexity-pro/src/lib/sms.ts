const SMSIR_API_KEY = process.env.SMSIR_API_KEY || "";
const SMSIR_LINE_NUMBER = process.env.SMSIR_LINE_NUMBER || "";
// شناسه قالب‌های پیامک را از داکیومنت sms.ir یا پنل خود بگیرید و در env بگذارید
// مثال: verify_template_id=100000
const VERIFY_TEMPLATE_ID = Number(process.env.SMSIR_VERIFY_TEMPLATE_ID || 0);

export async function sendOTP(mobile: string, code: string) {
    if (!SMSIR_API_KEY) {
        console.log("SMS Simulator:", mobile, code); // برای تست روی لوکال
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
        return data.status === 1;
    } catch (error) {
        console.error("SMS Send Error:", error);
        return false;
    }
}

export async function sendOrderNotification(mobile: string, trackingCode: string) {
    // پیاده‌سازی مشابه برای اطلاع‌رسانی سفارش
    // نیاز به یک Template ID دیگر در پنل sms.ir دارید
    console.log("Order SMS:", mobile, trackingCode);
    return true; 
}