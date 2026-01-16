"use client";

import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function UserProfilePage() {
    const { user } = useAuth();

    return (
        <>
            <header className="mb-10">
                <div className="flex items-center gap-6 mb-4">
                    <div
                        className="size-24 rounded-3xl bg-cover bg-center border-4 border-primary shadow-[0_0_30px_rgba(23,191,207,0.4)]"
                        style={{
                            backgroundImage: user?.photoURL
                                ? `url('${user.photoURL}')`
                                : "url('https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200')"
                        }}
                    ></div>
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tight mb-1">{user?.name || "Premium Member"}</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-primary font-bold text-xs uppercase tracking-widest">Global Account</span>
                            <div className="size-1 bg-slate-700 rounded-full"></div>
                            <span className="text-slate-500 font-medium text-xs uppercase tracking-widest">ID: VH-772910</span>
                        </div>
                    </div>
                </div>
                <p className="text-slate-400 text-sm max-w-xl">Manage your digital identity, security settings, and global mobility preferences.</p>
            </header>

            <ProfileForm />
        </>
    );
}
