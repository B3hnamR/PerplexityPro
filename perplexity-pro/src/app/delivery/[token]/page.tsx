import { prisma } from "@/lib/db";
import DeliveryClient from "./DeliveryClient";
import styles from "./delivery.module.css";

export const dynamic = "force-dynamic";

interface PageProps {
    params: { token: string };
    searchParams?: { nostock?: string };
}

export default async function DeliveryPage({ params, searchParams }: PageProps) {
    const token = params.token;

    // Find order by download token (assigned after payment verification)
    const order = await prisma.order.findFirst({
        where: { downloadToken: token },
    });

    if (!order) {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <h1 className={styles.title}>{"سفارش یافت نشد"}</h1>
                    <p className={styles.subtitle}>
                        {"لینک ارائه‌شده معتبر نیست یا سفارش مربوطه پیدا نشد. لطفا دوباره از حساب خود وضعیت سفارش را بررسی کنید."}
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
    const noStock = searchParams?.nostock === "1";

    return (
        <div className={styles.page}>
            <DeliveryClient links={links} trackingCode={order.trackingCode} noStock={noStock} />
        </div>
    );
}
