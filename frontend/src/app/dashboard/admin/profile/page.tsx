"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { uploadToImgBB } from "@/services/imgbbService";

export default function AdminProfilePage() {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        phoneNumber: "",
        location: "",
        bio: "",
        photoURL: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || "",
                phoneNumber: user.phoneNumber || "",
                location: user.location || "",
                bio: user.bio || "",
                photoURL: user.photoURL || ""
            });
        }
    }, [user]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadToImgBB(file);
            setFormData(prev => ({ ...prev, photoURL: url }));
            // Auto-update profile with new photo
            await api.patch("/auth/profile", { photoURL: url });
            if (setUser) setUser({ ...user, photoURL: url });
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        try {
            const response = await api.patch("/auth/profile", formData);
            if (setUser) {
                setUser({ ...user, ...response.data, displayName: response.data.name });
            }
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error: any) {
            console.error("Update error:", error);
            alert(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <h2 className="text-4xl font-black tracking-tight text-white mb-1">Administrative Profile</h2>
                <p className="text-slate-400 text-sm">Manage your system credentials and public administrative details.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-surface-dark rounded-2xl border border-white/5 p-8 text-center sticky top-24">
                        <div className="relative group mb-6 mx-auto w-32 h-32">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/20 bg-white/5 relative">
                                {formData.photoURL ? (
                                    <img src={formData.photoURL} alt="Profile" className="object-cover w-full h-full" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary">
                                        {formData.displayName?.charAt(0).toUpperCase() || "A"}
                                    </div>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-background-dark/80 flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-background-dark rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-4 border-surface-dark">
                                <span className="material-symbols-outlined text-xl font-bold">photo_camera</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{formData.displayName || "Administrator"}</h3>
                        <p className="text-xs text-primary font-bold uppercase tracking-[0.2em] mb-4">System Superuser</p>
                        <div className="h-[1px] bg-white/5 w-full mb-6"></div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-400 text-xs">
                                <span className="material-symbols-outlined text-lg">mail</span>
                                {user?.email}
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-xs">
                                <span className="material-symbols-outlined text-lg">verified_user</span>
                                Verified Administrator
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-surface-dark rounded-2xl border border-white/5 p-8 shadow-2xl space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">manage_accounts</span>
                                General Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Office Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                        placeholder="City, Country"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Administrative Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                                        placeholder="Tell us about your role..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <p className="text-xs text-slate-500 italic">
                                Last sync: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                            </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-10 py-3 bg-primary text-background-dark font-black uppercase tracking-[0.2em] text-sm rounded-xl hover:shadow-[0_0_30px_rgba(23,191,207,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading && <div className="size-4 border-2 border-background-dark border-t-transparent rounded-full animate-spin"></div>}
                                {success ? "Profile Updated!" : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
