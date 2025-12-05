import { NextResponse } from "next/server";
import { requestPayment, getPaymentUrl } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import { paymentSchema } from "@/lib/validations";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const session = await auth();

        const validation = paymentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.error.format() }, { status: 400 });
        }

        const { description, email, mobile, customData, quantity, couponCode } = validation.data; // couponCode اضافه شد
        const qty = quantity || 1;
        
        // ✅ محاسبه امن قیمت در سمت سرور
        // فرض: ما فقط یک محصول داریم. اگر چندتا دارید، باید از دیتابیس ID بگیرید.
        const product = await prisma.product.findFirst();
        if (!product) throw new Error("محصول یافت نشد");

        let basePrice = product.price * qty;
        let finalAmount = basePrice;

        // ✅ اعمال تخفیف در سرور
        let discountCodeId = null;
        if (couponCode) {
            const coupon = await prisma.discountCode.findUnique({ where: { code: couponCode } });
            // بررسی مجدد اعتبار کد
            if (coupon && coupon.isActive && 
               (!coupon.expiresAt || coupon.expiresAt > new Date()) &&
               (!coupon.maxUses || coupon.usedCount < coupon.maxUses) &&
               (!coupon.minOrderPrice || basePrice >= coupon.minOrderPrice)) 
            {
                let discountVal = 0;
                if (coupon.type === "FIXED") {
                    discountVal = coupon.value;
                } else {
                    discountVal = (basePrice * coupon.value) / 100;
                    if (coupon.maxDiscount) discountVal = Math.min(discountVal, coupon.maxDiscount);
                }
                finalAmount = Math.max(1000, basePrice - discountVal); // حداقل مبلغ 1000 تومان
                discountCodeId = coupon.id;
            }
        }

        // پیدا کردن کاربر
        let userId = session?.user?.id;
        if (!userId && mobile) {
            const user = await prisma.user.findUnique({ where: { mobile } });
            if (user) userId = user.id;
        }

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const callbackUrl = `${baseUrl}/api/payment/verify`;

        const result = await prisma.$transaction(async (tx) => {
            // رزرو لینک
            const availableLinks = await tx.downloadLink.findMany({
                where: { status: "AVAILABLE" },
                take: qty,
            });

            let linkIds: string[] = [];
            if (availableLinks.length >= qty) {
                linkIds = availableLinks.map(l => l.id);
                await tx.downloadLink.updateMany({
                    where: { id: { in: linkIds } },
                    data: { status: "RESERVED" }
                });
            }

            // درخواست پرداخت با مبلغ محاسبه شده توسط سرور
            const payment = await requestPayment(finalAmount, description, callbackUrl, email || undefined, mobile);
            
            if (!payment.data || payment.data.code !== 100) {
                throw new Error("PAYMENT_FAILED");
            }

            const trackingCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            
            await tx.order.create({
                data: {
                    amount: finalAmount, // مبلغ نهایی با تخفیف
                    originalAmount: basePrice, // مبلغ اصلی برای گزارش
                    quantity: qty,
                    customerEmail: email || "",
                    customerPhone: mobile,
                    userId: userId,
                    refId: payment.data.authority,
                    trackingCode,
                    discountCodeId, // ذخیره کد تخفیف استفاده شده
                    status: "PENDING",
                    links: linkIds.length > 0 ? {
                        connect: linkIds.map(id => ({ id }))
                    } : undefined
                },
            });
            
            // افزایش تعداد استفاده از کد تخفیف (باید اینجا باشد یا در verify؟ بهتر است در verify نهایی شود، اما برای سادگی اینجا هم میتوان نگه داشت. 
            // راه اصولی: در verify وقتی پرداخت OK شد، usedCount را یکی زیاد کنیم.
            // فعلا اینجا دست نمیزنیم، در verify زیاد میکنیم.

            return { url: getPaymentUrl(payment.data.authority) };
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Payment Request Error:", error);
        return NextResponse.json({ error: "خطا در ارتباط با درگاه پرداخت" }, { status: 500 });
    }
}