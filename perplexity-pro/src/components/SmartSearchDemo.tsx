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

    try {
      // شبیه‌سازی برای امنیت سمت کلاینت.
      // در نسخه نهایی این بخش را به API Route خودتان متصل کنید.
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockResponses = [
          "هوش مصنوعی مولد (Generative AI) شاخه‌ای قدرتمند است که محتوای جدید تولید می‌کند. مدل‌هایی مانند Gemini 3 Pro و GPT-5.1 پیشگامان این عرصه هستند که در Perplexity Pro به آنها دسترسی دارید.",
          "برای شروع برنامه‌نویسی پایتون، پیشنهاد می‌شود با مفاهیم متغیرها و حلقه‌ها شروع کنید. منابعی مانند FreeCodeCamp و مستندات رسمی پایتون عالی هستند.",
          "پرپلکسیتی پرو ترکیبی از موتور جستجو و مدل‌های زبانی است که به شما امکان می‌دهد دقیق‌ترین و به‌روزترین پاسخ‌ها را با ذکر منبع دریافت کنید."
      ];
      
      setResult(mockResponses[Math.floor(Math.random() * mockResponses.length)]);

    } catch (err) {
      console.error(err);
      setError('متاسفانه در برقراری ارتباط با هوش مصنوعی مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              <Sparkles className={styles.sparkle} />
              تجربه قدرت Gemini
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
                <div className={styles.errorItem}>
                  <Shield size={18} />
                  {error}
                </div>
              ) : (
                <div className={styles.resultContent}>
                  <div className={styles.resultLabel}>
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