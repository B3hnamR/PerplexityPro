"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Settings, LogOut, Link as LinkIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import styles from "./AdminSidebar.module.css";

const navItems = [
    { href: "/admin/dashboard", label: "\u062f\u0627\u0634\u0628\u0648\u0631\u062f", icon: LayoutDashboard },
    { href: "/admin/orders", label: "\u0633\u0641\u0627\u0631\u0634\u200c\u0647\u0627", icon: ShoppingCart },
    { href: "/admin/product", label: "\u0645\u062d\u0635\u0648\u0644", icon: Package },
    { href: "/admin/links", label: "\u0627\u0646\u0628\u0627\u0631 \u0644\u06cc\u0646\u06a9\u200c\u0647\u0627", icon: LinkIcon },
    { href: "/admin/settings", label: "\u062a\u0646\u0638\u06cc\u0645\u0627\u062a", icon: Settings },
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
