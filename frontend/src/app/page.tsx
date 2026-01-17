"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";

export default function HomePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        {
            question: "What is included in the premium insurance?",
            answer: "Our comprehensive package covers collision damage, theft protection, and third-party liability with zero deductible for all our Elite tier vehicles."
        },
        {
            question: "Do you offer home delivery?",
            answer: "Yes, we offer white-glove delivery service to your specified location within our hub city limits."
        },
        {
            question: "What are the age requirements for luxury rentals?",
            answer: "For our Performance and Elite tiers, drivers must be at least 25 years old and have a valid driver's license for at least 3 years."
        },
        {
            question: "Can I extend my booking mid-rental?",
            answer: "Absolutely. Extensions can be requested through your dashboard or by contacting our 24/7 concierge service, subject to vehicle availability."
        }
    ];

    const latestArrivals = [
        {
            id: "tesla-model-s",
            name: "Tesla Model S Plaid",
            desc: "Ludicrous Mode • 396mi Range",
            price: 120,
            tag: "EV Elite",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXBtpiH8Ks0lWhNZu9Ad9tivizgphkf72kC6dKB1H4vBeqiaxZZEdxPAKfAFd8X1zQO_glmIG4j8WxtH0Ro2mpQBlospRTeT1e4BDHzI8FeUF9HPWVrQQ4u3bYFMyHssswZpc_3r1naAd53Kfh7VJ926iq-VmgcPh6_POqDjhN4H8fFAqKxac142VF5FVEr1PAe_AE6HyOqORoRWe5dMFhcnUBadv4-MUhOU0PqnjL4CwbK_AcTTlyt9tKGWoVoRc3tJhyiTYLcKk"
        },
        {
            id: "porsche-taycan",
            name: "Porsche Taycan",
            desc: "Turbo S • 750hp AWD",
            price: 250,
            tag: "Performance",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8ozPLwgMhyAQkY9TzfJjVpOIHQoHOjQJO0hyJ0e_adXbH7NOZYunfmJTc8fP9J34LWmcf0TfI0zmElkTgrYpXD7cCRyIzbh0eJV-bb8cN2tsNFEiZeAIJb9cecZXX5PPZV5Z8yop4U_uiRCNZvfOjjB-lT3QYfrohnnLQ--PtTEnqyC5cWy_8Wn9DaNdw37WMuq0SCP-PsKflYSSrII9MQLZlXSvwuIExvOkqvH4rU5uGnZ8JTQn93zLz5IG9fMU5s7z9Wn_KAyY"
        },
        {
            id: "audi-etron",
            name: "Audi e-tron GT",
            desc: "Quattro • Matrix LED",
            price: 180,
            tag: "Luxury EV",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgTlKqlCSU8w8RFH97O4I29_cJ69vINC6Ggt40DeSf1q5vaWzRgojD1MY7dbW8ILkfwh90DU8MLLADvkpg6WAHTn_rOllvbmEuFIZ8ejoY6_6mJ_zuGPdCaMVNvj0ILAR8KAQKFdq1WF3QqUq8imMhTq8wcU9H5VA1yuIhqU8O9iFKNzrs3_9mFiTLjcZ_gvr2OBpFH44CtleCl1Ofgv2TepQNDmJVr7hSvE3IvQsyPGsaruE-nlLwRhA2XPuL462qOeT0qfa2Ukc"
        },
        {
            id: "range-rover",
            name: "Range Rover SV",
            desc: "Luxury SUV • V8 Twin Turbo",
            price: 320,
            tag: "Ultra Luxury",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXXw6o5wqWBcfaAMaikX3QsoBQ3FoYn2wd73WBosYuSz0O9PRnMXNYqM5pKfhN5-_pYVgYcRi-fVpSFnJXm8h3CQ-rSaEV83tuMl2aDG_LKdl_upCiUAsbpCDH1OcLmp-OviMNxIUG8K6Nt_HV6Np8S1WWaUwXo_SQd0uywNWUiDJ78vQXTPuGH3kiJs1kqK7fzbJSeuKt-7t6uvlW-ea2uUhX8NAx2v99fozCCbTZIPomssZhAyuYkG5Cg_2EM-dHLBrUm5YIQpM"
        },
        {
            id: "mercedes-amg",
            name: "Mercedes-AMG GT",
            desc: "Handcrafted V8 • 0-60 3.7s",
            price: 290,
            tag: "Sport",
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "bmw-i7",
            name: "BMW i7 xDrive60",
            desc: "Electric Luxury • 31" + " Theater Screen",
            price: 210,
            tag: "Executive",
            image: "https://images.unsplash.com/photo-1678297753644-8d9609c131dc?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="flex flex-col">
            {/* New Hero Section */}
            <Hero />

            {/* Statistics Section (Moved out) */}
            <Statistics />

            {/* Exploring Categories (Moved up for better flow) */}
            <section className="py-20 max-w-7xl mx-auto layout-padding w-full">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-100">Explore Categories</h2>
                        <p className="text-slate-400">Curated collections for every occasion.</p>
                    </div>
                    <Link href="/explore" className="text-primary font-bold uppercase text-xs tracking-widest hover:underline">
                        View All
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[500px]">
                    {/* Category 1 */}
                    {/* @ts-ignore */}
                    <motion.div
                        whileHover={{ flex: 1.5 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5"
                    >
                        <Link href="/explore?category=Luxury" className="absolute inset-0 z-20"></Link>
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBoAQaZ7U2ct3rWzLmYUFz2qMSyjo7Bh6yZZzvgHmTQGn9SJ9vkNHzy6hjkZ3UPy-Vq-D2h8iMXddWqjd4LzBRW6haeH8V1uF4qYUnHP8k-MSQtJJOHO2-0R9rPcsYkF21Sh9ynheYNakouDIFDhanlxufP1Skv7j5gEQSQCRqBwPZw64Ghx4FclefAojhDCFURbPuaAMBKNE1i1zcy0c6Du5sL0AI387YBXzWUo3x_4_FuLWWhVPN3-nsp0hqUhzaEShpKePfLHww")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                            <h3 className="text-3xl font-bold mb-3 text-slate-100">Luxury Sedans</h3>
                            <p className="text-slate-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">Experience the zenith of comfort and cutting-edge technology.</p>
                            <span className="text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                Explore <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Category 2 */}
                    {/* @ts-ignore */}
                    <motion.div
                        whileHover={{ flex: 1.5 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5"
                    >
                        <Link href="/explore?category=Electric" className="absolute inset-0 z-20"></Link>
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5ujtYDJk8k2TVdTKt9-9BoU6YDSN-cszUF8dSufB5GgNXqxlLjqWGn8f5PFQCGYudmV5SMZ2aXtddfdsM-tqAZnWtkCgBIinecQYemeMdkmEakDhpfe_hRLEdpwCTBv-EIeifWQC9uB4YnOe8S0GWFwuAMwuAPTEDxRkycTz0lcgsYHBkQOvl-mjltlc8z1liBap1_YECrABTDh59otBAf7CtPRNHRDZX6cTLUvCs3MGFMZxAYk1ShkNWIh7LupwEmcmlIJNcmKw")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                            <h3 className="text-3xl font-bold mb-3 text-slate-100">Pure Electric</h3>
                            <p className="text-slate-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">Zero emissions, infinite possibilities. The future is here.</p>
                            <span className="text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                Explore <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Category 3 */}
                    {/* @ts-ignore */}
                    <motion.div
                        whileHover={{ flex: 1.5 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5"
                    >
                        <Link href="/explore?category=SUV" className="absolute inset-0 z-20"></Link>
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBI3Lwm1J4WWsQzvIaWXe8k4sq7AFQXOHUkZ7fGhzO8kVraNspTct_0HAiEgResPLFFyvPZr5bRTadoFjx_NT799prEbo16o_YVD9mstESVhz7tEN3jEyF1neW4OTdMrUnsuePL1ReWAxqxj7bvBDT10RnwxyL_7lJLkTMAylO4QRDlWRxddts_Hq280xacRVly5zxNLESd47XF9X-sqVzb9ixo3j5nTKCl7bgiiLMmW4nfYOTUzepKu5u0G6NWieHJVgFHQhxdoPo")' }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                            <h3 className="text-3xl font-bold mb-3 text-slate-100">Adventure SUV</h3>
                            <p className="text-slate-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">Conquer any terrain with our elite range of premium SUVs.</p>
                            <span className="text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                Explore <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gradient-to-b from-transparent to-surface-dark/10 w-full overflow-hidden why-choose-section">
                <div className="max-w-7xl mx-auto layout-padding">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 why-choose-content">
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                Why the World&apos;s Elite <br />
                                <span className="text-primary italic">Choose VehicleHub.</span>
                            </h2>
                            <p className="text-slate-400 text-lg max-w-xl">
                                We don&apos;t just rent cars. We provide a seamless, premium mobility ecosystem tailored for those who demand excellence in every journey.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">verified_user</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Guaranteed Availability</h4>
                                        <p className="text-slate-500 text-sm">Our real-time inventory management ensures the car you book is the exact car you drive.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">distance</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Unlimited Exploration</h4>
                                        <p className="text-slate-500 text-sm">Zero mileage restrictions on selection elite tiers. Drive as far as your ambition takes you.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">support_agent</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">24/7 Concierge Support</h4>
                                        <p className="text-slate-500 text-sm">A dedicated mobility specialist is always a click away, anywhere in the world.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                                <Image
                                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
                                    alt="Interior View"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -top-10 -right-10 size-64 bg-primary/10 blur-[100px] -z-0"></div>
                            <div className="absolute -bottom-10 -left-10 size-64 bg-accent-blue/10 blur-[120px] -z-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Vehicles Layout Update (Grid w/ 6 items) */}
            <section className="py-20 overflow-hidden w-full latest-arrivals-section">
                <div className="max-w-7xl mx-auto layout-padding mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-100">Latest Arrivals</h2>
                        <p className="text-slate-400">Newly added performance and luxury vehicles.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/explore" className="text-primary font-bold uppercase text-xs tracking-widest hover:underline hidden md:block">
                            View All
                        </Link>
                        <div className="flex gap-2 text-slate-100">
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto layout-padding">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 latest-arrivals-grid">
                        {latestArrivals.map((car) => (
                            <Link href={`/vehicles/${car.id}`} key={car.id} className="block group">
                                <div className="relative h-[250px] rounded-2xl overflow-hidden mb-5">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                        style={{ backgroundImage: `url("${car.image}")` }}
                                    ></div>
                                    <div className="absolute top-4 left-4 bg-primary text-background-dark text-[10px] font-black uppercase px-2 py-1 rounded">{car.tag}</div>
                                </div>
                                <div className="flex justify-between items-start px-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-primary transition-colors">{car.name}</h3>
                                        <p className="text-slate-400 text-xs">{car.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-primary font-bold text-lg">${car.price}</p>
                                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Per Day</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-surface-dark/50 w-full overflow-hidden">
                <div className="max-w-7xl mx-auto layout-padding text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Global Elite Voice</h2>
                    <p className="text-slate-400 mb-16">Trusted by innovators and leaders across 50 countries.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card p-10 rounded-3xl text-left border border-white/5 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex gap-1 mb-6 text-primary">
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                </div>
                                <p className="text-slate-300 text-lg italic leading-relaxed mb-8">
                                    &quot;The transition from my private jet to the Tesla Model S Plaid arranged by VehicleHub was flawless. Truly the gold standard of mobility.&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
                                    alt="Jonathan Vance"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <h5 className="text-white font-bold">Jonathan Vance</h5>
                                    <p className="text-slate-500 text-xs">Tech CEO, San Francisco</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-10 rounded-3xl text-left border border-white/5 flex flex-col justify-between h-full bg-primary/5 border-primary/20">
                            <div>
                                <div className="flex gap-1 mb-6 text-primary">
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                </div>
                                <p className="text-slate-100 text-lg italic leading-relaxed mb-8">
                                    &quot;Finally, a platform that understands what high-net-worth individuals actually need. The delivery to my Alpine villa was prompt. Exceptional service.&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Image
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
                                    alt="Elena Rodriguez"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <h5 className="text-white font-bold">Elena Rodriguez</h5>
                                    <p className="text-slate-400 text-xs">Venture Partner, Madrid</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-10 rounded-3xl text-left border border-white/5 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex gap-1 mb-6 text-primary">
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                </div>
                                <p className="text-slate-300 text-lg italic leading-relaxed mb-8">
                                    &quot;VehicleHub makes city navigation effortless. I always have the latest EV waiting for me at the hub. Smart, sustainable, and sleek.&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Image
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
                                    alt="Marcus Chen"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <h5 className="text-white font-bold">Marcus Chen</h5>
                                    <p className="text-slate-500 text-xs">Architect, Singapore</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section - Unchanged */}
            <section className="py-24 max-w-7xl mx-auto layout-padding">
                <div className="relative rounded-[40px] overflow-hidden bg-primary/10 border border-primary/20 p-12 md:p-24 text-center">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Future Proof Your Inbox</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Join the Vanguard.</h2>
                        <p className="text-slate-400 text-lg mb-12">Get exclusive early access to our limited runs, new hub openings, and zero-emission news.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 h-14 bg-background-dark/50 border border-white/10 rounded-2xl px-6 focus:outline-none focus:border-primary text-white transition-all"
                            />
                            <button className="h-14 px-10 bg-primary text-background-dark font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(23,191,207,0.3)] transition-all">
                                Subscribe
                            </button>
                        </div>
                        <p className="mt-6 text-xs text-slate-500">By subscribing, you agree to our Privacy Policy and Terms of Elite Membership.</p>
                    </div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                    <div className="absolute -top-24 -left-24 size-96 bg-primary/10 blur-[120px]"></div>
                </div>
            </section>

            {/* How it Works - Unchanged */}
            <section id="how-it-works" className="py-24 bg-surface-dark/30 w-full">
                <div className="max-w-4xl mx-auto layout-padding">
                    {/* ... (Keep existing content) ... */}
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

            {/* FAQ - Unchanged */}
            <section id="faq" className="py-24 max-w-3xl mx-auto layout-padding w-full text-slate-100">
                <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border-b border-white/5 pb-2">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center text-left py-6 hover:text-primary transition-colors group"
                            >
                                <span className={`text-lg font-medium transition-colors ${openFaq === index ? 'text-primary' : ''}`}>{faq.question}</span>
                                {/* @ts-ignore */}
                                <motion.span
                                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                                    className="material-symbols-outlined text-slate-500 group-hover:text-primary"
                                >
                                    add
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        // @ts-ignore
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-6 text-slate-400 leading-relaxed text-sm pr-12">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
