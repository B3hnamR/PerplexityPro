import { NextResponse } from "next/server";
import { verifyPayment } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    if (status !== "OK" || !authority) {
        return NextResponse.redirect(new URL("/payment/failed", req.url));
    }

    try {
        const order = await prisma.order.findFirst({
            where: { refId: authority },
        });

        if (!order) {
            return NextResponse.redirect(new URL("/payment/failed?error=OrderNotFound", req.url));
        }

        if (order.status === "PAID" && order.downloadToken) {
             return NextResponse.redirect(new URL(`/delivery/${order.downloadToken}`, req.url));
        }

        const response = await verifyPayment(authority, order.amount);

        if (response.data && (response.data.code === 100 || response.data.code === 101)) {
            const downloadToken = crypto.randomBytes(32).toString("hex");

            // 1. برداشتن لینک‌های موجود به تعداد سفارش
            const linksToDeliver = await prisma.downloadLink.findMany({
                where: { status: "AVAILABLE" },
                take: order.quantity,
            });

            // 2. تغییر وضعیت لینک‌ها به "فروخته شده"
            // نکته: این عملیات باید قبل از نمایش صفحه موفقیت انجام شود
            if (linksToDeliver.length > 0) {
                const linkIds = linksToDeliver.map((l) => l.id);
                await prisma.downloadLink.updateMany({
                    where: { id: { in: linkIds } },
                    data: { 
                        status: "USED", 
                        orderId: order.id, 
                        consumedAt: new Date() 
                    },
                });
            }

            // 3. آپدیت نهایی سفارش
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "PAID",
                    refId: String(response.data.ref_id),
                    downloadToken,
                },
            });

            const deliveryUrl = new URL(`/delivery/${downloadToken}`, req.url);
            // اگر موجودی کمتر از تعداد درخواستی بود، پارامتر nostock اضافه می‌شود
            if (linksToDeliver.length < order.quantity) {
                deliveryUrl.searchParams.set("nostock", "1");
            }
            return NextResponse.redirect(deliveryUrl);
        } else {
            return NextResponse.redirect(new URL("/payment/failed", req.url));
        }
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.redirect(new URL("/payment/failed?error=InternalError", req.url));
    }
}