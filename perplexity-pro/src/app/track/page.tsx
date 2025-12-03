"use client";

import { useState } from "react";
import { Search, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import styles from "./track.module.css";
import Navbar from "@/components/Navbar";

export default function TrackOrderPage() {
    const [code, setCode] = useState("");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/track?code=${code}`);
            const data = await res.json();

            if (res.ok) {
                setOrder(data);
            } else {
                setError(data.error || "کد رهگیری یافت نشد");
            }
        } catch (err) {
            setError("مشکلی در برقراری ارتباط پیش آمد");
        } finally {
            setLoading(false);
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case "PAID":
                return { label: "پرداخت شده", icon: CheckCircle, color: "#22c55e" };
            case "PENDING":
                return { label: "در انتظار پرداخت", icon: Clock, color: "#fbbf24" };
            case "FAILED":
                return { label: "ناموفق", icon: XCircle, color: "#ef4444" };
            default:
                return { label: status, icon: Package, color: "#94a3b8" };
        }
    };

    return (
        <main className={styles.main}>
            <Navbar onPreOrder={() => { }} />
            <div className={styles.container}>
                <h1 className={styles.title}>پیگیری سفارش</h1>
                <p className={styles.subtitle}>
                    کد رهگیری سفارش را وارد کنید و وضعیت پرداخت و ارسال را ببینید.
                </p>

                <form onSubmit={handleTrack} className={styles.form}>
                    <input
                        type="text"
                        placeholder="کد رهگیری (مثلاً ORD-123456)"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "در حال جستجو..." : <><Search size={20} /> پیگیری</>}
                    </button>
                </form>

                {error && <div className={styles.error}>{error}</div>}

                {order && (
                    <div className={styles.result}>
                        <div className={styles.statusHeader}>
                            {(() => {
                                const info = getStatusInfo(order.status);
                                const Icon = info.icon;
                                return (
                                    <>
                                        <Icon size={32} color={info.color} />
                                        <span style={{ color: info.color }}>{info.label}</span>
                                    </>
                                );
                            })()}
                        </div>
                        <div className={styles.details}>
                            <div className={styles.row}>
                                <span>کد رهگیری:</span>
                                <span className={styles.value}>{order.trackingCode}</span>
                            </div>
                            <div className={styles.row}>
                                <span>مبلغ:</span>
                                <span className={styles.value}>{order.amount.toLocaleString()} تومان</span>
                            </div>
                            <div className={styles.row}>
                                <span>تاریخ سفارش:</span>
                                <span className={styles.value}>
                                    {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
