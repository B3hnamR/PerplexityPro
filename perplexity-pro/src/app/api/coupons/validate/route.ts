import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth"; // ✅ نیاز به احراز هویت داریم

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { code, cartTotal } = await req.json();
        const session = await auth(); // ✅ دریافت سشن کاربر

        const coupon = await prisma.discountCode.findUnique({
            where: { code },
        });

        // 1. وجود کد
        if (!coupon) {
            return NextResponse.json({ error: "کد تخفیف نامعتبر است." }, { status: 404 });
        }

        // 2. فعال بودن
        if (!coupon.isActive) {
            return NextResponse.json({ error: "این کد تخفیف غیرفعال شده است." }, { status: 400 });
        }

        // 3. تاریخ انقضا
        if (coupon.expiresAt && new Date() > coupon.expiresAt) {
            return NextResponse.json({ error: "مهلت استفاده از این کد تمام شده است." }, { status: 400 });
        }

        // 4. سقف تعداد استفاده کل
        if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
            return NextResponse.json({ error: "ظرفیت استفاده از این کد تکمیل شده است." }, { status: 400 });
        }

        // 5. حداقل مبلغ سفارش
        if (coupon.minOrderPrice && cartTotal < coupon.minOrderPrice) {
            return NextResponse.json({
                error: `این کد برای خریدهای بالای ${coupon.minOrderPrice.toLocaleString()} تومان معتبر است.`
            }, { status: 400 });
        }

        // 6. ✅ بررسی سقف استفاده کاربر (Max Uses Per User)
        if (coupon.maxUsesPerUser) {
            // اگر کد محدودیت کاربر دارد، کاربر حتما باید لاگین باشد
            if (!session || !session.user?.id) {
                return NextResponse.json({
                    error: "برای استفاده از این کد تخفیف، لطفاً ابتدا وارد حساب کاربری خود شوید."
                }, { status: 401 });
            }

            // شمارش تعداد سفارش‌های موفق قبلی این کاربر با این کد تخفیف
            const userUsageCount = await prisma.order.count({
                where: {
                    userId: session.user.id,
                    discountCodeId: coupon.id,
                    status: "PAID" // فقط سفارش‌های موفق را می‌شماریم
                }
            });

            if (userUsageCount >= coupon.maxUsesPerUser) {
                return NextResponse.json({
                    error: `شما قبلاً ${userUsageCount} بار از این کد استفاده کرده‌اید و به سقف مجاز رسیده‌اید.`
                }, { status: 400 });
            }
        }

        return NextResponse.json({
            code: coupon.code,
            type: coupon.type,
            value: coupon.value,
            maxDiscount: coupon.maxDiscount
        });

    } catch (error) {
        console.error("Coupon Validate Error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}