"use client";

import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function AdminProfilePage() {
    const { user } = useAuth();

    return (
        <>
            <header className="mb-10">
                <div className="flex items-center gap-6 mb-4">
                    <div
                        className="size-24 rounded-3xl bg-cover bg-center border-4 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                        style={{
                            backgroundImage: user?.photoURL
                                ? `url('${user.photoURL}')`
                                : "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200')"
                        }}
                    ></div>
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tight mb-1">{user?.name || "System Admin"}</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">Administrator Core</span>
                            <div className="size-1 bg-slate-700 rounded-full"></div>
                            <span className="text-slate-500 font-medium text-xs uppercase tracking-widest">ID: AD-0001</span>
                        </div>
                    </div>
                </div>
                <p className="text-slate-400 text-sm max-w-xl">System-wide administrative profile. Control global parameters and monitor infrastructure status.</p>
            </header>

            <ProfileForm />
        </>
    );
}
