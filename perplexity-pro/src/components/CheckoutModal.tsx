"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import styles from "./CheckoutModal.module.css";
import { X, Lock, CheckCircle, Plus, Minus } from "lucide-react";
import axios from "axios";
import { useCart } from "@/context/CartContext";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    isCartCheckout?: boolean;
}

interface CustomField {
    id: string;
    label: string;
    name: string;
    type: string;
    required: boolean;
    options: string | null;
}

export default function CheckoutModal({ isOpen, onClose, isCartCheckout = false }: CheckoutModalProps) {
    const [loading, setLoading] = useState(false);
    const [customFields, setCustomFields] = useState<CustomField[]>([]);
    const [product, setProduct] = useState({ name: "اشتراک Perplexity Pro", price: 299000 });
    const { addItem, items } = useCart();
    const [quantity, setQuantity] = useState(1);

    const [formData, setFormData] = useState({
        email: "",
        mobile: "",
        customData: {} as Record<string, any>,
    });

    useEffect(() => {
        if (isOpen) {
            axios.get("/api/admin/fields").then((res) => {
                setCustomFields(res.data);
            });
            axios.get("/api/admin/product").then((res) => {
                if (res.data) {
                    setProduct(res.data);
                }
            });

            // همگام‌سازی تعداد با سبد خرید
            const cartQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            if (cartQuantity > 0) {
                setQuantity(cartQuantity);
            }
        }
    }, [isOpen, items]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "email" || name === "mobile") {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev) => ({
                ...prev,
                customData: { ...prev.customData, [name]: value },
            }));
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/payment/request", {
                amount: product.price * quantity,
                description: `خرید ${quantity} عدد ${product.name}`,
                email: formData.email,
                mobile: formData.mobile,
                customData: formData.customData,
                quantity: quantity,
            });

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error("Payment failed", error);
            alert("پرداخت با خطا مواجه شد، لطفاً دوباره تلاش کنید.");
        } finally {
            setLoading(false);
        }
    };

    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: "perplexity-pro-1year",
            name: product.name,
            price: product.price,
            quantity: quantity,
        });
        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
            onClose();
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modal}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className={styles.content}>
                            <div className={styles.productSummary}>
                                <div className={styles.summaryTop}>
                                    <h3>{product.name}</h3>
                                    <span className={styles.priceBadge}>{(product.price * quantity).toLocaleString("fa-IR")} تومان</span>
                                </div>
                                <p className={styles.subtext}>تحویل دیجیتال فوری و پشتیبانی ۲۴/۷</p>

                                <div className={styles.quantityControl}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={styles.qtyBtn}>
                                        <Minus size={16} />
                                    </button>
                                    <span className={styles.qtyValue}>{quantity} عدد</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className={styles.qtyBtn}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.formSection}>
                                <div className={styles.formHeader}>
                                    <h2>اطلاعات خریدار</h2>
                                    <span className={styles.badge}>ایمن SSL</span>
                                </div>

                                <div className={styles.inputGrid}>
                                    <div className={styles.inputGroup}>
                                        <label>ایمیل</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="shoma@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>شماره موبایل</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            placeholder="09123456789"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {customFields.map((field) => (
                                    <div key={field.id} className={styles.inputGroup}>
                                        <label>{field.label}</label>
                                        {field.type === "select" && field.options ? (
                                            <select
                                                name={field.name}
                                                required={field.required}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">یک گزینه را انتخاب کنید...</option>
                                                {JSON.parse(field.options).map((opt: string) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        ) : field.type === "textarea" ? (
                                            <textarea
                                                name={field.name}
                                                required={field.required}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required={field.required}
                                                onChange={handleInputChange}
                                            />
                                        )}
                                    </div>
                                ))}

                                <div className={styles.actionButtons}>
                                    {!isCartCheckout && (
                                        <Button
                                            size="lg"
                                            className={styles.addToCartButton}
                                            onClick={handleAddToCart}
                                            disabled={loading || addedToCart}
                                        >
                                            {addedToCart ? (
                                                <>
                                                    <CheckCircle size={18} /> به سبد اضافه شد
                                                </>
                                            ) : (
                                                "افزودن به سبد"
                                            )}
                                        </Button>
                                    )}
                                    <Button
                                        size="lg"
                                        className={styles.payButton}
                                        onClick={handlePayment}
                                        disabled={loading}
                                    >
                                        {loading ? "در حال پردازش..." : "پرداخت و ادامه"} <Lock size={18} />
                                    </Button>
                                </div>

                                <p className={styles.secureNote}>
                                    <Lock size={12} /> پرداخت شما روی بستر امن و رمزنگاری‌شده انجام می‌شود.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
