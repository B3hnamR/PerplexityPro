export const zarinpalConfig = {
    merchantId: process.env.ZARINPAL_MERCHANT_ID || "41560e45-4217-437d-90fe-270293791227",
    sandbox: process.env.ZARINPAL_SANDBOX === "true", // ✅ خواندن از Env
};

export async function requestPayment(amount: number, description: string, callbackUrl: string, email?: string, mobile?: string) {
    const url = zarinpalConfig.sandbox
        ? "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
        : "https://api.zarinpal.com/pg/v4/payment/request.json";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            merchant_id: zarinpalConfig.merchantId,
            amount,
            currency: "IRT",
            description,
            callback_url: callbackUrl,
            metadata: {
                email: email || undefined,
                mobile: mobile || undefined,
            },
        }),
    });

    const data = await response.json();
    return data;
}

export async function verifyPayment(authority: string, amount: number) {
    const url = zarinpalConfig.sandbox
        ? "https://sandbox.zarinpal.com/pg/v4/payment/verify.json"
        : "https://api.zarinpal.com/pg/v4/payment/verify.json";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            merchant_id: zarinpalConfig.merchantId,
            amount,
            authority,
        }),
    });

    const data = await response.json();
    return data;
}

export function getPaymentUrl(authority: string) {
    return zarinpalConfig.sandbox
        ? `https://sandbox.zarinpal.com/pg/StartPay/${authority}`
        : `https://www.zarinpal.com/pg/StartPay/${authority}`;
}