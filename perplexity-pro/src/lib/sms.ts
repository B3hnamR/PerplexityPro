const SMSIR_API_KEY = process.env.SMSIR_API_KEY || "";
// شناسه قالب را از پنل sms.ir بگیرید (مثلاً قالبی با متن: کد تایید شما: {{code}})
const VERIFY_TEMPLATE_ID = Number(process.env.SMSIR_VERIFY_TEMPLATE_ID || 100000);

export async function sendOTP(mobile: string, code: string) {
    // در محیط توسعه، اگر کلید API نباشد، فقط لاگ می‌گیریم
    if (!SMSIR_API_KEY) {
        console.log("DEV MODE - SMS OTP:", { mobile, code });
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
        // status=1 در sms.ir یعنی موفق
        return data.status === 1;
    } catch (error) {
        console.error("SMS Send Error:", error);
        return false;
    }
}