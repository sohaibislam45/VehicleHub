"use client";

import { useState, useEffect } from "react";

interface Booking {
    _id: string;
    vehicleTitle: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch from API
        setTimeout(() => {
            setBookings([
                {
                    _id: "BK-001",
                    vehicleTitle: "Tesla Model S Plaid",
                    startDate: "Jan 15, 2024",
                    endDate: "Jan 18, 2024",
                    totalPrice: 750,
                    status: "Confirmed",
                },
                {
                    _id: "BK-002",
                    vehicleTitle: "Porsche 911 GT3",
                    startDate: "Jan 20, 2024",
                    endDate: "Jan 22, 2024",
                    totalPrice: 890,
                    status: "Pending",
                },
                {
                    _id: "BK-003",
                    vehicleTitle: "Mercedes Sprinter",
                    startDate: "Dec 28, 2023",
                    endDate: "Jan 2, 2024",
                    totalPrice: 1200,
                    status: "Completed",
                },
            ]);
            setLoading(false);
        }, 500);
    }, []);

    return (
        <div>
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight mb-1">My Bookings</h2>
                <p className="text-slate-400 text-sm">View and manage your vehicle bookings.</p>
            </header>

            <div className="bento-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Booking ID</th>
                                <th className="px-6 py-4">Vehicle</th>
                                <th className="px-6 py-4">Start Date</th>
                                <th className="px-6 py-4">End Date</th>
                                <th className="px-6 py-4">Total Price</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-dark">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                        Loading...
                                    </td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                        No bookings yet.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-5 text-sm font-mono text-slate-400">#{booking._id}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded bg-slate-800 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-sm text-primary">electric_car</span>
                                                </div>
                                                <span className="text-sm font-semibold text-white">{booking.vehicleTitle}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-400">{booking.startDate}</td>
                                        <td className="px-6 py-5 text-sm text-slate-400">{booking.endDate}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-white">${booking.totalPrice}</td>
                                        <td className="px-6 py-5 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.status === "Confirmed"
                                                        ? "bg-primary/20 text-primary border border-primary/30"
                                                        : booking.status === "Pending"
                                                            ? "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                                                            : "bg-green-500/20 text-green-500 border border-green-500/30"
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">
                                                visibility
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
