"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import styles from "./AdminSidebar.module.css";

const navItems = [
    { href: "/admin/dashboard", label: "داشبورد", icon: LayoutDashboard },
    { href: "/admin/orders", label: "سفارش‌ها", icon: ShoppingCart },
    { href: "/admin/product", label: "محصول", icon: Package },
    { href: "/admin/settings", label: "فیلدها", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.logo}>Perplexity Pro</div>
                <div className={styles.badge}>Admin</div>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.link} ${isActive ? styles.active : ""}`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button className={styles.logoutButton} onClick={() => signOut()}>
                    <LogOut size={20} />
                    <span>خروج</span>
                </button>
            </div>
        </aside>
    );
}
