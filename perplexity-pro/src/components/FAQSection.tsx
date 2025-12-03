"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import styles from "./FAQSection.module.css";

const faqs = [
    {
        question: "اشتراک Perplexity Pro چه مزیتی دارد؟",
        answer: "دسترسی به جدیدترین مدل‌های جهان مثل GPT-5.1، Claude Sonnet 4.5 و Gemini 3 Pro، سرعت پاسخگویی بالاتر، اولویت در صف پردازش و قابلیت آپلود فایل‌های حجیم برای آنالیز دقیق.",
    },
    {
        question: "تحویل و فعال‌سازی چطور انجام می‌شود؟",
        answer: "بلافاصله پس از پرداخت، لایسنس اختصاصی به ایمیل شما ارسال می‌شود و می‌توانید روی اکانت شخصی خودتان آن را فعال کنید.",
    },
    {
        question: "آیا می‌توانم اشتراک را لغو یا تمدید کنم؟",
        answer: "بله، در هر زمان می‌توانید اشتراک خود را مدیریت کنید. برای تمدید نیز می‌توانید از همین پنل اقدام کنید.",
    },
    {
        question: "پرداخت امن است؟",
        answer: "بله، تمامی پرداخت‌ها از طریق درگاه‌های امن بانکی (زرین‌پال) انجام می‌شود و اطلاعات شما کاملاً محفوظ است.",
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
                </div>

                <div className={styles.list}>
                    {faqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                className={`${styles.item} ${isOpen ? styles.open : ""}`}
                            >
                                <button className={styles.question} onClick={() => toggle(idx)}>
                                    <span>{item.question}</span>
                                    <ChevronDown size={18} className={styles.icon} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            className={styles.answer}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
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