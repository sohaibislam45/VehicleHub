"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Fleet Management Inquiry",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "Fleet Management Inquiry", message: "" });
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-dark text-white font-sans">
            <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
                {/* Header Section */}
                <div className="mb-16">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-white">
                        Contact <span className="text-primary italic">Us.</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl font-light leading-relaxed">
                        Connect with our automotive specialists. Whether you're managing a fleet or booking your next journey, we're available 24/7 to assist you.
                    </p>
                </div>

                {/* Split Screen Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                    {/* Left Panel: Information & Map */}
                    <div className="flex flex-col gap-4">
                        {/* Info Card */}
                        <div className="glass-card rounded-[40px] p-10 flex flex-col gap-10 border border-white/5 relative overflow-hidden group">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="space-y-3 overflow-hidden">
                                    <div className="flex items-center gap-2 text-primary">
                                        <span className="material-symbols-outlined text-xl">call</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Support Hotline</span>
                                    </div>
                                    <p className="text-xl md:text-2xl font-bold text-white tracking-tight break-all">+01712456789</p>
                                </div>
                                <div className="space-y-3 overflow-hidden">
                                    <div className="flex items-center gap-2 text-primary">
                                        <span className="material-symbols-outlined text-xl">mail</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Email Us</span>
                                    </div>
                                    <p className="text-xl md:text-2xl font-bold text-white tracking-tight break-all">sohaibislam45@gmail.com</p>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-white/5">
                                <div className="flex items-center gap-2 text-primary mb-3">
                                    <span className="material-symbols-outlined text-xl">location_on</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Headquarter</span>
                                </div>
                                <p className="text-slate-400 text-lg">Suvastu Ittefaq Tower, Panthapath, Dhaka, Bangladesh</p>
                            </div>
                            {/* Decorative blur */}
                            <div className="absolute -bottom-12 -right-12 size-48 bg-primary/5 blur-[80px] group-hover:bg-primary/10 transition-all duration-700"></div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="glass-card rounded-[40px] p-2 h-full min-h-[400px] overflow-hidden border border-white/5 relative group">
                            <div className="w-full h-full bg-slate-900/50 rounded-[34px] relative overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.03694485038!2d90.3654215!3d23.74614945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                                    className="w-full h-full border-0 grayscale invert contrast-125 opacity-50"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                                <div className="absolute bottom-6 left-6 glass-card px-5 py-3 rounded-2xl text-xs font-bold text-white border border-white/10 flex items-center gap-3 backdrop-blur-xl z-20">
                                    <span className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    Drag to adjust
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Contact Form */}
                    <div className="glass-card rounded-[40px] p-8 lg:p-14 border border-white/5 relative overflow-hidden">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-16">
                                <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                                    <span className="material-symbols-outlined text-5xl">check_circle</span>
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">Message Received.</h2>
                                    <p className="text-slate-400 text-lg max-w-sm font-light">
                                        Our concierge team will review your inquiry and respond within 2 hours.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-primary font-bold transition-all border border-white/5 hover:border-primary/20"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-12">
                                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Get in Touch</h3>
                                    <p className="text-slate-400 font-light">Fill out the form below and our team will reach out shortly.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary/50 transition-all font-light"
                                                placeholder="Sohaib Islam"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary/50 transition-all font-light"
                                                placeholder="sohaib@gmail.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Inquiry Subject</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary/50 transition-all font-light appearance-none cursor-pointer"
                                        >
                                            <option className="bg-[#1c2022]">Fleet Management Inquiry</option>
                                            <option className="bg-[#1c2022]">Personal Booking Support</option>
                                            <option className="bg-[#1c2022]">Billing & Payments</option>
                                            <option className="bg-[#1c2022]">Technical Issue</option>
                                            <option className="bg-[#1c2022]">Partnership Proposal</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Your Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-primary/50 transition-all resize-none font-light leading-relaxed"
                                            placeholder="Tell us how we can assist you..."
                                        ></textarea>
                                    </div>
                                    <button
                                        disabled={isSubmitting}
                                        className="w-full h-16 bg-primary text-background-dark font-black rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(23,191,207,0.2)] disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-5 h-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></span>
                                        ) : (
                                            <>
                                                <span>Send Transmission</span>
                                                <span className="material-symbols-outlined text-xl">send</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                                {/* Status Indicator */}
                                <div className="mt-10 flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                    <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        <span className="material-symbols-outlined text-xl">check_circle</span>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white">System Status</p>
                                        <p className="text-slate-500 font-light">All channels operating normally.</p>
                                    </div>
                                </div>
                            </>
                        )}
                        {/* Decorative blur */}
                        <div className="absolute -top-12 -left-12 size-48 bg-primary/5 blur-[80px]"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
