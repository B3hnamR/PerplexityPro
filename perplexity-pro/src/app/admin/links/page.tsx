"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../settings/settings.module.css";
import { Plus } from "lucide-react";

interface LinkStats {
    available: number;
    used: number;
    latest: { id: string; url: string; status: string; createdAt: string }[];
}

export default function LinksInventoryPage() {
    const [linksInput, setLinksInput] = useState("");
    const [stats, setStats] = useState<LinkStats>({ available: 0, used: 0, latest: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        const res = await axios.get("/api/admin/links");
        setStats(res.data);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleAddLinks = async (e: React.FormEvent) => {
        e.preventDefault();
        const lines = linksInput
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l.length > 0);
        if (lines.length === 0) return;
        setLoading(true);
        setError(null);
        try {
            await axios.post("/api/admin/links", { links: lines });
            setLinksInput("");
            await fetchStats();
        } catch (err: any) {
            setError(err?.response?.data?.error || "خطا در ذخیره لینک‌ها");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{"انبار لینک‌های تحویل"}</h1>

            <div className={styles.card}>
                <h2>{"افزودن لینک‌های جدید"}</h2>
                <p className={styles.muted}>{"هر خط یک لینک فعال‌سازی است. بعد از ثبت، لینک‌ها در سفارش‌های بعدی به‌صورت خودکار استفاده می‌شوند."}</p>
                <form onSubmit={handleAddLinks} className={styles.form}>
                    <textarea
                        className={styles.input}
                        rows={4}
                        placeholder="https://example.com/?uuid=...."
                        id="links-input"
                        name="links-input"
                        value={linksInput}
                        onChange={(e) => setLinksInput(e.target.value)}
                    />
                    <button type="submit" className={styles.addButton} disabled={loading}>
                        <Plus size={18} /> {loading ? "در حال ذخیره..." : "افزودن لینک‌ها"}
                    </button>
                </form>
                {error && <p className={styles.errorText}>{error}</p>}
                <div className={styles.linkStats}>
                    <span>{"لینک‌های آماده: "} {stats.available}</span>
                    <span>{"لینک‌های مصرف‌شده: "} {stats.used}</span>
                </div>
            </div>

            <div className={styles.card}>
                <h2>{"آخرین لینک‌های ثبت‌شده"}</h2>
                {stats.latest.length === 0 ? (
                    <p className={styles.muted}>{"لینکی ثبت نشده است."}</p>
                ) : (
                    <div className={styles.linksList}>
                        {stats.latest.map((l) => (
                            <div key={l.id} className={styles.linkRow}>
                                <span className={styles.linkText}>{l.url}</span>
                                <span className={`${styles.badge}`}>{l.status}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
