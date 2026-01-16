"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function UserDashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 pt-10 pb-20">
            <div className="max-w-7xl mx-auto layout-padding">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Welcome back, <span className="text-primary">{user?.displayName?.split(" ")[0] || "Driver"}</span>
                        </h1>
                        <p className="text-slate-400">Manage your bookings and view your rental history.</p>
                    </div>
                    <Link href="/fleet" className="bg-primary text-background-dark px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(23,191,207,0.4)] transition-all text-center">
                        Browse Fleet
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl">key</span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Active Rentals</h3>
                        <p className="text-4xl font-bold text-slate-100">0</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl">history</span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Trips</h3>
                        <p className="text-4xl font-bold text-slate-100">0</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl">savings</span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Loyalty Points</h3>
                        <p className="text-4xl font-bold text-slate-100">0</p>
                    </div>
                </div>

                {/* Recent Activity / Empty State */}
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                <div className="glass-card p-12 rounded-2xl text-center border-dashed border border-white/10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-slate-400">no_crash</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">No rentals yet</h3>
                    <p className="text-slate-400 max-w-md mx-auto mb-8">
                        You haven&apos;t booked any vehicles yet. Start your journey by exploring our premium fleet.
                    </p>
                    <Link href="/fleet" className="text-primary font-bold hover:underline">
                        Find a vehicle
                    </Link>
                </div>
            </div>
        </div>
    );
}
