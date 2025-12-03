"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Brain } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

interface NavbarProps {
    onPreOrder: () => void;
}

export default function Navbar({ onPreOrder }: NavbarProps) {
    const { count } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logo}>
                    <div className={styles.logoIconBg}>
                        <Brain size={20} className={styles.brainIcon} />
                    </div>
                    <span className={styles.logoText}>
                        PERPLEXITY <span className={styles.logoHighlight}>PRO</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link href="#features" className={styles.navLink}>ویژگی‌ها</Link>
                    <Link href="#demo" className={styles.navLink}>دموی زنده</Link>
                    <Link href="#testimonials" className={styles.navLink}>نظرات</Link>
                    <Link href="#pricing" className={styles.navLink}>قیمت‌ها</Link>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <Link href="/cart" className={styles.cartBtn}>
                        <ShoppingCart size={24} />
                        {count > 0 && <span className={styles.badge}>{count}</span>}
                    </Link>
                    <button onClick={onPreOrder} className={styles.ctaBtn}>
                        همین الان خرید کن
                    </button>
                    
                    {/* Mobile Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className={styles.mobileToggle}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="#features" onClick={() => setIsOpen(false)} className={styles.mobileLink}>ویژگی‌ها</Link>
                    <Link href="#demo" onClick={() => setIsOpen(false)} className={styles.mobileLink}>دموی زنده</Link>
                    <Link href="#pricing" onClick={() => setIsOpen(false)} className={styles.mobileLink}>قیمت‌ها</Link>
                    <button onClick={() => { onPreOrder(); setIsOpen(false); }} className={styles.mobileCta}>
                        همین الان خرید کن
                    </button>
                </div>
            )}
        </nav>
    );
}