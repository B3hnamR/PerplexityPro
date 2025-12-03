import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    const available = await (prisma as any).downloadLink.count({ where: { status: "AVAILABLE" } });
    const used = await (prisma as any).downloadLink.count({ where: { status: "USED" } });
    const latest = await (prisma as any).downloadLink.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { id: true, url: true, status: true, createdAt: true },
    });
    return NextResponse.json({ available, used, latest });
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const links: string[] = body.links;
    if (!Array.isArray(links) || links.length === 0) {
        return NextResponse.json({ error: "links array required" }, { status: 400 });
    }

    const data = links
        .map((url: string) => url.trim())
        .filter((u: string) => u.length > 0)
        .map((url: string) => ({ url }));

    if (data.length === 0) {
        return NextResponse.json({ error: "No valid links" }, { status: 400 });
    }

    try {
        const created = await (prisma as any).downloadLink.createMany({ data, skipDuplicates: true });
        return NextResponse.json({ added: created.count });
    } catch (e: any) {
        console.error("add links error", e);
        return NextResponse.json({ error: "Failed to save links" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    await (prisma as any).downloadLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
