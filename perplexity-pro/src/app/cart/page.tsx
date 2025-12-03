"use client";

import CheckoutModal from "@/components/CheckoutModal";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import {
    ArrowLeft,
    ArrowRight,
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./cart.module.css";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, count } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const formatPrice = (value: number) => value.toLocaleString("fa-IR");

    return (
        <main className={styles.main}>
            <Navbar onPreOrder={() => setIsCheckoutOpen(true)} />

            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.kicker}>پلن حرفه‌ای</p>
                        <h1>سبد خرید شما</h1>
                        <p className={styles.lead}>سبد را یک نگاه مرور کنید و در چند گام کوتاه پرداخت را نهایی کنید؛ همه چیز در تم Perplexity Pro با پرداخت امن و تحویل فوری.</p>
                    </div>
                    <div className={styles.reassurance}>
                        <span>پرداخت امن و رمزگذاری‌شده</span>
                        <span className={styles.dot} />
                        <span>پشتیبانی ۲۴/۷ و تحویل سریع</span>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIconWrapper}>
                            <ShoppingBag size={64} className={styles.emptyIcon} />
                        </div>
                        <p className={styles.emptyText}>سبد خرید شما خالی است. برای ادامه یک اشتراک را انتخاب کنید.</p>
                        <Link href="/" className={styles.backButton}>
                            <ArrowRight size={20} />
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>
                ) : (
                    <div className={styles.contentWrapper}>
                        {/* Right Column: Cart Items */}
                        <div className={styles.itemsSection}>
                            <div className={styles.sectionHeader}>
                                <h2>جزئیات سفارش</h2>
                                <span className={styles.itemCount}>{formatPrice(count)} مورد</span>
                            </div>

                            <div className={styles.itemsList}>
                                {items.map((item) => (
                                    <div key={item.id} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            <img src="/perplexity-icon.svg" alt="Product" />
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <h3>{item.name}</h3>
                                            <p className={styles.itemMeta}>اشتراک حرفه‌ای با دسترسی کامل</p>
                                            <div className={styles.itemPriceMobile}>
                                                {formatPrice(item.price)} تومان
                                            </div>
                                        </div>

                                        <div className={styles.quantityControl}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className={styles.qtyBtn}
                                            >
                                                <Plus size={14} />
                                            </button>
                                            <span className={styles.qtyValue}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className={styles.qtyBtn}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                        </div>

                                        <div className={styles.itemPrice}>
                                            {formatPrice(item.price * item.quantity)} تومان
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className={styles.deleteButton}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Left Column: Summary */}
                        <div className={styles.summarySection}>
                            <div className={styles.summaryCard}>
                                <div className={styles.couponSection}>
                                    <input type="text" placeholder="کد تخفیف دارید؟" className={styles.couponInput} />
                                    <button className={styles.couponButton}>اعمال</button>
                                </div>

                                <div className={styles.summaryRows}>
                                    <div className={styles.summaryRow}>
                                        <span>قیمت کالاها ({formatPrice(count)}):</span>
                                        <span>{formatPrice(total)} تومان</span>
                                    </div>
                                    <div className={`${styles.summaryRow} ${styles.discount}`}>
                                        <span>تخفیف:</span>
                                        <span>۰ تومان</span>
                                    </div>
                                    <div className={styles.divider} />
                                    <div className={`${styles.summaryRow} ${styles.total}`}>
                                        <span>جمع نهایی:</span>
                                        <span>{formatPrice(total)} تومان</span>
                                    </div>
                                </div>

                                <p className={styles.note}>
                                    پرداخت شما در بستر امن انجام می‌شود و لینک دسترسی بلافاصله بعد از تکمیل پرداخت فعال خواهد شد.
                                </p>

                                <button
                                    className={styles.checkoutButton}
                                    onClick={() => setIsCheckoutOpen(true)}
                                >
                                    ادامه ثبت سفارش <ArrowLeft size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} isCartCheckout={true} />
        </main>
    );
}

