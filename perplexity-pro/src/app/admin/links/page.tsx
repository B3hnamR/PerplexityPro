"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Link as LinkIcon, Loader2, Copy, CheckCircle } from "lucide-react";

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

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch("/api/admin/links");
            if (!res.ok) throw new Error("Failed to fetch links");
            const data = await res.json();
            // اگر دیتای بازگشتی ساختار متفاوتی دارد (مثل latest)، اینجا اصلاح می‌کنیم
            const linksList = Array.isArray(data) ? data : (data.latest || []);
            setLinks(linksList);
        } catch (error) {
            console.error("Error fetching links:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLink.trim()) return;
        
        setAdding(true);
        try {
            // پشتیبانی از افزودن چند خطی
            const lines = newLink.split('\n').filter(line => line.trim() !== '');
            
            await fetch("/api/admin/links", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ links: lines }), // ارسال به صورت آرایه برای سازگاری با API
            });
            setNewLink("");
            fetchLinks();
        } catch (error) {
            console.error(error);
            alert("خطا در افزودن لینک");
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("آیا از حذف این لینک مطمئن هستید؟")) return;
        try {
            await fetch(`/api/admin/links?id=${id}`, { method: "DELETE" });
            setLinks(links.filter((l) => l.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                        <LinkIcon className="text-cyan-400" />
                        انبار لینک‌ها (تحویل آنی)
                    </h1>
                    <p className="text-gray-400">لینک‌هایی که اینجا اضافه می‌کنید، پس از خرید به صورت خودکار به مشتری تحویل داده می‌شوند.</p>
                </div>
                <div className="bg-[#1e293b] px-5 py-3 rounded-xl border border-white/10 shadow-lg flex items-center gap-3">
                    <span className="text-gray-400 text-sm">موجودی فعلی:</span>
                    <span className="text-3xl font-black text-emerald-400">{links.filter(l => !l.isUsed).length}</span>
                </div>
            </div>

            {/* Add New Link Form */}
            <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 mb-8 shadow-lg">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Plus size={18} className="text-cyan-400" />
                    افزودن لینک جدید
                </h3>
                <form onSubmit={handleAdd} className="flex flex-col gap-4">
                    <textarea
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        placeholder="لینک لایسنس یا توکن فعال‌سازی را اینجا وارد کنید... (می‌توانید چند لینک را در خطوط جداگانه وارد کنید)"
                        className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors dir-ltr text-left min-h-[120px] font-mono text-sm"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={adding || !newLink.trim()}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {adding ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                            افزودن به انبار
                        </button>
                    </div>
                </form>
            </div>

            {/* Links List */}
            <div className="bg-[#1e293b] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                <div className="p-4 border-b border-white/5 bg-[#0f172a]/50">
                    <h3 className="font-bold text-gray-300">لیست موجودی</h3>
                </div>
                
                {loading ? (
                    <div className="text-center p-12 text-gray-400 flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-cyan-400" size={32} />
                        <span>در حال بارگذاری انبار...</span>
                    </div>
                ) : links.length === 0 ? (
                    <div className="text-center p-16 text-gray-500 bg-[#1e293b]/50">
                        <LinkIcon size={48} className="mx-auto mb-4 opacity-20" />
                        <p>هیچ لینکی در انبار موجود نیست.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto custom-scrollbar">
                        {links.map((link) => (
                            <div key={link.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                <div className="flex-1 min-w-0 ml-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                            link.isUsed 
                                            ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        }`}>
                                            {link.isUsed ? (
                                                <>استفاده شده</>
                                            ) : (
                                                <><CheckCircle size={10} /> موجود</>
                                            )}
                                        </span>
                                        <span className="text-xs text-gray-500 font-mono">
                                            {new Date(link.createdAt).toLocaleDateString('fa-IR')}
                                        </span>
                                    </div>
                                    <div className="font-mono text-sm text-gray-300 truncate dir-ltr text-left bg-[#0f172a] p-2 rounded-lg border border-white/5 select-all" title={link.url}>
                                        {link.url}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(link.id)}
                                    className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    title="حذف لینک"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}