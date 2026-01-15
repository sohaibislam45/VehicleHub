export default function HomePage() {
    return (
        <div className="flex flex-col">
            {/* Cinematic Hero Section */}
            <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/40 to-background-dark z-10"></div>
                    <div
                        className="w-full h-full bg-cover bg-center scale-105"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA39pjR8ZAYdeFhzirpkxiXENZetDtLyv9toTD1L_7Jx872Z5uN15h_qQIazKUqkuJwoUukG_YWi5ZqDM-13RyFfqmYXxY72ZZqQszS4fqmAXmAZFoSjDfBHLgONtGeq_GgkamV9Krqxzg9bkx2hmH2rHypTdk7mtjd62qSF0FRfCAp5RG3YCtEJXgrr1jFRHNebU9vq30H1hYJ20-15qzIVpz31WixOOXBXmZrghiOHsa6UqzqQ4NswTRvRpdPYfh3p5YWikH-rGE")',
                        }}
                    ></div>
                </div>
                <div className="relative z-20 max-w-4xl px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Next Gen Mobility
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
                        The Future of <span className="text-primary italic">Mobility.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Experience ultra-premium vehicle rentals curated for the modern
                        explorer. Redefining the journey from A to B.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-10 py-4 bg-primary text-background-dark rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(23,191,207,0.3)] transition-all">
                            Browse the Fleet
                        </button>
                        <button className="w-full sm:w-auto px-10 py-4 glass-card rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-white">
                            View Pricing
                        </button>
                    </div>
                </div>
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white">
                        Scroll
                    </span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
                </div>
            </section>

            {/* Glassmorphism Stats Section */}
            <section className="py-20 max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-10 rounded-2xl group hover:border-primary/30 transition-all flex flex-col items-center md:items-start">
                        <div className="w-12 h-12 mb-4 text-primary flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V9.375c0-.621-.504-1.125-1.125-1.125H16.5M16.5 8.25V6.75a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6.75v7.5"
                                />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold mb-1 text-white">10k+</p>
                        <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">
                            Premium Vehicles
                        </p>
                    </div>
                    <div className="glass-card p-10 rounded-2xl group hover:border-primary/30 transition-all flex flex-col items-center md:items-start">
                        <div className="w-12 h-12 mb-4 text-primary flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.856.12-1.683.342-2.466"
                                />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold mb-1 text-white">50+</p>
                        <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">
                            Global Hub Cities
                        </p>
                    </div>
                    <div className="glass-card p-10 rounded-2xl group hover:border-primary/30 transition-all flex flex-col items-center md:items-start">
                        <div className="w-12 h-12 mb-4 text-primary flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold mb-1 text-white">4.9/5</p>
                        <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">
                            Elite User Rating
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
