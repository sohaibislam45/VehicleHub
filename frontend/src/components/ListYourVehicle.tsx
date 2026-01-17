"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const benefits = [
    {
        icon: "directions_car",
        title: "List Any Vehicle",
        description: "Cars, SUVs, electric vehicles, or vans."
    },
    {
        icon: "payments",
        title: "Set Your Own Price",
        description: "You control availability and pricing."
    },
    {
        icon: "verified_user",
        title: "Secure & Verified Users",
        description: "Listings are tied to authenticated accounts."
    },
    {
        icon: "dashboard_customize",
        title: "Easy Management",
        description: "Add, update, or remove your vehicle anytime."
    }
];

export default function ListYourVehicle() {
    const { user } = useAuth();
    const router = useRouter();

    const handleCTA = () => {
        if (user) {
            router.push("/dashboard/user/add-vehicle");
        } else {
            router.push("/login?redirect=/dashboard/user/add-vehicle");
        }
    };

    return (
        <section className="py-24 bg-surface-dark/30 w-full overflow-hidden border-y border-white/5">
            <div className="max-w-7xl mx-auto layout-padding">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* @ts-ignore */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Partner with VehicleHub</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Have a Vehicle? <br />
                            <span className="text-primary italic">Start Earning Today.</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-xl">
                            Own a car, SUV, or electric vehicle? VehicleHub lets you list your vehicle,
                            set your own price, and connect with verified renters — all in one platform.
                        </p>

                        <button
                            onClick={handleCTA}
                            className="group relative px-10 py-4 bg-primary text-background-dark font-bold rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_35px_rgba(23,191,207,0.4)] active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {user ? "Add Your Vehicle" : "Start Listing"}
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </motion.div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {benefits.map((benefit, idx) => (
                            /* @ts-ignore */
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="glass-card p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all hover:bg-white/[0.02] group"
                            >
                                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-background-dark transition-all duration-500">
                                    <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{benefit.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
