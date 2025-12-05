"use client";

import { useEffect, useState } from "react";
import { X, Lock, CheckCircle, ArrowLeft, ArrowRight, Smartphone, Mail, User, KeyRound } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { signIn, useSession } from "next-auth/react";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const { data: session } = useSession();
    const { total } = useCart();
    
    // Steps: 1=PhoneInput, 2=OTP, 3=Details(NewUser), 4=Confirm
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "", email: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // اگر کاربر لاگین است، مستقیم برو مرحله آخر
            if (session) setStep(4);
            else setStep(1);
        }
    }, [isOpen, session]);

    if (!isOpen) return null;

    // 1. ارسال کد تایید
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mobile.length !== 11 || !mobile.startsWith("09")) return alert("شماره موبایل معتبر نیست");
        
        setLoading(true);
        const res = await fetch("/api/auth/otp/send", {
            method: "POST",
            body: JSON.stringify({ mobile })
        });
        setLoading(false);
        
        if (res.ok) setStep(2);
        else alert("خطا در ارسال پیامک");
    };

    // 2. تایید کد و لاگین/ثبت نام
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // تلاش برای لاگین
        const res = await signIn("credentials", {
            mobile,
            code: otp,
            redirect: false,
            // اگر کاربر جدید باشد، این فیلدها را هم می‌فرستیم تا در auth.ts ثبت شوند
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email
        });

        setLoading(false);
        if (res?.error) {
            alert("کد اشتباه است");
        } else {
            // لاگین موفق -> برو مرحله پرداخت
            setStep(4);
        }
    };

    // 3. شروع پرداخت
    const handlePayment = async () => {
        setLoading(true);
        try {
            // ارسال درخواست پرداخت (با اطلاعات کاربری که الان در سشن است)
            const response = await fetch("/api/payment/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: total || 398000,
                    mobile: mobile || session?.user?.mobile, // موبایل از سشن یا استیت
                    description: "خرید اشتراک Pro",
                }),
            });
            
            const data = await response.json();
            if (data.url) window.location.href = data.url;
            else alert(data.error || "خطا");
        } catch (error) {
            alert("خطا در ارتباط");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-[#1e293b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[#0f172a]/50">
                    <h3 className="text-lg font-bold text-white">
                        {step === 4 ? "تکمیل خرید" : "ورود / عضویت"}
                    </h3>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>

                <div className="p-6">
                    {/* Step 1: Mobile Input */}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <p className="text-gray-300 text-sm mb-4">برای ادامه خرید، شماره موبایل خود را وارد کنید:</p>
                            <input 
                                type="tel" placeholder="0912..." value={mobile} onChange={e => setMobile(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest"
                                autoFocus
                            />
                            <button disabled={loading} className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold">
                                {loading ? "در حال ارسال..." : "ارسال کد تایید"}
                            </button>
                            {/* دکمه ورود ادمین */}
                            <div className="text-center mt-4">
                                <a href="/auth/login" className="text-xs text-gray-500 hover:text-cyan-400">ورود مدیران</a>
                            </div>
                        </form>
                    )}

                    {/* Step 2: OTP Input & Details (If needed we can split, but let's keep simple) */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <p className="text-gray-300 text-sm">کد ارسال شده به {mobile} را وارد کنید:</p>
                            <input 
                                type="text" placeholder="12345" value={otp} onChange={e => setOtp(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white text-center text-xl tracking-[1em]"
                                maxLength={5} autoFocus
                            />
                            
                            {/* Optional Details for Registration */}
                            <div className="pt-2 border-t border-white/5">
                                <p className="text-xs text-gray-400 mb-2">تکمیل اطلاعات (اختیاری):</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <input placeholder="نام" className="bg-[#0f172a] border border-white/10 rounded-lg p-2 text-sm text-white" 
                                        onChange={e => setUserDetails({...userDetails, firstName: e.target.value})} />
                                    <input placeholder="نام خانوادگی" className="bg-[#0f172a] border border-white/10 rounded-lg p-2 text-sm text-white"
                                        onChange={e => setUserDetails({...userDetails, lastName: e.target.value})} />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button type="button" onClick={() => setStep(1)} className="px-4 py-3 rounded-xl border border-white/10 text-gray-400">
                                    <ArrowRight size={20} />
                                </button>
                                <button disabled={loading} className="flex-1 bg-cyan-500 text-white py-3 rounded-xl font-bold">
                                    {loading ? "بررسی..." : "تایید و ادامه"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 4: Final Confirm */}
                    {step === 4 && (
                        <div className="space-y-6 text-center">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                                <p className="text-emerald-400 font-bold text-sm">شما با شماره {session?.user?.mobile || mobile} وارد شده‌اید.</p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">مبلغ قابل پرداخت</p>
                                <div className="text-3xl font-black text-white">
                                    {(total || 398000).toLocaleString()} <span className="text-sm text-gray-500">تومان</span>
                                </div>
                            </div>
                            <button onClick={handlePayment} disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-transform">
                                {loading ? "در حال انتقال..." : "پرداخت آنلاین"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}