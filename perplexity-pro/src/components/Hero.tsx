"use client";

import styles from "./Hero.module.css";
import { Zap, Sparkles } from "lucide-react";

interface HeroProps {
    onPreOrder: () => void;
}

export default function Hero({ onPreOrder }: HeroProps) {
    return (
        <section className={styles.hero}>
            {/* Background Glows */}
            <div className={styles.bgGlowLeft}></div>
            <div className={styles.bgGlowRight}></div>

            <div className={styles.container}>
                {/* Badge */}
                <div className={styles.badge}>
                    <span className={styles.pingWrapper}>
                        <span className={styles.pingDot}></span>
                        <span className={styles.solidDot}></span>
                    </span>
                    نسخه حرفه‌ای در دسترس است
                </div>

                {/* Logo Image */}
                <div className={styles.logoWrapper}>
                    <div className={styles.logoGlow}></div>
                    <img 
                        src="/PerplexityPro-Logo.png" 
                        alt="Perplexity Pro" 
                        className={styles.mainLogo}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>

                <p className={styles.description}>
                    تجربه‌ای فراتر از جستجوی معمولی. با دسترسی همزمان به <span className={styles.textWhite}>GPT-5.1</span>، <span className={styles.textWhite}>Claude Sonnet 4.5</span> و <span className={styles.textWhite}>Gemini 3 Pro</span>، پاسخ‌های دقیق‌تر و تحلیل‌های عمیق‌تری دریافت کنید.
                </p>

                <div className={styles.actions}>
                    <button onClick={onPreOrder} className={styles.primaryBtn}>
                        <Zap size={22} />
                        خرید اشتراک حرفه‌ای
                    </button>
                    <a href="#demo" className={styles.secondaryBtn}>
                        <Sparkles size={22} className={styles.cyanIcon} />
                        تست رایگان
                    </a>
                </div>

                {/* Floating Models */}
                <div className={styles.floatingContainer}>
                    <div className={`${styles.floatItem} ${styles.float1}`}>Claude Sonnet 4.5</div>
                    <div className={`${styles.floatItem} ${styles.float2}`}>GPT-5.1</div>
                    <div className={`${styles.floatItem} ${styles.floatCenter}`}>Gemini 3 Pro</div>
                    <div className={`${styles.floatItem} ${styles.float3}`}>Grok 4.1</div>
                    <div className={`${styles.floatItem} ${styles.float4}`}>Kimi K2 Thinking</div>
                </div>
            </div>
        </section>
    );
}