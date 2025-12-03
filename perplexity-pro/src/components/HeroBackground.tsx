"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import styles from "./HeroBackground.module.css";

export default function HeroBackground() {
    const containerRef = useRef(null);
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch("/perplexity-logo.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data));
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax and rotation effects
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Floating elements movement
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

    return (
        <div className={styles.background} ref={containerRef}>
            <div className={styles.gradient} />

            {/* Central Animated Logo */}
            <motion.div
                className={styles.logoContainer}
                style={{ rotate, scale, y }}
            >
                <img
                    src="/perplexity-icon.svg"
                    alt="Background Pattern"
                    className={styles.bgLogo}
                />
            </motion.div>

            {/* Floating Particles/Elements */}
            <motion.div style={{ y: y1 }} className={`${styles.particle} ${styles.p1}`} />
            <motion.div style={{ y: y2 }} className={`${styles.particle} ${styles.p2}`} />
            <motion.div style={{ y: y3 }} className={`${styles.particle} ${styles.p3}`} />

            <div className={styles.grid} />
        </div>
    );
}
