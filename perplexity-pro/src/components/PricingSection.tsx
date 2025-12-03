"use client";

import styles from "./PricingSection.module.css";
import Button from "./ui/Button";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";

interface PricingSectionProps {
    product?: {
        id?: string;
        name?: string | null;
        price?: number | null;
    } | null;
}

export default function PricingSection({ product }: PricingSectionProps) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const price = product?.price ?? 299000;
    const name = product?.name || "اشتراک Perplexity Pro - یک‌ساله";
    const productId = product?.id || "perplexity-pro-1year";

    const handleAddToCart = () => {
        addItem({
            id: productId,
            name,
            price,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <section className={styles.section} id="pricing">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>انتخاب طرح</h2>
                    <p className={styles.subtitle}>بهترین ابزار هوش مصنوعی جهان را با قیمتی استثنایی تجربه کنید.</p>
                </motion.div>

                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={styles.popularBadge}>پیشنهاد ویژه</div>
                    <h3 className={styles.planName}>اشتراک یک‌ساله</h3>
                    <div className={styles.price}>
                        <span className={styles.amount}>{price.toLocaleString("fa-IR")}</span>
                        <span className={styles.currency}>تومان</span>
                    </div>
                    <p className={styles.period}>دسترسی کامل برای ۱۲ ماه</p>

                    <ul className={styles.features}>
                        <li><Check size={18} /> دسترسی نامحدود به GPT-4o و Claude 3</li>
                        <li><Check size={18} /> جستجوی حرفه‌ای با Copilot</li>
                        <li><Check size={18} /> آپلود فایل و تحلیل داده</li>
                        <li><Check size={18} /> دسترسی به API (محدود)</li>
                        <li><Check size={18} /> پشتیبانی اختصاصی</li>
                    </ul>

                    <div className={styles.actions}>
                        <Button size="lg" className={styles.buyButton} onClick={handleAddToCart} disabled={added}>
                            {added ? (
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                                    <Check size={20} /> به سبد اضافه شد
                                </span>
                            ) : (
                                "افزودن به سبد خرید"
                            )}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
