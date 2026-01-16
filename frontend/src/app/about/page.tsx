"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            <main className="pt-20">
                {/* Cinematic Hero Section */}
                <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121416]/90 z-10"></div>
                        <Image
                            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
                            alt="Cinematic luxury car"
                            fill
                            className="object-cover grayscale opacity-50"
                        />
                    </div>
                    <div className="relative z-20 text-center max-w-4xl px-6">
                        <span className="inline-block px-4 py-1 mb-6 border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
                            Our Mission
                        </span>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-white">
                            Redefining <br /><span className="text-primary italic">Urban Mobility.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            We are building the digital infrastructure for a world where transportation is seamless, sustainable, and accessible to everyone, everywhere.
                        </p>
                        <div className="mt-12 flex justify-center">
                            <div className="size-16 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
                                <span className="material-symbols-outlined text-white">expand_more</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story / Timeline Section */}
                <section className="max-w-7xl mx-auto layout-padding py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-5 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                The Journey to <span className="text-primary italic">Seamless</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Founded by a group of engineers and urban planners, VehicleHub was born out of a simple frustration: why is moving within a city still so complicated?
                            </p>
                            <div className="p-8 bg-surface-dark/50 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <p className="italic text-slate-300 border-l-2 border-primary pl-6 py-2 leading-relaxed">
                                    "The future of cities isn't just better vehicles, it's better access. We're bridging the gap between desire and destination."
                                </p>
                                <div className="mt-8 flex items-center gap-4 pl-6">
                                    <div className="size-12 rounded-full overflow-hidden relative border border-white/10">
                                        <Image
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                                            alt="Elena Vance"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Elena Vance</p>
                                        <p className="text-xs text-primary uppercase tracking-widest font-medium">CEO & Co-founder</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-6 lg:col-start-8">
                            <div className="space-y-0">
                                {/* Timeline Items */}
                                {[
                                    { year: '2018', title: 'Founding Spark', desc: 'The original prototype for the AI routing engine was developed in a small garage in San Francisco.', icon: 'lightbulb' },
                                    { year: '2019', title: 'Platform Launch', desc: 'We hit our first 1,000 bookings within 48 hours of launching our beta in three major hubs.', icon: 'rocket_launch' },
                                    { year: '2021', title: 'Series A Expansion', desc: 'Secured $45M in funding to scale our EV charging infrastructure and expand our network.', icon: 'trending_up' },
                                    { year: '2023', title: 'Global Expansion', desc: 'Now operating in 50+ cities worldwide, reducing carbon emissions by 20,000 tons yearly.', icon: 'public' }
                                ].map((item, index, array) => (
                                    <div key={index} className="group relative flex gap-8 pb-12 last:pb-0">
                                        <div className="flex flex-col items-center">
                                            <div className="size-12 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors z-10">
                                                <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                                            </div>
                                            {index !== array.length - 1 && (
                                                <div className="w-px h-full bg-white/10 mt-2"></div>
                                            )}
                                        </div>
                                        <div className="pt-2">
                                            <span className="text-xs font-black text-primary tracking-[0.2em] uppercase mb-1 block">{item.year}</span>
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Values Grid */}
                <section className="bg-surface-dark/30 py-32">
                    <div className="max-w-7xl mx-auto layout-padding">
                        <div className="mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                                Pillars of <span className="text-primary italic">Progress</span>
                            </h2>
                            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-light">
                                Our four key pillars drive every decision we make at VehicleHub, ensuring we remain focused on the future of transportation.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                            {[
                                { title: 'Trust', icon: 'verified_user', desc: 'We prioritize transparency in every interaction. From verified vehicle histories to fixed, upfront pricing, our users book with absolute peace of mind.' },
                                { title: 'Innovation', icon: 'memory', desc: "We don't just use technology; we build it. Our proprietary AI-driven routing and predictive demand algorithms set the industry standard." },
                                { title: 'Community', icon: 'groups', desc: 'We are building a shared ecosystem that connects fleet owners, individual drivers, and commuters in a mutually beneficial network.' },
                                { title: 'Sustainability', icon: 'eco', desc: 'Our commitment is absolute: an all-electric and carbon-neutral fleet by 2030. Every booking contributes to our reforestation programs.' }
                            ].map((value, i) => (
                                <div key={i} className="bg-background-dark p-12 hover:bg-surface-dark transition-all group">
                                    <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-primary/30 transition-all">
                                        <span className="material-symbols-outlined text-primary text-3xl">{value.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{value.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-light">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Footer Section */}
                <section className="max-w-7xl mx-auto layout-padding py-32 mb-16">
                    <div className="relative rounded-[40px] overflow-hidden bg-primary p-16 md:p-24 text-center group">
                        <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-700">
                            <Image
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1920"
                                alt="Abstract city aerial"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-background-dark text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
                                Ready to Join the <br /><span className="italic">Movement?</span>
                            </h2>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <Link
                                    href="/explore"
                                    className="w-full md:w-auto px-10 py-5 bg-background-dark text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
                                >
                                    Explore the Fleet
                                </Link>
                                <button className="w-full md:w-auto px-10 py-5 border-2 border-background-dark text-background-dark font-bold rounded-2xl hover:bg-background-dark hover:text-white transition-all">
                                    Partner With Us
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
