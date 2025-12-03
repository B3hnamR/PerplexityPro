"use client";

import { useEffect, useState } from "react";
import { X, Lock, CheckCircle, ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    isCartCheckout?: boolean;
}

export default function CheckoutModal({ isOpen, onClose, isCartCheckout = false }: CheckoutModalProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const { total, clearCart } = useCart();
    const router = useRouter();

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePayment = async () => {
        setLoading(true);
        try {
            // شبیه‌سازی درخواست پرداخت
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // در سناریوی واقعی اینجا به درگاه بانک ریدایرکت می‌شوید
            // فعلاً فرض می‌کنیم پرداخت موفق بوده:
            clearCart();
            router.push('/payment/success');
            onClose();
        } catch (error) {
            console.error("Payment failed", error);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-[#1e293b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0f172a]/50">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Lock className="text-cyan-400" size={18} />
                        تکمیل خرید
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-gray-400 mb-2">مبلغ قابل پرداخت</p>
                                <div className="text-4xl font-black text-white tracking-tight">
                                    {isCartCheckout ? total.toLocaleString("fa-IR") : "۳۹۸,۰۰۰"} 
                                    <span className="text-lg font-medium text-gray-500 mr-2">تومان</span>
                                </div>
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-blue-400">
                                    <CreditCard size={20} />
                                </div>
                                <div className="text-sm">
                                    <p className="text-white font-bold mb-1">درگاه پرداخت امن زرین‌پال</p>
                                    <p className="text-blue-200/80 leading-relaxed text-xs">
                                        اطلاعات کارت شما در بستری امن پردازش می‌شود.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm text-gray-400 mb-1">شماره موبایل (برای دریافت لایسنس)</label>
                                <input 
                                    type="tel" 
                                    placeholder="0912..." 
                                    className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-left dir-ltr"
                                />
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        در حال انتقال...
                                    </>
                                ) : (
                                    <>
                                        پرداخت و فعال‌سازی آنی <ArrowLeft size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-[#0f172a]/80 text-center text-xs text-gray-500 border-t border-white/5">
                    <p className="flex items-center justify-center gap-1">
                        <CheckCircle size={12} className="text-emerald-500" />
                        گارانتی بازگشت وجه تا ۷ روز
                    </p>
                </div>
            </div>
        </div>
    );
}