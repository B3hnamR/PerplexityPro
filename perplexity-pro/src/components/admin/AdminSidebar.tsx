"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Settings, LogOut, Link as LinkIcon, Brain } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
    { href: "/admin/dashboard", label: "داشبورد", icon: LayoutDashboard },
    { href: "/admin/orders", label: "سفارش‌ها", icon: ShoppingCart },
    { href: "/admin/product", label: "محصول", icon: Package },
    { href: "/admin/links", label: "انبار لینک‌ها", icon: LinkIcon },
    { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="h-full bg-[#1e293b] border-l border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                    <Brain size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-lg text-white">Perplexity Pro</h1>
                    <span className="text-xs text-cyan-400 font-medium px-2 py-0.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">Admin Panel</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 font-bold border border-cyan-500/20" 
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <Icon size={20} className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button 
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium border border-transparent hover:border-red-500/20"
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                >
                    <LogOut size={18} />
                    <span>خروج از حساب</span>
                </button>
            </div>
        </aside>
    );
}