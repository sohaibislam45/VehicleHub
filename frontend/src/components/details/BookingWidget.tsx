"use client";

import { useState } from "react";

interface BookingWidgetProps {
    price: number;
    reviews: number;
    rating: number;
}

export default function BookingWidget({ price, reviews, rating }: BookingWidgetProps) {
    const [days, setDays] = useState(3);
    const [insuranceEnabled, setInsuranceEnabled] = useState(true);

    const insurancePrice = 45;
    const serviceFee = 28;
    const subtotal = price * days;
    const total = subtotal + (insuranceEnabled ? insurancePrice : 0) + serviceFee;

    return (
        <div className="sticky top-28 bg-surface-dark border border-white/5 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Price</p>
                    <p className="text-3xl font-bold text-white">${price} <span className="text-lg font-normal text-slate-500">/ day</span></p>
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
                            className="bg-transparent text-sm text-white font-medium outline-none w-full [color-scheme:dark]"
                            defaultValue="2024-05-12"
                        />
                    </div>
                    <div className="p-4 bg-white/5">
                        <p className="text-[10px] font-bold text-primary uppercase mb-1">End Date</p>
                        <input
                            type="date"
                            className="bg-transparent text-sm text-white font-medium outline-none w-full [color-scheme:dark]"
                            defaultValue="2024-05-15"
                            onChange={(e) => {
                                // Simple mock logic for days calculation
                                setDays(4);
                            }}
                        />
                    </div>
                </div>
                <div className="p-4 border border-white/10 rounded-2xl bg-white/5">
                    <p className="text-[10px] font-bold text-primary uppercase mb-1">Pick-up Location</p>
                    <p className="text-sm text-white font-medium flex items-center justify-between">
                        Hub Location Airport
                        <span className="material-symbols-outlined text-slate-500 text-sm">expand_more</span>
                    </p>
                </div>
            </div>

            {/* Insurance Toggle */}
            <div
                className={`p-4 rounded-2xl border transition-all cursor-pointer mb-8 flex justify-between items-center ${insuranceEnabled ? 'bg-primary/5 border-primary/30' : 'bg-white/5 border-white/10'}`}
                onClick={() => setInsuranceEnabled(!insuranceEnabled)}
            >
                <div>
                    <p className="text-white font-bold text-sm">Premium Insurance</p>
                    <p className="text-slate-500 text-[10px]">Zero deductible & collision protection</p>
                </div>
                <div className="text-right">
                    <p className="text-white font-bold text-sm">${insurancePrice}</p>
                    <p className="text-primary text-[10px] uppercase font-bold tracking-widest">{insuranceEnabled ? 'Added' : 'Add'}</p>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 mb-8 border-b border-white/10 pb-6">
                <div className="flex justify-between text-sm text-slate-400">
                    <span>${price} x {days} days</span>
                    <span className="text-white font-medium">${subtotal}</span>
                </div>
                {insuranceEnabled && (
                    <div className="flex justify-between text-sm text-slate-400">
                        <span>Premium Insurance</span>
                        <span className="text-white font-medium">${insurancePrice}</span>
                    </div>
                )}
                <div className="flex justify-between text-sm text-slate-400">
                    <span>Service Fee</span>
                    <span className="text-white font-medium">${serviceFee}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-primary">${total}</span>
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
