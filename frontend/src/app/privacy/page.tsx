"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState("intro");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["intro", "privacy", "data", "terms", "liability", "rights"];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= 0 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { id: "intro", label: "Introduction", icon: "info" },
        { id: "privacy", label: "Privacy Policy", icon: "shield_lock" },
        { id: "data", label: "Data Collection", icon: "database" },
        { id: "terms", label: "Terms of Service", icon: "description" },
        { id: "liability", label: "Liability", icon: "gavel" },
        { id: "rights", label: "User Rights", icon: "verified_user" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-dark text-slate-100 font-sans">
            <main className="flex flex-1 justify-center px-6 lg:px-40 py-20">
                <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar Navigation */}
                        <aside className="lg:w-80 shrink-0">
                            <div className="sticky top-32 flex flex-col gap-8">
                                <div className="flex flex-col px-4">
                                    <h1 className="text-white text-xs font-black uppercase tracking-[0.2em]">Legal Center</h1>
                                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black w-fit border border-primary/20">
                                        LAST UPDATED: JAN 2026
                                    </div>
                                </div>

                                <nav className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all border ${activeSection === item.id
                                                    ? 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_20px_rgba(23,191,207,0.1)]'
                                                    : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/[0.03]'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                            <p className="text-sm font-bold tracking-tight">{item.label}</p>
                                        </a>
                                    ))}
                                </nav>

                                <div className="bg-white/[0.03] border border-white/[0.05] p-8 rounded-[32px] flex flex-col gap-4 mt-8">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Need assistance?</p>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light">Questions about our legal policies or data handling?</p>
                                    <Link
                                        href="/contact"
                                        className="bg-primary text-background-dark text-xs font-black py-3 px-6 rounded-xl hover:brightness-110 transition-all text-center mt-2"
                                    >
                                        Contact Legal Team
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="flex-1 max-w-3xl">
                            <div className="mb-20" id="intro">
                                <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-8">
                                    Privacy <br />& <span className="text-primary italic">Terms.</span>
                                </h1>
                                <p className="text-slate-400 text-lg leading-relaxed font-light">
                                    Welcome to VehicleHub. Your privacy and trust are paramount to us. These documents outline how we protect your data and the rules governing your use of our platform. We aim for absolute transparency in all our legal agreements.
                                </p>
                            </div>

                            <div className="space-y-32">
                                <section id="privacy" className="scroll-mt-32">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">shield_lock</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">01. Privacy Policy</h2>
                                    </div>
                                    <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light">
                                        <p>
                                            VehicleHub is committed to protecting your personal information. This policy explains what data we collect when you use our vehicle booking services and how that data is utilized to enhance your experience.
                                        </p>
                                        <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl space-y-4">
                                            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Key Principles</h4>
                                            <ul className="space-y-4">
                                                {[
                                                    "Minimal data collection for maximum security.",
                                                    "Zero sales of personal data to third-party marketers.",
                                                    "Direct control over your profile and data export."
                                                ].map((li, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                                                        <span className="text-base text-slate-300">{li}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section id="data" className="scroll-mt-32">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">database</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">02. Data Collection</h2>
                                    </div>
                                    <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-light">
                                        <p>When you register or book a vehicle, we collect specific identifiers to facilitate the transaction and comply with regulations.</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white/[0.03] border border-white/[0.05] p-6 rounded-2xl">
                                                <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2 uppercase tracking-widest">
                                                    <span className="material-symbols-outlined text-primary text-lg">person</span>
                                                    Account Data
                                                </h4>
                                                <p className="text-sm text-slate-500 font-light">Name, email, phone number, and driver's license verification details.</p>
                                            </div>
                                            <div className="bg-white/[0.03] border border-white/[0.05] p-6 rounded-2xl">
                                                <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2 uppercase tracking-widest">
                                                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                                                    Usage Data
                                                </h4>
                                                <p className="text-sm text-slate-500 font-light">Vehicle location (during active rental), IP address, and browser type.</p>
                                            </div>
                                        </div>
                                        <p className="text-sm border-t border-white/5 pt-8">
                                            All financial information is processed through PCI-compliant gateways. VehicleHub does not store full credit card details.
                                        </p>
                                    </div>
                                </section>

                                <section id="terms" className="scroll-mt-32">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">description</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">03. Terms of Service</h2>
                                    </div>
                                    <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-light">
                                        <p>By using VehicleHub, you agree to comply with the following usage requirements:</p>
                                        <ol className="space-y-6">
                                            {[
                                                { t: "Eligibility", d: "You must be at least 21 years old and possess a valid, unrestricted driver's license." },
                                                { t: "Vehicle Care", d: "Users are responsible for interior cleanliness and reporting any issues immediately." },
                                                { t: "Prohibited Uses", d: "Vehicles may not be used for racing, towing, or commercial transport of hazardous materials." }
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-4">
                                                    <span className="text-primary font-black opacity-30 text-2xl italic">0{i + 1}</span>
                                                    <div>
                                                        <strong className="text-white block mb-1 uppercase tracking-wider text-sm">{item.t}</strong>
                                                        <span className="text-base">{item.d}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </section>

                                <section id="liability" className="scroll-mt-32">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">gavel</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">04. Liability</h2>
                                    </div>
                                    <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-light">
                                        <p>VehicleHub acts as a marketplace platform. We are not liable for indirect, incidental, or consequential damages resulting from vehicle use.</p>
                                        <div className="bg-white/[0.03] p-10 rounded-[32px] border border-white/[0.05] italic font-light text-slate-300 relative overflow-hidden group">
                                            "To the maximum extent permitted by law, VehicleHub's total liability for any claim shall not exceed the total amount paid by the user for the specific booking."
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <span className="material-symbols-outlined text-6xl">format_quote</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section id="rights" className="scroll-mt-32">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">verified_user</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">05. User Rights</h2>
                                    </div>
                                    <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-light">
                                        <p>Depending on your location (e.g., GDPR, CCPA), you have specific rights regarding your personal data:</p>
                                        <div className="grid grid-cols-1 gap-4">
                                            {["Full access and portability of your personal data.", "Right to request erasure of your account and history.", "Correction of inaccurate or incomplete information."].map((right, i) => (
                                                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-primary/20 transition-all">
                                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                                    <span className="text-base text-slate-300 font-light">{right}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <footer className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 pb-20">
                                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">© 2026 VehicleHub Technologies Inc.</p>
                                <div className="flex gap-8">
                                    <Link href="/contact" className="text-slate-500 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest">Support Center</Link>
                                    <button className="text-slate-500 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest">Download PDF</button>
                                </div>
                            </footer>
                        </article>
                    </div>
                </div>
            </main>
        </div>
    );
}
