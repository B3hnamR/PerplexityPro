"use client";

import { useState } from "react";
import styles from "./delivery.module.css";
import { Copy, Check } from "lucide-react";

interface DeliveryClientProps {
    links: string[];
    trackingCode?: string | null;
    noStock?: boolean;
}

export default function DeliveryClient({ links, trackingCode, noStock }: DeliveryClientProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);

    const handleCopy = (text: string, idx?: number) => {
        navigator.clipboard.writeText(text);
        if (typeof idx === "number") {
            setCopiedIndex(idx);
            setTimeout(() => setCopiedIndex(null), 1200);
        } else {
            setCopiedAll(true);
            setTimeout(() => setCopiedAll(false), 1200);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <p className={styles.badge}>تحویل آنی</p>
                    <h1 className={styles.title}>لینک‌های فعال‌سازی شما</h1>
                    <p className={styles.subtitle}>
                        لینک‌ها را کپی کنید و مراحل فعال‌سازی را انجام دهید. {trackingCode ? `کد پیگیری: ${trackingCode}` : ""}
                    </p>
                    {noStock && (
                        <p className={styles.warning}>
                            موجودی لینک‌ها کمتر از تعداد خرید بود؛ لطفاً در صورت کمبود با پشتیبانی تماس بگیرید.
                        </p>
                    )}
                </div>
                {links.length > 1 && (
                    <button className={`${styles.copyAll}`} onClick={() => handleCopy(links.join("\n"))}>
                        {copiedAll ? <Check size={18} /> : <Copy size={18} />} کپی همه
                    </button>
                )}
            </div>

            <div className={styles.linksList}>
                {links.length === 0 ? (
                    <div className={styles.empty}>لینکی تخصیص داده نشده است.</div>
                ) : (
                    links.map((link, idx) => (
                        <div key={idx} className={styles.linkRow}>
                            <span className={styles.linkText}>{link}</span>
                            <button className={styles.copyBtn} onClick={() => handleCopy(link, idx)}>
                                {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className={styles.guide}>
                <h2>آموزش فعال‌سازی</h2>
                <ol>
                    <li>روی لینک کلیک کنید یا آن را در مرورگر باز کنید.</li>
                    <li>دستورالعمل نمایش داده‌شده را دنبال کنید و وارد حساب مربوطه شوید.</li>
                    <li>در صورت بروز مشکل با پشتیبانی تماس بگیرید.</li>
                </ol>
            </div>
        </div>
    );
}
