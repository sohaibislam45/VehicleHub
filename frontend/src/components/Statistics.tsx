"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Statistics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // In a real app, you might fetch these from an API
    const stats = [
        {
            icon: "directions_car",
            value: "10k+",
            label: "Elite Vehicles",
            delay: 0
        },
        {
            icon: "public",
            value: "50+",
            label: "Global Hubs",
            delay: 0.2
        },
        {
            icon: "star",
            value: "4.9/5",
            label: "User Rating",
            delay: 0.4
        }
    ];

    return (
        <section ref={ref} className="py-10 max-w-7xl mx-auto layout-padding w-full relative z-30 -mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.6, delay: stat.delay, ease: "easeOut" }}
                        className="glass-card p-10 rounded-3xl border border-white/10 hover:border-primary/30 transition-all group backdrop-blur-xl bg-background-dark/60 shadow-2xl"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-4xl">{stat.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-white mb-1">{stat.value}</h3>
                                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
