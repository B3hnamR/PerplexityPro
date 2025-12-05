import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const fields = await prisma.customField.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(fields);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const field = await prisma.customField.create({
            data: {
                label: body.label,
                name: body.name,
                type: body.type,
                required: body.required,
                options: body.options ? JSON.stringify(body.options) : null,
            }
        });
        return NextResponse.json(field);
    } catch (error) {
        return NextResponse.json({ error: "Error creating field" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.customField.delete({ where: { id } });
    return NextResponse.json({ success: true });
}