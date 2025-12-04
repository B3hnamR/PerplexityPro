"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Link as LinkIcon, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface LinkItem {
    id: string;
    url: string;
    isUsed: boolean;
    createdAt: string;
}

export default function LinksPage() {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [newLink, setNewLink] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    useEffect(() => { fetchLinks(); }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch("/api/admin/links");
            const data = await res.json();
            setLinks(Array.isArray(data) ? data : (data.latest || []));
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLink.trim()) return;
        setAdding(true);
        try {
            const lines = newLink.split('\n').filter(line => line.trim() !== '');
            await fetch("/api/admin/links", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ links: lines }),
            });
            setNewLink("");
            fetchLinks();
        } catch (error) { alert("خطا"); } finally { setAdding(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("حذف شود؟")) return;
        await fetch(`/api/admin/links?id=${id}`, { method: "DELETE" });
        setLinks(links.filter((l) => l.id !== id));
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-2">
                        <LinkIcon className="text-cyan-400" /> انبار لینک‌ها
                    </h1>
                    <p className="text-gray-400 text-sm">مدیریت لینک‌های تحویل خودکار (لایسنس‌ها)</p>
                </div>
                <div className="bg-[#1e293b] px-6 py-3 rounded-2xl border border-white/10 flex flex-col items-center min-w-[140px]">
                    <span className="text-xs text-gray-400 mb-1">موجودی فعال</span>
                    <span className="text-3xl font-black text-emerald-400">{links.filter(l => !l.isUsed).length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1e293b] p-6 rounded-3xl border border-white/5 shadow-xl sticky top-8">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Plus size={18} className="text-cyan-400" /> افزودن جدید
                        </h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <textarea
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                placeholder="لینک‌ها را وارد کنید (هر خط یک لینک)..."
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-4 text-white text-sm focus:border-cyan-500 focus:outline-none min-h-[150px] font-mono dir-ltr placeholder:text-right"
                            />
                            <button
                                type="submit"
                                disabled={adding || !newLink.trim()}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {adding ? <Loader2 className="animate-spin" size={18}/> : "افزودن به انبار"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    <div className="bg-[#1e293b] rounded-3xl border border-white/5 overflow-hidden shadow-xl">
                        <div className="p-5 border-b border-white/5 bg-[#0f172a]/30">
                            <h3 className="font-bold text-gray-200">لیست کلی</h3>
                        </div>
                        {loading ? (
                            <div className="p-10 text-center text-gray-500">در حال بارگذاری...</div>
                        ) : links.length === 0 ? (
                            <div className="p-10 text-center text-gray-500 flex flex-col items-center gap-2">
                                <AlertCircle size={32} opacity={0.5} />
                                <p>انباری خالی است.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto custom-scrollbar">
                                {links.map((link) => (
                                    <div key={link.id} className="p-4 hover:bg-white/5 transition-colors group flex items-start gap-4">
                                        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${link.isUsed ? "bg-red-500" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"}`} />
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${link.isUsed ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                                                    {link.isUsed ? "فروخته شده" : "موجود"}
                                                </span>
                                                <span className="text-[10px] text-gray-600 font-mono">
                                                    {new Date(link.createdAt).toLocaleDateString('fa-IR')}
                                                </span>
                                            </div>
                                            <div className="bg-[#0f172a] p-2.5 rounded-lg border border-white/5 font-mono text-xs text-gray-300 break-all dir-ltr text-left leading-relaxed">
                                                {link.url}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(link.id)}
                                            className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}