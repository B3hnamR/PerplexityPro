"use client";

import { useState } from 'react';
import { Search, Sparkles, Loader, Zap, Brain, Shield } from 'lucide-react';
import styles from './SmartSearchDemo.module.css';

export default function SmartSearchDemo() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult('');
    setError('');

    // شبیه‌سازی درخواست برای دمو (چون کلید API در سمت کلاینت امن نیست)
    // در نسخه واقعی باید به API Route نکست.جی‌اس وصل شود
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // پاسخ‌های نمایشی برای دمو
      const mockResponses = [
          "هوش مصنوعی مولد (Generative AI) شاخه‌ای از هوش مصنوعی است که می‌تواند محتوای جدیدی از جمله متن، تصویر، صدا و ویدئو تولید کند. مدل‌هایی مانند GPT-4 و Gemini نمونه‌هایی از این تکنولوژی هستند.",
          "برای یادگیری برنامه‌نویسی پایتون، پیشنهاد می‌کنم ابتدا با مفاهیم پایه مثل متغیرها، حلقه‌ها و توابع شروع کنید و سپس سراغ فریم‌ورک‌هایی مثل Django یا کتابخانه‌هایی مثل Pandas بروید.",
          "پرپلکسیتی (Perplexity) یک موتور پاسخگویی هوشمند است که با ترکیب جستجوی وب و مدل‌های زبانی بزرگ (LLM) پاسخ‌های دقیق و به‌روز به کاربران ارائه می‌دهد."
      ];
      
      setResult(mockResponses[Math.floor(Math.random() * mockResponses.length)]);
    } catch (err) {
      setError('متاسفانه در برقراری ارتباط مشکلی پیش آمد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} id="demo">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              <Sparkles className={styles.sparkle} />
              تجربه قدرت هوش مصنوعی
            </h2>
            <p className={styles.subtitle}>
              همین حالا سوال خود را بپرسید و پاسخ هوشمند دریافت کنید.
            </p>
          </div>

          <form onSubmit={handleSearch} className={styles.form}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثلاً: آینده هوش مصنوعی چگونه خواهد بود؟"
              className={styles.input}
            />
            <Search className={styles.searchIcon} size={20} />
            <button 
              type="submit" 
              disabled={loading || !query}
              className={styles.button}
            >
              {loading ? (
                <>
                  <Loader className={styles.spin} size={18} />
                  <span>تحلیل...</span>
                </>
              ) : (
                <>
                  <Zap size={18} fill="currentColor" />
                  <span>بپرس ✨</span>
                </>
              )}
            </button>
          </form>

          {(result || error) && (
            <div className={styles.resultBox}>
              {error ? (
                <div className={`${styles.resultHeader} ${styles.error}`}>
                  <Shield size={18} />
                  {error}
                </div>
              ) : (
                <div className={styles.resultContent}>
                  <div className={styles.resultHeader}>
                    <Brain size={16} />
                    <span>پاسخ هوش مصنوعی:</span>
                  </div>
                  <p className={styles.resultText}>{result}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}