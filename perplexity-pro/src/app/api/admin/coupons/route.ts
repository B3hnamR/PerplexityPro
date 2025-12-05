import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { couponSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const coupons = await prisma.discountCode.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { orders: true } } }
    });
    return NextResponse.json(coupons);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        // اعتبارسنجی
        const validation = couponSchema.safeParse(body);
        if (!validation.success) return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });

        const { code, type, value, minOrderPrice, maxDiscount, maxUses, expiresAt, isActive } = validation.data;

        const coupon = await prisma.discountCode.create({
            data: {
                code,
                type,
                value,
                minOrderPrice,
                maxDiscount,
                maxUses,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
                isActive
            }
        });
        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json({ error: "Code already exists" }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    // ... (مشابه بقیه، کد حذف)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id) return NextResponse.json({error: "ID Required"}, {status:400});
    
    await prisma.discountCode.delete({ where: { id } });
    return NextResponse.json({ success: true });
}