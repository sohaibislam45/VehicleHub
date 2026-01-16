"use client";

export default function ReviewsSection() {
    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Guest Reviews</h2>
                <button className="text-primary text-sm font-bold flex items-center gap-2 hover:underline">
                    Write a review <span className="material-symbols-outlined text-sm">edit</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-12 p-8 rounded-3xl bg-surface-dark border border-white/5">
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-6xl font-black text-white">4.9</p>
                    <div className="flex gap-1 my-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} className="material-symbols-outlined text-primary fill-[1]">star</span>
                        ))}
                    </div>
                    <p className="text-slate-500 text-sm">Based on 128 reviews</p>
                </div>

                {/* Progress Bars Mock */}
                <div className="flex-1 space-y-3">
                    {[
                        { star: 5, pct: "90%" },
                        { star: 4, pct: "6%" },
                        { star: 3, pct: "2%" }
                    ].map((row) => (
                        <div key={row.star} className="flex items-center gap-4">
                            <span className="text-xs text-slate-500 w-4">{row.star}</span>
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: row.pct }}></div>
                            </div>
                            <span className="text-xs text-slate-500 w-8 text-right">{row.pct}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mock Comment */}
            <div className="mt-8 space-y-6">
                <div className="p-6 border-b border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-white/5 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSFfZsP3kPJ68qQ3ix20vVboo98S8eJkPKyLJLJaQISpVOrcD4yztkKu7E9kC3tDT-SBKCc38VGqc6U3tvG2FyUyf1E_37F5lNfB6BIDjxmaH0Zri7NkgEiz0VDEqU1Yhp8Uv7tA9m0bkwH6Sb5_-pLxVHzI_WQ_ErAURYH-Jed2S9CV05RJRAzD6KuewGdgo9wCMkm9YiFIzEeN2o_GC1pBFQBOJ35fHePd_7F0VM6_olxxatrqvmHAOEatmhQw1DsyMWdqNHSl0')" }}></div>
                            <div>
                                <p className="text-white font-bold text-sm">Marcus Thompson</p>
                                <p className="text-slate-500 text-xs italic">March 2024</p>
                            </div>
                        </div>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="material-symbols-outlined text-primary text-[16px] fill-[1]">star</span>
                            ))}
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        "Incredible experience. The car was spotless and the performance is just mind-blowing. The host was very communicative and the pick-up process was seamless. Highly recommend!"
                    </p>
                </div>
            </div>
        </section>
    );
}
