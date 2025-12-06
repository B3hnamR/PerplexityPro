"use client";

import { Check, Server, Globe, FileText, Code, Image as ImageIcon, Shield, Zap } from "lucide-react";

const specs = [
    {
        category: "مدل‌های زبانی (LLMs)",
        icon: Server,
        items: [
            "GPT-5.1 (OpenAI)",
            "Claude 3.5 Sonnet & Opus (Anthropic)",
            "Sonar Deep Research (اختصاصی Perplexity)",
            "Gemini 3 Pro (Google)",
            "Grok 4 (xAI)"
        ]
    },
    {
        category: "قابلیت‌های جستجو",
        icon: Globe,
        items: [
            "بیش از ۳۰۰ جستجوی Pro در روز",
            "حالت Deep Research (تحقیق عمیق)",
            "جستجوی زنده در وب با ذکر منبع دقیق",
            "بدون تبلیغات و نتایج اسپانسر شده",
            "تاریخچه جستجوی نامحدود"
        ]
    },
    {
        category: "تحلیل فایل و داده",
        icon: FileText,
        items: [
            "آپلود نامحدود فایل (PDF, CSV, Docx)",
            "آنالیز تصاویر و استخراج متن",
            "خلاصه‌سازی اسناد طولانی",
            "تحلیل داده‌های مالی و کدنویسی",
            "فضای ابری شخصی برای فایل‌ها"
        ]
    },
    {
        category: "تولید تصویر و مدیا",
        icon: ImageIcon,
        items: [
            "DALL-E 3",
            "Stable Diffusion XL",
            "Playground v3",
            "ویرایش و اصلاح تصاویر تولید شده",
            "تولید روزانه ۵۰ تصویر با کیفیت بالا"
        ]
    },
    {
        category: "دسترسی توسعه‌دهندگان",
        icon: Code,
        items: [
            "شامل ۵ دلار اعتبار ماهانه API",
            "دسترسی به pplx-api",
            "پشتیبانی از مدل‌های Open Source",
            "تأخیر بسیار پایین (Low Latency)",
            "پشتیبانی از JSON Mode"
        ]
    },
    {
        category: "امکانات ویژه",
        icon: Zap,
        items: [
            "دسترسی به نسخه موبایل (iOS & Android)",
            "افزونه اختصاصی کروم (Chrome Extension)",
            "پشتیبانی اولویت‌دار (Priority Support)",
            "دسترسی به کانال Discord مخصوص Pro",
            "حریم خصوصی تضمین شده (بدون آموزش روی داده‌ها)"
        ]
    }
];

export default function DetailedFeatures() {
    return (
        <section className="py-20 bg-[#0f172a] relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                    {/* Decorative Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                    
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">مشخصات فنی سرویس</h2>
                            <p className="text-gray-400">لیست کامل قابلیت‌هایی که با اشتراک Pro فعال می‌شوند</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {specs.map((spec, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                            <spec.icon size={20} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{spec.category}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {spec.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                                                <Check size={16} className="text-emerald-500 mt-1 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-[#0f172a]/50 p-6 text-center border-t border-white/5">
                        <p className="text-xs text-gray-500">
                            * تمام مدل‌ها و قابلیت‌ها بلافاصله پس از فعال‌سازی اشتراک در دسترس خواهند بود.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}