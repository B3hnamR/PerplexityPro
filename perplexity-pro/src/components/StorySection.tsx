"use client";

import { 
    Cpu, TrendingUp, Link as LinkIcon, Globe, 
    Image as ImageIcon, Zap, UserCheck, Brain, ArrowRight 
} from "lucide-react";

// تعریف رنگ‌ها برای جلوگیری از مشکل کلاس‌های داینامیک
const colorVariants: Record<string, { text: string; hoverText: string; hoverBorder: string; glow: string }> = {
    cyan: {
        text: "text-cyan-400",
        hoverText: "group-hover:text-cyan-300",
        hoverBorder: "group-hover:border-cyan-500/20",
        glow: "rgba(6,182,212,0.2)"
    },
    emerald: {
        text: "text-emerald-400",
        hoverText: "group-hover:text-emerald-300",
        hoverBorder: "group-hover:border-emerald-500/20",
        glow: "rgba(16,185,129,0.2)"
    },
    indigo: {
        text: "text-indigo-400",
        hoverText: "group-hover:text-indigo-300",
        hoverBorder: "group-hover:border-indigo-500/20",
        glow: "rgba(99,102,241,0.2)"
    },
    blue: {
        text: "text-blue-400",
        hoverText: "group-hover:text-blue-300",
        hoverBorder: "group-hover:border-blue-500/20",
        glow: "rgba(59,130,246,0.2)"
    },
    pink: {
        text: "text-pink-400",
        hoverText: "group-hover:text-pink-300",
        hoverBorder: "group-hover:border-pink-500/20",
        glow: "rgba(236,72,153,0.2)"
    },
    amber: {
        text: "text-amber-400",
        hoverText: "group-hover:text-amber-300",
        hoverBorder: "group-hover:border-amber-500/20",
        glow: "rgba(245,158,11,0.2)"
    },
    purple: {
        text: "text-purple-400",
        hoverText: "group-hover:text-purple-300",
        hoverBorder: "group-hover:border-purple-500/20",
        glow: "rgba(168,85,247,0.2)"
    },
    rose: {
        text: "text-rose-400",
        hoverText: "group-hover:text-rose-300",
        hoverBorder: "group-hover:border-rose-500/20",
        glow: "rgba(244,63,94,0.2)"
    }
};

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    tags: string[];
    className?: string;
    gradientColor: string;
}

const FeatureCard = ({ icon: Icon, title, description, tags, className = "", gradientColor }: FeatureCardProps) => {
    const colors = colorVariants[gradientColor] || colorVariants.cyan;

    return (
        <div className={`group relative p-8 rounded-[2rem] bg-[#1e293b]/40 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden ${className}`}>
            
            {/* Dynamic Background Gradient Blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] transition-all duration-500 opacity-0 group-hover:opacity-100"
                 style={{ backgroundColor: colors.glow }}>
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Icon className={`text-gray-400 group-hover:text-white transition-colors`} size={28} />
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-gray-500">
                         <ArrowRight size={20} />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                    {title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed mb-6 flex-grow text-sm group-hover:text-gray-300 transition-colors">
                    {description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag, idx) => (
                        <span key={idx} className={`px-3 py-1 rounded-lg text-xs font-medium border border-white/5 bg-white/5 text-gray-400 ${colors.hoverBorder} ${colors.hoverText} transition-all`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const features = [
    {
        icon: Cpu,
        title: "دسترسی به بهترین مدل‌ها",
        description: "همزمان به قوی‌ترین مدل‌های دنیا مثل GPT-5 و Claude دسترسی داشته باش.",
        tags: ["Claude Sonnet 4.5", "Gemini 3 Pro", "GPT-5.1"],
        className: "md:col-span-2", 
        gradientColor: "cyan"
    },
    {
        icon: TrendingUp,
        title: "تحلیل‌های مالی",
        description: "دسترسی لحظه‌ای به داده‌های بازار بورس و کریپتو.",
        tags: ["Earnings", "Screener", "Crypto"],
        className: "md:col-span-1",
        gradientColor: "emerald"
    },
    {
        icon: LinkIcon,
        title: "اتصال به ابزارها",
        description: "پرپلکسیتی را به گوگل درایو، نوشن و اسلک وصل کن.",
        tags: ["Notion", "Google Drive", "Slack"],
        className: "md:col-span-2",
        gradientColor: "indigo"
    },
    {
        icon: Globe,
        title: "مرورگر هوشمند",
        description: "جستجوی خودکار و دقیق در وب برای یافتن پاسخ.",
        tags: ["Smart Navigation", "Browse for me"],
        className: "md:col-span-1",
        gradientColor: "blue"
    },
    {
        icon: ImageIcon,
        title: "تصویرسازی حرفه‌ای",
        description: "تبدیل متن به تصویر با کیفیت خیره‌کننده.",
        tags: ["Nano Banana", "FLUX.1"],
        className: "md:col-span-1",
        gradientColor: "pink"
    },
    {
        icon: Zap,
        title: "انجام خودکار کارها",
        description: "کارهای تکراری را به هوش مصنوعی بسپار.",
        tags: ["News Digest", "Market Forecast"],
        className: "md:col-span-1",
        gradientColor: "amber"
    },
    {
        icon: UserCheck,
        title: "دستیار شخصی",
        description: "مدیریت ایمیل‌ها و تنظیم جلسات شما.",
        tags: ["Calendar Sync", "Inbox Zero"],
        className: "md:col-span-1",
        gradientColor: "purple"
    },
    {
        icon: Brain,
        title: "حافظه و شخصی‌سازی",
        description: "یادگیری علایق شما برای پاسخ‌های دقیق‌تر.",
        tags: ["Memory", "Personalized"],
        className: "md:col-span-2", 
        gradientColor: "rose"
    }
];

export default function StorySection() {
    return (
        <section id="features" className="py-24 relative bg-[#0b1120]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-white mb-4">قدرت بی‌پایان در <span className="text-cyan-400">دستان شما</span></h2>
                    <p className="text-xl text-gray-400">مجموعه‌ای از پیشرفته‌ترین ابزارهای هوش مصنوعی، یکجا در Perplexity Pro</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}