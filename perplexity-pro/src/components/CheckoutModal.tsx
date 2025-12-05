"use client";

import { useEffect, useState } from "react";
import { X, Lock, ArrowLeft, ArrowRight, Smartphone, Loader2, User, Mail } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { signIn, useSession } from "next-auth/react";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    isCartCheckout?: boolean;
    mode?: "CHECKOUT" | "LOGIN_ONLY"; // حالت عملیاتی مودال
}

export default function CheckoutModal({ isOpen, onClose, isCartCheckout = false, mode = "CHECKOUT" }: CheckoutModalProps) {
    const { data: session } = useSession();
    const { total } = useCart();
    
    // Steps: 1=Mobile, 2=OTP, 3=RegisterInfo(If New), 4=ReadyToPay
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "" });
    const [loading, setLoading] = useState(false);

    // ریست کردن وضعیت وقتی مودال باز می‌شود
    useEffect(() => {
        if (isOpen) {
            if (session) {
                // اگر کاربر لاگین است
                if (mode === "CHECKOUT") setStep(4); // برو برای پرداخت
                else onClose(); // اگر فقط برای لاگین باز شده بود، ببندش
            } else {
                setStep(1); // از اول شروع کن
            }
        }
    }, [isOpen, session, mode]);

    if (!isOpen) return null;

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mobile.length !== 11 || !mobile.startsWith("09")) return alert("شماره موبایل معتبر نیست");
        
        setLoading(true);
        try {
            const res = await fetch("/api/auth/otp/send", {
                method: "POST",
                body: JSON.stringify({ mobile })
            });
            if (res.ok) setStep(2);
            else alert("خطا در ارسال پیامک");
        } catch (err) { alert("خطا در ارتباط"); }
        finally { setLoading(false); }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const res = await signIn("credentials", {
            mobile,
            code: otp,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            redirect: false,
        });

        setLoading(false);
        if (res?.error) {
            alert("کد وارد شده اشتباه است");
        } else {
            // لاگین موفق
            if (mode === "LOGIN_ONLY") onClose();
            else setStep(4);
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/payment/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: isCartCheckout ? total : 398000,
                    mobile: session?.user?.mobile || mobile, // موبایل از سشن
                    description: "خرید اشتراک",
                }),
            });
            
            const data = await response.json();
            if (data.url) window.location.href = data.url;
            else alert(data.error || "خطا در پرداخت");
        } catch (error) {
            alert("خطا در ارتباط با سرور");
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
                        {step === 4 ? "تکمیل خرید" : "ورود / ثبت‌نام"}
                    </h3>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>

                <div className="p-6">
                    {/* Step 1: Mobile */}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-5">
                            <p className="text-gray-300 text-sm">برای شروع، شماره موبایل خود را وارد کنید:</p>
                            <div className="relative">
                                <input 
                                    type="tel" value={mobile} onChange={e => setMobile(e.target.value)}
                                    className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white text-center text-xl tracking-widest placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors dir-ltr"
                                    placeholder="0912..." autoFocus
                                />
                                <Smartphone className="absolute left-3 top-3.5 text-gray-500" size={20} />
                            </div>
                            <button disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3.5 rounded-xl font-bold transition-all flex justify-center items-center gap-2">
                                {loading ? <Loader2 className="animate-spin" /> : "ارسال کد تایید"}
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP & Register Info */}
                    {step === 2 && (
                        <form onSubmit={handleVerify} className="space-y-5">
                            <div className="text-center mb-4">
                                <p className="text-gray-400 text-xs mb-1">کد ارسال شده به {mobile}</p>
                                <button type="button" onClick={() => setStep(1)} className="text-cyan-400 text-xs hover:underline">تغییر شماره</button>
                            </div>
                            
                            <input 
                                type="text" placeholder="- - - - -" value={otp} onChange={e => setOtp(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-[1em] focus:border-cyan-500 focus:outline-none"
                                maxLength={5} autoFocus
                            />

                            {/* فیلدهای ثبت نام (نام و ایمیل) */}
                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-white/5 space-y-3">
                                <p className="text-xs text-gray-400 font-bold">اطلاعات تکمیلی (برای ثبت‌نام):</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <input placeholder="نام" className="bg-[#1e293b] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                                        onChange={e => setUserInfo({...userInfo, firstName: e.target.value})} required />
                                    <input placeholder="نام خانوادگی" className="bg-[#1e293b] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                                        onChange={e => setUserInfo({...userInfo, lastName: e.target.value})} required />
                                </div>
                                <input type="email" placeholder="ایمیل (اختیاری)" className="w-full bg-[#1e293b] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-cyan-500 focus:outline-none dir-ltr text-left"
                                    onChange={e => setUserInfo({...userInfo, email: e.target.value})} />
                            </div>

                            <button disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3.5 rounded-xl font-bold transition-all flex justify-center items-center gap-2">
                                {loading ? <Loader2 className="animate-spin" /> : "تایید و ادامه"}
                            </button>
                        </form>
                    )}

                    {/* Step 4: Payment Confirm */}
                    {step === 4 && (
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                                <Lock size={32} />
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">مبلغ قابل پرداخت</p>
                                <div className="text-4xl font-black text-white">
                                    {(isCartCheckout ? total : 398000).toLocaleString("fa-IR")} <span className="text-lg text-gray-500">تومان</span>
                                </div>
                            </div>
                            
                            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl text-xs text-blue-200">
                                پرداخت امن زرین‌پال • تحویل آنی
                            </div>

                            <button onClick={handlePayment} disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all flex justify-center items-center gap-2">
                                {loading ? "در حال انتقال..." : <>پرداخت آنلاین <ArrowLeft size={20} /></>}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}