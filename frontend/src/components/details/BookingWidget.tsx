"use client";

import { useState } from "react";

interface BookingWidgetProps {
    price: number;
    reviews: number;
    rating: number;
}

export default function BookingWidget({ price, reviews, rating }: BookingWidgetProps) {
    // Mock state for calculation
    const days = 3;
    const insurance = 45;
    const serviceFee = 28;
    const total = (price * days) + insurance + serviceFee;

    return (
        <div className="sticky top-28 bg-surface-dark border border-white/5 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Price</p>
                    <p className="text-3xl font-bold text-white">${price} <span className="text-lg font-normal text-slate-500">/ day</span></p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-primary text-sm font-bold">
                        <span className="material-symbols-outlined text-[18px] fill-[1]">star</span> {rating}
                    </div>
                    <p className="text-slate-500 text-xs">{reviews} reviews</p>
                </div>
            </div>

            {/* Date & Location Picker Mock */}
            <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-4 border-r border-white/10 bg-white/5">
                        <p className="text-[10px] font-bold text-primary uppercase mb-1">Start Date</p>
                        <p className="text-sm text-white font-medium">May 12, 2024</p>
                    </div>
                    <div className="p-4 bg-white/5">
                        <p className="text-[10px] font-bold text-primary uppercase mb-1">End Date</p>
                        <p className="text-sm text-white font-medium">May 15, 2024</p>
                    </div>
                </div>
                <div className="p-4 border border-white/10 rounded-2xl bg-white/5">
                    <p className="text-[10px] font-bold text-primary uppercase mb-1">Pick-up Location</p>
                    <p className="text-sm text-white font-medium flex items-center justify-between">
                        LAX International Airport
                        <span className="material-symbols-outlined text-slate-500 text-sm">expand_more</span>
                    </p>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 mb-8 border-b border-white/10 pb-6">
                <div className="flex justify-between text-sm text-slate-400">
                    <span>${price} x {days} days</span>
                    <span className="text-white font-medium">${price * days}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                    <span>Premium Insurance</span>
                    <span className="text-white font-medium">${insurance}</span>
                </div>
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
                Book Now
            </button>
            <p className="text-center text-xs text-slate-500 px-4">
                You won't be charged yet. Non-logged users will be redirected to the secure login portal.
            </p>
        </div>
    );
}
