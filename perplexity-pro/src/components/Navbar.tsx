"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Brain, User } from "lucide-react";
import { useSession } from "next-auth/react";
import CheckoutModal from "./CheckoutModal"; // ایمپورت مودال

interface NavbarProps {
    onPreOrder: () => void;
}

export default function Navbar({ onPreOrder }: NavbarProps) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // استیت برای باز کردن مودال لاگین از طریق ناوبری
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        
                        {/* Logo */}
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
                                <Link href="/#features" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">ویژگی‌ها</Link>
                                <Link href="/track" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">پیگیری سفارش</Link>
                                <Link href="/#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">قیمت‌ها</Link>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            {session ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-400">سلام، {session.user?.name || "کاربر"}</span>
                                    {/* اگر ادمین بود لینک پنل ادمین، اگر کاربر بود لینک خرید یا پروفایل */}
                                    {(session.user as any).role === "ADMIN" ? (
                                        <Link href="/admin/dashboard" className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg text-sm font-bold border border-cyan-500/30">پنل مدیریت</Link>
                                    ) : (
                                        // فعلاً برای کاربر دکمه خرید را نشان می‌دهیم چون داشبورد جدا نساختیم
                                        <button onClick={onPreOrder} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg">خرید اشتراک</button>
                                    )}
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setIsLoginModalOpen(true)} 
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
                                >
                                    <User size={18} />
                                    ورود / عضویت
                                </button>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* مودال لاگین جداگانه برای دسترسی از نوبار */}
            <CheckoutModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} mode="LOGIN_ONLY" />
        </>
    );
}