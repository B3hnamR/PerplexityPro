// ... imports قبلی ...
// به انتهای فایل، قبل از بسته شدن div اصلی، این بخش را اضافه کنید:

                {/* Manual Delivery Section (فقط برای سفارش‌های بدون لینک) */}
                {order.status === "PAID" && (!order.links || order.links.length === 0) && (
                    <div className="lg:col-span-3 mt-6">
                        <div className="bg-[#1e293b] border border-orange-500/30 rounded-2xl p-6 shadow-lg">
                            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                                <AlertTriangle className="text-orange-400" />
                                تحویل دستی سفارش
                            </h3>
                            <div className="flex flex-col md:flex-row gap-4">
                                <input 
                                    type="text" 
                                    id="manual-link"
                                    placeholder="لینک محصول را اینجا وارد کنید..."
                                    className="flex-1 bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white dir-ltr text-left focus:border-orange-500 focus:outline-none"
                                />
                                <button
                                    onClick={async () => {
                                        const link = (document.getElementById('manual-link') as HTMLInputElement).value;
                                        if(!link) return alert("لینک را وارد کنید");
                                        
                                        try {
                                            const res = await fetch(`/api/admin/orders/${order.id}/manual-delivery`, {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ link })
                                            });
                                            if(res.ok) {
                                                alert("ارسال شد!");
                                                window.location.reload();
                                            } else alert("خطا");
                                        } catch(e) { alert("خطا"); }
                                    }}
                                    className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-3 rounded-xl font-bold whitespace-nowrap"
                                >
                                    ثبت و ارسال پیامک
                                </button>
                            </div>
                            <p className="text-gray-400 text-xs mt-3">
                                با زدن این دکمه، لینک ثبت شده و پیامکی حاوی "سفارش شما آماده است" برای کاربر ارسال می‌شود.
                            </p>
                        </div>
                    </div>
                )}
// ... پایان فایل ...