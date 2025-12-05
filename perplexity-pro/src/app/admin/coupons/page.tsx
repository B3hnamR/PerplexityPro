"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Ticket, Loader2, Calendar, Ban, CheckCircle } from "lucide-react";
import axios from "axios";

export default function CouponsPage() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    
    const [form, setForm] = useState({
        code: "",
        type: "PERCENTAGE",
        value: 0,
        minOrderPrice: 0,
        maxDiscount: 0,
        maxUses: 0,
        expiresAt: "",
        isActive: true
    });

    useEffect(() => { fetchCoupons(); }, []);

    const fetchCoupons = () => {
        axios.get("/api/admin/coupons").then(res => {
            setCoupons(res.data);
            setLoading(false);
        });
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAdding(true);
        try {
            await axios.post("/api/admin/coupons", form);
            fetchCoupons();
            setForm({ ...form, code: "" }); // Reset key fields
            alert("کد تخفیف ساخته شد");
        } catch (err) {
            alert("خطا: کد تکراری یا نامعتبر است");
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("حذف شود؟")) return;
        await axios.delete(`/api/admin/coupons?id=${id}`);
        setCoupons(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-3 mb-8">
                <Ticket className="text-cyan-400" size={32} />
                <h1 className="text-3xl font-black text-white">مدیریت کدهای تخفیف</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1e293b] p-6 rounded-3xl border border-white/5 shadow-xl sticky top-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Plus size={18} className="text-cyan-400" /> افزودن کد جدید
                        </h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">کد تخفیف</label>
                                <input type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value})}
                                    className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2 text-white dir-ltr text-left font-bold tracking-widest uppercase"
                                    placeholder="NEWYEAR2025" required />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">نوع</label>
                                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                                        className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-2 py-2 text-white text-sm">
                                        <option value="PERCENTAGE">درصدی (%)</option>
                                        <option value="FIXED">مبلغ ثابت (تومان)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">مقدار</label>
                                    <input type="number" value={form.value} onChange={e => setForm({...form, value: Number(e.target.value)})}
                                        className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-3 py-2 text-white dir-ltr text-left" required />
                                </div>
                            </div>

                            {/* More Fields (Min Price, Max Disc, etc.) can be added here similarly */}
                            
                            <button disabled={isAdding} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl font-bold mt-4">
                                {isAdding ? "..." : "ساخت کد"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    <div className="bg-[#1e293b] rounded-3xl border border-white/5 overflow-hidden">
                        {/* Table rendering coupons */}
                        {/* You can use the same table structure as Orders */}
                         <div className="p-6 text-center text-gray-500">
                            {loading ? "در حال بارگذاری..." : (coupons.length === 0 ? "هیچ کدی وجود ندارد" : 
                                coupons.map(c => (
                                    <div key={c.id} className="flex justify-between p-4 border-b border-white/5 last:border-0 text-left">
                                        <div className="font-mono text-white font-bold">{c.code}</div>
                                        <div className="text-cyan-400">{c.type === "PERCENTAGE" ? `${c.value}%` : `${c.value.toLocaleString()} T`}</div>
                                        <button onClick={() => handleDelete(c.id)}><Trash2 size={16} className="text-red-400" /></button>
                                    </div>
                                ))
                            )}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}