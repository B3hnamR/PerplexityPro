"use client";

import { Check, Zap, Brain, Globe, Image as ImageIcon, Shield, Cpu, FileText } from "lucide-react";

const features = [
    {
        icon: Cpu,
        title: "دسترسی به مدل‌های برتر",
        desc: "استفاده نامحدود از GPT-5, Claude 3 Opus و مدل‌های اختصاصی Perplexity.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        icon: Globe,
        title: "جستجوی حرفه‌ای (Copilot)",
        desc: "با بیش از ۳۰۰ جستجو در روز، دقیق‌ترین پاسخ‌ها را از اینترنت بگیرید.",
        color: "from-emerald-500 to-teal-400"
    },
    {
        icon: FileText,
        title: "تحلیل فایل‌های نامحدود",
        desc: "آپلود فایل‌های PDF، CSV و تصاویر برای آنالیز عمیق و استخراج داده.",
        color: "from-orange-500 to-amber-400"
    },
    {
        icon: ImageIcon,
        title: "تولید تصویر پیشرفته",
        desc: "ساخت تصاویر با کیفیت بالا با استفاده از مدل‌های DALL-E 3 و Stable Diffusion.",
        color: "from-pink-500 to-rose-400"
    },
    {
        icon: Brain,
        title: "هوش مصنوعی همیشه به‌روز",
        desc: "دسترسی به اطلاعات زنده وب بدون محدودیت زمانی مدل‌های قدیمی.",
        color: "from-purple-500 to-indigo-400"
    },
    {
        icon: Shield,
        title: "حریم خصوصی تضمین شده",
        desc: "اطلاعات شما برای آموزش مدل‌ها استفاده نمی‌شود و کاملاً محفوظ است.",
        color: "from-gray-400 to-slate-300"
    }
];

export default function ProFeatures() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">چرا نسخه پرو؟</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        قدرت واقعی <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">هوش مصنوعی</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        با Perplexity Pro، شما فقط جستجو نمی‌کنید؛ شما با قدرتمندترین ابزارهای جهان فکر می‌کنید، تحلیل می‌کنید و می‌سازید.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx} 
                            className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 hover:from-cyan-500/50 hover:to-blue-600/50 transition-all duration-500"
                        >
                            {/* Card Body */}
                            <div className="relative h-full bg-[#0f172a] rounded-[1.9rem] p-8 overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
                                {/* Hover Glow */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-[50px] transition-opacity duration-500 rounded-full -mr-10 -mt-10`}></div>
                                
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                                    <div className="w-full h-full bg-[#0f172a] rounded-[0.9rem] flex items-center justify-center">
                                        <feature.icon className="text-white" size={28} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                                    {feature.title}
                                </h3>
                                
                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {feature.desc}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
                                    <Check size={14} className="text-emerald-500" />
                                    شامل در تمام پلن‌ها
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Box */}
                <div className="mt-16 p-1 rounded-[2.5rem] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20">
                    <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right border border-white/5">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">هنوز مطمئن نیستید؟</h3>
                            <p className="text-gray-400 text-sm">
                                همین حالا ثبت‌نام کنید و قدرت جستجوی آینده را تجربه کنید.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-4 space-x-reverse">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-gray-700 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-right">
                                <p className="text-white font-bold text-lg">+۱۰,۰۰۰</p>
                                <p className="text-xs text-cyan-400">کاربر حرفه‌ای</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}