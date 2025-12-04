"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Package } from "lucide-react";

export default function ProductPage() {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/admin/product")
            .then((res) => res.json())
            .then((data) => {
                setProduct(data || { name: "", price: 0, description: "" });
                setLoading(false);
            });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetch("/api/admin/product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });
            alert("تغییرات با موفقیت ذخیره شد");
        } catch (error) {
            console.error(error);
            alert("خطا در ذخیره سازی");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center p-10 text-gray-400">در حال دریافت اطلاعات...</div>;

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                    <Package className="text-cyan-400" />
                    مدیریت محصول
                </h1>
                <p className="text-gray-400">اطلاعات محصولی که در صفحه اصلی نمایش داده می‌شود را ویرایش کنید.</p>
            </div>

            <form onSubmit={handleSave} className="bg-[#1e293b] border border-white/5 rounded-3xl p-8 space-y-6 shadow-xl">
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">نام محصول</label>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">قیمت (تومان)</label>
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors dir-ltr text-left"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">توضیحات کوتاه</label>
                    <textarea
                        value={product.description || ""}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors min-h-[120px]"
                        placeholder="توضیحاتی که زیر نام محصول نمایش داده می‌شود..."
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="animate-spin" />
                                در حال ذخیره...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                ذخیره تغییرات
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}