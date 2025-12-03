'use client';

import { useState, useEffect } from 'react';
import styles from './settings.module.css';
import axios from 'axios';
import { Trash2, Plus, Edit2, X } from 'lucide-react';

interface CustomField {
    id: string;
    label: string;
    name: string;
    type: string;
    required: boolean;
    options: string | null;
}

export default function SettingsPage() {
    const [fields, setFields] = useState<CustomField[]>([]);
    const [newField, setNewField] = useState({
        label: '',
        name: '',
        type: 'text',
        required: false,
        options: '',
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        const res = await axios.get('/api/admin/fields');
        setFields(res.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...newField,
                options: newField.options ? newField.options.split(',').map((s) => s.trim()) : undefined,
            };

            if (editingId) {
                await axios.put('/api/admin/fields', { id: editingId, ...payload });
            } else {
                await axios.post('/api/admin/fields', payload);
            }
            setNewField({ label: '', name: '', type: 'text', required: false, options: '' });
            setEditingId(null);
            fetchFields();
        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data?.error || 'خطایی رخ داد، دوباره تلاش کنید';
            const details = error.response?.data?.details ? JSON.stringify(error.response.data.details) : '';
            alert(`${msg}\n${details}`);
        }
    };

    const handleDeleteField = async (id: string) => {
        if (confirm('حذف این فیلد انجام شود؟')) {
            await axios.delete(`/api/admin/fields?id=${id}`);
            fetchFields();
        }
    };

    const startEdit = (field: CustomField) => {
        setEditingId(field.id);
        setNewField({
            label: field.label,
            name: field.name,
            type: field.type,
            required: field.required,
            options: field.options ? JSON.parse(field.options).join(', ') : '',
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNewField({ label: '', name: '', type: 'text', required: false, options: '' });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>مدیریت فیلدهای سفارشی</h1>

            <div className={styles.card}>
                <h2>افزودن فیلد جدید</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <input
                            className={styles.input}
                            placeholder="عنوان نمایشی (مثلاً نام کاربری دیسکورد)"
                            value={newField.label}
                            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                            required
                        />
                        <input
                            className={styles.input}
                            placeholder="نام کلید (مثلاً discord_id)"
                            value={newField.name}
                            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                            required
                            pattern="[a-z0-9_]+"
                            title="فقط حروف کوچک و عدد و آندرلاین مجاز است"
                        />
                    </div>
                    <div className={styles.row}>
                        <select
                            className={styles.input}
                            value={newField.type}
                            onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                        >
                            <option value="text">متن</option>
                            <option value="number">عدد</option>
                            <option value="textarea">متن چندخطی</option>
                            <option value="select">گزینه‌ای</option>
                        </select>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={newField.required}
                                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                            />
                            اجباری
                        </label>
                    </div>
                    {newField.type === 'select' && (
                        <input
                            className={styles.input}
                            placeholder="گزینه‌ها را با ویرگول جدا کنید (مثلاً بله، خیر، شاید)"
                            value={newField.options}
                            onChange={(e) => setNewField({ ...newField, options: e.target.value })}
                        />
                    )}
                    <button type="submit" className={styles.addButton}>
                        <Plus size={18} /> {editingId ? 'ذخیره تغییرات' : 'افزودن فیلد'}
                    </button>
                    {editingId && (
                        <button type="button" className={styles.cancelButton} onClick={cancelEdit}>
                            <X size={16} /> انصراف از ویرایش
                        </button>
                    )}
                </form>
            </div>

            <div className={styles.list}>
                <h2>فیلدهای فعال</h2>
                {fields.map((field) => (
                    <div key={field.id} className={styles.fieldItem}>
                        <div className={styles.fieldInfo}>
                            <strong>{field.label}</strong>
                            <span className={styles.badge}>{field.type}</span>
                            {field.required && <span className={styles.requiredBadge}>اجباری</span>}
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.editButton} onClick={() => startEdit(field)}>
                                <Edit2 size={16} /> ویرایش
                            </button>
                            <button
                                onClick={() => handleDeleteField(field.id)}
                                className={styles.deleteButton}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
