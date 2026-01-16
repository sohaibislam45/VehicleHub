"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfileForm() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "User",
        email: user?.email || "",
        phone: "+1 (555) 000-0000",
        bio: "Premium VehicleHub member since 2024.",
    });

    const handleSave = () => {
        // Mock save logic
        setIsEditing(false);
    };

    return (
        <div className="bento-card p-10 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Personal Information</h3>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${isEditing
                                ? "bg-primary text-background-dark shadow-[0_0_20px_rgba(23,191,207,0.3)]"
                                : "bg-white/5 text-slate-300 hover:bg-white/10"
                            }`}
                    >
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all"
                                />
                            ) : (
                                <p className="text-white font-semibold text-lg ml-1">{formData.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                            <p className="text-slate-400 font-medium text-lg ml-1">{formData.email}</p>
                            <span className="text-[8px] text-primary uppercase font-bold tracking-[0.2em] ml-1">Primary Account</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all"
                                />
                            ) : (
                                <p className="text-white font-semibold text-lg ml-1">{formData.phone}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Membership Tier</label>
                            <div className="flex items-center gap-2 text-amber-500 ml-1">
                                <span className="material-symbols-outlined text-sm fill-1">workspace_premium</span>
                                <span className="font-bold uppercase tracking-wider text-sm italic">Elite Platinum</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Bio / Preference</label>
                        {isEditing ? (
                            <textarea
                                rows={4}
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary transition-all resize-none"
                            />
                        ) : (
                            <p className="text-slate-400 leading-relaxed ml-1">{formData.bio}</p>
                        )}
                    </div>
                </div>

                {/* Security Section (Read-only for demo) */}
                <div className="mt-16 pt-10 border-t border-white/5">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-8">Security & Authentication</h3>
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                <span className="material-symbols-outlined">verified_user</span>
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Two-Factor Authentication</p>
                                <p className="text-slate-500 text-xs">Enhanced protection for your account</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full">Active</span>
                    </div>
                </div>
            </div>
            {/* Background decoration */}
            <div className="absolute -bottom-24 -right-24 size-64 bg-primary/5 blur-[100px]"></div>
        </div>
    );
}
