"use client";

import { 
    Search, Cpu, FileText, Image as ImageIcon, 
    Code2, Users, Sparkles, Link2, Database 
} from "lucide-react";

const specifications = [
    {
        category: "مدل‌های هوش مصنوعی (AI Models)",
        icon: Cpu,
        features: [
            {
                title: "GPT-4o (OpenAI)",
                desc: "جدیدترین مدل پرچمدار OpenAI با سرعت بالا و قابلیت‌های چندوجهی پیشرفته."
            },
            {
                title: "Claude 3.5 Sonnet",
                desc: "مدل قدرتمند آنتروپیک با پنجره متنی بزرگ، ایده‌آل برای تحلیل متون طولانی و کدنویسی."
            },
            {
                title: "Sonar Huge (Llama 3.1 405B)",
                desc: "قدرتمندترین مدل متن‌باز جهان، بهینه شده توسط Perplexity برای جستجوی دقیق."
            },
            {
                title: "Sonar Large (Llama 3.1 70B)",
                desc: "نسخه سریع و کارآمد مدل Sonar برای پاسخ‌های بلادرنگ و دقیق."
            }
        ]
    },
    {
        category: "تولید تصویر (Image Generation)",
        icon: ImageIcon,
        features: [
            {
                title: "Playground v3",
                desc: "موتور قدرتمند برای طراحی‌های گرافیکی، لوگو و تصاویر هنری با استایل‌های خاص."
            },
            {
                title: "DALL-E 3",
                desc: "بهترین مدل برای درک دقیق پرامپت‌ها و تبدیل متن به تصویر با جزئیات بالا."
            },
            {
                title: "Stable Diffusion XL",
                desc: "تولید تصاویر فوتورئالیستیک و واقعی با کنترل بالا روی جزئیات."
            },
            {
                title: "FLUX.1",
                desc: "مدل نسل جدید با کیفیت خارق‌العاده در تولید تصاویر وکتور و سینمایی."
            }
        ]
    },
    {
        category: "کانکتورها و منابع (Connectors)",
        icon: Link2,
        features: [
            {
                title: "Yelp & Maps",
                desc: "دسترسی به داده‌های مکانی، نظرات رستوران‌ها و کسب‌وکارهای محلی."
            },
            {
                title: "Wolfram|Alpha",
                desc: "موتور محاسباتی دانش برای حل مسائل ریاضی، فیزیک و داده‌های آماری."
            },
            {
                title: "LinkedIn & Jobs",
                desc: "جستجو در پروفایل‌های حرفه‌ای، آگهی‌های شغلی و اطلاعات شرکت‌ها."
            },
            {
                title: "Financial Data",
                desc: "دسترسی به داده‌های لحظه‌ای بازار بورس، ارزهای دیجیتال و تحلیل‌های مالی (Crunchbase)."
            }
        ]
    },
    {
        category: "قابلیت‌های جستجو (Core Search)",
        icon: Search,
        features: [
            {
                title: "Pro Search نامحدود",
                desc: "جستجوی چندمرحله‌ای و عمیق برای سوالات پیچیده (بیش از ۳۰۰ بار در روز)."
            },
            {
                title: "Deep Research",
                desc: "تحقیق خودکار که صدها منبع را مطالعه کرده و یک گزارش جامع تولید می‌کند."
            },
            {
                title: "استنادات ۱۰ برابری",
                desc: "نمایش منابع بسیار بیشتر برای هر پاسخ جهت تضمین صحت اطلاعات."
            },
            {
                title: "Academic Search",
                desc: "حالت جستجوی اختصاصی در مقالات علمی و ژورنال‌های معتبر."
            }
        ]
    },
    {
        category: "تحلیل داده (Data Analysis)",
        icon: Database,
        features: [
            {
                title: "آپلود نامحدود فایل",
                desc: "امکان آپلود و تحلیل PDF, CSV و تصاویر بدون محدودیت حجمی سخت‌گیرانه."
            },
            {
                title: "تحلیل دسته‌ای",
                desc: "آپلود همزمان چندین فایل برای مقایسه و استخراج داده‌های ترکیبی."
            },
            {
                title: "رونویسی (Transcription)",
                desc: "تبدیل فایل‌های صوتی و تصویری به متن و خلاصه‌سازی محتوای آن‌ها."
            }
        ]
    },
    {
        category: "امکانات توسعه (Developer)",
        icon: Code2,
        features: [
            {
                title: "۵ دلار اعتبار API",
                desc: "اعتبار ماهانه رایگان برای استفاده از مدل‌های Sonar در برنامه‌های شخصی."
            },
            {
                title: "Perplexity Labs",
                desc: "دسترسی به محیط سندباکس برای تست و اجرای مدل‌های متن‌باز."
            }
        ]
    }
];

export default function FullSpecsSection() {
    return (
        <section className="py-24 relative bg-[#0b1120] overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-6 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <Sparkles size={14} />
                        لیست کامل امکانات
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        جعبه‌ابزار نهایی <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">هوش مصنوعی</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        تمام ابزارها، مدل‌ها و قابلیت‌هایی که با اشتراک Pro در اختیار خواهید داشت.
                    </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {specifications.map((spec, idx) => (
                        <div key={idx} className="space-y-6 group">
                            
                            {/* Category Header */}
                            <div className="flex items-center gap-4 pb-4 border-b border-white/10 group-hover:border-cyan-500/30 transition-colors">
                                <div className="w-12 h-12 rounded-2xl bg-[#1e293b] border border-white/10 flex items-center justify-center text-cyan-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <spec.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">{spec.category}</h3>
                            </div>

                            {/* Features List with Hover Effect */}
                            <div className="flex flex-wrap gap-3">
                                {spec.features.map((item, i) => (
                                    <div key={i} className="relative group/item w-full">
                                        
                                        {/* Trigger Area */}
                                        <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#1e293b]/50 border border-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 cursor-help transition-all duration-300">
                                            <span className="text-gray-300 text-sm font-medium group-hover/item:text-white">{item.title}</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover/item:bg-cyan-400"></div>
                                        </div>

                                        {/* Tooltip Popup (Now more robust) */}
                                        <div className="absolute bottom-full left-0 w-full mb-2 p-4 bg-[#0f172a] border border-cyan-500/30 rounded-xl shadow-2xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible translate-y-2 group-hover/item:translate-y-0 transition-all duration-200 z-50 pointer-events-none">
                                            <p className="text-cyan-400 text-xs font-bold mb-1 uppercase tracking-wider">{item.title}</p>
                                            <p className="text-gray-300 text-xs leading-relaxed text-right">
                                                {item.desc}
                                            </p>
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