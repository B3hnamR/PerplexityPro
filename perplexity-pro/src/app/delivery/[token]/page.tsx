import { prisma } from "@/lib/db";
import DeliveryClient from "./DeliveryClient";
import styles from "./delivery.module.css";

export const dynamic = "force-dynamic";

export default async function DeliveryPage({ params, searchParams }: { params: { token: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
    const token = params.token;
    const order = await prisma.order.findFirst({
        where: { downloadToken: token },
        include: { downloads: true },
    });

    if (!order) {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <h1 className={styles.title}>لینک یافت نشد</h1>
                    <p className={styles.subtitle}>کد یا سفارش معتبر نیست. لطفاً با پشتیبانی تماس بگیرید.</p>
                </div>
            </div>
        );
    }

    const links = order.downloads.map((d) => d.url);
    const noStock = searchParams.nostock === "1";

    return (
        <div className={styles.page}>
            <DeliveryClient links={links} trackingCode={order.trackingCode} noStock={noStock} />
        </div>
    );
}
