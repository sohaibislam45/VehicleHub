"use client";

import { useState, useEffect, useMemo } from "react";

interface BookingWidgetProps {
    price: number;
    reviews: number;
    rating: number;
}

const DHAKA_LOCATIONS = [
    "Gulshan Circle 1",
    "Bashundhara City Mall",
    "Jamuna Future Park",
    "University of Dhaka",
    "Ramna Park",
    "Old Dhaka / Sadarghat Riverfront",
    "National Parliament House",
    "Ahsan Manzil Area (Old Dhaka)",
    "Hatirjheel",
    "Banani / Kamal Ataturk Avenue"
];

export default function BookingWidget({ price, reviews, rating }: BookingWidgetProps) {
    const today = new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState(DHAKA_LOCATIONS[0]);

    // Calculate days between dates
    const days = useMemo(() => {
        if (!startDate || !endDate) return 1;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    }, [startDate, endDate]);

    const total = price * days;

    return (
        <div className="sticky top-28 bg-surface-dark border border-white/5 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Price</p>
                    <p className="text-3xl font-bold text-white">৳{price} <span className="text-lg font-normal text-slate-500">/ day</span></p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-primary text-sm font-bold">
                        <span className="material-symbols-outlined text-[18px] fill-[1]">star</span> {rating.toFixed(1)}
                    </div>
                    <p className="text-slate-500 text-xs">{reviews} reviews</p>
                </div>
            </div>

            {/* Date & Location Picker */}
            <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-4 border-r border-white/10 bg-white/5">
                        <p className="text-[10px] font-bold text-primary uppercase mb-1">Start Date</p>
                        <input
                            type="date"
                            min={today}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-transparent text-sm text-white font-medium outline-none w-full [color-scheme:dark]"
                        />
                    </div>
                    <div className="p-4 bg-white/5">
                        <p className="text-[10px] font-bold text-primary uppercase mb-1">End Date</p>
                        <input
                            type="date"
                            min={startDate || today}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-transparent text-sm text-white font-medium outline-none w-full [color-scheme:dark]"
                        />
                    </div>
                </div>
                <div className="p-4 border border-white/10 rounded-2xl bg-white/5">
                    <p className="text-[10px] font-bold text-primary uppercase mb-1">Pick-up Location</p>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-transparent text-sm px-2 text-white font-medium outline-none w-full appearance-none cursor-pointer"
                    >
                        {DHAKA_LOCATIONS.map(loc => (
                            <option key={loc} value={loc} className="bg-surface-dark">{loc}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 mb-8 border-b border-white/10 pb-6">
                <div className="flex justify-between text-sm text-slate-400">
                    <span>৳{price} x {days} {days === 1 ? 'day' : 'days'}</span>
                    <span className="text-white font-medium">৳{total}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                    Damage insurance charge is 10,000 BDT. For now we will not charge you for damage insurance. If damage is detected, we will charge you the damage amount.
                </div>
            </div>

            <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-primary">৳{total}</span>
            </div>

            <button className="w-full py-4 rounded-2xl bg-primary text-background-dark font-black text-lg shadow-[0_0_20px_rgba(23,191,207,0.3)] hover:scale-[1.02] transition-transform active:scale-95 mb-4">
                Confirm Booking
            </button>
            <p className="text-center text-xs text-slate-500 px-4">
                You won't be charged yet. Non-logged users will be redirected to the secure login portal.
            </p>
        </div>
    );
}
