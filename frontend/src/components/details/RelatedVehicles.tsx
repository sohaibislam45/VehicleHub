"use client";

import { useEffect, useState } from "react";
import VehicleCard from "@/components/explore/VehicleCard";
import { vehicleService } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";

interface RelatedVehiclesProps {
    category: string;
    currentVehicleId: string;
}

export default function RelatedVehicles({ category, currentVehicleId }: RelatedVehiclesProps) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const data = await vehicleService.getAll({ category, limit: 10 });
                // Filter out current vehicle
                setVehicles(data.filter(v => v._id !== currentVehicleId).slice(0, 4));
            } catch (err) {
                console.error("Failed to fetch related vehicles", err);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchRelated();
        }
    }, [category, currentVehicleId]);

    if (!loading && vehicles.length === 0) return null;

    return (
        <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">You Might Also Like</h2>
                <div className="flex gap-2">
                    <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 no-scrollbar overflow-x-auto pb-4">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-[380px] rounded-2xl bg-white/5 animate-pulse" />
                    ))
                ) : (
                    vehicles.map((v) => (
                        <VehicleCard
                            key={v._id}
                            id={v._id}
                            title={v.title}
                            description={v.category}
                            price={v.price}
                            image={v.images[0]}
                            category={v.category}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
