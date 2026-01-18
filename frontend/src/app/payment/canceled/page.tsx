"use client";
export const dynamic = 'force-dynamic';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";

function PaymentCanceledContent() {
    const searchParams = useSearchParams();
    const vehicleId = searchParams.get("vehicleId");

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center layout-padding">
            <div className="max-w-md w-full bg-surface-dark border border-white/5 rounded-3xl p-10 text-center shadow-2xl">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                >
                    <div className="size-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="material-symbols-outlined text-red-500 text-5xl">cancel</span>
                    </div>
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Payment Canceled</h1>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    Your booking request was canceled and you haven't been charged.
                </p>

                <div className="space-y-4">
                    <Link
                        href={`/vehicles/${vehicleId}`}
                        className="block w-full py-4 rounded-2xl bg-primary text-background-dark font-black text-lg shadow-[0_0_20px_rgba(23,191,207,0.3)] hover:scale-[1.02] transition-transform active:scale-95"
                    >
                        Try Again
                    </Link>
                    <Link
                        href="/explore"
                        className="block w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                    >
                        Explore Other Vehicles
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PaymentCanceledPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background-dark flex items-center justify-center layout-padding">
                <div className="text-white">Loading...</div>
            </div>
        }>
            <PaymentCanceledContent />
        </Suspense>
    );
}
