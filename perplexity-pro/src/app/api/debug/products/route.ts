import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
