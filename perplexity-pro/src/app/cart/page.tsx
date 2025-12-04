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
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, count, addItem } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const formatPrice = (value: number) => value.toLocaleString("fa-IR");

    const handlePreOrder = () => {
        if (items.length === 0) {
            addItem({
                id: "perplexity-pro-1year",
                name: "Perplexity Pro Subscription",
                price: 398000
            });
        }
        setIsCheckoutOpen(true);
    };

    return (
        <main className="min-h-screen bg-[#0f172a] text-white pb-20 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
            <Navbar onPreOrder={handlePreOrder} />

            <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-3">
                            پلن حرفه‌ای
                        </span>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">سبد خرید شما</h1>
                        <p className="text-gray-400 max-w-2xl leading-relaxed">
                            سبد را مرور کنید و در چند گام کوتاه پرداخت را نهایی کنید؛ همه چیز با پرداخت امن و تحویل فوری.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-[#1e293b]/50 border border-white/5 px-4 py-3 rounded-xl backdrop-blur-sm">
                        <ShieldCheck className="text-emerald-400" size={20} />
                        <div className="flex flex-col text-xs text-gray-400">
                            <span className="text-gray-300 font-bold">پرداخت امن و تضمینی</span>
                            <span>رمزگذاری شده با SSL ۲۵۶ بیتی</span>
                        </div>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="bg-[#1e293b]/30 border border-white/5 rounded-3xl p-12 text-center max-w-2xl mx-auto animate-fade-in-up">
                        <div className="w-24 h-24 bg-[#1e293b] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-lg">
                            <ShoppingBag size={48} className="text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">سبد خرید شما خالی است</h2>
                        <p className="text-gray-400 mb-8">هنوز هیچ محصولی انتخاب نکرده‌اید.</p>
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all"
                        >
                            <ArrowRight size={20} />
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Right Column: Cart Items */}
                        <div className="lg:col-span-2 space-y-4 animate-fade-in-up">
                            <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                                    <h2 className="text-lg font-bold text-white">جزئیات سفارش</h2>
                                    <span className="bg-white/5 px-3 py-1 rounded-lg text-sm text-gray-400">
                                        {formatPrice(count)} مورد
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0">
                                                <img src="/perplexity-pro-logo.png" alt="Product" className="w-16 h-auto opacity-90" onError={(e) => e.currentTarget.style.display='none'} />
                                            </div>
                                            
                                            <div className="flex-1 text-center sm:text-right w-full">
                                                <h3 className="font-bold text-lg text-white mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-400 mb-3 sm:mb-0">اشتراک حرفه‌ای با دسترسی کامل</p>
                                                <div className="sm:hidden font-bold text-cyan-400 text-lg mt-2">
                                                    {formatPrice(item.price)} تومان
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="flex items-center bg-[#0f172a] rounded-lg border border-white/10 p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                </div>

                                                <div className="hidden sm:block font-bold text-lg text-white min-w-[120px] text-left pl-4">
                                                    {formatPrice(item.price * item.quantity)} <span className="text-sm text-gray-500 font-normal">تومان</span>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="w-10 h-10 flex items-center justify-center text-red-400 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/20 transition-all"
                                                    title="حذف"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Left Column: Summary */}
                        <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                            <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-6 sticky top-24 shadow-xl">
                                <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>قیمت کالاها ({formatPrice(count)})</span>
                                        <span className="text-white font-medium">{formatPrice(total)} تومان</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>تخفیف</span>
                                        <span className="text-red-400">۰ تومان</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-8">
                                    <span className="font-bold text-lg text-white">جمع نهایی</span>
                                    <div className="text-right">
                                        <span className="block text-2xl font-black text-cyan-400">{formatPrice(total)}</span>
                                        <span className="text-xs text-gray-500">تومان</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsCheckoutOpen(true)}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                                >
                                    ادامه ثبت سفارش <ArrowLeft size={20} />
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