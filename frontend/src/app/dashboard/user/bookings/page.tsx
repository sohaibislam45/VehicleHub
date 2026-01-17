"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

interface Booking {
    _id: string;
    vehicleId: {
        _id: string;
        title: string;
        images: string[];
    };
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get("/bookings/my");
            setBookings(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { bg: string; text: string; border: string; pulse?: boolean }> = {
            booked: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", pulse: true },
            interested: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20" },
            completed: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
            cancelled: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
        };

        const config = statusConfig[status.toLowerCase()] || statusConfig.booked;

        return (
            <div className={`flex items-center gap-1.5 px-3 py-1 ${config.bg} border ${config.border} rounded-full`}>
                <span className={`w-2 h-2 rounded-full ${config.text.replace('text-', 'bg-')} ${config.pulse ? 'animate-pulse' : ''}`}></span>
                <span className={`text-xs font-bold ${config.text} uppercase tracking-widest`}>{status}</span>
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).toUpperCase();
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <h2 className="text-5xl font-bold tracking-tight text-white mb-4">My Bookings History</h2>
                <p className="text-lg text-slate-400 max-w-2xl">
                    Manage your upcoming journeys and review your past high-performance vehicle rentals.
                </p>
            </div>

            {/* Bookings List */}
            <div className="flex flex-col gap-6">
                {loading ? (
                    <div className="text-center py-12 text-slate-400">Loading...</div>
                ) : bookings.length === 0 ? (
                    <div className="mt-10 py-20 px-6 bg-surface-dark/50 border-2 border-dashed border-border-dark rounded-3xl flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 mb-6 rounded-full bg-surface-dark flex items-center justify-center">
                            <span className="material-symbols-outlined text-5xl text-slate-600">no_accounts</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">No bookings yet</h4>
                        <p className="text-slate-400 mb-8 max-w-xs">
                            Your future adventures are waiting for the right ride. Start exploring our fleet today.
                        </p>
                        <button className="bg-primary text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                            Start Exploring
                        </button>
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="group bg-surface-dark p-6 rounded-xl border border-border-dark flex items-center justify-between shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-8">
                                <div className="w-48 h-28 rounded-lg overflow-hidden relative">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={booking.vehicleId.images?.[0] || "https://via.placeholder.com/400x300"}
                                        alt={booking.vehicleId.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                        {booking.vehicleId.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                        <p className="text-sm font-medium tracking-wide">
                                            {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center gap-4">
                                        {getStatusBadge(booking.status)}
                                        <span className="text-xs font-medium text-slate-400">Ref: #{booking._id}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(booking._id);
                                        alert('Booking ID copied to clipboard!');
                                    }}
                                    className="p-3 rounded-lg border border-border-dark text-slate-400 hover:text-white hover:bg-surface-dark transition-all"
                                    title="Copy Booking ID"
                                >
                                    <span className="material-symbols-outlined">content_copy</span>
                                </button>
                                <a
                                    href={`/vehicles/${booking.vehicleId._id}`}
                                    className={`px-6 py-3 rounded-lg font-bold text-sm transition-colors ${booking.status.toLowerCase() === "interested"
                                        ? "bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20"
                                        : "bg-surface-dark text-white hover:bg-slate-700"
                                        }`}
                                >
                                    {booking.status.toLowerCase() === "interested" ? "Complete Booking" : "View Details"}
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
