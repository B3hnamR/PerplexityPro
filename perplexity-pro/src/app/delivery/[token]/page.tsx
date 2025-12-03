import { prisma } from "@/lib/db";
import DeliveryClient from "./DeliveryClient";
import styles from "./delivery.module.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ParamsInput = { token: string } | Promise<{ token: string }>;
type SearchInput = { nostock?: string } | Promise<{ nostock?: string }> | undefined;

export default async function DeliveryPage({
    params,
    searchParams,
}: {
    params: ParamsInput;
    searchParams?: SearchInput;
}) {
    const resolvedParams = await params;
    const resolvedSearch = searchParams ? await searchParams : {};
    const token = resolvedParams.token;

    const order = await prisma.order.findFirst({
        where: { downloadToken: token },
    });

    if (!order) {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <h1 className={styles.title}>سفارش یافت نشد</h1>
                    <p className={styles.subtitle}>
                        لینک ارائه‌شده معتبر نیست یا سفارش مربوطه پیدا نشد. لطفا دوباره از حساب خود وضعیت سفارش را بررسی کنید.
                    </p>
                </div>
            </div>
        );
    }

    const downloads = await prisma.downloadLink.findMany({
        where: { orderId: order.id },
        orderBy: { createdAt: "asc" },
    });

    const links = downloads.map((d: { url: string }) => d.url);
    const noStock = resolvedSearch?.nostock === "1";

    return (
        <div className={styles.page}>
            <DeliveryClient links={links} trackingCode={order.trackingCode} noStock={noStock} />
        </div>
    );
}
