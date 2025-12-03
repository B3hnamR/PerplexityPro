"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import styles from "./FAQSection.module.css";

const faqs = [
    {
        question: "اشتراک Perplexity Pro چه مزیتی دارد؟",
        answer: "دسترسی به مدل‌های پیشرفته، پاسخ‌های سریع‌تر و اولویت در صف پردازش برای جستجوهای حجیم را دریافت می‌کنید.",
    },
    {
        question: "تحویل و فعال‌سازی چطور انجام می‌شود؟",
        answer: "پس از پرداخت آنلاین، دسترسی دیجیتال شما بلافاصله فعال می‌شود و ایمیل تأیید دریافت می‌کنید.",
    },
    {
        question: "می‌توانم اشتراک را لغو یا تمدید کنم؟",
        answer: "بله، هر زمان می‌توانید تمدید یا لغو کنید و دسترسی فعلی تا پایان دوره باقی می‌ماند.",
    },
    {
        question: "پرداخت امن است؟",
        answer: "پرداخت روی بستر امن و رمزنگاری‌شده انجام می‌شود و رسید پرداخت بلافاصله صادر می‌گردد.",
    },
    {
        question: "در صورت مشکل از کجا پیگیری کنم؟",
        answer: "پشتیبانی ۲۴/۷ از طریق ایمیل و پیام‌رسان در دسترس است و وضعیت خرید شما را بررسی می‌کند.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.badge}><HelpCircle size={16} /> سوالات متداول</div>
                    <h2 className={styles.title}>قبل از خرید، همه‌چیز را روشن کنید</h2>
                    <p className={styles.subtitle}>پرسش‌های پرتکرار را اینجا آورده‌ایم تا مسیر خرید سریع و شفاف باشد.</p>
                </div>

                <div className={styles.list}>
                    {faqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div
                                key={item.question}
                                className={`${styles.item} ${isOpen ? styles.open : ""}`}
                                layout
                                transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
                            >
                                <button className={styles.question} onClick={() => toggle(idx)}>
                                    <span>{item.question}</span>
                                    <motion.span
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className={styles.icon}
                                    >
                                        <ChevronDown size={18} />
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            className={styles.answer}
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }}
                                        >
                                            <p>{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
