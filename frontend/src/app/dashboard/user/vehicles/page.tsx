"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Vehicle } from "@/types/vehicle";
import { useSweetAlert } from "@/hooks/useSweetAlert";

export default function MyVehiclesPage() {
    const { user } = useAuth();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const { showConfirm, showSuccess, showError, showLoading, closeLoading } = useSweetAlert();
    
    const [statsModal, setStatsModal] = useState<{ show: boolean; vehicle: Vehicle | null }>({
        show: false,
        vehicle: null,
    });

    useEffect(() => {
        if (user) {
            fetchVehicles();
        }
    }, [user]);

    const fetchVehicles = async () => {
        try {
            const response = await api.get("/vehicles", {
                params: { userId: user._id }
            });
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (vehicle: Vehicle) => {
        const confirmed = await showConfirm(
            "Delete Vehicle?",
            `Are you sure you want to remove "${vehicle.title}"? This action cannot be undone.`,
            "Yes, Delete It",
            "Cancel"
        );

        if (!confirmed) return;

        showLoading("Deleting Vehicle", "Removing your listing...");
        try {
            await api.delete(`/vehicles/${vehicle._id}`);
            setVehicles(vehicles.filter((v) => v._id !== vehicle._id));
            closeLoading();
            showSuccess("Vehicle Deleted", "Your listing has been removed successfully.");
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            closeLoading();
            showError("Delete Failed", "Failed to delete vehicle. Please try again.");
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
                                                <button
                                                    onClick={() => setStatsModal({ show: true, vehicle })}
                                                    className="size-9 rounded-lg flex items-center justify-center border border-border-dark text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <Link
                                                    href={`/dashboard/user/edit-vehicle/${vehicle._id}`}
                                                    className="size-9 rounded-lg flex items-center justify-center border border-border-dark text-slate-400 hover:text-primary hover:border-primary transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(vehicle)}
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

            {/* Stats Modal */}
            {statsModal.show && statsModal.vehicle && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setStatsModal({ show: false, vehicle: null })}>

                    <div className="bg-surface-dark border border-border-dark w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 relative"
                        onClick={(e) => e.stopPropagation()}>

                        {/* Header */}
                        <div className="relative h-32 bg-slate-800">
                            {statsModal.vehicle.images?.[0] && (
                                <div className="absolute inset-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent z-10" />
                                    <img
                                        src={statsModal.vehicle.images[0]}
                                        alt={statsModal.vehicle.title}
                                        className="w-full h-full object-cover opacity-60"
                                    />
                                </div>
                            )}
                            <button
                                onClick={() => setStatsModal({ show: false, vehicle: null })}
                                className="absolute top-4 right-4 size-8 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-20"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>

                        <div className="p-8 -mt-12 relative z-20">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-1">{statsModal.vehicle.title}</h3>
                                    <p className="text-slate-400 text-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">calendar_month</span>
                                        Added on {new Date(statsModal.vehicle.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {getStatusBadge(statsModal.vehicle.status)}
                                    <span className="text-xl font-bold text-primary">৳{statsModal.vehicle.price}<span className="text-sm font-normal text-slate-400">/day</span></span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-background-dark p-4 rounded-xl border border-border-dark flex items-center gap-4">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-2xl">key</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Rented</p>
                                        <p className="text-2xl font-black text-white">{statsModal.vehicle.bookingCount || 0}</p>
                                    </div>
                                </div>

                                <div className="bg-background-dark p-4 rounded-xl border border-border-dark flex items-center gap-4">
                                    <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <span className="material-symbols-outlined text-2xl">payments</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Earnings</p>
                                        <p className="text-2xl font-black text-white">৳{(statsModal.vehicle.bookingCount || 0) * statsModal.vehicle.price}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border-dark flex gap-3">
                                <Link
                                    href={`/dashboard/user/edit-vehicle/${statsModal.vehicle._id}`}
                                    className="flex-1 py-3 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">edit_note</span>
                                    Edit Listing
                                </Link>
                                <Link
                                    href={`/vehicles/${statsModal.vehicle._id}`}
                                    target="_blank"
                                    className="flex-1 py-3 bg-transparent border border-border-dark text-slate-300 font-bold rounded-xl hover:text-white hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">open_in_new</span>
                                    Public View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
