import { NextResponse } from "next/server";
import { verifyPayment } from "@/lib/zarinpal";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    if (status !== "OK" || !authority) {
        return NextResponse.redirect(new URL("/payment/failed", req.url));
    }

    try {
        // Find the pending order
        const order = await prisma.order.findFirst({
            where: { refId: authority }, // We stored authority in refId temporarily
        });

        if (!order) {
            return NextResponse.redirect(new URL("/payment/failed?error=OrderNotFound", req.url));
        }

        const response = await verifyPayment(authority, order.amount);

        if (response.data && (response.data.code === 100 || response.data.code === 101)) {
            // Generate secure download token
            const downloadToken = crypto.randomBytes(32).toString("hex");

            // Fetch available links equal to quantity
            const links = await (prisma as any).downloadLink.findMany({
                where: { status: "AVAILABLE" },
                take: order.quantity,
            });

            // Assign links if available
            if (links.length > 0) {
                const linkIds = links.map((l: any) => l.id);
                await (prisma as any).downloadLink.updateMany({
                    where: { id: { in: linkIds } },
                    data: { status: "USED", orderId: order.id, consumedAt: new Date() },
                });
            }

            // Update order
            const updated = await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "PAID",
                    refId: String(response.data.ref_id), // Update with actual RefID
                    downloadToken,
                },
            });

            // Redirect به صفحه تحویل
            const deliveryUrl = new URL(`/delivery/${downloadToken}`, req.url);
            if (links.length < order.quantity) {
                deliveryUrl.searchParams.set("nostock", "1");
            }
            return NextResponse.redirect(deliveryUrl);
        } else {
            return NextResponse.redirect(new URL("/payment/failed", req.url));
        }
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL("/payment/failed?error=InternalError", req.url));
    }
}

