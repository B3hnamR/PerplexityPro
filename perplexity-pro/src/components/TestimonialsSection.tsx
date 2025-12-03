"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
    {
        name: "رضا کریمی",
        role: "تولیدکننده محتوا",
        text: "دیگه نیازی نیست بین ابزارهای مختلف سوییچ کنم. همه مدل‌های هوش مصنوعی رو یکجا دارم. کیفیت خروجی‌ها فوق‌العاده‌ست.",
        stars: 5
    },
    {
        name: "سارا جلالی",
        role: "محقق و دانشجو",
        text: "برای پایان‌نامم نیاز به تحلیل مقالات زیادی داشتم. قابلیت آپلود فایل و تحلیل دقیق پرپلکسیتی نجاتم داد. فعال‌سازی هم که آنی بود.",
        stars: 5
    },
    {
        name: "علی محمدی",
        role: "برنامه‌نویس ارشد",
        text: "از وقتی اشتراک پرو رو گرفتم، سرعت کدنویسیم دو برابر شده. دسترسی همزمان به GPT-5 و Claude جدید با این قیمت واقعاً باورنکردنیه.",
        stars: 5
    }
];

export default function TestimonialsSection() {
    return (
        <section className={styles.section} id="testimonials">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>نظرات کاربران ما</h2>
                    <p className={styles.subtitle}>ببینید دیگران درباره تجربه استفاده از Perplexity Pro چه می‌گویند</p>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.quoteIcon}>
                                <MessageSquare size={48} fill="currentColor" />
                            </div>
                            <p className={styles.content}>"{item.text}"</p>
                            <div className={styles.footer}>
                                <div>
                                    <h4 className={styles.name}>{item.name}</h4>
                                    <span className={styles.role}>{item.role}</span>
                                </div>
                                <div className={styles.stars}>
                                    {[...Array(item.stars)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}