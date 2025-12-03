"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import { Instagram, Send, ShieldCheck, Brain } from "lucide-react";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.brandColumn}>
                        <div className={styles.logoWrapper}>
                            <div style={{ background: 'var(--primary)', borderRadius: '8px', padding: '4px', display: 'flex' }}>
                                <Brain size={24} color="#0f172a" />
                            </div>
                            <span className={styles.brandName}>Perplexity Pro</span>
                        </div>
                        <p className={styles.brandDescription}>
                            دسترسی حرفه‌ای به مدل‌های پیشرفته جستجوی هوشمند. تجربه‌ای سریع، امن و یکپارچه برای کاربران جدی.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialLink}><Send size={20} /></a>
                            <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className={styles.linksColumn}>
                        <h3 className={styles.columnTitle}>لینک‌های مفید</h3>
                        <Link href="#features" className={styles.link}>ویژگی‌ها</Link>
                        <Link href="#testimonials" className={styles.link}>نظرات کاربران</Link>
                        <Link href="#pricing" className={styles.link}>پلن‌ها و قیمت</Link>
                        <Link href="#faq" className={styles.link}>سوالات متداول</Link>
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
                                <ShieldCheck size={24} color="#22d3ee" />
                                <span>نماد اعتماد الکترونیک</span>
                            </div>
                            <div className={styles.trustBadge}>
                                <ShieldCheck size={24} color="#fbbf24" />
                                <span>تضمین پرداخت امن</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>
                        © ۲۰۲۵ تمامی حقوق برای Perplexity Pro محفوظ است.
                    </p>
                    <p className={styles.designedBy}>
                        طراحی شده با ❤️ توسط <strong style={{ color: 'white' }}>بهنام رجب نژاد</strong>
                    </p>
                </div>
            </div>
        </footer>
    );
}