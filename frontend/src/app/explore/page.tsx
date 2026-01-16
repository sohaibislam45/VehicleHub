"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/explore/FilterSidebar";
import VehicleCard from "@/components/explore/VehicleCard";
import { useEffect, useState } from "react";
import { vehicleService } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";

export default function ExplorePage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("Latest Arrivals");

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchVehicles();
        }, 500); // Debounce search
        return () => clearTimeout(timer);
    }, [search, category, sortBy]);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const filters: any = {};
            if (search) filters.search = search;
            if (category) filters.category = category;
            // Sorting logic could be handled here or as part of the query

            const data = await vehicleService.getAll(filters);

            // Basic client-side sorting if backend doesn't handle all types yet
            let sortedData = [...data];
            if (sortBy === "Price: Low to High") sortedData.sort((a, b) => a.price - b.price);
            if (sortBy === "Price: High to Low") sortedData.sort((a, b) => b.price - a.price);

            setVehicles(sortedData);
        } catch (err) {
            setError("Failed to load vehicles. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-64">
                        <label className="block text-sm font-medium text-slate-500 mb-2 px-1 uppercase tracking-widest">Sort By</label>
                        <div className="relative">
                            <select
                                className="w-full h-14 bg-surface-dark border border-white/5 rounded-xl px-4 appearance-none focus:ring-1 focus:ring-primary focus:border-primary text-white cursor-pointer outline-none"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option>Latest Arrivals</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Top Rated</option>
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
                        onCategoryChange={setCategory}
                    />

                    {/* Main Content Grid */}
                    <div className="flex-1">
                        {/* Active Filters Tags */}
                        {(category || search) && (
                            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
                                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Active Filters:</span>
                                {category && (
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-primary/30">
                                        {category} <span
                                            className="material-symbols-outlined text-[14px] cursor-pointer hover:bg-primary/20 rounded-full"
                                            onClick={() => setCategory("")}
                                        >close</span>
                                    </span>
                                )}
                                {search && (
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-primary/30">
                                        "{search}" <span
                                            className="material-symbols-outlined text-[14px] cursor-pointer hover:bg-primary/20 rounded-full"
                                            onClick={() => setSearch("")}
                                        >close</span>
                                    </span>
                                )}
                                <button
                                    onClick={() => { setCategory(""); setSearch(""); }}
                                    className="text-xs font-bold text-slate-500 hover:text-white transition-all underline underline-offset-4"
                                >
                                    Clear Results
                                </button>
                            </div>
                        )}

                        {/* Vehicle Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-surface-dark border border-white/5 rounded-2xl overflow-hidden flex flex-col animate-pulse">
                                        <div className="aspect-[16/10] bg-white/5"></div>
                                        <div className="p-5 space-y-4">
                                            <div className="h-6 w-3/4 bg-white/5 rounded-md"></div>
                                            <div className="h-3 w-1/2 bg-white/5 rounded-md"></div>
                                            <div className="pt-4 flex items-center justify-between">
                                                <div className="h-8 w-20 bg-white/5 rounded-md"></div>
                                                <div className="h-9 w-28 bg-white/5 rounded-xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
                                <p className="text-slate-400">{error}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                {vehicles.map((vehicle) => (
                                    <VehicleCard
                                        key={vehicle._id}
                                        id={vehicle._id}
                                        title={vehicle.title}
                                        description={`${vehicle.category} • ${vehicle.location}`}
                                        price={vehicle.price}
                                        image={vehicle.images[0]}
                                        category={vehicle.category}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && !error && (
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
