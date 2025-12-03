"use client";

import { motion } from "framer-motion";
import styles from "./TestimonialsSection.module.css";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "علی محمدی",
        role: "برنامه‌نویس ارشد",
        content: "از وقتی اشتراک پرو رو گرفتم، سرعت کدنویسیم دو برابر شده. دسترسی همزمان به GPT-4 و Claude 3 Opus با این قیمت واقعاً باورنکردنیه.",
        stars: 5
    },
    {
        name: "سارا جلالی",
        role: "محقق و دانشجو",
        content: "برای پایان‌نامم نیاز به تحلیل مقالات زیادی داشتم. قابلیت آپلود فایل و تحلیل دقیق پرپلکسیتی نجاتم داد. فعال‌سازی هم که آنی بود.",
        stars: 5
    },
    {
        name: "رضا کریمی",
        role: "تولیدکننده محتوا",
        content: "دیگه نیازی نیست بین ابزارهای مختلف سوییچ کنم. همه مدل‌های هوش مصنوعی رو یکجا دارم. کیفیت خروجی‌ها فوق‌العاده‌ست.",
        stars: 5
    }
];

export default function TestimonialsSection() {
    return (
        <section className={styles.container} id="testimonials">
            <div className={styles.contentWrapper}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.mainTitle}>نظرات کاربران ما</h2>
                    <p className={styles.mainDescription}>
                        ببینید دیگران درباره تجربه استفاده از Perplexity Pro چه می‌گویند
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.quoteIcon}>
                                <Quote size={24} />
                            </div>
                            <p className={styles.content}>{item.content}</p>

                            <div className={styles.footer}>
                                <div className={styles.info}>
                                    <h4 className={styles.name}>{item.name}</h4>
                                    <span className={styles.role}>{item.role}</span>
                                </div>
                                <div className={styles.stars}>
                                    {[...Array(item.stars)].map((_, i) => (
                                        <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
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
