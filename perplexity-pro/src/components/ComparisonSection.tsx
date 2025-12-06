"use client";

import { Check, X, Zap, Brain, FileText, Image as ImageIcon, Shield, Lock, AlertCircle } from "lucide-react";

const comparisonData = [
    {
        feature: "مدل‌های هوش مصنوعی",
        free: "مدل استاندارد (سریع)",
        pro: "GPT-5, Claude 3 Opus, Gemini Pro",
        icon: Brain,
        highlight: true // این ویژگی مهم است
    },
    {
        feature: "جستجوی حرفه‌ای (Copilot)",
        free: "محدود به ۵ بار در روز",
        pro: "نامحدود (۳۰۰+ در روز)",
        icon: Zap,
        highlight: true
    },
    {
        feature: "آپلود و تحلیل فایل",
        free: "۳ فایل در روز",
        pro: "آپلود نامحدود (PDF, CSV, Img)",
        icon: FileText,
        highlight: false
    },
    {
        feature: "تولید تصویر",
        free: "غیرفعال ❌",
        pro: "DALL-E 3, Stable Diffusion",
        icon: ImageIcon,
        highlight: false
    },
    {
        feature: "حریم خصوصی",
        free: "استاندارد",
        pro: "عدم استفاده از داده‌ها برای آموزش",
        icon: Shield,
        highlight: false
    },
    {
        feature: "اعتبار API",
        free: "ندارد",
        pro: "۵ دلار اعتبار ماهانه رایگان",
        icon: Lock,
        highlight: false
    }
];

export default function ComparisonSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        چرا باید به <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pro</span> ارتقا دهید؟
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        تفاوت قدرت یک جستجوگر معمولی با یک دستیار هوشمند تمام‌عیار را ببینید.
                    </p>
                </div>

                {/* Comparison Table Container */}
                <div className="relative">
                    {/* Glass Effect Background */}
                    <div className="absolute inset-0 bg-[#1e293b]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5"></div>
                    
                    <div className="relative grid grid-cols-1 md:grid-cols-3 p-2 md:p-4 gap-4">
                        
                        {/* Column 1: Features Labels (Desktop Only) */}
                        <div className="hidden md:flex flex-col justify-center space-y-8 p-8">
                            {comparisonData.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-gray-300 font-medium h-12">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                                        <item.icon size={20} />
                                    </div>
                                    {item.feature}
                                </div>
                            ))}
                        </div>

                        {/* Column 2: Free Plan */}
                        <div className="bg-[#0f172a]/50 rounded-[2rem] p-8 border border-white/5 flex flex-col relative overflow-hidden group hover:border-white/10 transition-all">
                            <div className="text-center mb-8 pb-8 border-b border-white/5">
                                <h3 className="text-xl font-bold text-gray-400 mb-2">نسخه رایگان</h3>
                                <p className="text-3xl font-black text-white mb-1">۰ <span className="text-sm font-normal text-gray-500">تومان</span></p>
                                <p className="text-xs text-gray-500">مناسب برای جستجوهای ساده</p>
                            </div>
                            
                            <div className="space-y-8">
                                {comparisonData.map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-center md:justify-start h-auto md:h-12 text-center md:text-right gap-2">
                                        <span className="md:hidden text-xs text-gray-500 font-bold mb-1">{item.feature}</span>
                                        {item.free.includes("❌") || item.free.includes("محدود") ? (
                                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500">
                                                {item.free.includes("❌") ? <X size={18} /> : <AlertCircle size={18} />}
                                                <span className="text-sm font-medium">{item.free.replace("❌", "")}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
                                                <Check size={18} />
                                                <span className="text-sm">{item.free}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Pro Plan (Highlighted) */}
                        <div className="bg-gradient-to-b from-cyan-900/20 to-[#0f172a] rounded-[2rem] p-8 border border-cyan-500/30 flex flex-col relative overflow-hidden transform md:-translate-y-4 shadow-2xl shadow-cyan-500/10">
                            {/* Badge */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-cyan-500 text-[#0f172a] text-[10px] font-black px-3 py-1 rounded-b-lg uppercase tracking-widest">
                                پیشنهاد ویژه
                            </div>

                            <div className="text-center mb-8 pb-8 border-b border-white/10">
                                <h3 className="text-xl font-bold text-cyan-400 mb-2 flex items-center justify-center gap-2">
                                    Perplexity Pro <Zap size={18} className="fill-cyan-400" />
                                </h3>
                                <p className="text-3xl font-black text-white mb-1">۳۹۸,۰۰۰ <span className="text-sm font-normal text-gray-400">تومان</span></p>
                                <p className="text-xs text-cyan-200/70">قدرت بی‌نهایت هوش مصنوعی</p>
                            </div>

                            <div className="space-y-8">
                                {comparisonData.map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-center md:justify-start h-auto md:h-12 text-center md:text-right gap-2">
                                        <span className="md:hidden text-xs text-cyan-500/70 font-bold mb-1">{item.feature}</span>
                                        <div className={`flex items-center justify-center md:justify-start gap-2 ${item.highlight ? "text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "text-gray-200"}`}>
                                            <Check size={18} className="text-cyan-400" />
                                            <span className="text-sm">{item.pro}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="mt-10">
                                <a href="#pricing" className="block w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-center shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-[1.02]">
                                    همین الان فعال کن
                                </a>
                                <p className="text-[10px] text-center text-gray-500 mt-3">
                                    تحویل آنی • ضمانت بازگشت وجه
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}