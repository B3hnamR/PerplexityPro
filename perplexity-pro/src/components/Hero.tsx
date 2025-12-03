"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import HeroBackground from "./HeroBackground";
import { Zap, Sparkles } from "lucide-react";

interface HeroProps {
    onPreOrder: () => void;
}

export default function Hero({ onPreOrder }: HeroProps) {
    return (
        <section className={styles.hero}>
            <HeroBackground />
            
            <div className={styles.content}>
                <motion.div 
                    className={styles.badge}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className={styles.badgeDot}>
                        <span className={styles.badgeDotPing}></span>
                        <span className={styles.badgeDotSolid}></span>
                    </div>
                    <span>نسخه حرفه‌ای در دسترس است</span>
                </motion.div>

                <motion.div 
                    className={styles.logoContainer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.logoGlow}></div>
                    <img 
                        src="/perplexity-pro-logo.png" 
                        alt="Perplexity Pro" 
                        className={styles.logoImage}
                    />
                </motion.div>

                <motion.p 
                    className={styles.description}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    تجربه‌ای فراتر از جستجوی معمولی. با دسترسی همزمان به <span className={styles.highlight}>GPT-5.1</span>، <span className={styles.highlight}>Claude Sonnet 4.5</span> و <span className={styles.highlight}>Gemini 3 Pro</span>، پاسخ‌های دقیق‌تر و تحلیل‌های عمیق‌تری دریافت کنید.
                </motion.p>

                <motion.div 
                    className={styles.actions}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <button onClick={onPreOrder} className={styles.primaryButton}>
                        <Zap size={20} />
                        خرید اشتراک حرفه‌ای
                    </button>
                    <a href="#demo" className={styles.secondaryButton}>
                        <Sparkles size={20} className="text-cyan-400" />
                        تست رایگان
                    </a>
                </motion.div>

                <div className={`${styles.floatingIcons} hidden md:block`}>
                    <div className={styles.floatItem} style={{ left: '0', top: '10px', animationDelay: '0s' }}>Claude Sonnet 4.5</div>
                    <div className={styles.floatItem} style={{ left: '20%', bottom: '0', animationDelay: '3s' }}>GPT-5.1</div>
                    <div className={`${styles.floatItem} ${styles.active}`} style={{ left: '42%', top: '20px', animationDelay: '1.5s' }}>Gemini 3 Pro</div>
                    <div className={styles.floatItem} style={{ right: '22%', bottom: '10px', animationDelay: '4s' }}>Grok 4.1</div>
                    <div className={styles.floatItem} style={{ right: '0', top: '30px', animationDelay: '2s' }}>Kimi K2 Thinking</div>
                </div>
            </div>
        </section>
    );
}