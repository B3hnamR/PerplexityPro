"use client";

import { useState, useEffect } from "react";
import { Search, User, ShoppingBag } from "lucide-react";

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                <User className="text-cyan-400" /> مدیریت کاربران
            </h1>

            <div className="bg-[#1e293b] rounded-2xl border border-white/5 overflow-hidden shadow-lg">
                <table className="w-full text-right text-sm">
                    <thead className="bg-[#0f172a] text-gray-400">
                        <tr>
                            <th className="p-4">نام و نام خانوادگی</th>
                            <th className="p-4">شماره موبایل</th>
                            <th className="p-4">تاریخ عضویت</th>
                            <th className="p-4">سفارش‌ها</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={4} className="p-8 text-center text-gray-500">در حال بارگذاری...</td></tr>
                        ) : users.map(user => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-white font-bold">{user.firstName || ""} {user.lastName || ""}</td>
                                {/* اصلاح جهت شماره موبایل */}
                                <td className="p-4 text-gray-300 font-mono dir-ltr text-right">
                                    <span className="dir-ltr inline-block">{user.mobile}</span>
                                </td>
                                <td className="p-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString('fa-IR')}</td>
                                <td className="p-4">
                                    <span className="bg-white/5 px-3 py-1 rounded-lg text-xs text-cyan-400 font-bold border border-white/5">
                                        {user._count?.orders || 0} سفارش
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}