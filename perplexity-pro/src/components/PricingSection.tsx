"use client";

import styles from "./PricingSection.module.css";
import { Check, Zap, Brain } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface PricingSectionProps {
    product?: {
        id?: string;
        name?: string | null;
        price?: number | null;
    } | null;
}

// Component for the circular progress
const UsageProgress = () => {
    const [progress, setProgress] = useState(0);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    
    useEffect(() => {
        const timer = setTimeout(() => setProgress(75), 500);
        return () => clearTimeout(timer);
    }, []);

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle
                cx="60" cy="60" r={radius}
                stroke="#1e293b" strokeWidth="12" fill="none"
            />
            <circle
                cx="60" cy="60" r={radius}
                stroke="url(#gradient)" strokeWidth="12" fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default function PricingSection({ product }: PricingSectionProps) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const price = product?.price ?? 398000;
    const name = product?.name || "اشتراک Perplexity Pro";
    const productId = product?.id || "perplexity-pro-1year";

    const handleAddToCart = () => {
        addItem({ id: productId, name, price });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <section className={styles.section} id="pricing">
            <div className={styles.container}>
                
                {/* New Usage Card */}
                <motion.div 
                    className={styles.usageCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.usageGlow}></div>
                    <div className={styles.usageContent}>
                        <div className={styles.progressCircle}>
                            <UsageProgress />
                            <div className={styles.progressValue}>
                                <Brain size={24} className="text-cyan-400 mb-1" />
                                <span>75%</span>
                            </div>
                        </div>
                        <div className={styles.usageText}>
                            <h3>
                                استفاده از مدل‌های حرفه‌ای
                                <div className={styles.pingDot}></div>
                            </h3>
                            <p>با اشتراک Pro، شما به طور نامحدود به قوی‌ترین مدل‌های هوش مصنوعی جهان دسترسی دارید. قدرت واقعی را آزاد کنید.</p>
                        </div>
                    </div>
                    <button className={styles.upgradeBtn} onClick={handleAddToCart}>
                        <Zap size={20} className="text-cyan-400" />
                        <span>ارتقا به نسخه حرفه‌ای</span>
                    </button>
                </motion.div>

                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginBottom: '1rem' }}>انتخاب طرح</h2>
                    <p style={{ color: '#94a3b8' }}>بهترین ابزار هوش مصنوعی جهان را با قیمتی استثنایی تجربه کنید</p>
                </div>

                <motion.div
                    className={styles.pricingCard}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.pricingGlow}></div>
                    <div className={styles.badge}>پیشنهاد ویژه</div>
                    
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>اشتراک یک‌ساله</h3>
                    <div className={styles.price}>
                        <span className={styles.amount}>{price.toLocaleString("fa-IR")}</span>
                        <span className={styles.unit}>تومان</span>
                    </div>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>دسترسی کامل برای ۱۲ ماه</p>

                    <ul className={styles.featuresList}>
                        {[
                            "دسترسی نامحدود به GPT-5.1 و Claude 4.5",
                            "جستجوی حرفه‌ای با Copilot",
                            "آپلود فایل و تحلیل داده (PDF, CSV)",
                            "دسترسی به API (محدود)",
                            "پشتیبانی اختصاصی ۲۴/۷"
                        ].map((item, i) => (
                            <li key={i} className={styles.featureItem}>
                                <Check size={16} className={styles.checkIcon} />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <button className={styles.ctaButton} onClick={handleAddToCart} disabled={added}>
                        {added ? "به سبد اضافه شد ✓" : "افزودن به سبد خرید"}
                    </button>
                </motion.div>
            </div>
        </section>
    );
}