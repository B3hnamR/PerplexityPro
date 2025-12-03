"use client";

import { motion } from "framer-motion";
import styles from "./StorySection.module.css";
import {
    Cpu, TrendingUp, Link as LinkIcon, Globe,
    Image as ImageIcon, Zap, UserCheck, Brain
} from "lucide-react";

const features = [
    {
        icon: Cpu,
        title: "دسترسی به بهترین مدل‌های هوش مصنوعی",
        description: "همزمان به قوی‌ترین مدل‌های دنیا مثل GPT-5 و Claude دسترسی داشته باش. هر وقت خواستی مدل رو عوض کن و قدرت واقعی رو حس کن.",
        tags: ["Claude Sonnet 4.5", "Gemini 3 Pro", "Grok 4.1", "GPT-5.1"],
        className: styles.cardWide,
        color: "rgba(6, 182, 212, 1)" // Cyan
    },
    {
        icon: TrendingUp,
        title: "تحلیل‌های مالی و سرمایه‌گذاری",
        description: "دسترسی لحظه‌ای به داده‌های بازار بورس، کریپتو و تحلیل‌های عمیق مالی.",
        tags: ["Earnings", "Screener", "Crypto"],
        className: styles.cardSmall,
        color: "rgba(16, 185, 129, 1)" // Emerald
    },
    {
        icon: LinkIcon,
        title: "اتصال به همه ابزارهای تو",
        description: "پرپلکسیتی رو به گوگل درایو، نوشن، اسلک و کلی ابزار دیگه وصل کن تا بتونه از توی فایل‌ها هم جواب بده.",
        tags: ["Outlook", "GitHub", "Slack", "Notion"],
        className: styles.cardWide,
        color: "rgba(99, 102, 241, 1)" // Indigo
    },
    {
        icon: Globe,
        title: "مرورگر هوشمند Comet",
        description: "Comet برات می‌گرده، کلیک می‌کنه و دقیق‌ترین جواب رو پیدا می‌کنه.",
        tags: ["Smart Navigation", "Auto-Interaction"],
        className: styles.cardSmall,
        color: "rgba(59, 130, 246, 1)" // Blue
    },
    {
        icon: ImageIcon,
        title: "تصویرسازی حرفه‌ای",
        description: "تبدیل متن به تصویر با کیفیت خیره‌کننده با جدیدترین مدل‌ها.",
        tags: ["Nano Banana", "GPT Image", "FLUX.1"],
        className: styles.cardSmall,
        color: "rgba(236, 72, 153, 1)" // Pink
    },
    {
        icon: Zap,
        title: "انجام خودکار کارها",
        description: "از اخبار صبحگاهی تا تحلیل بازار، همه چی خودکار انجام میشه.",
        tags: ["News Digest", "Market Forecast"],
        className: styles.cardSmall,
        color: "rgba(245, 158, 11, 1)" // Amber
    },
    {
        icon: UserCheck,
        title: "دستیار شخصی تو",
        description: "ایمیل‌هات رو مدیریت کن، جلساتت رو تنظیم کن و به کارهات نظم بده.",
        tags: ["Draft Replies", "Inbox Zero"],
        className: styles.cardSmall,
        color: "rgba(168, 85, 247, 1)" // Purple
    },
    {
        icon: Brain,
        title: "حافظه و شخصی‌سازی",
        description: "پرپلکسیتی علایق و نیازت رو یاد می‌گیره تا هر بار جواب‌های دقیق‌تری بهت بده.",
        tags: ["Memory", "Location Aware"],
        className: styles.cardWide,
        color: "rgba(244, 63, 94, 1)" // Rose
    }
];

export default function StorySection() {
    return (
        <section className={styles.container} id="features">
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <h2 className={styles.mainTitle}>
                        قدرت بی‌پایان در <span className={styles.highlight}>دستان شما</span>
                    </h2>
                    <p className={styles.mainDescription}>
                        مجموعه‌ای از پیشرفته‌ترین ابزارهای هوش مصنوعی، یکجا در Perplexity Pro
                    </p>
                </div>

                <div className={styles.bentoGrid}>
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                className={`${styles.card} ${feature.className}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{ '--glow-color': feature.color } as any}
                            >
                                <div className={styles.glow}></div>
                                <div className={styles.cardContent}>
                                    <div className={styles.iconBox}>
                                        <Icon size={28} style={{ color: feature.color }} />
                                    </div>
                                    <h3 className={styles.cardTitle}>{feature.title}</h3>
                                    <p className={styles.cardDesc}>{feature.description}</p>
                                    <div className={styles.tags}>
                                        {feature.tags.map((tag, i) => (
                                            <span key={i} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}