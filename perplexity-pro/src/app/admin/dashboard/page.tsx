"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import axios from "axios";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalSales: 0,
        orderCount: 0,
        visitorCount: 0,
    });

    useEffect(() => {
        axios.get("/api/admin/stats").then((res) => {
            setStats(res.data);
        });
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>داشبورد</h1>
            <div className={styles.statsGrid}>
                <div className={styles.card}>
                    <h3>جمع فروش</h3>
                    <p>{stats.totalSales.toLocaleString("fa-IR")} تومان</p>
                </div>
                <div className={styles.card}>
                    <h3>تعداد سفارش</h3>
                    <p>{stats.orderCount}</p>
                </div>
                <div className={styles.card}>
                    <h3>بازدید تخمینی</h3>
                    <p>{stats.visitorCount.toLocaleString("fa-IR")}</p>
                </div>
            </div>
        </div>
    );
}
