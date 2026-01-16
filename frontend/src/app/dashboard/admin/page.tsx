"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalVehicles: 0,
        totalBookings: 0,
        recentActivity: [] as any[]
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get("/admin/stats");
                setStats({
                    totalUsers: response.data.users,
                    totalVehicles: response.data.vehicles,
                    totalBookings: response.data.bookings,
                    recentActivity: response.data.recentBookings
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            {/* Header Section */}
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-white mb-1">Admin Dashboard Overview</h2>
                    <p className="text-slate-400 text-sm">Real-time system-wide monitoring and analytics.</p>
                </div>
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">add</span>
                    New Vehicle
                </button>
            </header>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-surface-dark p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500">+5.2%</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Total Users</p>
                    <h3 className="text-3xl font-bold mt-1 tracking-tight text-white">{stats.totalUsers.toLocaleString()}</h3>
                    <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[75%]"></div>
                    </div>
                </div>

                <div className="bg-surface-dark p-6 rounded-xl border border-white/10 hover:border-accent-blue/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-accent-blue/10 rounded-lg text-accent-blue">
                            <span className="material-symbols-outlined">directions_car</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500">+2.1%</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Total Vehicles</p>
                    <h3 className="text-3xl font-bold mt-1 tracking-tight text-white">{stats.totalVehicles}</h3>
                    <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-blue w-[40%]"></div>
                    </div>
                </div>

                <div className="bg-surface-dark p-6 rounded-xl border border-white/10 hover:border-accent-orange/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-accent-orange/10 rounded-lg text-accent-orange">
                            <span className="material-symbols-outlined">confirmation_number</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500">+12.5%</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Total Bookings</p>
                    <h3 className="text-3xl font-bold mt-1 tracking-tight text-white">{stats.totalBookings.toLocaleString()}</h3>
                    <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-orange w-[90%]"></div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Vehicles by Category */}
                <div className="bg-surface-dark p-6 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-white">Vehicles by Category</h3>
                            <p className="text-sm text-slate-400">Fleet distribution</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 cursor-pointer">more_vert</span>
                    </div>
                    <div className="flex items-center justify-between gap-8 h-[220px]">
                        {/* Pie Chart */}
                        <div className="relative size-48">
                            <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="stroke-primary/20"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeWidth="4"
                                ></path>
                                <path
                                    className="stroke-primary"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeDasharray="40, 100"
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                ></path>
                                <path
                                    className="stroke-accent-blue"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeDasharray="25, 100"
                                    strokeDashoffset="-40"
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                ></path>
                                <path
                                    className="stroke-accent-orange"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeDasharray="15, 100"
                                    strokeDashoffset="-65"
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                ></path>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-white">840</span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Total</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 font-medium">
                                    <span className="size-3 rounded-full bg-primary"></span>Sedan
                                </div>
                                <span className="font-bold text-white">336 (40%)</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 font-medium">
                                    <span className="size-3 rounded-full bg-accent-blue"></span>SUV
                                </div>
                                <span className="font-bold text-white">210 (25%)</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 font-medium">
                                    <span className="size-3 rounded-full bg-accent-orange"></span>Luxury
                                </div>
                                <span className="font-bold text-white">126 (15%)</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <div className="flex items-center gap-2 font-medium">
                                    <span className="size-3 rounded-full bg-white/20"></span>Other
                                </div>
                                <span className="font-bold">168 (20%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Trend */}
                <div className="bg-surface-dark p-6 rounded-xl border border-white/10 flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-white">Bookings Trend</h3>
                            <p className="text-sm text-slate-400">Weekly volume activity</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20">7 Days</button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 border border-white/10">30 Days</button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col min-h-[220px]">
                        <div className="flex-1 relative">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                                <path
                                    className="fill-primary/10"
                                    d="M0,80 C50,70 80,90 120,40 C160,0 200,60 240,30 C280,10 320,50 360,20 L400,10 V100 H0 Z"
                                ></path>
                                <path
                                    className="stroke-primary fill-none"
                                    d="M0,80 C50,70 80,90 120,40 C160,0 200,60 240,30 C280,10 320,50 360,20 L400,10"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                ></path>
                            </svg>
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-surface-dark rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white">Recent System Activity</h3>
                    <a className="text-primary text-sm font-bold hover:underline" href="#">
                        View All Logs
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Event Description</th>
                                <th className="px-6 py-4">Entity/User</th>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">person_add</span>
                                        </div>
                                        <span className="font-medium text-white">New User Registered</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-white">John Doe</td>
                                <td className="px-6 py-4 text-sm text-slate-500">2 mins ago</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-green-500/10 text-green-500 uppercase">Success</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">visibility</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">directions_car</span>
                                        </div>
                                        <span className="font-medium text-white">New Vehicle Added</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-white">Tesla Model S #840</td>
                                <td className="px-6 py-4 text-sm text-slate-500">14 mins ago</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-green-500/10 text-green-500 uppercase">Verified</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">visibility</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">warning</span>
                                        </div>
                                        <span className="font-medium text-white">Booking Cancelled</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-white">Booking #BK-9921</td>
                                <td className="px-6 py-4 text-sm text-slate-500">1 hour ago</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-red-500/10 text-red-500 uppercase">Refunded</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">visibility</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
