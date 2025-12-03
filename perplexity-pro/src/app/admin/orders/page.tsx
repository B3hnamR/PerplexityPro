import { prisma } from "@/lib/db";
import styles from "./orders.module.css";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>سفارش‌ها</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>کد</th>
                        <th>ایمیل</th>
                        <th>تعداد</th>
                        <th>مبلغ</th>
                        <th>وضعیت</th>
                        <th>تاریخ</th>
                        <th>جزئیات</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: any) => (
                        <tr key={order.id}>
                            <td>{order.id.slice(0, 8)}...</td>
                            <td>{order.customerEmail}</td>
                            <td>{order.quantity ?? 1} عدد</td>
                            <td>{order.amount.toLocaleString("fa-IR")} تومان</td>
                            <td>
                                <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                    {order.status === "PAID" ? "پرداخت‌شده" : order.status === "PENDING" ? "در انتظار" : "ناموفق"}
                                </span>
                            </td>
                            <td>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</td>
                            <td>
                                <Link href={`/admin/orders/${order.id}`} className={styles.viewButton}>
                                    مشاهده
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
