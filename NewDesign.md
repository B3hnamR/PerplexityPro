import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Check, 
  Brain, 
  Zap, 
  Globe, 
  Image as ImageIcon, 
  Shield, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Cpu, 
  Layout, 
  MessageSquare,
  Sparkles,
  Loader,
  Search,
  ArrowRight,
  Instagram,
  Send,
  TrendingUp,
  Link,
  UserCheck,
  Calendar
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Navbar Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold transform rotate-45 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <div className="-rotate-45"><Brain size={20} /></div>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-wider">
              PERPLEXITY <span className="text-cyan-400">PRO</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 space-x-reverse text-sm font-medium">
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">ویژگی‌ها</a>
              <a href="#demo" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">دموی زنده</a>
              <a href="#reviews" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">نظرات</a>
              <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">قیمت‌ها</a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <ShoppingCart size={24} />
            </button>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all transform hover:scale-105 active:scale-95">
              همین الان خرید کن
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-right">
            <a href="#features" className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">ویژگی‌ها</a>
            <a href="#demo" className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">دموی زنده</a>
            <a href="#pricing" className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">قیمت‌ها</a>
            <button className="w-full mt-4 bg-cyan-600 text-white px-4 py-3 rounded-xl font-bold">
              همین الان خرید کن
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-12 backdrop-blur-sm animate-fade-in-up">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          نسخه حرفه‌ای در دسترس است
        </div>
        
        {/* --- LOGO IMAGE --- */}
        <div className="flex justify-center items-center mb-12 relative animate-fade-in">
            {/* Glow effect behind the logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-cyan-500/20 blur-[50px] rounded-full"></div>
            
            {/* The Logo Image File */}
            <img 
                src="PerplexityPro-Logo.png" 
                alt="Perplexity Pro" 
                className="relative z-10 w-full max-w-[600px] h-auto object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  // Fallback content if image fails
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = "text-white border border-dashed border-cyan-500 p-4 rounded-xl";
                  fallbackDiv.innerText = "لطفاً فایل PerplexityPro-Logo.png را در پوشه پروژه قرار دهید";
                  e.target.parentElement.appendChild(fallbackDiv);
                }}
            />
        </div>
        
        <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-400 mb-12 leading-relaxed font-light">
          تجربه‌ای فراتر از جستجوی معمولی. با دسترسی همزمان به <span className="text-white font-medium">GPT-5.1</span>، <span className="text-white font-medium">Claude Sonnet 4.5</span> و <span className="text-white font-medium">Gemini 3 Pro</span>، پاسخ‌های دقیق‌تر و تحلیل‌های عمیق‌تری دریافت کنید.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-lg">
            <Zap size={22} />
            خرید اشتراک حرفه‌ای
          </button>
          <a href="#demo" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 text-lg">
            <Sparkles size={22} className="text-cyan-400" />
            تست رایگان
          </a>
        </div>

        {/* Floating Icons Visualization - Updated Models */}
        <div className="mt-24 relative max-w-5xl mx-auto h-24 md:h-32 hidden sm:block">
           <div className="absolute left-0 top-2 animate-float-slow opacity-80 bg-[#1e293b]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs md:text-sm text-gray-300 shadow-lg hover:border-cyan-500/30 transition-colors">Claude Sonnet 4.5</div>
           <div className="absolute left-[18%] bottom-0 animate-float-delayed opacity-80 bg-[#1e293b]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs md:text-sm text-gray-300 shadow-lg hover:border-cyan-500/30 transition-colors">GPT-5.1</div>
           <div className="absolute left-[40%] top-6 animate-float opacity-100 bg-[#1e293b] px-5 py-3 rounded-2xl border border-cyan-500/40 text-sm md:text-base text-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]">Gemini 3 Pro</div>
           <div className="absolute right-[25%] bottom-4 animate-float-slow-reverse opacity-80 bg-[#1e293b]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs md:text-sm text-gray-300 shadow-lg hover:border-cyan-500/30 transition-colors">Grok 4.1</div>
           <div className="absolute right-0 top-8 animate-float-delayed opacity-80 bg-[#1e293b]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs md:text-sm text-gray-300 shadow-lg hover:border-cyan-500/30 transition-colors">Kimi K2 Thinking</div>
        </div>
      </div>
    </div>
  );
};

