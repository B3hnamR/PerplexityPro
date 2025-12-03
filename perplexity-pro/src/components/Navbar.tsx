"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Brain } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
    onPreOrder: () => void;
}

export default function Navbar({ onPreOrder }: NavbarProps) {
    const { count } = useCart();
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
                            <Link href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">ویژگی‌ها</Link>
                            <Link href="#demo" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">دموی زنده</Link>
                            <Link href="#reviews" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">نظرات</Link>
                            <Link href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2">قیمت‌ها</Link>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/cart" className="text-gray-300 hover:text-white transition-colors relative">
                            <ShoppingCart size={24} />
                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {count}
                                </span>
                            )}
                        </Link>
                        <button onClick={onPreOrder} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all transform hover:scale-105 active:scale-95">
                            همین الان خرید کن
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                         <Link href="/cart" className="text-gray-300 hover:text-white relative">
                            <ShoppingCart size={24} />
                             {count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {count}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#0f172a] border-b border-white/10 absolute w-full">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-right">
                        <Link href="#features" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">ویژگی‌ها</Link>
                        <Link href="#demo" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">دموی زنده</Link>
                        <Link href="#pricing" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">قیمت‌ها</Link>
                        <button onClick={() => { onPreOrder(); setIsOpen(false); }} className="w-full mt-4 bg-cyan-600 text-white px-4 py-3 rounded-xl font-bold">
                            همین الان خرید کن
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}