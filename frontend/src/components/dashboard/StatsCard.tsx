"use client";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: string;
    progressPercent?: number;
}

export default function StatsCard({ title, value, change, icon, progressPercent = 0 }: StatsCardProps) {
    return (
        <div className="bento-card p-6 rounded-xl relative overflow-hidden group">
            {/* Background Icon */}
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[100px]">{icon}</span>
            </div>

            {/* Content */}
            <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
            <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">{value}</h3>
                {change && (
                    <span className="text-primary text-sm font-bold flex items-center">
                        {change} <span className="material-symbols-outlined text-xs">north</span>
                    </span>
                )}
            </div>

            {/* Progress Bar */}
            {progressPercent > 0 && (
                <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                </div>
            )}
        </div>
    );
}
