import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") || "AVAILABLE"; 
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const [availableCount, usedCount] = await Promise.all([
            prisma.downloadLink.count({ where: { status: "AVAILABLE" } }),
            prisma.downloadLink.count({ where: { status: "USED" } })
        ]);

        const links = await prisma.downloadLink.findMany({
            where: { status: status },
            orderBy: { createdAt: "desc" },
            take: limit,
            skip: skip,
            include: {
                order: {
                    select: { id: true, customerEmail: true, trackingCode: true }
                }
            }
        });

        const totalForCurrentStatus = status === "AVAILABLE" ? availableCount : usedCount;

        return NextResponse.json({
            links,
            stats: { available: availableCount, used: usedCount },
            pagination: {
                page,
                totalPages: Math.ceil(totalForCurrentStatus / limit),
                total: totalForCurrentStatus
            }
        });

    } catch (error) {
        console.error("Links API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { links } = body; 

        if (!links || !Array.isArray(links) || links.length === 0) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        await prisma.downloadLink.createMany({
            data: links.map((url: string) => ({
                url: url.trim(),
                status: "AVAILABLE",
            })),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Database Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await prisma.downloadLink.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Delete Failed" }, { status: 500 });
    }
}