"use client";

import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
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
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="bg-background-dark min-h-screen">
            <main className="pt-32 pb-24">
                <section className="max-w-7xl mx-auto layout-padding">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Get in Touch</span>
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                            How Can We <br />
                            <span className="text-primary italic">Help You?</span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Our elite concierge team is available 24/7 to assist with your inquiries, bookings, and bespoke requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Contact Info */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                                <div className="space-y-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">map</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Global Headquarters</h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        122 Sourcing Tower, Digital Way <br />
                                        Silicon Valley, CA 94025
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">call</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Concierge Line</h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        +1 (888) VEH-HUB-0 <br />
                                        Available 24/7
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Digital Mailbox</h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        concierge@vehiclehub.com <br />
                                        press@vehiclehub.com
                                    </p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="pt-8 border-t border-white/5">
                                <h4 className="text-white font-bold mb-6">Connect with the Vanguard</h4>
                                <div className="flex gap-4">
                                    {['Instagram', 'Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                                        <a key={social} href="#" className="w-12 h-12 rounded-xl bg-surface-dark border border-white/5 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 transition-all">
                                            <span className="sr-only">{social}</span>
                                            {/* Social icons would go here, using placeholders for now */}
                                            <span className="material-symbols-outlined">north_east</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="glass-card p-8 md:p-12 rounded-[40px] border border-white/5 relative overflow-hidden">
                                {submitted ? (
                                    <div className="py-20 text-center space-y-6">
                                        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                                            <span className="material-symbols-outlined text-4xl">check_circle</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Message Received.</h2>
                                        <p className="text-slate-400">Our concierge team will review your inquiry and respond within 2 hours.</p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-primary font-bold hover:underline"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Subject of Inquiry</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary transition-all"
                                                placeholder="Bespoke Booking Request"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                                            <textarea
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-primary transition-all resize-none"
                                                placeholder="How can our team assist you today?"
                                            ></textarea>
                                        </div>
                                        <button
                                            disabled={isSubmitting}
                                            className="w-full h-16 bg-primary text-background-dark font-black text-lg rounded-2xl hover:shadow-[0_0_40px_rgba(23,191,207,0.4)] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="w-5 h-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></span>
                                                    Transmitting...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined">send</span>
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                                {/* Decorative elements */}
                                <div className="absolute -bottom-24 -right-24 size-64 bg-primary/5 blur-[100px]"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
