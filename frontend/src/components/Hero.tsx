"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        title: "Perfect Vehicle",
        highlight: "for Every Journey",
        description: "Browse verified vehicles, connect with trusted owners, and book rides effortlessly — all in one smart platform.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920",
        tag: "Performance Elite"
    },
    {
        id: 2,
        title: "Starts with",
        highlight: "the Right Vehicle",
        description: "From daily commutes to long trips, VehicleHub makes discovering, listing, and booking vehicles fast, simple, and reliable.",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1920",
        tag: "Executive Tier"
    },
    {
        id: 3,
        title: "All in One Place",
        highlight: "Discover, List, and Book Vehicles",
        description: "VehicleHub connects drivers and travelers through a seamless vehicle booking experience built for speed, trust, and flexibility.",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1920",
        tag: "Adventure SUV"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
            <AnimatePresence mode="wait">
                {/* @ts-ignore */}
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/40 to-background-dark z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 via-transparent to-transparent z-10" />
                    {/* @ts-ignore */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 7, ease: "linear" }}
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${slides[currentSlide].image}")` }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content Container - Consistent Padding with max-w-7xl */}
            <div className="relative z-20 h-full max-w-7xl mx-auto layout-padding">
                <div className="h-full flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {/* @ts-ignore */}
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-3xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-8 backdrop-blur-md"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                {slides[currentSlide].tag}
                            </motion.div>

                            {/* @ts-ignore */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1] text-white"
                            >
                                {slides[currentSlide].title} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-blue to-primary bg-[length:200%_auto] animate-gradient-flow">
                                    {slides[currentSlide].highlight}
                                </span>
                            </motion.h1>

                            {/* @ts-ignore */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-lg md:text-xl text-slate-300 mb-12 font-light leading-relaxed max-w-xl"
                            >
                                {slides[currentSlide].description}
                            </motion.p>

                            {/* @ts-ignore */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row items-center gap-6"
                            >
                                <Link href="/explore" className="w-full sm:w-auto group relative px-8 py-4 bg-primary text-background-dark font-bold text-lg rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(23,191,207,0.4)]">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Explore Fleet
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </Link>
                                <Link href="/about" className="w-full sm:w-auto px-8 py-4 glass-card text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all border border-white/10 text-center">
                                    Learn More
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Slider Controls - Now inside container */}
                <div className="absolute bottom-12 right-0 lg:right-12 z-30 flex items-center gap-6">
                    <div className="flex gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 transition-all duration-300 rounded-full ${currentSlide === idx ? 'w-12 bg-primary' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all backdrop-blur-sm"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all backdrop-blur-sm"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient for section merge */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-dark to-transparent z-10" />
        </section>
    );
}
