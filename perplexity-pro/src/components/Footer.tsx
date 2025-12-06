"use client";

import Link from "next/link";
import { Brain, Instagram, Send, Shield, CheckCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0b1120] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-right">

                    {/* ستون ۱: درباره ما */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                                <Brain size={20} />
                            </div>
                            <span className="text-xl font-bold text-white">Perplexity Pro</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            دسترسی حرفه‌ای به مدل‌های پیشرفته هوش مصنوعی. تجربه‌ای سریع، امن و قانونی برای کاربران ایرانی.
                        </p>

                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white hover:-translate-y-1 group">
                                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:-translate-y-1 group">
                                <Send size={20} className="group-hover:scale-110 transition-transform relative left-[-1px] top-[1px]" />
                            </a>
                        </div>
                    </div>

                    {/* ستون ۲: دسترسی سریع */}
                    <div>
                        <h4 className="font-bold text-white mb-6">دسترسی سریع</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/#features" className="hover:text-cyan-400 transition-colors">ویژگی‌ها</Link></li>
                            <li><Link href="/#pricing" className="hover:text-cyan-400 transition-colors">قیمت‌ها</Link></li>
                            <li><Link href="/track" className="hover:text-cyan-400 transition-colors">پیگیری سفارش</Link></li>
                            <li><Link href="/#faq" className="hover:text-cyan-400 transition-colors">سوالات متداول</Link></li>
                        </ul>
                    </div>

                    {/* ستون ۳: قوانین و پشتیبانی (✅ لینک‌های جدید) */}
                    <div>
                        <h4 className="font-bold text-white mb-6">قوانین و پشتیبانی</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">تماس با ما</Link></li>
                            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">قوانین و مقررات</Link></li>
                            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">حریم خصوصی</Link></li>
                            {/* لینک بازگشت وجه معمولاً داخل همان قوانین است، اما اگر صفحه جدا دارید این را فعال کنید */}
                            {/* <li><Link href="/refund" className="hover:text-cyan-400 transition-colors">رویه بازگرداندن وجه</Link></li> */}
                        </ul>
                    </div>

                    {/* ستون ۴: نماد اعتماد (✅ محل قرارگیری اینماد) */}
                    <div>
                        <h4 className="font-bold text-white mb-6">مجوزها و امنیت</h4>
                        <div className="space-y-3">
                            {/* محل قرارگیری کد اینماد (بعداً جایگزین کنید) */}
                            <div className="bg-white p-2 rounded-xl w-fit cursor-pointer hover:opacity-90 transition-opacity">
                                {/* فعلاً یک عکس فیک یا متن می‌گذاریم تا چیدمان حفظ شود */}
                                <div className="w-24 h-24 flex flex-col items-center justify-center border-2 border-gray-100 rounded-lg text-gray-400 text-[10px] text-center">
                                    <Shield size={24} className="mb-1 opacity-50" />
                                    محل نماد اعتماد
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#1e293b] p-2 rounded-lg border border-white/5 w-fit">
                                <CheckCircle size={14} className="text-emerald-400" />
                                <span>درگاه پرداخت امن زرین‌پال</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© ۱۴۰۳ تمامی حقوق برای <strong className="text-white">Perplexity Pro</strong> محفوظ است.</p>
                    <p className="text-xs opacity-50">Design & Dev by <span className="text-cyan-500">Behnam R</span></p>
                </div>
            </div>
        </footer>
    );
}