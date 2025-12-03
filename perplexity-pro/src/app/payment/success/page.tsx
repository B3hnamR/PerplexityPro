"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Copy, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import styles from "./success.module.css";

function SuccessContent() {
    const searchParams = useSearchParams();
    const trackingCode = searchParams.get("tracking");
    const refId = searchParams.get("ref");
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        if (trackingCode) {
            navigator.clipboard.writeText(trackingCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <CheckCircle size={64} className={styles.icon} />
                </div>
                <h1 className={styles.title}>پرداخت موفقیت‌آمیز بود!</h1>
                <p className={styles.message}>
                    سفارش شما با موفقیت ثبت شد. از خرید شما سپاسگزاریم.
                </p>

                {trackingCode ? (
                    <div className={styles.trackingBox}>
                        <span className={styles.label}>کد پیگیری سفارش:</span>
                        <div className={styles.codeRow}>
                            <span className={styles.code}>{trackingCode}</span>
                            <button
                                onClick={copyCode}
                                className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
                                aria-label="کپی کد پیگیری"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                        {refId && <p className={styles.ref}>رسید بانکی: {refId}</p>}
                    </div>
                ) : (
                    <div className={styles.spinnerBox}>
                        <span className={styles.spinner} />
                        <p className={styles.loading}>در حال دریافت کد پیگیری...</p>
                    </div>
                )}

                <div className={styles.actions}>
                    <Link href="/" className={styles.homeButton}>
                        بازگشت به صفحه اصلی <ArrowRight size={18} />
                    </Link>
                    <Link href="/track" className={styles.trackButton}>
                        پیگیری سفارش
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.spinnerBox}>
                            <span className={styles.spinner} />
                            <p className={styles.loading}>در حال دریافت کد پیگیری...</p>
                        </div>
                    </div>
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
