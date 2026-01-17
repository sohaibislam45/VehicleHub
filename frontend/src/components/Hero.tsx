"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: y1 }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-background-dark/50 to-background-dark z-10" />
                <div
                    className="w-full h-[120%] bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA39pjR8ZAYdeFhzirpkxiXENZetDtLyv9toTD1L_7Jx872Z5uN15h_qQIazKUqkuJwoUukG_YWi5ZqDM-13RyFfqmYXxY72ZZqQszS4fqmAXmAZFoSjDfBHLgONtGeq_GgkamV9Krqxzg9bkx2hmH2rHypTdk7mtjd62qSF0FRfCAp5RG3YCtEJXgrr1jFRHNebU9vq30H1hYJ20-15qzIVpz31WixOOXBXmZrghiOHsa6UqzqQ4NswTRvRpdPYfh3p5YWikH-rGE")'
                    }}
                />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Future of Mobility
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1] text-white"
                >
                    DRIVE THE <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue">EXTRAORDINARY</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                    Unlock a curated fleet of the world's most elite electric and performance vehicles.
                    Defined by luxury, powered by innovation.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <Link href="/explore" className="group relative px-8 py-4 bg-primary text-background-dark font-bold text-lg rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(23,191,207,0.4)]">
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Fleet
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>

                    <Link href="/explore" className="px-8 py-4 glass-card text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all border border-white/10">
                        View Rates
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Scroll to Explore</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 64, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-white blur-[1px]"
                    />
                </div>
            </motion.div>
        </div>
    );
}
