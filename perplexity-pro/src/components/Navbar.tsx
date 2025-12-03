"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

interface NavbarProps {
    onPreOrder: () => void;
}

export default function Navbar({ onPreOrder }: NavbarProps) {
    const { count } = useCart();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    {/* Using SVG/PNG logo directly */}
                    <img src="/perplexity-icon.svg" alt="Logo" className={styles.logoIcon} />
                    <span>PERPLEXITY <span style={{ color: "var(--primary)" }}>PRO</span></span>
                </div>

                <div className={styles.menu}>
                    <Link href="#features" className={styles.menuLink}>ویژگی‌ها</Link>
                    <Link href="#demo" className={styles.menuLink}>دموی زنده</Link>
                    <Link href="#pricing" className={styles.menuLink}>قیمت‌ها</Link>
                    <Link href="#faq" className={styles.menuLink}>سوالات متداول</Link>
                </div>

                <div className={styles.actions}>
                    <Link href="/cart" className={styles.cartButton}>
                        <ShoppingCart size={20} />
                        {count > 0 && <span className={styles.cartBadge}>{count}</span>}
                    </Link>
                    <button onClick={onPreOrder} className={styles.ctaButton}>
                        خرید اشتراک
                    </button>
                </div>
            </div>
        </nav>
    );
}