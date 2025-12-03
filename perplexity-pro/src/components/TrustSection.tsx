'use client';

import { motion } from 'framer-motion';
import styles from './TrustSection.module.css';
import { UserCheck, Zap, Calendar, ShieldCheck } from 'lucide-react';

const trustItems = [
    {
        icon: <ShieldCheck size={34} />,
        title: 'کاملاً قانونی و معتبر',
        description: 'پرداخت‌ها کاملاً قانونی انجام می‌شود. بدون ریسک بن شدن یا مسدودی، با ضمانت کامل استفاده کنید.',
    },
    {
        icon: <Calendar size={34} />,
        title: 'اشتراک یک‌ساله کامل',
        description: 'یک سال آرامش خیال؛ تنها پلن موجود است تا دغدغه تمدید ماهانه نداشته باشید.',
    },
    {
        icon: <Zap size={34} />,
        title: 'تحویل آنی و خودکار',
        description: 'بدون معطلی و دخالت انسانی، بلافاصله پس از پرداخت، سیستم هوشمند ما اشتراک شما را فعال می‌کند.',
    },
    {
        icon: <UserCheck size={34} />,
        title: 'فعال‌سازی روی اکانت شخصی',
        description: 'نیازی به ساخت اکانت جدید نیست؛ اشتراک مستقیم روی ایمیل و اکانت فعلی شما فعال می‌شود.',
    },
];

export default function TrustSection() {
    return (
        <section className={styles.container}>
            <div className={styles.contentWrapper}>
                <motion.div
                    className={styles.grid}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {trustItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.item}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={styles.iconWrapper}>{item.icon}</div>
                            <div className={styles.textBox}>
                                <h3 className={styles.title}>{item.title}</h3>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

