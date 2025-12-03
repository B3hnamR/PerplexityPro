"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";
import styles from "./Hero.module.css";
import { useRef } from "react";
import HeroBackground from "./HeroBackground";

interface HeroProps {
    onPreOrder: () => void;
}

export default function Hero({ onPreOrder }: HeroProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section className={styles.hero} ref={ref}>
            <HeroBackground />
            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className={styles.textContainer}
                >
                    <motion.div
                        className={styles.badge}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        نسخه حرفه‌ای
                    </motion.div>

                    <motion.div
                        className={styles.logoWrapper}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ y, opacity }}
                    >
                        <img
                            src="/perplexity-icon.svg"
                            alt="Perplexity Icon"
                            className={styles.mainLogo}
                        />
                        <img
                            src="/perplexity-pro-logo.png"
                            alt="Perplexity Pro"
                            className={styles.textLogo}
                        />
                    </motion.div>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        قدرت جستجوی هوشمند با مدل‌های پیشرفته AI. تجربه‌ای فراتر از جستجوی معمولی.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className={styles.actions}
                    >
                        <Button size="lg" onClick={onPreOrder} className={styles.primaryButton}>
                            خرید اشتراک حرفه‌ای
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className={styles.scrollIndicator}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <div className={styles.chevron} />
            </motion.div>
        </section>
    );
}