// --- GEMINI API INTEGRATION ---
const SmartSearchDemo = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult('');
    setError('');

    try {
      const apiKey = ""; 
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: `You are a helpful AI assistant for a Persian website named Perplexity Pro. Answer the following user query concisely and intelligently in Persian language. User Query: ${query}` }] 
          }]
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setResult(text);
      } else {
        throw new Error('No data received');
      }

    } catch (err) {
      console.error(err);
      setError('متاسفانه در برقراری ارتباط با هوش مصنوعی مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-12 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="text-cyan-400 animate-pulse" />
              تجربه قدرت Gemini
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              همین حالا سوال خود را بپرسید و پاسخ هوشمند دریافت کنید.
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثلاً: آینده هوش مصنوعی چگونه خواهد بود؟ یا یک جوک تعریف کن..."
              className="w-full bg-[#0f172a] text-white border border-white/10 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner select-text"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <button 
              type="submit" 
              disabled={loading || !query}
              className="absolute left-2 top-2 bottom-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  <span>تحلیل...</span>
                </>
              ) : (
                <>
                  <Zap size={18} fill="currentColor" />
                  <span>بپرس ✨</span>
                </>
              )}
            </button>
          </form>

          {(result || error) && (
            <div className="bg-[#0f172a]/80 rounded-2xl p-6 border border-white/5 animate-fade-in text-right">
              {error ? (
                <div className="text-red-400 flex items-center gap-2">
                  <Shield size={18} />
                  {error}
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <div className="flex items-center gap-2 mb-3 text-cyan-400 text-sm font-medium">
                    <Brain size={16} />
                    <span>پاسخ هوش مصنوعی:</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap select-text">{result}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Updated Modern Feature Card (Bento Style)
const FeatureCard = ({ icon: Icon, title, description, tags, className, gradientColor }) => (
  <div className={`group relative p-8 rounded-[2rem] bg-[#1e293b]/40 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden ${className}`}>
    
    {/* Dynamic Background Gradient Blob */}
    <div className={`absolute -top-20 -right-20 w-64 h-64 bg-${gradientColor}-500/10 rounded-full blur-[80px] group-hover:bg-${gradientColor}-500/20 transition-all duration-500`}></div>
    
    {/* Content */}
    <div className="relative z-10 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 group-hover:shadow-${gradientColor}-500/20`}>
          <Icon className={`text-${gradientColor}-400 group-hover:text-${gradientColor}-300 transition-colors`} size={28} />
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
          <span key={idx} className={`px-3 py-1 rounded-lg text-xs font-medium border border-white/5 bg-white/5 text-gray-400 group-hover:border-${gradientColor}-500/20 group-hover:text-${gradientColor}-300 transition-all`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// --- RESTORED Features Component ---
const Features = () => {
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
      icon: Link,
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
};

// --- NEW COMPONENT: Usage Progress & CTA ---
const UsageProgressCard = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative max-w-4xl mx-auto mb-24 animate-fade-in">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
      <div className="relative bg-[#0f172a] border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PGc+PHBhdGggZD0iTTI1IDVMMjUgNDUiLz48cGF0aCBkPSJNNSAyNUw0NSAyNSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="flex items-center gap-6 z-10">
          {/* Circular Progress Bar */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#1e293b"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <Brain size={28} className="text-cyan-400 mb-1 animate-pulse" />
              <span className="text-2xl font-bold">{progress}%</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              استفاده از مدل‌های حرفه‌ای
              <span className="inline-flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              با اشتراک Pro، شما به طور نامحدود به قوی‌ترین مدل‌های هوش مصنوعی جهان دسترسی دارید. قدرت واقعی را آزاد کنید.
            </p>
          </div>
        </div>

        {/* Animated CTA Button */}
        <button className="relative group w-full md:w-auto flex-shrink-0">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200 animate-tilt"></div>
          <div className="relative px-8 py-4 bg-[#0f172a] rounded-xl leading-none flex items-center gap-3 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-200">
            <Zap size={24} className="text-cyan-400 group-hover:text-white transition-colors" />
            <span className="text-white font-bold text-lg group-hover:tracking-wider transition-all">ارتقا به نسخه حرفه‌ای</span>
          </div>
        </button>

      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Added the new component here */}
        <UsageProgressCard />

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">انتخاب طرح</h2>
          <p className="text-xl text-gray-400">بهترین ابزار هوش مصنوعی جهان را با قیمتی استثنایی تجربه کنید</p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-[2.5rem] blur opacity-75 animate-pulse"></div>
            
            <div className="relative bg-[#0f172a] rounded-[2rem] p-8 sm:p-12 border border-white/10 shadow-2xl">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                  پیشنهاد ویژه
                </span>
              </div>

              <div className="text-center mb-10 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">اشتراک یک‌ساله</h3>
                <div className="flex items-center justify-center gap-1 text-cyan-400 my-4">
                    <span className="text-5xl font-black tracking-tight">۳۹۸,۰۰۰</span>
                    <span className="text-xl font-medium text-gray-400 mt-4">تومان</span>
                </div>
                <p className="text-gray-400 text-sm">دسترسی کامل برای ۱۲ ماه</p>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  "دسترسی نامحدود به GPT-5.1 و Claude Sonnet 4.5",
                  "جستجوی حرفه‌ای با Copilot",
                  "آپلود فایل و تحلیل داده (PDF, CSV)",
                  "دسترسی به API (محدود)",
                  "پشتیبانی اختصاصی ۲۴/۷"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-right">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Check size={14} className="text-cyan-400" />
                    </div>
                    <span className="text-gray-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                افزودن به سبد خرید
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-6">
                گارانتی بازگشت وجه ۷ روزه در صورت نارضایتی
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="border border-white/10 rounded-2xl bg-[#1e293b]/30 overflow-hidden mb-4 transition-all duration-300 hover:border-cyan-500/30">
      <button 
        onClick={toggle}
        className="flex items-center justify-between w-full p-6 text-right focus:outline-none"
      >
        <span className="font-bold text-white text-lg">{question}</span>
        {isOpen ? <ChevronUp className="text-cyan-400" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <div 
        className={`px-6 text-gray-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {answer}
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "اشتراک Perplexity Pro چه مزیتی دارد؟",
      answer: "دسترسی به جدیدترین مدل‌های جهان مثل GPT-5.1، Claude Sonnet 4.5 و Gemini 3 Pro، سرعت پاسخگویی بالاتر و قابلیت آپلود فایل‌های حجیم برای آنالیز."
    },
    {
      question: "تحویل و فعال‌سازی چطور انجام می‌شود؟",
      answer: "بلافاصله پس از پرداخت، لایسنس اختصاصی به ایمیل شما ارسال می‌شود و می‌توانید روی اکانت شخصی خودتان آن را فعال کنید."
    },
    {
      question: "آیا می‌توانم اشتراک را لغو یا تمدید کنم؟",
      answer: "بله، در هر زمان می‌توانید اشتراک خود را مدیریت کنید. برای تمدید نیز می‌توانید از همین پنل اقدام کنید."
    },
    {
      question: "پرداخت امن است؟",
      answer: "بله، تمامی پرداخت‌ها از طریق درگاه‌های امن بانکی (زرین‌پال) انجام می‌شود و اطلاعات شما کاملاً محفوظ است."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#0b1120]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-4">
            سوالات متداول
          </div>
          <h2 className="text-3xl font-black text-white">قبل از خرید، همه چیز را روشن کنید</h2>
        </div>
        
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "رضا کریمی",
      role: "تولیدکننده محتوا",
      text: "دیگه نیازی نیست بین ابزارهای مختلف سوییچ کنم. همه مدل‌های هوش مصنوعی رو یکجا دارم. کیفیت خروجی‌ها فوق‌العاده‌ست.",
      stars: 5
    },
    {
      name: "سارا جلالی",
      role: "محقق و دانشجو",
      text: "برای پایان‌نامم نیاز به تحلیل مقالات زیادی داشتم. قابلیت آپلود فایل و تحلیل دقیق پرپلکسیتی نجاتم داد. فعال‌سازی هم که آنی بود.",
      stars: 5
    },
    {
      name: "علی محمدی",
      role: "برنامه‌نویس ارشد",
      text: "از وقتی اشتراک پرو رو گرفتم، سرعت کدنویسیم دو برابر شده. دسترسی همزمان به GPT-5 و Claude جدید با این قیمت واقعاً باورنکردنیه.",
      stars: 5
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">نظرات کاربران ما</h2>
          <p className="text-gray-400">ببینید دیگران درباره تجربه استفاده از Perplexity Pro چه می‌گویند</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-[#1e293b]/40 p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
              <div className="absolute -top-4 -left-4 text-cyan-500/10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                <MessageSquare size={80} fill="currentColor" />
              </div>
              <div className="relative z-10">
                <p className="text-gray-300 leading-relaxed mb-8 min-h-[80px] pl-8">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div>
                    <h4 className="font-bold text-white text-lg">{review.name}</h4>
                    <span className="text-cyan-400 text-xs font-medium">{review.role}</span>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
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
             
             {/* --- SOCIAL MEDIA ICONS --- */}
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
              <li><a href="#" className="hover:text-cyan-400 transition-colors">ویژگی‌ها</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">نظرات کاربران</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">پلن‌ها و قیمت</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">سوالات متداول</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">قوانین و پشتیبانی</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">شرایط استفاده</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">حریم خصوصی</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">قوانین بازگشت وجه</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">تماس با ما</a></li>
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
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-['Vazirmatn'] select-none" dir="rtl">
      {/* Font Loader hack for Vazirmatn */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap');
        body { font-family: 'Vazirmatn', sans-serif; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out 3s infinite; }
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float 9s ease-in-out infinite reverse; }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navbar />
      <main>
        <Hero />
        <SmartSearchDemo />
        <Features />
        <Pricing />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
      
      {/* Sticky Support Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button className="bg-cyan-500 hover:bg-cyan-400 text-white p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform hover:scale-110">
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;