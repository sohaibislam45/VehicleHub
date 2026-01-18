"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Pagination from "@/components/dashboard/Pagination";
import { useSweetAlert } from "@/hooks/useSweetAlert";

interface Booking {
    _id: string;
    userId: {
        name: string;
        email: string;
    };
    vehicleId: {
        _id: string;
        title: string;
        images?: string[];
    };
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
    createdAt: string;
}

export default function ManageBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const { showConfirm, showSuccess, showError } = useSweetAlert();
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get("/admin/bookings");
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId: string, newStatus: string) => {
        const confirmed = await showConfirm(
            "Change Booking Status?",
            `Are you sure you want to change this booking status to ${newStatus.toUpperCase()}?`,
            `Yes, Mark as ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
            "Cancel"
        );

        if (!confirmed) return;

        try {
            await api.patch(`/bookings/${bookingId}/status`, { status: newStatus });
            setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
            showSuccess("Status Updated", `Booking status has been updated to ${newStatus}.`);
        } catch (error) {
            console.error("Error updating status:", error);
            showError("Update Failed", "Failed to update booking status. Please try again.");
        }
    };

    const filteredBookings = bookings.filter(b =>
        filterStatus === "all" || b.status.toLowerCase() === filterStatus.toLowerCase()
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterStatus]);

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

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
                    <h2 className="text-4xl font-black tracking-tight text-white mb-1">System Bookings</h2>
                    <p className="text-slate-400 text-sm">Monitor and manage all rental transactions across the system.</p>
                </div>
                <div className="flex gap-2">
                    {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${filterStatus === status
                                ? 'bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(23,191,207,0.3)]'
                                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </header>

            <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Customer Details</th>
                                <th className="px-6 py-4">Vehicle Image</th>
                                <th className="px-6 py-4">Vehicle</th>
                                <th className="px-6 py-4">Timeline</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paginatedBookings.map((b) => (
                                <tr key={b._id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5 font-mono text-xs text-slate-500">#{b._id.slice(-8).toUpperCase()}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-100">{b.userId?.name || "Deleted User"}</span>
                                            <span className="text-xs text-slate-500">{b.userId?.email || "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="size-16 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                            {b.vehicleId?.images?.[0] ? (
                                                <img src={b.vehicleId.images[0]} alt={b.vehicleId?.title || 'Vehicle'} className="object-cover size-full" />
                                            ) : (
                                                <div className="size-full flex items-center justify-center text-slate-600">
                                                    <span className="material-symbols-outlined">image</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-white">{b.vehicleId?.title || "Deleted Vehicle"}</span>
                                            <a
                                                href={`/vehicles/${b.vehicleId?._id}`}
                                                target="_blank"
                                                className="text-[10px] text-primary hover:underline w-fit"
                                            >
                                                View Listing
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-xs text-slate-300">{new Date(b.startDate).toLocaleDateString()}</span>
                                            <span className="text-[10px] text-slate-500">to {new Date(b.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-bold text-white">৳{b.totalPrice.toFixed(2)}</td>
                                    <td className="px-6 py-5">
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase w-fit ${getStatusStyle(b.status)}`}>
                                            <span className={`size-1.5 rounded-full ${b.status === 'pending' ? 'animate-pulse' : ''} bg-current`}></span>
                                            {b.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <select
                                            value={b.status}
                                            onChange={(e) => handleStatusChange(b._id, e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-bold text-white focus:outline-none focus:border-primary/50 cursor-pointer uppercase tracking-wider"
                                        >
                                            <option value="pending" className="bg-background-dark">Pending</option>
                                            <option value="confirmed" className="bg-background-dark">Confirm</option>
                                            <option value="cancelled" className="bg-background-dark">Cancel</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredBookings.length === 0 && (
                    <div className="py-20 text-center">
                        <span className="material-symbols-outlined text-5xl text-slate-700 mb-4">event_busy</span>
                        <p className="text-slate-500">No bookings found in this category.</p>
                    </div>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
