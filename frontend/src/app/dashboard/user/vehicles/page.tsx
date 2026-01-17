"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";

interface Vehicle {
    _id: string;
    title: string;
    category: string;
    price: number;
    status: string;
    images: string[];
    createdAt: string;
}

export default function MyVehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ show: boolean; vehicle: Vehicle | null }>({
        show: false,
        vehicle: null,
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await api.get("/vehicles");
            // Filter to only show user's own vehicles
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.vehicle) return;

        try {
            await api.delete(`/vehicles/${deleteModal.vehicle._id}`);
            setVehicles(vehicles.filter((v) => v._id !== deleteModal.vehicle!._id));
            setDeleteModal({ show: false, vehicle: null });
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            alert("Failed to delete vehicle");
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
            active: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
            pending: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20" },
            booked: { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20" },
        };

        const config = statusConfig[status.toLowerCase()] || statusConfig.active;

        return (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 ${config.bg} ${config.text} text-xs font-bold rounded-full border ${config.border}`}>
                <span className={`size-1.5 ${config.text.replace('text-', 'bg-')} rounded-full ${status.toLowerCase() === 'active' ? 'animate-pulse' : ''}`}></span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        );
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-black tracking-tight text-white">My Vehicles</h2>
                    <p className="text-slate-400">
                        You currently have <span className="text-primary font-bold">{vehicles.filter(v => v.status === 'active').length} active listings</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/user/add-vehicle"
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add Vehicle
                    </Link>
                </div>
            </div>

            {/* Vehicle Table */}
            <div className="bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-border-dark/30 border-b border-border-dark">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Vehicle</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Pricing</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-dark/50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        Loading...
                                    </td>
                                </tr>
                            ) : vehicles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="size-32 bg-surface-dark rounded-full flex items-center justify-center mb-6 border-4 border-border-dark">
                                                <span className="material-symbols-outlined text-6xl text-slate-600">no_crash</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">No Vehicles Found</h3>
                                            <p className="text-slate-400 max-w-sm mb-8">
                                                You haven't listed any vehicles yet. Start earning by adding your first car to our growing platform.
                                            </p>
                                            <Link
                                                href="/dashboard/user/add-vehicle"
                                                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform"
                                            >
                                                Add My First Vehicle
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                vehicles.map((vehicle) => (
                                    <tr key={vehicle._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="size-14 rounded-lg bg-cover bg-center border border-border-dark flex-shrink-0"
                                                    style={{
                                                        backgroundImage: vehicle.images?.[0]
                                                            ? `url('${vehicle.images[0]}')`
                                                            : "url('https://via.placeholder.com/150')",
                                                    }}
                                                ></div>
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-primary transition-colors">{vehicle.title}</p>
                                                    <p className="text-xs text-slate-500">
                                                        Added {new Date(vehicle.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                                                {vehicle.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right font-medium">
                                            <span className="text-white">৳{vehicle.price}</span>
                                            <span className="text-slate-500 text-sm">/day</span>
                                        </td>
                                        <td className="px-6 py-5 text-center">{getStatusBadge(vehicle.status)}</td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/vehicles/${vehicle._id}`}
                                                    className="size-9 rounded-lg flex items-center justify-center border border-border-dark text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </Link>
                                                <button className="size-9 rounded-lg flex items-center justify-center border border-border-dark text-slate-400 hover:text-primary hover:border-primary transition-all">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => setDeleteModal({ show: true, vehicle })}
                                                    className="size-9 rounded-lg flex items-center justify-center border border-border-dark text-slate-400 hover:text-red-500 hover:border-red-500/50 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.show && deleteModal.vehicle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
                    <div className="bg-surface-dark border border-border-dark w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8">
                            <div className="size-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <span className="material-symbols-outlined text-3xl">warning</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white text-center mb-2">Delete Vehicle?</h3>
                            <p className="text-slate-400 text-center mb-8">
                                This action will permanently remove <span className="text-white font-bold">{deleteModal.vehicle.title}</span> from your listings. This cannot be undone.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleDelete}
                                    className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                                >
                                    Delete Listing
                                </button>
                                <button
                                    onClick={() => setDeleteModal({ show: false, vehicle: null })}
                                    className="w-full py-3 bg-transparent text-slate-400 font-bold rounded-xl hover:text-white transition-colors border border-transparent hover:border-border-dark"
                                >
                                    Cancel, Keep It
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
