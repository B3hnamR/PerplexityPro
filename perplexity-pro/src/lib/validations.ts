import { z } from "zod";

export const couponSchema = z.object({
    code: z.string().min(3).max(20).regex(/^[A-Za-z0-9_-]+$/, "کد فقط می‌تواند شامل حروف و اعداد باشد"),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    value: z.number().min(1),
    minOrderPrice: z.number().optional().nullable(),
    maxDiscount: z.number().optional().nullable(), // فقط برای درصدی
    maxUses: z.number().int().optional().nullable(),
    expiresAt: z.string().optional().nullable(), // تاریخ به صورت رشته ISO
    isActive: z.boolean().default(true),
});

export const paymentSchema = z.object({
    amount: z.number().min(1000), // این مبلغ نهایی است (محاسبه شده در کلاینت) اما سرور دوباره چک می‌کند
    description: z.string().min(2),
    email: z.string().email().optional().or(z.literal("")),
    mobile: z.string().min(10),
    quantity: z.number().min(1).default(1),
    couponCode: z.string().optional(), // ✅ اضافه شد
});