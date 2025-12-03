import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { customFieldSchema } from "@/lib/validations";

export async function GET() {
    const fields = await prisma.customField.findMany({
        orderBy: { order: "asc" },
    });
    return NextResponse.json(fields);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate input
    const validation = customFieldSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: "Validation Error", details: validation.error.format() }, { status: 400 });
    }

    const { label, name, type, required, options } = validation.data;

    const field = await prisma.customField.create({
        data: {
            label,
            name,
            type,
            required,
            options: options ? JSON.stringify(options) : null,
        },
    });

    return NextResponse.json(field);
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.customField.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const id = body.id as string | undefined;
    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const validation = customFieldSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: "Validation Error", details: validation.error.format() }, { status: 400 });
    }

    const { label, name, type, required, options } = validation.data;

    const updated = await prisma.customField.update({
        where: { id },
        data: {
            label,
            name,
            type,
            required,
            options: options ? JSON.stringify(options) : null,
        },
    });

    return NextResponse.json(updated);
}
