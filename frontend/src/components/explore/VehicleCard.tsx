"use client";

import Link from "next/link";

interface VehicleCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
}

export default function VehicleCard({ id, title, description, price, image, category, featured }: VehicleCardProps) {
    return (
        <div className="group bg-surface-dark border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
                {featured && (
                    <div className="absolute top-3 left-3 z-10 bg-primary text-background-dark text-[10px] font-bold uppercase px-2 py-1 rounded tracking-tighter">
                        New Arrival
                    </div>
                )}
                <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-md text-white p-1.5 rounded-full cursor-pointer hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px] leading-none">favorite</span>
                </div>
                <Link href={`/vehicles/${id}`} className="block w-full h-full">
                    <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${image}')` }}
                    ></div>
                </Link>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                    <Link href={`/vehicles/${id}`}>
                        <h3 className="text-lg font-bold leading-tight text-white group-hover:text-primary transition-colors">{title}</h3>
                    </Link>
                    <p className="text-xs text-slate-400 font-medium tracking-wide">{description}</p>
                </div>
                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <span className="text-2xl font-bold tracking-tighter text-white">${price}</span>
                        <span className="text-xs text-slate-500 ml-1 uppercase font-bold tracking-widest">/day</span>
                    </div>
                    <Link
                        href={`/vehicles/${id}`}
                        className="bg-primary text-background-dark px-4 py-2 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(23,191,207,0.3)] transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
