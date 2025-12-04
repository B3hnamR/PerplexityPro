import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                links: true, // دریافت لینک‌های تخصیص داده شده
            },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // تبدیل داده به فرمت مورد انتظار کلاینت
        const formattedOrder = {
            ...order,
            items: [
                {
                    productName: "اشتراک Perplexity Pro",
                    quantity: order.quantity,
                    price: order.amount / order.quantity,
                }
            ],
            userEmail: order.customerEmail,
            userId: order.customerEmail || "Guest",
        };

        return NextResponse.json(formattedOrder);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}