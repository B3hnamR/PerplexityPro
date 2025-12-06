"use client";

import { 
    Search, Cpu, FileText, Image as ImageIcon, 
    Code2, Users, ShieldCheck, Sparkles 
} from "lucide-react";

const specifications = [
    {
        category: "جستجو و تحقیق (Core Research)",
        icon: Search,
        features: [
            {
                title: "Pro Search نامحدود",
                desc: "انجام بیش از ۳۰۰ بار جستجوی پیشرفته در روز با استدلال چندمرحله‌ای برای رسیدن به دقیق‌ترین پاسخ."
            },
            {
                title: "Deep Research",
                desc: "تحقیقات خودکار و عمیق که صدها منبع را بررسی می‌کند و یک گزارش جامع تولید می‌کند (بدون محدودیت)."
            },
            {
                title: "استنادات ۱۰ برابری",
                desc: "پاسخ‌های تولید شده دارای ۱۰ برابر منبع و رفرنس بیشتر نسبت به نسخه رایگان هستند تا شفافیت اطلاعات تضمین شود."
            },
            {
                title: "حالت‌های جستجو",
                desc: "دسترسی به ۴ موتور جستجوی تخصصی: Writing (تولید متن)، Academic (مقالات علمی)، YouTube و Reddit."
            }
        ]
    },
    {
        category: "مدل‌های هوش مصنوعی (AI Models)",
        icon: Cpu,
        features: [
            {
                title: "GPT-5.1 (OpenAI)",
                desc: "جدیدترین و قدرتمندترین مدل OpenAI با قابلیت استدلال فوق‌العاده و کدنویسی پیشرفته."
            },
            {
                title: "Claude 3.5 Sonnet",
                desc: "مدل قدرتمند Anthropic با پنجره متنی بزرگ (Context Window) برای تحلیل اسناد طولانی."
            },
            {
                title: "Gemini 3 Pro",
                desc: "مدل پیشرفته گوگل با سرعت پردازش بالا و درک چندوجهی (Multimodal)."
            },
            {
                title: "Sonar (Perplexity)",
                desc: "مدل اختصاصی بهینه‌شده برای جستجوی زنده وب، مبتنی بر Llama 3.1 70B."
            }
        ]
    },
    {
        category: "تحلیل داده و فایل (Data Analysis)",
        icon: FileText,
        features: [
            {
                title: "آپلود نامحدود فایل",
                desc: "هیچ محدودیتی در تعداد فایل‌های آپلود شده وجود ندارد (PDF, CSV, Code, Images)."
            },
            {
                title: "رونویسی (Transcription)",
                desc: "تبدیل خودکار محتوای فایل‌های صوتی و ویدیویی آپلود شده به متن قابل جستجو و خلاصه."
            },
            {
                title: "تحلیل دسته‌ای",
                desc: "امکان آپلود همزمان تا ۱۰ فایل در هر درخواست برای مقایسه و تحلیل ترکیبی."
            }
        ]
    },
    {
        category: "تولید تصویر (Visual AI)",
        icon: ImageIcon,
        features: [
            {
                title: "DALL-E 3",
                desc: "پیشرفته‌ترین مدل تولید تصویر OpenAI با درک دقیق دستورات متنی پیچیده."
            },
            {
                title: "Stable Diffusion XL",
                desc: "تولید تصاویر هنری و فوتورئالیستیک با جزئیات و کیفیت خیره‌کننده."
            },
            {
                title: "Playground v3",
                desc: "مدل اختصاصی برای تولید گرافیک‌های وکتور، لوگو و طرح‌های فانتزی."
            },
            {
                title: "ویرایش تصویر",
                desc: "امکان اصلاح و تغییر بخش‌هایی از تصویر تولید شده بدون ساخت مجدد."
            }
        ]
    },
    {
        category: "ابزار توسعه (Developer)",
        icon: Code2,
        features: [
            {
                title: "اعتبار API رایگان",
                desc: "دریافت ماهانه ۵ دلار اعتبار برای استفاده از pplx-api در پروژه‌های شخصی."
            },
            {
                title: "Perplexity Labs",
                desc: "دسترسی به محیط سندباکس برای اجرای مدل‌های Open Source و تست کدها."
            }
        ]
    },
    {
        category: "امکانات ویژه (Perks)",
        icon: Users,
        features: [
            {
                title: "Spaces پیشرفته",
                desc: "فضاهای کاری اختصاصی با قابلیت تعریف دستورالعمل‌های خاص (Custom Instructions) برای هر پروژه."
            },
            {
                title: "تسک‌های خودکار",
                desc: "قابلیت تعریف Scheduled Tasks برای جستجوی روزانه یک موضوع و ارسال گزارش."
            },
            {
                title: "تخفیف‌های شرکای تجاری",
                desc: "دسترسی به کدهای تخفیف سرویس‌هایی مثل Uber, Notion و نرم‌افزارهای دیگر."
            }
        ]
    }
];

export default function FullSpecsSection() {
    return (
        <section className="py-20 relative bg-[#0b1120]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-4 border border-cyan-500/20">
                        <Sparkles size={14} />
                        مشخصات فنی کامل
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white">
                        همه ابزارها در <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">یک اشتراک</span>
                    </h2>
                    <p className="text-gray-400 mt-4 text-sm md:text-base">
                        برای مشاهده جزئیات دقیق هر قابلیت، نشانگر موس را روی آن نگه دارید.
                    </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {specifications.map((spec, idx) => (
                        <div key={idx} className="space-y-6">
                            
                            {/* Category Header */}
                            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                                <div className="w-10 h-10 rounded-xl bg-[#1e293b] border border-white/10 flex items-center justify-center text-cyan-400 shadow-lg">
                                    <spec.icon size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white">{spec.category}</h3>
                            </div>

                            {/* Features List */}
                            <div className="flex flex-wrap gap-3">
                                {spec.features.map((item, i) => (
                                    <div key={i} className="group relative">
                                        
                                        {/* Trigger Button */}
                                        <div className="px-4 py-2.5 rounded-xl bg-[#1e293b] border border-white/5 text-gray-300 text-sm font-medium cursor-help hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300">
                                            {item.title}
                                        </div>

                                        {/* Tooltip Popup */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
                                            {/* Tooltip Arrow */}
                                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0f172a]/95 border-b border-r border-white/10 rotate-45"></div>
                                            
                                            {/* Content */}
                                            <div className="relative z-10">
                                                <h4 className="text-cyan-400 font-bold text-xs mb-2 uppercase tracking-wider">{item.title}</h4>
                                                <p className="text-gray-300 text-xs leading-relaxed text-right">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}