export default function HomePage() {
    return (
        <div className="flex flex-col pt-6">
            {/* Cinematic Hero Section - Boxed Layout */}
            <div className="w-full max-w-7xl mx-auto layout-padding">
                <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden rounded-3xl">
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
                    <div className="relative z-20 w-full h-full flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 md:px-16">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Next Gen Mobility
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1] text-slate-100">
                                The Future of <span className="text-primary italic">Mobility.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed font-light">
                                Experience ultra-premium vehicle rentals curated for the modern
                                explorer. Redefining the journey from A to B.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4 w-full">
                                <button className="w-full sm:w-auto px-10 py-4 bg-primary text-background-dark rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(23,191,207,0.3)] transition-all">
                                    Browse the Fleet
                                </button>
                                <button className="w-full sm:w-auto px-10 py-4 glass-card rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-slate-100">
                                    View Pricing
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-100">
                            Scroll
                        </span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
                    </div>
                </section>
            </div>

            {/* Glassmorphism Stats Section */}
            <section className="py-20 max-w-7xl mx-auto layout-padding w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-10 rounded-2xl group hover:border-primary/30 transition-all">
                        <span className="material-symbols-outlined text-primary mb-4 text-4xl font-light">directions_car</span>
                        <p className="text-4xl font-bold mb-1 text-slate-100">10k+</p>
                        <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Premium Vehicles</p>
                    </div>
                    <div className="glass-card p-10 rounded-2xl group hover:border-primary/30 transition-all">
                        <span className="material-symbols-outlined text-primary mb-4 text-4xl font-light">public</span>
                        <p className="text-4xl font-bold mb-1 text-slate-100">50+</p>
                        <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Global Hub Cities</p>
                    </div>
                    <div className="glass-card p-10 rounded-2xl group hover:border-primary/30 transition-all">
                        <span className="material-symbols-outlined text-primary mb-4 text-4xl font-light">star</span>
                        <p className="text-4xl font-bold mb-1 text-slate-100">4.9/5</p>
                        <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Elite User Rating</p>
                    </div>
                </div>
            </section>

            {/* Latest Vehicles Carousel */}
            <section className="py-20 overflow-hidden w-full">
                <div className="max-w-7xl mx-auto layout-padding mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-100">Latest Arrivals</h2>
                        <p className="text-slate-400">Newly added performance and luxury vehicles.</p>
                    </div>
                    <div className="flex gap-2 text-slate-100">
                        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto layout-padding overflow-hidden">
                    <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-4">
                        {/* Card 1 */}
                        <div className="min-w-[380px] snap-center group">
                            <div className="relative h-[280px] rounded-2xl overflow-hidden mb-5">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXBtpiH8Ks0lWhNZu9Ad9tivizgphkf72kC6dKB1H4vBeqiaxZZEdxPAKfAFd8X1zQO_glmIG4j8WxtH0Ro2mpQBlospRTeT1e4BDHzI8FeUF9HPWVrQQ4u3bYFMyHssswZpc_3r1naAd53Kfh7VJ926iq-VmgcPh6_POqDjhN4H8fFAqKxac142VF5FVEr1PAe_AE6HyOqORoRWe5dMFhcnUBadv4-MUhOU0PqnjL4CwbK_AcTTlyt9tKGWoVoRc3tJhyiTYLcKk")' }}
                                ></div>
                                <div className="absolute top-4 left-4 bg-primary text-background-dark text-[10px] font-black uppercase px-2 py-1 rounded">EV Elite</div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-100">Tesla Model S Plaid</h3>
                                    <p className="text-slate-400 text-sm">Ludicrous Mode • 396mi Range</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-primary font-bold text-lg">$120</p>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Per Day</p>
                                </div>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="min-w-[380px] snap-center group">
                            <div className="relative h-[280px] rounded-2xl overflow-hidden mb-5">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8ozPLwgMhyAQkY9TzfJjVpOIHQoHOjQJO0hyJ0e_adXbH7NOZYunfmJTc8fP9J34LWmcf0TfI0zmElkTgrYpXD7cCRyIzbh0eJV-bb8cN2tsNFEiZeAIJb9cecZXX5PPZV5Z8yop4U_uiRCNZvfOjjB-lT3QYfrohnnLQ--PtTEnqyC5cWy_8Wn9DaNdw37WMuq0SCP-PsKflYSSrII9MQLZlXSvwuIExvOkqvH4rU5uGnZ8JTQn93zLz5IG9fMU5s7z9Wn_KAyY")' }}
                                ></div>
                                <div className="absolute top-4 left-4 bg-primary text-background-dark text-[10px] font-black uppercase px-2 py-1 rounded">Performance</div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-100">Porsche Taycan</h3>
                                    <p className="text-slate-400 text-sm">Turbo S • 750hp AWD</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-primary font-bold text-lg">$250</p>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Per Day</p>
                                </div>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="min-w-[380px] snap-center group">
                            <div className="relative h-[280px] rounded-2xl overflow-hidden mb-5">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgTlKqlCSU8w8RFH97O4I29_cJ69vINC6Ggt40DeSf1q5vaWzRgojD1MY7dbW8ILkfwh90DU8MLLADvkpg6WAHTn_rOllvbmEuFIZ8ejoY6_6mJ_zuGPdCaMVNvj0ILAR8KAQKFdq1WF3QqUq8imMhTq8wcU9H5VA1yuIhqU8O9iFKNzrs3_9mFiTLjcZ_gvr2OBpFH44CtleCl1Ofgv2TepQNDmJVr7hSvE3IvQsyPGsaruE-nlLwRhA2XPuL462qOeT0qfa2Ukc")' }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-100">Audi e-tron GT</h3>
                                    <p className="text-slate-400 text-sm">Quattro • Matrix LED</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-primary font-bold text-lg">$180</p>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Per Day</p>
                                </div>
                            </div>
                        </div>
                        {/* Card 4 */}
                        <div className="min-w-[380px] snap-center group">
                            <div className="relative h-[280px] rounded-2xl overflow-hidden mb-5">
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXXw6o5wqWBcfaAMaikX3QsoBQ3FoYn2wd73WBosYuSz0O9PRnMXNYqM5pKfhN5-_pYVgYcRi-fVpSFnJXm8h3CQ-rSaEV83tuMl2aDG_LKdl_upCiUAsbpCDH1OcLmp-OviMNxIUG8K6Nt_HV6Np8S1WWaUwXo_SQd0uywNWUiDJ78vQXTPuGH3kiJs1kqK7fzbJSeuKt-7t6uvlW-ea2uUhX8NAx2v99fozCCbTZIPomssZhAyuYkG5Cg_2EM-dHLBrUm5YIQpM")' }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-100">Range Rover SV</h3>
                                    <p className="text-slate-400 text-sm">Luxury SUV • V8 Twin Turbo</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-primary font-bold text-lg">$320</p>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Per Day</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Categories */}
            <section className="py-20 max-w-7xl mx-auto layout-padding w-full">
                <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-100">Explore Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
                    <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBoAQaZ7U2ct3rWzLmYUFz2qMSyjo7Bh6yZZzvgHmTQGn9SJ9vkNHzy6hjkZ3UPy-Vq-D2h8iMXddWqjd4LzBRW6haeH8V1uF4qYUnHP8k-MSQtJJOHO2-0R9rPcsYkF21Sh9ynheYNakouDIFDhanlxufP1Skv7j5gEQSQCRqBwPZw64Ghx4FclefAojhDCFURbPuaAMBKNE1i1zcy0c6Du5sL0AI387YBXzWUo3x_4_FuLWWhVPN3-nsp0hqUhzaEShpKePfLHww")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-3xl font-bold mb-2 text-slate-100">Luxury Sedans</h3>
                            <p className="text-slate-300 mb-4">The pinnacle of comfort and tech.</p>
                            <button className="text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2 group/btn">
                                Explore <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5ujtYDJk8k2TVdTKt9-9BoU6YDSN-cszUF8dSufB5GgNXqxlLjqWGn8f5PFQCGYudmV5SMZ2aXtddfdsM-tqAZnWtkCgBIinecQYemeMdkmEakDhpfe_hRLEdpwCTBv-EIeifWQC9uB4YnOe8S0GWFwuAMwuAPTEDxRkycTz0lcgsYHBkQOvl-mjltlc8z1liBap1_YECrABTDh59otBAf7CtPRNHRDZX6cTLUvCs3MGFMZxAYk1ShkNWIh7LupwEmcmlIJNcmKw")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-bold mb-1 text-slate-100">Pure Electric</h3>
                            <button className="text-primary font-bold text-xs tracking-widest uppercase">View All</button>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBI3Lwm1J4WWsQzvIaWXe8k4sq7AFQXOHUkZ7fGhzO8kVraNspTct_0HAiEgResPLFFyvPZr5bRTadoFjx_NT799prEbo16o_YVD9mstESVhz7tEN3jEyF1neW4OTdMrUnsuePL1ReWAxqxj7bvBDT10RnwxyL_7lJLkTMAylO4QRDlWRxddts_Hq280xacRVly5zxNLESd47XF9X-sqVzb9ixo3j5nTKCl7bgiiLMmW4nfYOTUzepKu5u0G6NWieHJVgFHQhxdoPo")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-bold mb-1 text-slate-100">Adventure SUV</h3>
                            <button className="text-primary font-bold text-xs tracking-widest uppercase">View All</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 bg-surface-dark/30 w-full">
                <div className="max-w-4xl mx-auto layout-padding">
                    <div className="text-center mb-20 text-slate-100">
                        <h2 className="text-4xl font-bold mb-4">Modern Booking, Simplified.</h2>
                        <p className="text-slate-400">Your premium experience starts in three simple steps.</p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
                        <div className="space-y-32 relative">
                            {/* Step 1 */}
                            <div className="flex items-center justify-between w-full group">
                                <div className="w-[45%] text-right pr-12 text-slate-100">
                                    <h3 className="text-2xl font-bold mb-3">Choose Your Vehicle</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">Browse our curated fleet of top-tier electric and luxury performance vehicles available globally.</p>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background-dark border-4 border-primary rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform text-primary font-bold">
                                    01
                                </div>
                                <div className="w-[45%] pl-12 opacity-20 text-slate-100 hidden md:block">
                                    <span className="material-symbols-outlined text-8xl">search_check</span>
                                </div>
                            </div>
                            {/* Step 2 */}
                            <div className="flex items-center justify-between w-full group">
                                <div className="w-[45%] pr-12 opacity-20 text-right text-slate-100 hidden md:block">
                                    <span className="material-symbols-outlined text-8xl">calendar_month</span>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background-dark border-4 border-primary rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform text-primary font-bold">
                                    02
                                </div>
                                <div className="w-[45%] pl-12 text-slate-100">
                                    <h3 className="text-2xl font-bold mb-3">Select Your Dates</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">Flexible daily or weekly rentals with transparent pricing and full insurance coverage included.</p>
                                </div>
                            </div>
                            {/* Step 3 */}
                            <div className="flex items-center justify-between w-full group">
                                <div className="w-[45%] text-right pr-12 text-slate-100">
                                    <h3 className="text-2xl font-bold mb-3">Instant Confirmation</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">Pick up your vehicle at one of our hubs or have it delivered directly to your doorstep.</p>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background-dark border-4 border-primary rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform text-primary font-bold">
                                    03
                                </div>
                                <div className="w-[45%] pl-12 opacity-20 text-slate-100 hidden md:block">
                                    <span className="material-symbols-outlined text-8xl">key_visualizer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 max-w-3xl mx-auto layout-padding w-full text-slate-100">
                <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <div className="border-b border-white/5 pb-6">
                        <button className="w-full flex justify-between items-center text-left py-4 hover:text-primary transition-colors">
                            <span className="text-lg font-medium">What is included in the premium insurance?</span>
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <div className="text-slate-400 leading-relaxed text-sm pr-12">
                            Our comprehensive package covers collision damage, theft protection, and third-party liability with zero deductible for all our Elite tier vehicles.
                        </div>
                    </div>
                    <div className="border-b border-white/5 pb-2">
                        <button className="w-full flex justify-between items-center text-left py-4 hover:text-primary transition-colors">
                            <span className="text-lg font-medium">Do you offer home delivery?</span>
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                    <div className="border-b border-white/5 pb-2">
                        <button className="w-full flex justify-between items-center text-left py-4 hover:text-primary transition-colors">
                            <span className="text-lg font-medium">What are the age requirements for luxury rentals?</span>
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                    <div className="border-b border-white/5 pb-2">
                        <button className="w-full flex justify-between items-center text-left py-4 hover:text-primary transition-colors">
                            <span className="text-lg font-medium">Can I extend my booking mid-rental?</span>
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                </div>
            </section>
        </div >
    );
}
