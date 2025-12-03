"use client";

import { 
    Cpu, TrendingUp, Link as LinkIcon, Globe, 
    Image as ImageIcon, Zap, UserCheck, Brain, ArrowRight 
} from "lucide-react";

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    tags: string[];
    className?: string;
    gradientColor: string;
}

const FeatureCard = ({ icon: Icon, title, description, tags, className = "", gradientColor }: FeatureCardProps) => (
    <div className={`group relative p-8 rounded-[2rem] bg-[#1e293b]/40 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden ${className}`}>
        
        {/* Dynamic Background Gradient Blob */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] transition-all duration-500 opacity-0 group-hover:opacity-100`}
             style={{ backgroundColor: `var(--${gradientColor}-500, rgba(6,182,212,0.2))` }}>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="text-gray-400 group-hover:text-white transition-colors" size={28} />
                </div>
                
                {/* Subtle arrow that appears on hover */}
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
                    <span key={idx} className="px-3 py-1 rounded-lg text-xs font-medium border border-white/5 bg-white/5 text-gray-400 group-hover:border-white/10 group-hover:text-white transition-all">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const features = [
    {
        icon: Cpu,
        title: "دسترسی به بهترین مدل‌های هوش مصنوعی",
        description: "همزمان به قوی‌ترین مدل‌های دنیا مثل GPT-5 و Claude دسترسی داشته باش. هر وقت خواستی مدل رو عوض کن و قدرت واقعی رو حس کن.",
        tags: ["Claude Sonnet 4.5", "Gemini 3 Pro", "Grok 4.1", "GPT-5.1", "Kimi K2"],
        className: "md:col-span-2", 
        gradientColor: "cyan"
    },
    {
        icon: TrendingUp,
        title: "تحلیل‌های مالی و سرمایه‌گذاری",
        description: "دسترسی لحظه‌ای به داده‌های بازار بورس، کریپتو و تحلیل‌های عمیق مالی. نمودارهای پیشرفته رو ببین و آینده بازار رو پیش‌بینی کن.",
        tags: ["Earnings", "Screener", "Crypto", "Stock Analysis"],
        className: "md:col-span-1",
        gradientColor: "emerald"
    },
    {
        icon: LinkIcon,
        title: "اتصال به همه ابزارهای تو",
        description: "پرپلکسیتی رو به گوگل درایو، نوشن، اسلک و کلی ابزار دیگه وصل کن تا بتونه از توی فایل‌ها و پیام‌هات هم جواب سوالاتت رو پیدا کنه.",
        tags: ["Outlook", "GitHub", "Slack", "Notion", "Google Drive", "Jira"],
        className: "md:col-span-2",
        gradientColor: "indigo"
    },
    {
        icon: Globe,
        title: "مرورگر هوشمند Comet",
        description: "دیگه لازم نیست خودت سرچ کنی. Comet برات می‌گرده، کلیک می‌کنه و جواب رو پیدا می‌کنه. اینترنت‌گردی رو بسپار به ما.",
        tags: ["Smart Navigation", "Auto-Interaction", "Browse for me"],
        className: "md:col-span-1",
        gradientColor: "blue"
    },
    {
        icon: ImageIcon,
        title: "تصویرسازی حرفه‌ای",
        description: "هر چیزی تو ذهنت هست رو به تصویر تبدیل کن. با جدیدترین مدل‌ها، کیفیت و خلاقیت رو به اوج برسون.",
        tags: ["Nano Banana", "GPT Image 1", "Seedream 4.0", "FLUX.1"],
        className: "md:col-span-1",
        gradientColor: "pink"
    },
    {
        icon: Zap,
        title: "انجام خودکار کارها",
        description: "کارهای تکراری رو بسپار به هوش مصنوعی. از اخبار صبحگاهی تا تحلیل بازار، همه چی خودکار انجام میشه.",
        tags: ["News Digest", "Market Forecast", "Tech Insights"],
        className: "md:col-span-1",
        gradientColor: "amber"
    },
    {
        icon: UserCheck,
        title: "دستیار شخصی تو",
        description: "ایمیل‌هات رو مدیریت کن، جلساتت رو تنظیم کن و به کارهات نظم بده. یه دستیار واقعی برای مدیریت زمانت.",
        tags: ["Draft Replies", "Calendar Sync", "Inbox Zero"],
        className: "md:col-span-1",
        gradientColor: "purple"
    },
    {
        icon: Brain,
        title: "حافظه و شخصی‌سازی",
        description: "پرپلکسیتی علایق و نیازت رو یاد می‌گیره تا هر بار جواب‌های دقیق‌تر و بهتری بهت بده. انگار یه دستیار شخصی داری.",
        tags: ["Location Aware", "Memory", "Shopping Avatar"],
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