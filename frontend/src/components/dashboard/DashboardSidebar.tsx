"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface DashboardSidebarProps {
    role: "user" | "admin";
}

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const userMenuItems = [
        { icon: "home", label: "Home", href: "/" },
        { icon: "dashboard", label: "Overview", href: "/dashboard/user" },
        { icon: "add_box", label: "Add Vehicle", href: "/dashboard/user/add-vehicle" },
        { icon: "garage", label: "My Vehicles", href: "/dashboard/user/vehicles" },
        { icon: "event_note", label: "My Bookings", href: "/dashboard/user/bookings" },
    ];

    const adminMenuItems = [
        { icon: "home", label: "Home", href: "/" },
        { icon: "dashboard", label: "Overview", href: "/dashboard/admin" },
        { icon: "commute", label: "Manage Vehicles", href: "/dashboard/admin/vehicles" },
        { icon: "group", label: "Manage Users", href: "/dashboard/admin/users" },
        { icon: "calendar_month", label: "Bookings", href: "/dashboard/admin/bookings" },
    ];

    const accountItems = [
        { icon: "person", label: "Profile", href: `/dashboard/${role}/profile` },
    ];

    const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

    return (
        <aside className="w-72 border-r border-border-dark flex flex-col fixed inset-y-0 bg-background-dark z-50">
            {/* Logo Section */}
            <div className="p-8 flex items-center gap-3">
                <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center neon-glow">
                    <span className="material-symbols-outlined text-white font-bold">directions_car</span>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-white text-xl font-bold tracking-tight">VehicleHub</h1>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold">
                        {role === "admin" ? "Admin Core" : "User Core"}
                    </p>
                </div>
            </div>

            {/* Main Menu */}
            <nav className="flex-1 px-4 py-4 space-y-2">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] px-4 pb-2">
                    Main Menu
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                ? "bg-primary/10 text-primary border-r-4 border-primary"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive ? "fill-1" : ""}`}>
                                {item.icon}
                            </span>
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}

                {/* Account Section */}
                <div className="pt-8 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] px-4 pb-2">
                    Account
                </div>
                {accountItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                ? "bg-primary/10 text-primary"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Section */}
            <div className="p-6 border-t border-border-dark">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div
                        className="size-10 rounded-full bg-cover bg-center border border-primary/30"
                        style={{
                            backgroundImage: user?.photoURL
                                ? `url('${user.photoURL}')`
                                : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-L4bjksbdplUz3qyTbDxasqIOSXRPWzg_mf-BIHDaU4vro4xIru8CZj7a5R0D86iUzFRraFFncySrebsHI_Aq-3qzKJib9aq8rbBd7o14DvIumoZNplsd2uGxnVYgrCb31hyLWNOfuAv2L_GwjVyoWa2XOSu7JNb_oEj4LTf4EHEm8Yq-16GpYbY1t17npdmxE18eNCgcB8onbXUL7PMvBCLkpiUKVmxoWLqiSwMl4DgckwufoDmWLW8elhDjAUN4eL56wUWOSBk')",
                        }}
                    ></div>
                    <div className="flex flex-col overflow-hidden flex-1">
                        <span className="text-sm font-bold truncate">{user?.name || "User"}</span>
                        <span className="text-[10px] text-primary font-medium tracking-wider uppercase">
                            {role === "admin" ? "Admin" : "Pro Member"}
                        </span>
                    </div>
                    <button
                        onClick={logout}
                        className="material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors"
                        title="Logout"
                    >
                        logout
                    </button>
                </div>
            </div>
        </aside>
    );
}
