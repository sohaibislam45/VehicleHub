"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import ListYourVehicle from "@/components/ListYourVehicle";
import { vehicleService } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";

export default function HomePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [latestVehicles, setLatestVehicles] = useState<Vehicle[]>([]);
    const [topBookingVehicles, setTopBookingVehicles] = useState<Vehicle[]>([]);
    const [featuredReviews, setFeaturedReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [latest, top, reviews] = await Promise.all([
                    vehicleService.getAll({ sortBy: 'Recent', limit: 6 }),
                    vehicleService.getAll({ sortBy: 'TopBooking', limit: 6 }),
                    vehicleService.getFeaturedReviews()
                ]);
                setLatestVehicles(latest);
                setTopBookingVehicles(top);
                setFeaturedReviews(reviews);
            } catch (error) {
                console.error("Failed to fetch homepage data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

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

    return (
        <div className="flex flex-col">
            <Hero />
            <Statistics />

            {/* Top Booking Vehicles */}
            {!loading && topBookingVehicles.length > 0 && (
                <section className="py-20 bg-surface-dark/20 w-full overflow-hidden">
                    {/* @ts-ignore */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto layout-padding mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
                    >
                        <div>
                            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Most Requested</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Top Booking Vehicles</h2>
                            <p className="text-slate-400 mt-2">The most popular choices among our elite members.</p>
                        </div>
                        <Link href="/explore?sortBy=TopBooking" className="group flex items-center gap-2 text-white font-bold hover:text-primary transition-colors">
                            Explore All Top Booked
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </motion.div>

                    <div className="max-w-7xl mx-auto layout-padding">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {topBookingVehicles.map((car, idx) => (
                                <motion.div
                                    key={car._id}
                                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Link href={`/vehicles/${car._id}`} className="group block relative rounded-[2rem] overflow-hidden bg-surface-dark border border-white/5 hover:border-primary/30 transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                                        <div className="relative h-[300px] overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                                style={{ backgroundImage: `url("${car.images?.[0]}")` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent" />
                                            <div className="absolute top-6 left-6 flex gap-2">
                                                <div className="bg-primary/90 text-background-dark text-[10px] font-black uppercase px-2 py-1 rounded backdrop-blur-md">Popular</div>
                                                <div className="bg-white/10 text-white text-[10px] font-black uppercase px-2 py-1 rounded backdrop-blur-md border border-white/10">{car.category}</div>
                                            </div>
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{car.title}</h3>
                                                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                            {car.location}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-primary font-bold text-2xl">৳{car.price}</p>
                                                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">/ Day</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Arrivals */}
            <section className="py-24 overflow-hidden w-full">
                {/* @ts-ignore */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto layout-padding mb-12 flex justify-between items-end"
                >
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-100">Latest Arrivals</h2>
                        <p className="text-slate-400">Newly added performance and luxury vehicles to our global fleet.</p>
                    </div>
                    <Link href="/explore" className="text-primary font-bold uppercase text-xs tracking-widest hover:underline hidden md:block">
                        View All
                    </Link>
                </motion.div>

                <div className="max-w-7xl mx-auto layout-padding">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-[350px] rounded-3xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {latestVehicles.map((car, idx) => (
                                <motion.div
                                    key={car._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                >
                                    <Link href={`/vehicles/${car._id}`} className="block group">
                                        <div className="relative h-[280px] rounded-3xl overflow-hidden mb-6 border border-white/5 group-hover:border-primary/20 transition-all">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                                                style={{ backgroundImage: `url("${car.images?.[0]}")` }}
                                            />
                                            <div className="absolute top-4 left-4 bg-primary text-background-dark text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg z-10">{car.category}</div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent pointer-events-none" />
                                        </div>
                                        <div className="flex justify-between items-start px-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors">{car.title}</h3>
                                                <p className="text-slate-400 text-sm mt-1">{car.brand} {car.model} • {car.year}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-primary font-bold text-xl">৳{car.price}</p>
                                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Per Day</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Category Cards */}
            <section className="py-20 w-full overflow-hidden">
                <div className="max-w-7xl mx-auto layout-padding">
                    {/* @ts-ignore */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-between items-end mb-12"
                    >
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-100">Explore Categories</h2>
                            <p className="text-slate-400">Curated collections for every occasion.</p>
                        </div>
                        <Link href="/explore" className="text-primary font-bold uppercase text-xs tracking-widest hover:underline">
                            View All
                        </Link>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[500px]">
                        {[
                            { title: "Luxury Sedans", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoAQaZ7U2ct3rWzLmYUFz2qMSyjo7Bh6yZZzvgHmTQGn9SJ9vkNHzy6hjkZ3UPy-Vq-D2h8iMXddWqjd4LzBRW6haeH8V1uF4qYUnHP8k-MSQtJJOHO2-0R9rPcsYkF21Sh9ynheYNakouDIFDhanlxufP1Skv7j5gEQSQCRqBwPZw64Ghx4FclefAojhDCFURbPuaAMBKNE1i1zcy0c6Du5sL0AI387YBXzWUo3x_4_FuLWWhVPN3-nsp0hqUhzaEShpKePfLHww", link: "/explore?category=Luxury", desc: "Experience the zenith of comfort and cutting-edge technology." },
                            { title: "Pure Electric", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ujtYDJk8k2TVdTKt9-9BoU6YDSN-cszUF8dSufB5GgNXqxlLjqWGn8f5PFQCGYudmV5SMZ2aXtddfdsM-tqAZnWtkCgBIinecQYemeMdkmEakDhpfe_hRLEdpwCTBv-EIeifWQC9uB4YnOe8S0GWFwuAMwuAPTEDxRkycTz0lcgsYHBkQOvl-mjltlc8z1liBap1_YECrABTDh59otBAf7CtPRNHRDZX6cTLUvCs3MGFMZxAYk1ShkNWIh7LupwEmcmlIJNcmKw", link: "/explore?category=Electric", desc: "Zero emissions, infinite possibilities. The future is here." },
                            { title: "Adventure SUV", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI3Lwm1J4WWsQzvIaWXe8k4sq7AFQXOHUkZ7fGhzO8kVraNspTct_0HAiEgResPLFFyvPZr5bRTadoFjx_NT799prEbo16o_YVD9mstESVhz7tEN3jEyF1neW4OTdMrUnsuePL1ReWAxqxj7bvBDT10RnwxyL_7lJLkTMAylO4QRDlWRxddts_Hq280xacRVly5zxNLESd47XF9X-sqVzb9ixo3j5nTKCl7bgiiLMmW4nfYOTUzepKu5u0G6NWieHJVgFHQhxdoPo", link: "/explore?category=SUV", desc: "Conquer any terrain with our elite range of premium SUVs." }
                        ].map((cat, idx) => (
                            /* @ts-ignore */
                            <motion.div
                                key={idx}
                                whileHover={{ flex: 1.5 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer border border-white/5"
                            >
                                <Link href={cat.link} className="absolute inset-0 z-20" />
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{ backgroundImage: `url("${cat.img}")` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent pointer-events-none" />
                                <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                                    <h3 className="text-3xl font-bold mb-3 text-slate-100">{cat.title}</h3>
                                    <p className="text-slate-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{cat.desc}</p>
                                    <span className="text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                        Explore <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ListYourVehicle />

            {/* Why Choose Us */}
            <section className="py-24 bg-gradient-to-b from-transparent to-surface-dark/10 w-full overflow-hidden">
                <div className="max-w-7xl mx-auto layout-padding">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* @ts-ignore */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 space-y-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                Why the World&apos;s Elite <br />
                                <span className="text-primary italic">Choose VehicleHub.</span>
                            </h2>
                            <p className="text-slate-400 text-lg max-w-xl">
                                We don&apos;t just rent cars. We provide a seamless, premium mobility ecosystem tailored for those who demand excellence in every journey.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { icon: "verified_user", title: "Guaranteed Availability", desc: "Our real-time inventory management ensures the car you book is the exact car you drive." },
                                    { icon: "distance", title: "Unlimited Exploration", desc: "Zero mileage restrictions on selection elite tiers. Drive as far as your ambition takes you." },
                                    { icon: "support_agent", title: "24/7 Concierge Support", desc: "A dedicated mobility specialist is always a click away, anywhere in the world." }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                            <p className="text-slate-500 text-sm">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        {/* @ts-ignore */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex-1 relative"
                        >
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/5 group">
                                <Image
                                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
                                    alt="Interior View"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                />
                            </div>
                            <div className="absolute -top-10 -right-10 size-64 bg-primary/10 blur-[100px] -z-0 animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 size-64 bg-accent-blue/10 blur-[120px] -z-0"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials - Global Elite Voice */}
            <section className="py-24 bg-surface-dark/50 w-full overflow-hidden">
                <div className="max-w-7xl mx-auto layout-padding text-center">
                    {/* @ts-ignore */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-2">Global Elite Voice</h2>
                        <p className="text-slate-400 mb-16">Trusted reviews from our global community of elite travelers.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {featuredReviews.length > 0 ? (
                            featuredReviews.map((review, idx) => (
                                /* @ts-ignore */
                                <motion.div
                                    key={review._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                                    className={`glass-card p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-between h-full transition-all duration-500 hover:border-primary/30 ${idx === 1 ? 'bg-primary/5 border-primary/20' : ''}`}
                                >
                                    <div>
                                        <div className="flex gap-1 mb-6 text-primary">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`material-symbols-outlined text-[18px] ${i < review.rating ? 'fill-[1]' : ''}`}>star</span>
                                            ))}
                                        </div>
                                        <p className="text-lg italic leading-relaxed mb-8 text-slate-100">
                                            &quot;{review.comment}&quot;
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review.userId.photoURL || `https://i.pravatar.cc/150?u=${review.userId._id}`}
                                            alt={review.userId.name}
                                            className="size-12 rounded-full object-cover border-2 border-white/10"
                                        />
                                        <div>
                                            <h5 className="text-white font-bold">{review.userId.name}</h5>
                                            <p className="text-slate-500 text-xs">{review.vehicleId?.title || 'Elite Client'}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-slate-500 font-medium border border-dashed border-white/10 rounded-3xl">
                                No guest reviews available yet.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 w-full bg-surface-dark/10">
                <div className="max-w-7xl mx-auto layout-padding">
                    {/* @ts-ignore */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[40px] overflow-hidden bg-primary/10 border border-primary/20 p-12 md:p-24 text-center"
                    >
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
                                <button className="h-14 px-10 bg-primary text-background-dark font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(23,191,207,0.3)] transition-all active:scale-95">
                                    Subscribe
                                </button>
                            </div>
                            <p className="mt-6 text-xs text-slate-500">By subscribing, you agree to our Privacy Policy and Terms of Elite Membership.</p>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
                        <div className="absolute -top-24 -left-24 size-96 bg-primary/10 blur-[120px] animate-pulse" />
                    </motion.div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="py-24 bg-surface-dark/30 w-full overflow-hidden">
                <div className="max-w-4xl mx-auto layout-padding">
                    {/* @ts-ignore */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20 text-slate-100"
                    >
                        <h2 className="text-4xl font-bold mb-4">Modern Booking, Simplified.</h2>
                        <p className="text-slate-400">Your premium experience starts in three simple steps.</p>
                    </motion.div>
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                        <div className="space-y-32 relative">
                            {[
                                { step: "01", title: "Choose Your Vehicle", desc: "Browse our curated fleet of top-tier electric and luxury performance vehicles available globally.", icon: "search_check", align: "right" },
                                { step: "02", title: "Select Your Dates", desc: "Flexible daily or weekly rentals with transparent pricing and full insurance coverage included.", icon: "calendar_month", align: "left" },
                                { step: "03", title: "Instant Confirmation", desc: "Pick up your vehicle at one of our hubs or have it delivered directly to your doorstep.", icon: "key_visualizer", align: "right" }
                            ].map((s, idx) => (
                                /* @ts-ignore */
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: s.align === "right" ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                                    className="flex items-center justify-between w-full group"
                                >
                                    <div className={`w-[45%] ${s.align === "right" ? "text-right pr-12" : "pl-12 order-2"} text-slate-100`}>
                                        <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                                        <p className="text-slate-400 leading-relaxed text-sm">{s.desc}</p>
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background-dark border-4 border-primary rounded-full flex items-center justify-center z-10 group-hover:scale-125 group-hover:bg-primary group-hover:text-background-dark transition-all duration-500 text-primary font-bold">
                                        {s.step}
                                    </div>
                                    <div className={`w-[45%] ${s.align === "right" ? "pl-12" : "text-right pr-12 order-1"} opacity-20 text-slate-100 hidden md:block`}>
                                        <span className="material-symbols-outlined text-8xl transition-all duration-700 group-hover:opacity-100 group-hover:scale-110 group-hover:text-primary">
                                            {s.icon}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-24 w-full bg-surface-dark/5">
                <div className="max-w-3xl mx-auto layout-padding text-slate-100">
                    {/* @ts-ignore */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                    </motion.div>
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
                </div>
            </section>
        </div >
    );
}
