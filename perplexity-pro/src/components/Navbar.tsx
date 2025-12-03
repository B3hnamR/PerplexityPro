"use client";

import { motion } from "framer-motion";
import Button from "./ui/Button";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
    onPreOrder: () => void;
}

export default function Navbar({ onPreOrder }: NavbarProps) {
    const { count } = useCart();

    return (
        <motion.nav
            className={styles.navbar}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <img
                        src="/perplexity-icon.svg"
                        alt="Perplexity Pro"
                        className={styles.logoIcon}
                    />
                </Link>

                <div className={styles.links}>
                    <Link href="#features" className={styles.link}>
                        ویژگی‌ها
                    </Link>
                    <Link href="#testimonials" className={styles.link}>
                        نظرات
                    </Link>
                    <Link href="#contact" className={styles.link}>
                        تماس با ما
                    </Link>
                </div>

                <div className={styles.actions}>
                    <Link href="/cart" className={styles.cartButton}>
                        <ShoppingCart size={24} />
                        {count > 0 && <span className={styles.cartBadge}>{count}</span>}
                    </Link>
                    <Button size="sm" onClick={onPreOrder} className={styles.ctaButton}>
                        همین الان خرید کن
                    </Button>
                </div>
            </div>
        </motion.nav>
    );
}
