import { prisma } from "@/lib/db";
import { CheckCircle, Copy, Home, ExternalLink, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
    params: Promise<{ token: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DeliveryPage({ params, searchParams }: PageProps) {
    const { token } = await params;
    const { nostock } = await searchParams;

    // پیدا کردن سفارش بر اساس توکن دانلود
    const order = await prisma.order.findFirst({
        where: { downloadToken: token, status: "PAID" },
        include: {
            links: true, // دریافت لینک‌های تخصیص داده شده
        }
    });

    if (!order) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">لینک نامعتبر</h1>
                    <p className="text-gray-400">اطلاعات سفارش یافت نشد.</p>
                    <Link href="/" className="mt-4 inline-block text-cyan-400">بازگشت به خانه</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] py-20 px-4 flex items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                {/* کارت موفقیت */}
                <div className="bg-[#1e293b] border border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
                    
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-emerald-400" />
                    </div>

                    <h1 className="text-3xl font-black text-white mb-2">پرداخت با موفقیت انجام شد!</h1>
                    <p className="text-gray-400 mb-8">سفارش شما ثبت شد. لایسنس‌های شما در زیر نمایش داده شده است.</p>

                    <div className="grid grid-cols-2 gap-4 mb-8 bg-[#0f172a] p-4 rounded-xl border border-white/5">
                        <div className="text-center">
                            <span className="text-xs text-gray-500 block mb-1">کد پیگیری</span>
                            <span className="text-lg font-mono font-bold text-white">{order.trackingCode}</span>
                        </div>
                        <div className="text-center border-r border-white/10">
                            <span className="text-xs text-gray-500 block mb-1">مبلغ پرداختی</span>
                            <span className="text-lg font-bold text-cyan-400">{order.amount.toLocaleString("fa-IR")} تومان</span>
                        </div>
                    </div>

                    {/* بخش نمایش لینک‌های تحویل داده شده */}
                    <div className="space-y-4 text-left">
                        <h3 className="text-white font-bold text-right mb-2">📦 لایسنس‌های شما:</h3>
                        
                        {order.links && order.links.length > 0 ? (
                            order.links.map((link: any, idx: number) => (
                                <div key={idx} className="bg-[#0f172a] border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between group hover:bg-[#0f172a]/80 transition-colors">
                                    <div className="flex-1 min-w-0 mr-2 overflow-hidden">
                                        <p className="text-xs text-cyan-400 mb-1">لایسنس شماره {idx + 1}</p>
                                        <code className="block text-white font-mono truncate text-sm dir-ltr">{link.url}</code>
                                    </div>
                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-cyan-500 text-white p-2 rounded-lg hover:bg-cyan-400 transition-colors"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="text-yellow-500 flex-shrink-0" />
                                <div className="text-right">
                                    <p className="text-yellow-400 font-bold text-sm">در حال پردازش...</p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        {nostock ? "متاسفانه موجودی انبار برای تحویل آنی کافی نبود. لایسنس تا ساعاتی دیگر به ایمیل/موبایل شما ارسال می‌شود." : "لایسنس شما به زودی ارسال می‌شود."}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/" className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors flex items-center justify-center gap-2">
                            <Home size={18} />
                            صفحه اصلی
                        </Link>
                        <Link href="/track" className="px-6 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 font-bold transition-colors">
                            پیگیری وضعیت
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}