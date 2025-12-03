"use client";

import { motion } from "framer-motion";
import styles from "./StorySection.module.css";
import {
    Cpu,
    Image as ImageIcon,
    Globe,
    Zap,
    BrainCircuit,
    LayoutTemplate,
    Link2,
    TrendingUp,
    Check
} from "lucide-react";

const features = [
    {
        id: "models",
        title: "دسترسی به بهترین مدل‌های هوش مصنوعی",
        description: "همزمان به قوی‌ترین مدل‌های دنیا مثل GPT-5 و Claude دسترسی داشته باش. هر وقت خواستی مدل رو عوض کن و قدرت واقعی رو حس کن.",
        icon: <Cpu size={32} />,
        tags: ["GPT-5.1", "Claude Sonnet 4.5", "Gemini 3 Pro", "Grok 4.1", "Sonar", "Kimi K2"],
        className: styles.cardLarge,
        visual: (
            <div className={styles.modelSelectorVisual}>
                <div className={styles.mockDropdownItem}>
                    <span className={styles.modelName}>Claude Sonnet 4.5</span>
                </div>
                <div className={`${styles.mockDropdownItem} ${styles.activeItem}`}>
                    <div className={styles.modelInfo}>
                        <span className={styles.modelName}>Gemini 3 Pro</span>
                        <span className={styles.badgeNew}>new</span>
                    </div>
                    <Check size={16} className={styles.checkIcon} />
                </div>
                <div className={styles.mockDropdownItem}>
                    <div className={styles.modelInfo}>
                        <span className={styles.modelName}>Grok 4.1</span>
                        <span className={styles.badgeNew}>new</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "finance",
        title: "تحلیل‌های مالی و سرمایه‌گذاری",
        description: "دسترسی لحظه‌ای به داده‌های بازار بورس، کریپتو و تحلیل‌های عمیق مالی. نمودارهای پیشرفته رو ببین، مقایسه کن و با هوش مصنوعی آینده بازار رو پیش‌بینی کن.",
        icon: <TrendingUp size={32} />,
        tags: ["Stock Analysis", "Crypto", "Market News", "Screener", "Earnings"],
        className: styles.cardMedium,
    },
    {
        id: "connectors",
        title: "اتصال به همه ابزارهای تو",
        description: "پرپلکسیتی رو به گوگل درایو، نوشن، اسلک و کلی ابزار دیگه وصل کن تا بتونه از توی فایل‌ها و پیام‌هات هم جواب سوالاتت رو پیدا کنه. یک جستجوی واقعاً جامع.",
        icon: <Link2 size={32} />,
        tags: ["Google Drive", "Notion", "Slack", "GitHub", "Gmail", "Outlook", "Jira", "Linear"],
        className: styles.cardMedium,
    },
    {
        id: "image-gen",
        title: "تصویرسازی حرفه‌ای",
        description: "هر چیزی تو ذهنت هست رو به تصویر تبدیل کن. با جدیدترین مدل‌ها، کیفیت و خلاقیت رو به اوج برسون.",
        icon: <ImageIcon size={32} />,
        tags: ["FLUX.1", "Seedream 4.0", "GPT Image 1", "Nano Banana"],
        className: styles.cardMedium,
    },
    {
        id: "comet",
        title: "مرورگر هوشمند Comet",
        description: "دیگه لازم نیست خودت سرچ کنی. Comet برات می‌گرده، کلیک می‌کنه و جواب رو پیدا می‌کنه. اینترنت‌گردی رو بسپار به ما.",
        icon: <Globe size={32} />,
        tags: ["Browse for me", "Auto-Interaction", "Smart Navigation"],
        className: styles.cardMedium,
    },
    {
        id: "personalization",
        title: "حافظه و شخصی‌سازی",
        description: "پرپلکسیتی علایق و نیازت رو یاد می‌گیره تا هر بار جواب‌های دقیق‌تر و بهتری بهت بده. انگار یه دستیار شخصی داری که کاملاً می‌شناستت.",
        icon: <BrainCircuit size={32} />,
        tags: ["Memory", "Location Aware", "Shopping Avatar", "Watchlists"],
        className: styles.cardSmall,
    },
    {
        id: "tasks",
        title: "انجام خودکار کارها",
        description: "کارهای تکراری رو بسپار به هوش مصنوعی. از اخبار صبحگاهی تا تحلیل بازار، همه چی خودکار انجام میشه.",
        icon: <Zap size={32} />,
        tags: ["News Digest", "Market Forecast", "Tech Insights", "Sports Roundup"],
        className: styles.cardSmall,
    },
    {
        id: "assistant",
        title: "دستیار شخصی تو",
        description: "ایمیل‌هات رو مدیریت کن، جلساتت رو تنظیم کن و به کارهات نظم بده. یه دستیار واقعی برای مدیریت زمانت.",
        icon: <LayoutTemplate size={32} />,
        tags: ["Inbox Zero", "Calendar Sync", "Draft Replies"],
        className: styles.cardWide,
    },
];

export default function StorySection() {
    return (
        <section className={styles.container} id="features">
            <div className={styles.contentWrapper}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.mainTitle}>قدرت بی‌پایان در دستان شما</h2>
                    <p className={styles.mainDescription}>
                        مجموعه‌ای از پیشرفته‌ترین ابزارهای هوش مصنوعی، یکجا در Perplexity Pro.
                    </p>
                </motion.div>

                <div className={styles.bentoGrid}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className={`${styles.card} ${feature.className}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.iconWrapper}>{feature.icon}</div>
                                    <h3 className={styles.cardTitle}>{feature.title}</h3>
                                </div>

                                {feature.visual && (
                                    <div className={styles.visualContainer}>
                                        {feature.visual}
                                    </div>
                                )}

                                <p className={styles.cardDescription}>{feature.description}</p>

                                <div className={styles.tagsWrapper}>
                                    {feature.tags.map((tag, i) => (
                                        <span key={i} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.cardGlow} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
