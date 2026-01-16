"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        phone: "",
        location: "",
        bio: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Update profile via API
        setIsEditing(false);
    };

    return (
        <div>
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight mb-1">Profile Settings</h2>
                <p className="text-slate-400 text-sm">Manage your account information.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bento-card p-6 rounded-xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="size-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-4">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="size-full rounded-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-primary">{user?.displayName?.charAt(0) || "U"}</span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{user?.displayName || "User"}</h3>
                        <p className="text-sm text-slate-400 mb-4">{user?.email}</p>
                        <button className="px-4 py-2 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all">
                            Change Photo
                        </button>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2 bento-card p-8 rounded-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Personal Information</h3>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm hover:scale-[1.02] transition-all"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 bg-white/5 border border-border-dark rounded-lg focus:outline-none focus:border-primary text-white disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                    className="w-full px-4 py-3 bg-white/5 border border-border-dark rounded-lg focus:outline-none focus:border-primary text-white opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 bg-white/5 border border-border-dark rounded-lg focus:outline-none focus:border-primary text-white disabled:opacity-50"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 bg-white/5 border border-border-dark rounded-lg focus:outline-none focus:border-primary text-white disabled:opacity-50"
                                    placeholder="City, Country"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/5 border border-border-dark rounded-lg focus:outline-none focus:border-primary text-white disabled:opacity-50 resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-3 rounded-lg border border-border-dark text-slate-300 font-bold hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-lg bg-primary text-white font-bold neon-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
