"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, User, Calendar, CreditCard, Box, CheckCircle, XCircle, Clock } from "lucide-react";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/admin/orders/${id}`) // Make sure this API route exists or adjust appropriately
            .then((res) => res.json())
            .then((data) => {
                setOrder(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "COMPLETED": return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2"><CheckCircle size={16} /> تکمیل شده</span>;
            case "FAILED": return <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2"><XCircle size={16} /> ناموفق</span>;
            default: return <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2"><Clock size={16} /> در انتظار</span>;
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-400">در حال دریافت اطلاعات سفارش...</div>;
    if (!order) return <div className="p-10 text-center text-red-400">سفارش مورد نظر یافت نشد.</div>;

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/orders" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                    <ArrowRight size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        جزئیات سفارش
                        <span className="font-mono text-lg text-gray-500 bg-white/5 px-2 py-1 rounded-lg">#{order.id.slice(0, 8)}</span>
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#1e293b] border border-white/5 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                            <h3 className="font-bold text-white text-lg">وضعیت سفارش</h3>
                            {getStatusBadge(order.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2"><Calendar size={14}/> تاریخ ثبت</p>
                                <p className="text-white font-medium">{new Date(order.createdAt).toLocaleDateString('fa-IR')} <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString('fa-IR')}</span></p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2"><CreditCard size={14}/> مبلغ کل</p>
                                <p className="text-cyan-400 font-bold text-lg">{order.totalAmount.toLocaleString("fa-IR")} تومان</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1e293b] border border-white/5 rounded-2xl p-6 shadow-lg">
                        <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2"><Box size={18} className="text-cyan-400"/> اقلام سفارش</h3>
                        <div className="space-y-4">
                            {/* Assuming 'items' exists, otherwise fallback to static or main product */}
                            {order.items ? order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between bg-[#0f172a] p-4 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400">
                                            <Box size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">{item.productName || "محصول"}</p>
                                            <p className="text-xs text-gray-500">تعداد: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="text-white font-mono">{item.price?.toLocaleString("fa-IR")}</div>
                                </div>
                            )) : (
                                <div className="text-gray-500 text-center py-4">جزئیات اقلام در دسترس نیست</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1e293b] border border-white/5 rounded-2xl p-6 shadow-lg h-fit">
                        <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2"><User size={18} className="text-purple-400"/> اطلاعات مشتری</h3>
                        <div className="space-y-4">
                            <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-400 text-xs mb-1">شناسه کاربر</p>
                                <p className="text-white font-mono text-sm break-all">{order.userId || "مهمان"}</p>
                            </div>
                            
                            {/* If you have more user details */}
                            {order.userEmail && (
                                <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5">
                                    <p className="text-gray-400 text-xs mb-1">ایمیل</p>
                                    <p className="text-white font-mono text-sm">{order.userEmail}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}