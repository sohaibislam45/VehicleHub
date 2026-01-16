"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Vehicle {
    _id: string;
    title: string;
    brand: string;
    model: string;
    price: number;
    category: string;
    status: string;
    ownerId: {
        name: string;
        email: string;
    };
    images: string[];
}

export default function ManageVehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await api.get("/admin/vehicles");
                setVehicles(response.data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) return;
        try {
            await api.delete(`/vehicles/${id}`);
            setVehicles(vehicles.filter(v => v._id !== id));
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            alert("Failed to delete vehicle");
        }
    };

    const filteredVehicles = vehicles.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.ownerId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-white mb-1">Manage Vehicles</h2>
                    <p className="text-slate-400 text-sm">Review, verify, and moderate system-wide listings.</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search vehicles, owners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 w-64 pl-10"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
                </div>
            </header>

            <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Vehicle Details</th>
                                <th className="px-6 py-4">Owner</th>
                                <th className="px-6 py-4">Price/Day</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredVehicles.map((vehicle) => (
                                <tr key={vehicle._id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="size-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
                                                {vehicle.images?.[0] ? (
                                                    <img src={vehicle.images[0]} alt={vehicle.title} className="object-cover size-full" />
                                                ) : (
                                                    <div className="size-full flex items-center justify-center text-slate-600">
                                                        <span className="material-symbols-outlined">image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-100 mb-0.5">{vehicle.title}</h4>
                                                <p className="text-xs text-slate-500">{vehicle.brand} {vehicle.model} • {vehicle.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-200">{vehicle.ownerId?.name || "Unknown"}</span>
                                            <span className="text-xs text-slate-500">{vehicle.ownerId?.email || "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-bold text-white">${vehicle.price}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full border border-emerald-500/20 w-fit uppercase">
                                            <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                            {vehicle.status || "Active"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <a
                                                href={`/explore/${vehicle._id}`}
                                                target="_blank"
                                                className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-all inline-flex items-center justify-center"
                                                title="View Public Details"
                                            >
                                                <span className="material-symbols-outlined text-xl">visibility</span>
                                            </a>
                                            <button
                                                onClick={() => handleDelete(vehicle._id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all flex items-center justify-center"
                                                title="Remove Listing"
                                            >
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredVehicles.length === 0 && (
                    <div className="py-20 text-center">
                        <span className="material-symbols-outlined text-5xl text-slate-700 mb-4">search_off</span>
                        <p className="text-slate-500">No vehicles found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
