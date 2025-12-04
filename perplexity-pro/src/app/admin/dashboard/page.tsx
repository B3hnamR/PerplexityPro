"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard, ShoppingBag, TrendingUp, Loader2 } from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalSales: 0,
        orderCount: 0,
        visitorCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/admin/stats")
            .then((res) => {
                setStats(res.data);
            })
            .catch((err) => {
                console.error("Dashboard stats error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="animate-spin text-cyan-400" size={32} />
            </div>
        );
    }

    const cards = [
        {
            title: "جمع فروش",
            value: `${(stats.totalSales || 0).toLocaleString("fa-IR")} تومان`,
            icon: CreditCard,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20"
        },
        {
            title: "تعداد سفارش",
            value: (stats.orderCount || 0).toLocaleString("fa-IR"),
            icon: ShoppingBag,
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20"
        },
        {
            title: "بازدید تخمینی",
            value: (stats.visitorCount || 0).toLocaleString("fa-IR"),
            icon: TrendingUp,
            color: "text-purple-400",
            bg: "bg-purple-500/10 border-purple-500/20"
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">داشبورد</h1>
                <p className="text-gray-400">نمای کلی وضعیت فروشگاه در یک نگاه</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border ${card.bg} transition-all hover:scale-[1.02]`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-300 font-bold">{card.title}</h3>
                            <card.icon className={card.color} size={24} />
                        </div>
                        <p className={`text-2xl font-black ${card.color}`}>{card.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}