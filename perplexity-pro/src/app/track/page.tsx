"use client";

import { useState } from "react";
import { Search, Package, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function TrackOrderPage() {
    const [code, setCode] = useState("");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/track?code=${code}`);
            const data = await res.json();

            if (res.ok) {
                setOrder(data);
            } else {
                setError(data.error || "سفارشی با این کد رهگیری یافت نشد.");
            }
        } catch (err) {
            setError("مشکلی در برقراری ارتباط پیش آمد.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case "PAID":
                return { label: "پرداخت شده", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" };
            case "PENDING":
                return { label: "در انتظار پرداخت", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" };
            case "FAILED":
                return { label: "ناموفق", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" };
            default:
                return { label: status, icon: Package, color: "text-gray-400", bg: "bg-gray-500/10 border-gray-500/20" };
        }
    };

    return (
        <main className="min-h-screen bg-[#0f172a] font-sans text-white">
            <Navbar onPreOrder={() => { }} />
            
            <div className="pt-32 pb-20 max-w-2xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black mb-4">پیگیری سفارش</h1>
                    <p className="text-gray-400">
                        کد رهگیری سفارش خود را وارد کنید تا از وضعیت آن مطلع شوید.
                    </p>
                </div>

                <div className="bg-[#1e293b] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                    <form onSubmit={handleTrack} className="relative mb-8">
                        <input
                            type="text"
                            placeholder="کد رهگیری (مثلاً ORD-123456)"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full bg-[#0f172a] border border-white/10 rounded-xl py-4 px-5 pl-32 text-white focus:outline-none focus:border-cyan-500 transition-all text-lg placeholder-gray-600"
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="absolute left-2 top-2 bottom-2 bg-cyan-500 hover:bg-cyan-400 text-white px-6 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "..." : <><Search size={18} /> پیگیری</>}
                        </button>
                    </form>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center mb-6">
                            {error}
                        </div>
                    )}

                    {order && (
                        <div className="animate-fade-in-up">
                            {(() => {
                                const info = getStatusInfo(order.status);
                                const Icon = info.icon;
                                return (
                                    <div className={`p-6 rounded-2xl border ${info.bg} flex flex-col items-center text-center mb-6`}>
                                        <Icon size={48} className={`mb-3 ${info.color}`} />
                                        <h3 className={`text-xl font-bold ${info.color}`}>{info.label}</h3>
                                        {order.status === "PAID" && (
                                            <p className="text-sm text-gray-400 mt-1">سفارش شما با موفقیت تکمیل شده است.</p>
                                        )}
                                    </div>
                                );
                            })()}

                            <div className="bg-[#0f172a] rounded-xl border border-white/5 p-5 space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-gray-400">کد پیگیری</span>
                                    <span className="font-mono font-bold text-white">{order.trackingCode}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-gray-400">مبلغ</span>
                                    <span className="font-bold text-cyan-400">{order.amount.toLocaleString()} تومان</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">تاریخ ثبت</span>
                                    <span className="text-white dir-ltr">
                                        {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                                    </span>
                                </div>
                            </div>

                            {order.status === "PAID" && order.downloadToken && (
                                <Link 
                                    href={`/delivery/${order.downloadToken}`}
                                    className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
                                >
                                    مشاهده لینک‌های دانلود <ArrowRight size={20} />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}