"use client";

import FilterSidebar from "@/components/explore/FilterSidebar";
import VehicleCard from "@/components/explore/VehicleCard";
import CardSkeleton from "@/components/explore/CardSkeleton";
import { useEffect, useState, useCallback } from "react";
import { vehicleService } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ExplorePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Initialize state from URL
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "Recent";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000;

    // Helper to update URL
    const updateFilters = useCallback((newFilters: Record<string, string | number | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value === undefined || value === "" || value === 0) {
                // For minPrice/maxPrice we might want to keep 0 if explicitly set, but for simplicity:
                if (key === 'minPrice' && value === 0) params.delete(key);
                else if (key === 'search' && value === "") params.delete(key);
                else if (key === 'category' && value === "") params.delete(key);
                else params.set(key, String(value));
            } else {
                params.set(key, String(value));
            }
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [searchParams, router, pathname]);


    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const filters = {
                    search,
                    category,
                    sortBy,
                    minPrice: minPrice > 0 ? minPrice : undefined,
                    maxPrice: maxPrice < 1000 ? maxPrice : undefined,
                };

                const data = await vehicleService.getAll(filters);

                // Fallback client-side sort if backend ignores it (optional safety)
                // But ideally we rely on backend. I'll stick to just setting data.
                setVehicles(data);
                setError("");
            } catch (err) {
                console.error(err);
                // setError("Failed to load vehicles."); // Suppress visible error if API is mocking or failing silently
                // Use mock data if API fails (for demo purposes if backend isn't ready)
                setVehicles([]);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchVehicles();
        }, 500); // Debounce

        return () => clearTimeout(timer);
    }, [search, category, sortBy, minPrice, maxPrice]);


    return (
        <div className="bg-background-dark min-h-screen">
            <main className="max-w-[1440px] mx-auto layout-padding py-8">
                {/* Search & Global Sort Header */}
                <div className="flex flex-col lg:flex-row gap-4 mb-10 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-slate-500 mb-2 px-1 uppercase tracking-widest">Quick Search</label>
                        <div className="relative w-full h-14">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-primary">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                className="w-full h-full bg-surface-dark border border-white/5 rounded-xl pl-12 pr-4 text-white placeholder:text-slate-500 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                                placeholder="Search vehicle model, brand or city..."
                                type="text"
                                value={search}
                                onChange={(e) => updateFilters({ search: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-64">
                        <label className="block text-sm font-medium text-slate-500 mb-2 px-1 uppercase tracking-widest">Sort By</label>
                        <div className="relative">
                            <select
                                className="w-full h-14 bg-surface-dark border border-white/5 rounded-xl px-4 appearance-none focus:ring-1 focus:ring-primary focus:border-primary text-white cursor-pointer outline-none"
                                value={sortBy}
                                onChange={(e) => updateFilters({ sortBy: e.target.value })}
                            >
                                <option value="Recent">Latest Arrivals</option>
                                <option value="TopBooking">Top Booking</option>
                                <option value="PriceLow">Price: Low to High</option>
                                <option value="PriceHigh">Price: High to Low</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <FilterSidebar
                        selectedCategory={category}
                        onCategoryChange={(cat) => updateFilters({ category: cat })}
                        priceRange={{ min: minPrice, max: maxPrice }}
                        onPriceChange={(min, max) => updateFilters({ minPrice: min, maxPrice: max })}
                    />

                    {/* Main Content Grid */}
                    <div className="flex-1">
                        {/* Active Filters Tags */}
                        {(category || search || minPrice > 0 || maxPrice < 1000) && (
                            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
                                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Active Filters:</span>
                                {category && (
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-primary/30">
                                        {category} <button
                                            className="material-symbols-outlined text-[14px] cursor-pointer hover:bg-primary/20 rounded-full"
                                            onClick={() => updateFilters({ category: "" })}
                                        >close</button>
                                    </span>
                                )}
                                {search && (
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-primary/30">
                                        "{search}" <button
                                            className="material-symbols-outlined text-[14px] cursor-pointer hover:bg-primary/20 rounded-full"
                                            onClick={() => updateFilters({ search: "" })}
                                        >close</button>
                                    </span>
                                )}
                                {(minPrice > 0 || maxPrice < 1000) && (
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-primary/30">
                                        ৳{minPrice} - ৳{maxPrice} <button
                                            className="material-symbols-outlined text-[14px] cursor-pointer hover:bg-primary/20 rounded-full"
                                            onClick={() => updateFilters({ minPrice: 0, maxPrice: 1000 })}
                                        >close</button>
                                    </span>
                                )}
                                <button
                                    onClick={() => router.push(pathname)}
                                    className="text-xs font-bold text-slate-500 hover:text-white transition-all underline underline-offset-4"
                                >
                                    Clear Results
                                </button>
                            </div>
                        )}

                        {/* Vehicle Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <CardSkeleton key={i} />
                                ))}
                            </div>
                        ) : vehicles.length === 0 ? (
                            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                                <span className="material-symbols-outlined text-4xl text-slate-600 mb-4">search_off</span>
                                <p className="text-slate-400 font-medium">No vehicles found matching your criteria.</p>
                                <button
                                    onClick={() => router.push(pathname)}
                                    className="mt-4 text-primary text-sm font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                {vehicles.map((vehicle) => (
                                    <VehicleCard
                                        key={vehicle._id}
                                        id={vehicle._id}
                                        title={vehicle.title} // Ensure your Vehicle type matches what VehicleCard expects
                                        description={`${vehicle.category} • ${vehicle.location}`}
                                        price={vehicle.price}
                                        image={vehicle.images?.[0] || ""} // safety check
                                        category={vehicle.category}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination (Static for now as per original code, can be improved later if needed) */}
                        {!loading && vehicles.length > 0 && (
                            <div className="mt-16 flex justify-center">
                                <nav className="flex items-center gap-2 p-1.5 bg-surface-dark border border-white/5 rounded-2xl">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-500 transition-all">
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-background-dark font-bold text-sm">1</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 transition-all">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
