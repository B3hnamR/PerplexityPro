"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Brain, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import CheckoutModal from "./CheckoutModal";

interface NavbarProps {
    onPreOrder: () => void;
}

export default function Navbar({ onPreOrder }: NavbarProps) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        
        // بستن منو با کلیک بیرون
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
                                <div className="relative" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl font-medium transition-all"
                                    >
                                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">
                                            {session.user?.name?.[0] || "U"}
                                        </div>
                                        <span className="text-sm">{session.user?.name || "کاربر"}</span>
                                        <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute left-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in-up origin-top-left">
                                            {(session.user as any).role === "ADMIN" && (
                                                <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                    <LayoutDashboard size={16} />
                                                    پنل مدیریت
                                                </Link>
                                            )}
                                            {/* برای کاربر عادی */}
                                            {(session.user as any).role !== "ADMIN" && (
                                                 <button onClick={onPreOrder} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors text-right">
                                                    <User size={16} />
                                                    خرید اشتراک جدید
                                                </button>
                                            )}
                                            
                                            <div className="border-t border-white/5 my-1"></div>
                                            
                                            <button 
                                                onClick={() => signOut()}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-right"
                                            >
                                                <LogOut size={16} />
                                                خروج از حساب
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setIsLoginModalOpen(true)} 
                                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all transform hover:scale-105"
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
            
            <CheckoutModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} mode="LOGIN_ONLY" />
        </>
    );
}