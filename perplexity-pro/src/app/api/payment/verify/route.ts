import { NextResponse } from "next/server";
import { verifyPayment } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    // پیدا کردن سفارش
    const order = authority ? await prisma.order.findFirst({ 
        where: { refId: authority },
        include: { links: true }
    }) : null;

    if (!order) {
        return NextResponse.redirect(new URL("/payment/failed?error=OrderNotFound", req.url));
    }

    // اگر قبلا پرداخت شده، ریدایرکت کن
    if (order.status === "PAID" && order.downloadToken) {
         return NextResponse.redirect(new URL(`/delivery/${order.downloadToken}`, req.url));
    }

    // تابع آزادسازی لینک‌ها در صورت خطا
    const releaseLinks = async () => {
        if (order.links.length > 0) {
            await prisma.downloadLink.updateMany({
                where: { orderId: order.id },
                data: { status: "AVAILABLE", orderId: null }
            });
        }
        await prisma.order.update({ where: { id: order.id }, data: { status: "FAILED" } });
    };

    // اگر کاربر انصراف داده یا پرداخت ناموفق بوده
    if (status !== "OK") {
        await releaseLinks();
        return NextResponse.redirect(new URL("/payment/failed", req.url));
    }

    try {
        const response = await verifyPayment(authority!, order.amount);

        if (response.data && (response.data.code === 100 || response.data.code === 101)) {
            const downloadToken = crypto.randomBytes(32).toString("hex");

            // 1. نهایی کردن خرید: تغییر وضعیت لینک‌های رزرو شده به USED
            if (order.links.length > 0) {
                const linkIds = order.links.map(l => l.id);
                await prisma.downloadLink.updateMany({
                    where: { id: { in: linkIds } },
                    data: { 
                        status: "USED", 
                        consumedAt: new Date() 
                    },
                });
            }

            // 2. آپدیت سفارش به پرداخت شده
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "PAID",
                    refId: String(response.data.ref_id),
                    downloadToken,
                },
            });

            // 3. ✅ اگر سفارش کد تخفیف داشت، یکی به تعداد استفاده‌اش اضافه کن
            if (order.discountCodeId) {
                await prisma.discountCode.update({
                    where: { id: order.discountCodeId },
                    data: { usedCount: { increment: 1 } }
                });
            }

            return NextResponse.redirect(new URL(`/delivery/${downloadToken}`, req.url));
        } else {
            // پرداخت توسط بانک تایید نشد
            await releaseLinks();
            return NextResponse.redirect(new URL("/payment/failed", req.url));
        }
    } catch (error) {
        console.error("Verify Error:", error);
        await releaseLinks();
        return NextResponse.redirect(new URL("/payment/failed?error=InternalError", req.url));
    }
}