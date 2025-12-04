"use client";

import { useEffect, useState } from "react";
import { X, Lock, CheckCircle, ArrowLeft, CreditCard, Mail, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    isCartCheckout?: boolean;
}

export default function CheckoutModal({ isOpen, onClose, isCartCheckout = false }: CheckoutModalProps) {
    const [loading, setLoading] = useState(false);
    const { total } = useCart();
    const [formData, setFormData] = useState({ mobile: "", email: "" });

    useEffect(() => {
        if (isOpen) {
            setLoading(false);
            setFormData({ mobile: "", email: "" });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePayment = async () => {
        // اعتبارسنجی ساده
        if (!formData.mobile || formData.mobile.length < 10) {
            alert("لطفاً شماره موبایل معتبر وارد کنید");
            return;
        }

        setLoading(true);
        try {
            // ارسال درخواست به API سمت سرور
            const response = await fetch("/api/payment/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: isCartCheckout ? total : 398000,
                    mobile: formData.mobile,
                    email: formData.email,
                    description: "خرید اشتراک Perplexity Pro",
                }),
            });

            const data = await response.json();

            if (data.url) {
                // هدایت به درگاه پرداخت (سندباکس یا اصلی)
                window.location.href = data.url;
            } else {
                alert(data.error || "خطا در ایجاد تراکنش");
                setLoading(false);
            }
        } catch (error) {
            console.error("Payment Request Failed", error);
            alert("خطا در برقراری ارتباط با سرور");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-lg bg-[#1e293b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0f172a]/50">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Lock className="text-cyan-400" size={18} />
                        تکمیل خرید
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div className="text-center">
                        <p className="text-gray-400 mb-2">مبلغ قابل پرداخت</p>
                        <div className="text-4xl font-black text-white tracking-tight">
                            {isCartCheckout ? total.toLocaleString("fa-IR") : "۳۹۸,۰۰۰"} 
                            <span className="text-lg font-medium text-gray-500 mr-2">تومان</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative group">
                            <label className="text-xs text-gray-400 mb-1 block">شماره موبایل (الزامی)</label>
                            <input 
                                type="tel" 
                                value={formData.mobile}
                                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                placeholder="0912..." 
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-cyan-500 transition-all text-left dir-ltr"
                            />
                            <Phone className="absolute left-3 top-8 text-gray-500" size={18} />
                        </div>

                        <div className="relative group">
                            <label className="text-xs text-gray-400 mb-1 block">ایمیل (اختیاری - جهت ارسال لایسنس)</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="name@example.com" 
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-cyan-500 transition-all text-left dir-ltr"
                            />
                            <Mail className="absolute left-3 top-8 text-gray-500" size={18} />
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                در حال انتقال به درگاه...
                            </>
                        ) : (
                            <>
                                پرداخت و دریافت آنی <ArrowLeft size={20} />
                            </>
                        )}
                    </button>
                </div>

                <div className="p-4 bg-[#0f172a]/80 text-center text-xs text-gray-500 border-t border-white/5">
                    <p className="flex items-center justify-center gap-1">
                        <CheckCircle size={12} className="text-emerald-500" />
                        درگاه پرداخت امن زرین‌پال (Sandbox فعال است)
                    </p>
                </div>
            </div>
        </div>
    );
}