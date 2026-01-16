"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { uploadToImgBB } from "@/services/imgbbService";
import api from "@/lib/api";

export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    const [formData, setFormData] = useState({
        displayName: user?.displayName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        location: user?.location || "",
        bio: user?.bio || "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                location: user.location || "",
                bio: user.bio || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingPhoto(true);
        try {
            const photoURL = await uploadToImgBB(file);
            await api.patch("/auth/profile", { photoURL });
            if (setUser) {
                setUser({ ...user, photoURL });
            }
            alert("Profile photo updated successfully!");
        } catch (error) {
            console.error("Photo upload error:", error);
            alert("Failed to update profile photo.");
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.patch("/auth/profile", formData);
            if (setUser) {
                const updatedUser = {
                    ...user,
                    ...response.data,
                    displayName: response.data.name || response.data.displayName || user.displayName,
                };
                setUser(updatedUser);
            }
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Profile update error:", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-10">
                <h2 className="text-4xl font-black text-white tracking-tight mb-2">Account Profile</h2>
                <p className="text-slate-400 text-lg">Manage your personal information and profile settings.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-surface-dark p-8 rounded-2xl border border-border-dark flex flex-col items-center text-center shadow-xl sticky top-24">
                        <div className="relative group mb-6">
                            <div className="size-32 rounded-full border-4 border-primary/20 p-1 flex items-center justify-center bg-background-dark overflow-hidden">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="size-full rounded-full object-cover" />
                                ) : (
                                    <div className="size-full rounded-full bg-primary flex items-center justify-center text-background-dark font-black text-4xl">
                                        {(user?.displayName || user?.name || "U").charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={uploadingPhoto} />
                                <span className="material-symbols-outlined text-white text-3xl">
                                    {uploadingPhoto ? "progress_activity" : "photo_camera"}
                                </span>
                            </label>
                            {uploadingPhoto && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                                    <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-1">{user?.displayName || user?.name || "User"}</h3>
                        <p className="text-slate-400 font-medium mb-6">{user?.email}</p>

                        <div className="w-full">
                            <div className="bg-background-dark/50 p-4 rounded-xl border border-border-dark/50 text-left">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Account Role</p>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">verified</span>
                                    <span className="text-sm text-white font-bold">{user?.role?.toUpperCase() || "USER"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <div className="bg-surface-dark p-8 rounded-2xl border border-border-dark shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                General Information
                            </h3>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold text-sm hover:bg-primary/20 transition-all"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-50"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed opacity-50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-50"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-50"
                                        placeholder="City, Country"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bio / Description</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows={4}
                                        className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-50 resize-none"
                                        placeholder="Write a short bio about yourself..."
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex gap-4 pt-6 border-t border-border-dark">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-8 py-3 rounded-xl border border-border-dark text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-10 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                                        <span>{loading ? "Saving..." : "Save Changes"}</span>
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
