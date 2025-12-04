"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Settings as SettingsIcon, Save } from "lucide-react";

export default function SettingsPage() {
    const [fields, setFields] = useState<any[]>([]);
    const [newField, setNewField] = useState({ label: "", type: "text", required: true });
    
    // Fetch existing fields logic here if you have an API for it
    // For now I'll implement the UI assuming you want to manage dynamic fields for user input during checkout

    const addField = () => {
        if(!newField.label) return;
        setFields([...fields, { ...newField, id: Date.now().toString() }]);
        setNewField({ label: "", type: "text", required: true });
    };

    const removeField = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
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
                <div className="bg-[#1e293b] border border-white/5 rounded-2xl p-6 h-fit shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-4">افزودن فیلد جدید</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">عنوان فیلد</label>
                            <input 
                                type="text" 
                                value={newField.label}
                                onChange={(e) => setNewField({...newField, label: e.target.value})}
                                placeholder="مثلاً: نام کاربری تلگرام"
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                            />
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
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
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={18} />
                            افزودن
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white mb-4">فیلدهای فعال</h3>
                    {fields.length === 0 ? (
                        <div className="text-gray-500 text-center py-8 border border-white/5 rounded-xl border-dashed">
                            هنوز فیلدی اضافه نشده است.
                        </div>
                    ) : (
                        fields.map((field) => (
                            <div key={field.id} className="bg-[#1e293b] p-4 rounded-xl border border-white/5 flex items-center justify-between group">
                                <div>
                                    <p className="text-white font-bold">{field.label}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {field.required ? "اجباری" : "اختیاری"} • {field.type}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => removeField(field.id)}
                                    className="p-2 text-gray-500 hover:text-red-400 bg-white/5 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                    
                    {fields.length > 0 && (
                        <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2">
                            <Save size={18} />
                            ذخیره تنظیمات
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}