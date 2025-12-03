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

            // Update order
            const updated = await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "PAID",
                    refId: String(response.data.ref_id), // Update with actual RefID
                    downloadToken,
                },
            });

            const successUrl = new URL("/payment/success", req.url);
            successUrl.searchParams.set("ref", String(response.data.ref_id));
            if (updated.trackingCode) successUrl.searchParams.set("tracking", updated.trackingCode);

            return NextResponse.redirect(successUrl);
        } else {
            return NextResponse.redirect(new URL("/payment/failed", req.url));
        }
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL("/payment/failed?error=InternalError", req.url));
    }
}

