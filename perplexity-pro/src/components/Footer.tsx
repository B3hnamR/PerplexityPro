"use client";

import Link from "next/link";
import { Brain, Instagram, Send, Shield } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0b1120] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-right">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                                <Brain size={20} />
                            </div>
                            <span className="text-xl font-bold text-white">Perplexity Pro</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            دسترسی حرفه‌ای به مدل‌های پیشرفته جستجوی هوشمند. تجربه‌ای سریع، امن و یکپارچه برای کاربران جدی.
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(216,27,96,0.4)] group">
                                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] group">
                                <Send size={20} className="group-hover:scale-110 transition-transform relative left-[-1px] top-[1px]" />
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-white mb-6">لینک‌های مفید</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="#features" className="hover:text-cyan-400 transition-colors">ویژگی‌ها</Link></li>
                            <li><Link href="#testimonials" className="hover:text-cyan-400 transition-colors">نظرات کاربران</Link></li>
                            <li><Link href="#pricing" className="hover:text-cyan-400 transition-colors">پلن‌ها و قیمت</Link></li>
                            <li><Link href="#faq" className="hover:text-cyan-400 transition-colors">سوالات متداول</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">قوانین و پشتیبانی</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">شرایط استفاده</Link></li>
                            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">حریم خصوصی</Link></li>
                            <li><Link href="/refund" className="hover:text-cyan-400 transition-colors">قوانین بازگشت وجه</Link></li>
                            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">تماس با ما</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">اعتماد و امنیت</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-[#1e293b] p-3 rounded-xl border border-white/5">
                                <Shield className="text-cyan-400" size={20} />
                                <span className="text-gray-400 text-xs">نماد اعتماد الکترونیک</span>
                            </div>
                            <div className="flex items-center gap-3 bg-[#1e293b] p-3 rounded-xl border border-white/5">
                                <Shield className="text-yellow-500" size={20} />
                                <span className="text-gray-400 text-xs">تضمین پرداخت امن</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
                    <p>© ۲۰۲۵ تمامی حقوق برای Perplexity Pro محفوظ است. طراحی شده با ❤️ توسط <strong className="text-white">بهنام رجب نژاد</strong></p>
                </div>
            </div>
        </footer>
    );
}