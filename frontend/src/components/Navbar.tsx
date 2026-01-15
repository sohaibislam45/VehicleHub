"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto layout-padding h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-primary">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                    <Link href="/" className="text-xl font-bold tracking-tighter uppercase text-slate-100">
                        VehicleHub
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-10">
                    <Link
                        href="/fleet"
                        className="text-sm font-medium text-slate-100 hover:text-primary transition-colors"
                    >
                        Fleet
                    </Link>
                    <Link
                        href="/categories"
                        className="text-sm font-medium text-slate-100 hover:text-primary transition-colors"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/concierge"
                        className="text-sm font-medium text-slate-100 hover:text-primary transition-colors"
                    >
                        Concierge
                    </Link>
                    <Link
                        href="/pricing"
                        className="text-sm font-medium text-slate-100 hover:text-primary transition-colors"
                    >
                        Pricing
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
                        <Link
                            href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                            className="bg-primary text-background-dark px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:brightness-110 transition-all"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
