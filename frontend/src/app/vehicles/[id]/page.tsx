"use client";

import ImageGallery from "@/components/details/ImageGallery";
import BookingWidget from "@/components/details/BookingWidget";
import ReviewsSection from "@/components/details/ReviewsSection";
import RelatedVehicles from "@/components/details/RelatedVehicles";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { vehicleService } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";
import { toast } from "react-hot-toast"; // assuming we want some feedback

export default function VehicleDetailsPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const isSuccess = searchParams.get('success') === 'true';
    const confirmedBookingId = searchParams.get('bookingId');

    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetchVehicle();
        }
    }, [id]);

    const fetchVehicle = async () => {
        try {
            const data = await vehicleService.getById(id);
            setVehicle(data);
        } catch (err) {
            setError("Failed to load vehicle details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-background-dark min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 animate-pulse">Loading vehicle details...</p>
                </div>
            </div>
        );
    }

    if (error || !vehicle) {
        return (
            <div className="bg-background-dark min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error_outline</span>
                    <h1 className="text-2xl font-bold text-white mb-2">Vehicle Not Found</h1>
                    <p className="text-slate-400 mb-6">{error || "The requested vehicle details could not be loaded."}</p>
                    <Link href="/explore" className="bg-primary text-background-dark px-6 py-3 rounded-full font-bold hover:brightness-110 transition-all">
                        Back to Fleet
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-dark min-h-screen">
            <main className="max-w-7xl mx-auto layout-padding py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-slate-500">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link href={`/explore?category=${vehicle.category}`} className="hover:text-primary transition-colors">{vehicle.category} Vehicles</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-white">{vehicle.title}</span>
                </nav>

                <ImageGallery
                    images={vehicle.images}
                    title={vehicle.title}
                    location={vehicle.location}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Details */}
                    <div className="col-span-1 lg:col-span-8 space-y-12">
                        {/* Key Stats Grid */}
                        {vehicle.specs && vehicle.specs.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {vehicle.specs.map((spec, idx) => (
                                    <div key={idx} className="p-6 rounded-2xl bg-surface-dark border border-white/5 flex flex-col items-center text-center">
                                        <span className="material-symbols-outlined text-primary mb-3">{spec.icon}</span>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{spec.label}</p>
                                        <p className="text-white font-bold text-lg">{spec.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Vehicle Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Vehicle Overview</h2>
                            <p className="text-slate-400 leading-relaxed text-lg whitespace-pre-wrap">
                                {vehicle.description}
                            </p>
                        </section>

                        {/* Rules & Notes */}
                        {vehicle.features && vehicle.features.length > 0 && (
                            <section className="bg-surface-dark p-8 rounded-3xl border border-white/5">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">gavel</span> Rental Rules & Notes
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {vehicle.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-400">
                                            <span className={`material-symbols-outlined text-sm mt-1 ${feature.positive ? 'text-green-500' : 'text-red-500'}`}>
                                                {feature.icon}
                                            </span>
                                            <span>{feature.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        <ReviewsSection
                            rating={vehicle.rating || 5}
                            reviewsCount={vehicle.reviewsCount || 0}
                        />
                    </div>

                    {/* Right Column: Booking Sidebar */}
                    <div className="col-span-1 lg:col-span-4">
                        <BookingWidget
                            price={vehicle.price}
                            reviews={vehicle.reviewsCount || 0}
                            rating={vehicle.rating || 5}
                            isConfirmed={isSuccess}
                            confirmedBookingId={confirmedBookingId}
                        />
                    </div>
                </div>

                <RelatedVehicles
                    category={vehicle.category}
                    currentVehicleId={vehicle._id}
                />
            </main>
        </div>
    );
}
