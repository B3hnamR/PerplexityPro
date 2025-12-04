"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, Search, CheckCircle, XCircle, Clock, ShoppingBag } from "lucide-react";

// این اینترفیس باید دقیقاً با خروجی API/Prisma یکی باشد
interface Order {
    id: string;
    customerEmail: string | null; // اصلاح شد (قبلاً userId بود)
    amount: number;               // اصلاح شد (قبلاً totalAmount بود)
    status: string;
    createdAt: string;
    trackingCode: string | null;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // نام فایل API حتما باید route.ts باشد (نه routes.ts)
                const res = await fetch("/api/admin/orders"); 
                if (!res.ok) throw new Error("Failed to fetch");
                
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => 
        (order.customerEmail && order.customerEmail.toLowerCase().includes(search.toLowerCase())) ||
        (order.id && order.id.includes(search)) ||
        (order.trackingCode && order.trackingCode.includes(search))
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PAID": // در دیتابیس معمولا PAID ذخیره می‌شود نه COMPLETED
            case "COMPLETED": 
                return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle size={12} /> پرداخت شده</span>;
            case "FAILED": 
                return <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><XCircle size={12} /> ناموفق</span>;
            default: 
                return <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12} /> در انتظار</span>;
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <h1 className="text-3xl font-black text-white flex items-center gap-2">
                    <ShoppingBag className="text-cyan-400" />
                    مدیریت سفارش‌ها
                </h1>
                <div className="relative w-full md:w-64">
                    <input 
                        type="text" 
                        placeholder="جستجو (ایمیل، شناسه یا کد پیگیری)..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#1e293b] border border-white/10 rounded-xl py-2.5 px-4 pl-10 text-white focus:border-cyan-500 focus:outline-none transition-colors text-sm placeholder-gray-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                </div>
            </div>

            <div className="bg-[#1e293b] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-[#0f172a] text-gray-400 font-medium">
                            <tr>
                                <th className="p-4 whitespace-nowrap">کد پیگیری</th>
                                <th className="p-4 whitespace-nowrap">مشتری</th>
                                <th className="p-4 whitespace-nowrap">مبلغ (تومان)</th>
                                <th className="p-4 whitespace-nowrap">تاریخ</th>
                                <th className="p-4 whitespace-nowrap">وضعیت</th>
                                <th className="p-4 text-center whitespace-nowrap">عملیات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={6} className="p-8 text-center text-gray-500">در حال بارگذاری اطلاعات...</td></tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-gray-500">هیچ سفارشی یافت نشد.</td></tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono text-white font-bold dir-ltr text-right">
                                            {order.trackingCode || order.id.slice(0, 8)}
                                        </td>
                                        <td className="p-4 text-gray-300 font-medium truncate max-w-[200px]">
                                            {order.customerEmail || "مهمان"}
                                        </td>
                                        <td className="p-4 text-cyan-400 font-bold">
                                            {(order.amount || 0).toLocaleString("fa-IR")}
                                        </td>
                                        <td className="p-4 text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                                        </td>
                                        <td className="p-4">{getStatusBadge(order.status)}</td>
                                        <td className="p-4 text-center">
                                            <Link 
                                                href={`/admin/orders/${order.id}`}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                                                title="مشاهده جزئیات"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}