import { NextResponse } from "next/server";
import { verifyPayment } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    // ✅ پیدا کردن سفارش قبل از هر کاری
    const order = authority ? await prisma.order.findFirst({ where: { refId: authority } }) : null;

    if (!order) {
        return NextResponse.redirect(new URL("/payment/failed?error=OrderNotFound", req.url));
    }

    // ✅ اگر وضعیت OK نبود، سفارش را FAILED کن
    if (status !== "OK") {
        await prisma.order.update({
            where: { id: order.id },
            data: { status: "FAILED" }
        });
        return NextResponse.redirect(new URL("/payment/failed", req.url));
    }

    // اگر قبلا پرداخت شده، دوباره پردازش نکن
    if (order.status === "PAID" && order.downloadToken) {
         return NextResponse.redirect(new URL(`/delivery/${order.downloadToken}`, req.url));
    }

    try {
        const response = await verifyPayment(authority!, order.amount);

        if (response.data && (response.data.code === 100 || response.data.code === 101)) {
            const downloadToken = crypto.randomBytes(32).toString("hex");

            // کسر از انبار
            const linksToDeliver = await prisma.downloadLink.findMany({
                where: { status: "AVAILABLE" },
                take: order.quantity,
            });

            if (linksToDeliver.length > 0) {
                const linkIds = linksToDeliver.map((l) => l.id);
                await prisma.downloadLink.updateMany({
                    where: { id: { in: linkIds } },
                    data: { status: "USED", orderId: order.id, consumedAt: new Date() },
                });
            }

            await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "PAID",
                    refId: String(response.data.ref_id),
                    downloadToken,
                },
            });

            const deliveryUrl = new URL(`/delivery/${downloadToken}`, req.url);
            if (linksToDeliver.length < order.quantity) {
                deliveryUrl.searchParams.set("nostock", "1");
            }
            return NextResponse.redirect(deliveryUrl);
        } else {
            // ✅ اگر تایید بانک خطا داد
            await prisma.order.update({ where: { id: order.id }, data: { status: "FAILED" } });
            return NextResponse.redirect(new URL("/payment/failed", req.url));
        }
    } catch (error) {
        console.error("Verify Error:", error);
        return NextResponse.redirect(new URL("/payment/failed?error=InternalError", req.url));
    }
}