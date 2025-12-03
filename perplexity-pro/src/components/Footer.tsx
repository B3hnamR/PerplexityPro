"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import { Instagram, Send, ShieldCheck } from "lucide-react";

const socialLinks = [
    { href: "https://t.me/", label: "تلگرام", icon: Send },
    { href: "https://instagram.com/", label: "اینستاگرام", icon: Instagram },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.brandColumn}>
                        <div className={styles.logoWrapper}>
                            <img src="/perplexity-icon.svg" alt="Perplexity" className={styles.logoIcon} />
                            <span className={styles.brandName}>Perplexity Pro</span>
                        </div>
                        <p className={styles.brandDescription}>
                            دسترسی حرفه‌ای به مدل‌های پیشرفته جستجوی هوشمند. تجربه‌ای سریع، امن و یکپارچه برای کاربران جدی.
                        </p>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a key={item.href} href={item.href} className={styles.socialLink} target="_blank" rel="noreferrer" aria-label={item.label}>
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.linksColumn}>
                        <h3 className={styles.columnTitle}>لینک‌های مفید</h3>
                        <Link href="#features" className={styles.link}>ویژگی‌ها</Link>
                        <Link href="#testimonials" className={styles.link}>نظرات کاربران</Link>
                        <Link href="#pricing" className={styles.link}>پلن‌ها و قیمت</Link>
                        <Link href="#faq" className={styles.link}>سؤالات متداول</Link>
                    </div>

                    <div className={styles.linksColumn}>
                        <h3 className={styles.columnTitle}>قوانین و پشتیبانی</h3>
                        <Link href="/terms" className={styles.link}>شرایط استفاده</Link>
                        <Link href="/privacy" className={styles.link}>حریم خصوصی</Link>
                        <Link href="/refund" className={styles.link}>قوانین بازگشت وجه</Link>
                        <Link href="/contact" className={styles.link}>تماس با ما</Link>
                    </div>

                    <div className={styles.trustColumn}>
                        <h3 className={styles.columnTitle}>اعتماد و امنیت</h3>
                        <div className={styles.trustSymbols}>
                            <div className={styles.trustBadge}>
                                <ShieldCheck size={32} color="#22d3ee" />
                                <span>نماد اعتماد الکترونیک</span>
                            </div>
                            <div className={styles.trustBadge}>
                                <ShieldCheck size={32} color="#fbbf24" />
                                <span>نماد زرین‌پال</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} تمامی حقوق برای Perplexity Pro محفوظ است.
                    </p>
                    <p className={styles.designedBy}>
                        طراحی شده با ❤️ توسط <span className={styles.designerName}>بهنام رجب نژاد</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
