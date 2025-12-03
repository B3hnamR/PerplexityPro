"use client";

import { useState, useEffect } from "react";
import styles from "./product.module.css";
import axios from "axios";
import { Save, Loader2 } from "lucide-react";

export default function ProductSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        fileUrl: "",
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get("/api/admin/product");
            const data = res.data || {};
            setFormData({
                name: data.name || "",
                description: data.description || "",
                price: Number(data.price) || 0,
                imageUrl: data.imageUrl || "",
                fileUrl: data.fileUrl || "",
            });
        } catch (error) {
            console.error("Failed to fetch product", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: Number(formData.price),
                imageUrl: formData.imageUrl.trim() || undefined,
                fileUrl: formData.fileUrl.trim() || undefined,
            };

            await axios.put("/api/admin/product", payload);
            alert("تنظیمات محصول با موفقیت ذخیره شد.");
        } catch (error: any) {
            console.error("Save error:", error);
            const msg = error.response?.data?.error || "در ذخیره‌سازی محصول مشکلی رخ داد";
            let details = "";
            if (Array.isArray(error.response?.data?.error)) {
                details = error.response.data.error.map((e: any) => `${e.path.join(".")}: ${e.message}`).join("\n");
            } else if (error.response?.data?.details) {
                details = JSON.stringify(error.response.data.details);
            }

            alert(`خطا: ${msg}\n${details}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className={styles.loading}>در حال بارگذاری...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>تنظیمات محصول</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.group}>
                    <label>نام محصول</label>
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className={styles.group}>
                    <label>توضیحات</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={4}
                    />
                </div>

                <div className={styles.group}>
                    <label>قیمت (تومان)</label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        required
                        min={0}
                    />
                </div>

                <div className={styles.group}>
                    <label>آدرس تصویر (URL)</label>
                    <input
                        value={formData.imageUrl || ""}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://..."
                    />
                </div>

                <div className={styles.group}>
                    <label>لینک فایل دانلودی (fileUrl)</label>
                    <input
                        value={formData.fileUrl || ""}
                        onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                        placeholder="مثلاً لینک تحویل یا مسیر فایل"
                    />
                    <small className={styles.hint}>برای محصولات دیجیتال، لینک تحویل پس از پرداخت از این فیلد خوانده می‌شود.</small>
                </div>

                <button type="submit" className={styles.saveButton} disabled={saving}>
                    {saving ? <Loader2 className={styles.spin} /> : <Save size={18} />}
                    {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
                </button>
            </form>
        </div>
    );
}
