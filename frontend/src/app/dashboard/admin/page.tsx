"use client";

import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 pt-10 pb-20">
            <div className="max-w-7xl mx-auto layout-padding">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Admin Portal
                        </h1>
                        <p className="text-slate-400">Manage fleet, users, and booking references.</p>
                    </div>
                    <button className="bg-red-500/10 text-red-400 border border-red-500/20 px-6 py-3 rounded-xl font-bold hover:bg-red-500/20 transition-all text-center">
                        System Status: Online
                    </button>
                </div>

                {/* Admin Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Total Revenue</h3>
                        <p className="text-3xl font-bold text-slate-100">$12,450</p>
                        <span className="text-green-400 text-xs font-bold">+12% this month</span>
                    </div>
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Active Bookings</h3>
                        <p className="text-3xl font-bold text-slate-100">24</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Fleet Status</h3>
                        <p className="text-3xl font-bold text-slate-100">18/25</p>
                        <span className="text-slate-500 text-xs">Available</span>
                    </div>
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">New Users</h3>
                        <p className="text-3xl font-bold text-slate-100">156</p>
                    </div>
                </div>

                {/* Recent Bookings Table Placeholder */}
                <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
                <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">ID</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">User</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Vehicle</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Dates</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-slate-400 font-mono text-xs">#BK-8821</td>
                                    <td className="p-4 font-bold">Alex Morgan</td>
                                    <td className="p-4 text-slate-300">Tesla Model S Plaid</td>
                                    <td className="p-4 text-slate-400 text-sm">Jan 15 - Jan 18</td>
                                    <td className="p-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">Confirmed</span></td>
                                    <td className="p-4 text-primary text-sm font-bold cursor-pointer hover:underline">Manage</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-slate-400 font-mono text-xs">#BK-8822</td>
                                    <td className="p-4 font-bold">Sarah Jenkins</td>
                                    <td className="p-4 text-slate-300">Porsche Taycan</td>
                                    <td className="p-4 text-slate-400 text-sm">Jan 16 - Jan 20</td>
                                    <td className="p-4"><span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs font-bold uppercase">Pending</span></td>
                                    <td className="p-4 text-primary text-sm font-bold cursor-pointer hover:underline">Manage</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
