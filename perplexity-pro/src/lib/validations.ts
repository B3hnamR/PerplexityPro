import { z } from "zod";

export const paymentSchema = z.object({
    amount: z.number().min(1000, "مبلغ باید حداقل ۱۰۰۰ تومان باشد"),
    description: z.string().min(2),
    email: z.string().email().optional().or(z.literal("")), // ✅ ایمیل کاملا اختیاری شد
    mobile: z.string().min(10).regex(/^09[0-9]{9}$/, "شماره موبایل نامعتبر است"),
    customData: z.any().optional(),
    quantity: z.number().min(1).default(1),
});