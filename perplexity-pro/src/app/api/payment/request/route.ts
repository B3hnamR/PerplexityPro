// ... imports ...
import { auth } from "@/auth"; // اضافه کردن auth

// ... inside POST function ...
        const session = await auth(); // دریافت سشن کاربر
        
        // پیدا کردن یا ساخت کاربر بر اساس موبایل (اگر سشن نبود ولی موبایل معتبر بود)
        // البته در فلو جدید ما اول کاربر را لاگین میکنیم، پس سشن باید باشد
        // اما برای اطمینان، کاربر را بر اساس موبایل پیدا می‌کنیم
        
        const user = await prisma.user.findUnique({
            where: { mobile: mobile } 
        });

        // ... transaction ...
            const order = await tx.order.create({
                data: {
                    // ... other fields ...
                    userId: user?.id, // ✅ اتصال سفارش به کاربر
                    // ...
                },
            });
// ...