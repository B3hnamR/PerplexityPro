import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { couponSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const coupons = await prisma.discountCode.findMany({
        orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(coupons);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { id, ...data } = body;

        // اگر ID داشتیم یعنی آپدیت
        if (id) {
            const updated = await prisma.discountCode.update({
                where: { id },
                data: {
                    code: data.code,
                    type: data.type,
                    value: Number(data.value),
                    minOrderPrice: Number(data.minOrderPrice) || null,
                    maxDiscount: Number(data.maxDiscount) || null,
                    maxUses: Number(data.maxUses) || null,
                    isActive: data.isActive
                }
            });
            return NextResponse.json(updated);
        } 
        
        // اگر ID نداشتیم یعنی جدید
        else {
            const validation = couponSchema.safeParse(data);
            if (!validation.success) return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });

            const created = await prisma.discountCode.create({
                data: {
                    code: data.code,
                    type: data.type,
                    value: data.value,
                    minOrderPrice: data.minOrderPrice,
                    maxDiscount: data.maxDiscount,
                    maxUses: data.maxUses,
                    isActive: data.isActive
                }
            });
            return NextResponse.json(created);
        }
    } catch (error) {
        return NextResponse.json({ error: "Error" }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id) return NextResponse.json({error: "ID Required"}, {status:400});
    
    await prisma.discountCode.delete({ where: { id } });
    return NextResponse.json({ success: true });
}