import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
    const { token } = await params;

    // Find order by download token
    const order = await prisma.order.findUnique({
        where: { downloadToken: token },
    });

    if (!order || order.status !== "PAID") {
        return new NextResponse("Invalid or expired link", { status: 403 });
    }

    // Increment download count
    await prisma.order.update({
        where: { id: order.id },
        data: { downloadCount: { increment: 1 } },
    });

    // Serve the file
    // In a real app, this file path should be dynamic or stored in S3
    // For this demo, we'll serve a dummy file from the public folder or generate one

    const filePath = path.join(process.cwd(), "public", "product.pdf");

    // Create a dummy file if it doesn't exist
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "This is your digital product content.");
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="Lumina-Wireless-Manual.pdf"',
        },
    });
}
