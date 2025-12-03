import { prisma } from "@/lib/db";
import styles from "../orders.module.css";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ParamsInput = { id: string } | Promise<{ id: string }>;

export default async function OrderDetailPage({ params }: { params: ParamsInput }) {
    const resolvedParams = await params;

    const order = await prisma.order.findUnique({
        where: { id: resolvedParams.id },
        include: { downloads: true },
    });

    if (!order) {
        return (
            <div className={styles.container}>
                <p>سفارش پیدا نشد.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>جزئیات سفارش</h1>
            <div className={styles.detailCard}>
                <div className={styles.detailGrid}>
                    <div><strong>شماره سفارش:</strong> {order.id}</div>
                    <div><strong>کد پیگیری:</strong> {order.trackingCode || "-"}</div>
                    <div><strong>ایمیل خریدار:</strong> {order.customerEmail}</div>
                    <div><strong>مبلغ:</strong> {order.amount.toLocaleString("fa-IR")} تومان</div>
                    <div><strong>تعداد:</strong> {order.quantity}</div>
                    <div><strong>وضعیت:</strong> {order.status}</div>
                    <div><strong>تاریخ:</strong> {new Date(order.createdAt).toLocaleString("fa-IR")}</div>
                </div>
                {order.customData && (
                    <div className={styles.detailBlock}>
                        <strong>اطلاعات تکمیلی خریدار:</strong>
                        <pre className={styles.pre}>{order.customData}</pre>
                    </div>
                )}
            </div>

            <div className={styles.detailCard}>
                <h2>لینک‌های تحویل</h2>
                {order.downloads.length === 0 ? (
                    <p className={styles.muted}>لینکی ثبت نشده است.</p>
                ) : (
                    <div className={styles.linksList}>
                        {order.downloads.map((d) => (
                            <div key={d.id} className={styles.linkRow}>
                                <span className={styles.linkText}>{d.url}</span>
                                <span className={`${styles.status} ${styles[d.status.toLowerCase()]}`}>
                                    {d.status === "USED" ? "مصرف‌شده" : "آماده"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Link href="/admin/orders" className={styles.backLink}>بازگشت</Link>
        </div>
    );
}
