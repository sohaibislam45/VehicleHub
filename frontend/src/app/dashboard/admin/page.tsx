"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, Tooltip
} from "recharts";

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalVehicles: 0,
        totalBookings: 0,
        recentActivity: [] as any[],
        vehicleStats: [] as any[],
        bookingStats: [] as any[]
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get("/admin/stats");

                // Format vehicle stats for Pie Chart
                const vehicleData = response.data.vehicleStats.map((item: any) => ({
                    name: item._id,
                    value: item.count
                }));

                // Format booking stats for Area Chart (Trend)
                const bookingData = response.data.bookingStats.map((item: any) => ({
                    date: item._id,
                    bookings: item.count
                }));

                setStats({
                    totalUsers: response.data.users,
                    totalVehicles: response.data.vehicles,
                    totalBookings: response.data.bookings,
                    recentActivity: response.data.recentBookings,
                    vehicleStats: vehicleData,
                    bookingStats: bookingData
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const COLORS = ['#00C853', '#2962FF', '#FF6D00', '#AA00FF', '#00D4FF'];

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
                        <div className="relative size-48 flex-shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.vehicleStats}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {stats.vehicleStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold text-white">{stats.totalVehicles}</span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Total</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto max-h-[220px] custom-scrollbar pr-2">
                            {stats.vehicleStats.map((entry, index) => (
                                <div key={entry.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 font-medium">
                                        <span className="size-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                        <span className="text-slate-300 capitalize">{entry.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white">{entry.value}</span>
                                        <span className="text-xs text-slate-500">
                                            ({Math.round((entry.value / stats.totalVehicles) * 100)}%)
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {stats.vehicleStats.length === 0 && (
                                <div className="text-slate-500 text-sm text-center">No vehicles found</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bookings Trend */}
                <div className="bg-surface-dark p-6 rounded-xl border border-white/10 flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-white">Bookings Trend</h3>
                            <p className="text-sm text-slate-400">Activity over time</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20">30 Days</button>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.bookingStats}>
                                <defs>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00C853" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: '#64748b', fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={10}
                                    minTickGap={30}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    labelStyle={{ color: '#94a3b8' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="bookings"
                                    stroke="#00C853"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorBookings)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-surface-dark rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white">Recent System Activity</h3>
                    <a className="text-primary text-sm font-bold hover:underline" href="/dashboard/admin/bookings">
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
                            {stats.recentActivity.map((booking: any) => (
                                <tr key={booking._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-sm">directions_car</span>
                                            </div>
                                            <span className="font-medium text-white">Booking: {booking.vehicleId?.title || 'Unknown Vehicle'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-white">{booking.userId?.name || 'Deleted User'}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(booking.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="/dashboard/admin/bookings" className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">visibility</a>
                                    </td>
                                </tr>
                            ))}
                            {stats.recentActivity.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500 text-sm italic">
                                        No recent system activity found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
