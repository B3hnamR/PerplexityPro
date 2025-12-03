import { prisma } from "@/lib/db";
import styles from "./order-details.module.css";
import { notFound } from "next/navigation";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await prisma.order.findUnique({
        where: { id },
    });

    if (!order) {
        notFound();
    }

    const customData = order.customData ? JSON.parse(order.customData) : {};

    return (
        <div>
            <h1 className={styles.title}>جزئیات سفارش</h1>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h2>اطلاعات مشتری</h2>
                    <div className={styles.row}>
                        <span>ایمیل:</span>
                        <span>{order.customerEmail}</span>
                    </div>
                    <div className={styles.row}>
                        <span>موبایل:</span>
                        <span>{order.customerPhone || "نامشخص"}</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <h2>اطلاعات پرداخت</h2>
                    <div className={styles.row}>
                        <span>مبلغ:</span>
                        <span>{order.amount.toLocaleString()} تومان</span>
                    </div>
                    <div className={styles.row}>
                        <span>وضعیت:</span>
                        <span className={styles.status}>{order.status === "PAID" ? "پرداخت شده" : "در انتظار"}</span>
                    </div>
                    <div className={styles.row}>
                        <span>کد پیگیری:</span>
                        <span>{order.refId || "نامشخص"}</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <h2>فیلدهای دلخواه</h2>
                    {Object.entries(customData).length > 0 ? (
                        Object.entries(customData).map(([key, value]) => (
                            <div key={key} className={styles.row}>
                                <span>{key}:</span>
                                <span>{String(value)}</span>
                            </div>
                        ))
                    ) : (
                        <p className={styles.empty}>داده اضافی وجود ندارد.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
