"use client";

export default function CardSkeleton() {
    return (
        <div className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden flex flex-col animate-pulse shadow-xl shadow-black/20">
            <div className="aspect-[16/10] bg-white/[0.03]"></div>
            <div className="p-6 space-y-5">
                <div className="space-y-3">
                    <div className="h-6 w-3/4 bg-white/[0.03] rounded-lg"></div>
                    <div className="h-3 w-1/2 bg-white/[0.03] rounded-lg"></div>
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="h-5 w-16 bg-white/[0.03] rounded-md"></div>
                        <div className="h-3 w-10 bg-white/[0.03] rounded-md"></div>
                    </div>
                    <div className="h-10 w-28 bg-white/[0.03] rounded-xl font-bold"></div>
                </div>
            </div>
        </div>
    );
}
