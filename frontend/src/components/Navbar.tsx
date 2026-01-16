"use client";

import Image from "next/image";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto layout-padding h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                        <Image
                            src="/logo.png"
                            alt="VehicleHub Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <Link href="/" className="text-xl font-bold tracking-tighter uppercase text-slate-100">
                        VehicleHub
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-10">
                    <Link
                        href="/explore"
                        className="text-sm font-medium text-slate-100 hover:text-primary transition-colors"
                    >
                        Explore
                    </Link>
                    <Link
                        href="/explore"
                        className="text-sm font-medium text-slate-100 hover:text-primary transition-colors"
                    >
                        Fleet
                    </Link>
                    <Link
                        href="/explore"
                        className="text-sm font-medium text-slate-100 hover:text-primary transition-colors"
                    >
                        Rentals
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-slate-100 hover:text-primary transition-colors"
                    >
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link href="/login" className="text-sm font-semibold px-5 py-2 text-slate-100 hover:text-primary transition-colors">
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-primary text-background-dark px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:brightness-110 transition-all"
                            >
                                Book Now
                            </Link>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 relative bg-white/5">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-primary flex items-center justify-center text-background-dark font-bold text-lg">
                                            {user.displayName?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}
                                </div>
                                <div className="hidden sm:flex flex-col items-start">
                                    <span className="text-sm font-bold text-slate-100 leading-none">
                                        {user.displayName?.split(" ")[0] || "User"}
                                    </span>
                                    <span className="text-[10px] text-primary uppercase tracking-wider font-medium leading-none mt-1">
                                        {user.role === 'admin' ? 'Administrator' : 'Member'}
                                    </span>
                                </div>
                                <span className={`material-symbols-outlined text-slate-400 text-sm transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-4 w-56 glass-card rounded-2xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col py-2 animate-in fade-in slide-in-from-top-2 z-50">
                                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                                        <p className="text-sm font-bold text-slate-100 truncate">{user.displayName || "User"}</p>
                                        <p className="text-xs text-slate-400 truncate font-mono">{user.email}</p>
                                    </div>

                                    <Link
                                        href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                                        className="px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <span className="material-symbols-outlined text-lg">dashboard</span>
                                        Dashboard
                                    </Link>

                                    <div className="h-[1px] bg-white/5 my-2"></div>

                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsDropdownOpen(false);
                                        }}
                                        className="px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left w-full flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-lg">logout</span>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
