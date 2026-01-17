"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import StatsCard from "@/components/dashboard/StatsCard";
import { vehicleService } from "@/services/vehicleService";

interface BookingData {
    _id: string;
    vehicleId: {
        _id: string;
        title: string;
        images: string[];
    };
    startDate: string;
    endDate: string;
    status: string;
    totalPrice: number;
}

export default function UserDashboardPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        vehiclesAdded: 0,
        bookingsMade: 0,
        totalSpent: 0,
    });
    const [recentBookings, setRecentBookings] = useState<BookingData[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const bookings = await vehicleService.getUserBookings();
                setRecentBookings(bookings);

                const totalSpent = bookings.reduce((sum: number, b: any) => sum + b.totalPrice, 0);

                setStats({
                    vehiclesAdded: 0, // Need a separate API if this is "count of vehicles I listed"
                    bookingsMade: bookings.length,
                    totalSpent: totalSpent,
                });
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <>
            {/* Header Section */}
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-1">Dashboard Overview</h2>
                    <p className="text-slate-400 text-sm">Welcome back, here's what's happening with your fleet.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all uppercase tracking-wider">
                        Explore More
                    </button>
                    <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm neon-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 uppercase tracking-wider">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add New Vehicle
                    </button>
                </div>
            </header>

            {/* Stats Bento Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title="Vehicles Added"
                    value={stats.vehiclesAdded}
                    change="+20%"
                    icon="directions_car"
                    progressPercent={67}
                />
                <StatsCard
                    title="Bookings Made"
                    value={stats.bookingsMade}
                    change="+15%"
                    icon="calendar_today"
                    progressPercent={50}
                />
                <StatsCard
                    title="Total Spent"
                    value={`৳${stats.totalSpent.toLocaleString()}`}
                    change="+10%"
                    icon="payments"
                    progressPercent={80}
                />
            </div>

            {/* Booking Activity Chart */}
            <div className="grid grid-cols-1 mb-8">
                <div className="bento-card p-8 rounded-xl">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h4 className="text-xl font-bold text-white mb-1">Booking Activity</h4>
                            <p className="text-slate-400 text-xs">Aggregated performance over the last 6 months</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 rounded bg-white/5 border border-border-dark text-[10px] font-bold text-slate-400 uppercase cursor-pointer">
                                Daily
                            </div>
                            <div className="px-3 py-1 rounded bg-primary/20 border border-primary/40 text-[10px] font-bold text-primary uppercase cursor-pointer">
                                Monthly
                            </div>
                            <div className="px-3 py-1 rounded bg-white/5 border border-border-dark text-[10px] font-bold text-slate-400 uppercase cursor-pointer">
                                Yearly
                            </div>
                        </div>
                    </div>
                    <div className="h-[260px] w-full relative">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                            <defs>
                                <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: "#17bfcf", stopOpacity: 0.4 }}></stop>
                                    <stop offset="100%" style={{ stopColor: "#17bfcf", stopOpacity: 0 }}></stop>
                                </linearGradient>
                            </defs>
                            <line stroke="#2d3339" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50"></line>
                            <line stroke="#2d3339" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="100" y2="100"></line>
                            <line stroke="#2d3339" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150"></line>
                            <path
                                d="M0,180 C100,160 150,40 250,60 C350,80 450,150 550,120 C650,90 750,20 850,50 C950,80 1000,100 1000,100 V200 H0 Z"
                                fill="url(#chartGradient)"
                            ></path>
                            <path
                                d="M0,180 C100,160 150,40 250,60 C350,80 450,150 550,120 C650,90 750,20 850,50 C950,80 1000,100 1000,100"
                                fill="none"
                                stroke="#17bfcf"
                                strokeLinecap="round"
                                strokeWidth="4"
                            ></path>
                            <circle cx="250" cy="60" fill="#17bfcf" r="6" stroke="#111317" strokeWidth="2"></circle>
                            <circle cx="850" cy="50" fill="#17bfcf" r="6" stroke="#111317" strokeWidth="2"></circle>
                        </svg>
                        <div className="flex justify-between mt-6 px-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Jan</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Feb</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-primary">Mar</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Apr</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">May</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-primary">Jun</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="bento-card rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border-dark flex justify-between items-center">
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider">Recent Bookings</h4>
                    <a className="text-primary text-xs font-bold hover:underline" href="/dashboard/user/bookings">
                        View All Records
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em]">
                            <tr>
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Vehicle Model</th>
                                <th className="px-6 py-4">Booking Date</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-dark">
                            {recentBookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5 text-sm font-mono text-slate-400">#{booking._id}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-slate-800 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-sm text-primary">electric_car</span>
                                            </div>
                                            <span className="text-sm font-semibold text-white">{booking.vehicleId.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-slate-400">{booking.startDate}</td>
                                    <td className="px-6 py-5 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.status === "Confirmed"
                                                ? "bg-primary/20 text-primary border border-primary/30"
                                                : "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right text-sm font-bold text-white">৳{booking.totalPrice.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 py-6 border-t border-border-dark flex justify-between items-center text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                <div>© 2024 VehicleHub Infrastructure v4.2.0</div>
                <div className="flex gap-6">
                    <a className="hover:text-primary transition-colors" href="#">
                        Privacy Policy
                    </a>
                    <a className="hover:text-primary transition-colors" href="#">
                        Terms of Service
                    </a>
                    <a className="hover:text-primary transition-colors" href="#">
                        Support
                    </a>
                </div>
            </footer>
        </>
    );
}
