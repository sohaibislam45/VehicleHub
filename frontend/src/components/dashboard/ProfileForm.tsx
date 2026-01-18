"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { uploadToImgBB } from "@/services/imgbbService";
import { useSweetAlert } from "@/hooks/useSweetAlert";

export default function ProfileForm() {
    const { user, setUser } = useAuth();
    const { showSuccess, showError, showLoading, closeLoading } = useSweetAlert();
    const [isEditing, setIsEditing] = useState(false);
    // keeping local states for button disabling if needed, though loader covers screen
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: user?.name || user?.displayName || "User",
        email: user?.email || "",
        phone: user?.phoneNumber || "",
        bio: user?.bio || "",
        photoURL: user?.photoURL || "",
    });

    const handleSave = async () => {
        setLoading(true);
        showLoading("Updating Profile", "Please wait while we save your changes...");
        try {
            const response = await api.patch('/auth/profile', {
                displayName: formData.name,
                phone: formData.phone,
                bio: formData.bio,
                photoURL: formData.photoURL
            });

            // Update local user context
            setUser({ ...user, ...response.data });
            setIsEditing(false);
            closeLoading();
            showSuccess("Profile Updated", "Your profile has been updated successfully.");
        } catch (error) {
            console.error("Error updating profile:", error);
            closeLoading();
            showError("Update Failed", "Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        showLoading("Uploading Photo", "Optimizing and uploading your profile picture...");
        try {
            const url = await uploadToImgBB(file);
            setFormData(prev => ({ ...prev, photoURL: url }));
            closeLoading();
            showSuccess("Photo Uploaded", "Your profile picture has been uploaded.");
        } catch (error) {
            console.error("Error uploading photo:", error);
            closeLoading();
            showError("Upload Failed", "Failed to upload photo. Please check your connection and try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bento-card p-10 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Personal Information</h3>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        disabled={loading || uploading}
                        className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${isEditing
                            ? "bg-primary text-background-dark shadow-[0_0_20px_rgba(23,191,207,0.3)]"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                            } ${(loading || uploading) ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>

                {/* Profile Photo - Visible & Editable in Header area on parent page, but let's add a local preview/edit here if user wants, 
                    OR we can assume the parent page header updates automatically via context. 
                    Let's add a photo section inside this form for clarity if editing. */}

                <div className="mb-8 flex items-center gap-6">
                    <div
                        onClick={handlePhotoClick}
                        className={`size-24 rounded-3xl bg-cover bg-center border-4 border-primary/20 shadow-lg relative group ${isEditing ? "cursor-pointer hover:border-primary transition-colors" : ""}`}
                        style={{
                            backgroundImage: formData.photoURL
                                ? `url('${formData.photoURL}')`
                                : "url('https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200')"
                        }}
                    >
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[20px]">
                                <span className="material-symbols-outlined text-white">photo_camera</span>
                            </div>
                        )}
                        {uploading && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-[20px]">
                                <span className="material-symbols-outlined text-white animate-spin">progress_activity</span>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Profile Photo</p>
                        {isEditing && <p className="text-primary text-xs">Click photo to upload new image</p>}
                    </div>
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
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-all"
                                />
                            ) : (
                                <p className="text-white font-semibold text-lg ml-1">{formData.phone || "Not set"}</p>
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
                            <p className="text-slate-400 leading-relaxed ml-1">{formData.bio || "No bio added yet."}</p>
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
