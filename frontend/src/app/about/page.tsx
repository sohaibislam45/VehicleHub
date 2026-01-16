import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto layout-padding mb-24">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Our Legacy</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Redefining the <br />
                            <span className="text-primary italic">Art of Movement.</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Founded in 2020, VehicleHub emerged from a simple vision: mobility should be as much about the experience as it is about the destination.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-24 bg-surface-dark/30 w-full mb-24">
                    <div className="max-w-7xl mx-auto layout-padding">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl h-[500px]">
                                <Image
                                    src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800"
                                    alt="Luxury Car"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-8">
                                <h2 className="text-4xl font-bold text-white leading-tight">Our Mission: <br />Engineering Perfection.</h2>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    We believe that every mile driven should be a masterclass in performance and luxury. Our fleet is meticulously curated to include only the most innovative electric and performance vehicles on the planet.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-primary text-4xl font-bold mb-2">50+</h4>
                                        <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Global Hubs</p>
                                    </div>
                                    <div>
                                        <h4 className="text-primary text-4xl font-bold mb-2">10k+</h4>
                                        <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Elite Members</p>
                                    </div>
                                    <div>
                                        <h4 className="text-primary text-4xl font-bold mb-2">100%</h4>
                                        <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Electric Vision</p>
                                    </div>
                                    <div>
                                        <h4 className="text-primary text-4xl font-bold mb-2">24/7</h4>
                                        <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Concierge Service</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="max-w-7xl mx-auto layout-padding mb-24">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">The Pillars of VehicleHub</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card p-10 rounded-3xl border border-white/5 space-y-6">
                            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">verified</span>
                            </div>
                            <h3 className="text-xl font-bold text-white">Uncompromising Quality</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Every vehicle in our fleet undergoes a rigorous 200-point inspection before every single rental. We settle for nothing less than showroom perfection.
                            </p>
                        </div>
                        <div className="glass-card p-10 rounded-3xl border border-white/5 space-y-6">
                            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </div>
                            <h3 className="text-xl font-bold text-white">Sustainability Focused</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                We are committed to a zero-carbon future. Our transition to 100% electric luxury is ahead of schedule, proving speed and sustainability can coexist.
                            </p>
                        </div>
                        <div className="glass-card p-10 rounded-3xl border border-white/5 space-y-6">
                            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">group</span>
                            </div>
                            <h3 className="text-xl font-bold text-white">Customer Centricity</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Your journey is unique. Our bespoke concierge service ensures every detail of your rental experience is personalized to your exacting standards.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto layout-padding">
                    <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-primary to-accent-blue p-12 md:p-24 text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-background-dark mb-8 leading-tight">
                            Experience the <br />Next Era of Mobility.
                        </h2>
                        <button className="px-10 py-5 bg-background-dark text-white rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl">
                            Browse the Collection
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
