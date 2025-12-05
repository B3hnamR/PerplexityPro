"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Settings as SettingsIcon, Loader2 } from "lucide-react";
import axios from "axios";

export default function SettingsPage() {
    const [fields, setFields] = useState<any[]>([]);
    const [newField, setNewField] = useState({ label: "", type: "text", required: true, name: "" });
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    // 1. دریافت فیلدها از سرور هنگام لود صفحه
    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        try {
            const res = await axios.get("/api/admin/fields");
            setFields(res.data);
        } catch (error) {
            console.error("Error fetching fields:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. افزودن فیلد جدید به دیتابیس
    const addField = async () => {
        if (!newField.label) return alert("عنوان فیلد الزامی است");
        
        setAdding(true);
        try {
            // تولید نام انگلیسی خودکار برای فیلد (مثلاً "شماره تلگرام" -> "field_123456")
            const generatedName = `field_${Date.now()}`;
            
            const payload = {
                ...newField,
                name: generatedName, // نام یکتا برای دیتابیس
            };

            await axios.post("/api/admin/fields", payload);
            
            // ریست کردن فرم و رفرش لیست
            setNewField({ label: "", type: "text", required: true, name: "" });
            fetchFields();
        } catch (error) {
            console.error(error);
            alert("خطا در ذخیره فیلد");
        } finally {
            setAdding(false);
        }
    };

    // 3. حذف فیلد از دیتابیس
    const removeField = async (id: string) => {
        if(!confirm("آیا از حذف این فیلد مطمئن هستید؟")) return;

        try {
            // آپدیت استیت برای حذف سریع (Optimistic UI)
            setFields(prev => prev.filter(f => f.id !== id));
            
            await axios.delete(`/api/admin/fields?id=${id}`);
        } catch (error) {
            console.error(error);
            alert("خطا در حذف");
            fetchFields(); // برگرداندن لیست در صورت خطا
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                    <SettingsIcon className="text-cyan-400" />
                    تنظیمات و فیلدها
                </h1>
                <p className="text-gray-400">فیلدهایی که کاربر باید هنگام خرید پر کند را اینجا مدیریت کنید.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form to Add */}
                <div className="bg-[#1e293b] border border-white/5 rounded-2xl p-6 h-fit shadow-lg sticky top-6">
                    <h3 className="text-lg font-bold text-white mb-4">افزودن فیلد جدید</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">عنوان فیلد</label>
                            <input 
                                type="text" 
                                value={newField.label}
                                onChange={(e) => setNewField({...newField, label: e.target.value})}
                                placeholder="مثلاً: نام کاربری تلگرام"
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                            />
                        </div>
                        
                        <div className="flex items-center gap-4 bg-[#0f172a] p-3 rounded-xl border border-white/5">
                            <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer w-full">
                                <input 
                                    type="checkbox" 
                                    checked={newField.required}
                                    onChange={(e) => setNewField({...newField, required: e.target.checked})}
                                    className="accent-cyan-500 w-4 h-4"
                                />
                                اجباری باشد
                            </label>
                        </div>

                        <button 
                            onClick={addField}
                            disabled={adding || !newField.label}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                        >
                            {adding ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                            افزودن فیلد
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">فیلدهای فعال</h3>
                    
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">
                            <Loader2 className="animate-spin mx-auto mb-2" />
                            در حال بارگذاری...
                        </div>
                    ) : fields.length === 0 ? (
                        <div className="text-gray-500 text-center py-12 border-2 border-dashed border-white/5 rounded-2xl bg-[#1e293b]/30">
                            هنوز فیلدی اضافه نشده است.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {fields.map((field) => (
                                <div key={field.id} className="bg-[#1e293b] p-5 rounded-xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all shadow-md">
                                    <div>
                                        <p className="text-white font-bold text-lg mb-1">{field.label}</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] px-2 py-0.5 rounded border ${field.required ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                                                {field.required ? "اجباری" : "اختیاری"}
                                            </span>
                                            <span className="text-xs text-gray-500 font-mono">{field.type}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeField(field.id)}
                                        className="p-3 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                        title="حذف"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}