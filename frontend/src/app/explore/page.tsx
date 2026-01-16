"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/explore/FilterSidebar";
import VehicleCard from "@/components/explore/VehicleCard";
import { useState } from "react";

// Mock data based on the design
const MOCK_VEHICLES = [
    {
        id: "1",
        title: "Lucid Air Grand Touring",
        description: "2024 • Electric • 516mi Range",
        price: 245,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYFRuHIBIHBSw3cue1rL_TyigsegSeSxNzIyK_skNegPVqrkGUI7-EyY68eifX2Xbv5qsG27FOkTtKSRJGWOX0vUn8j016BPn0sKcjvEbwq067hHK_3UD6KPQSlGM9XEcOAJpJTjpMSw3rZjNNDPu-zFwQJI4wxksQ-Q24gC_6qWDu3MFztyAbnBhaeKlKGoRwREQt4JiDNnA6MnUZwK2eTZp4cvW4bR6a46z8lSZLNiteN5w-u3SIE9Px5bndfoPrHuMAA1INwIU",
        category: "Electric",
        featured: true
    },
    {
        id: "2",
        title: "Range Rover Sport",
        description: "2023 • Hybrid • Dynamic SE",
        price: 320,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnA9LJQTTd6nN3XAu8tMV1-KJ6VL8p_DghqxAda9X9UQVMRA0H34wI6DoF91u0idfN9Q7-OUE2ut0HkpFREu2VmxY96sszizVojPvATkztZHM2hmp2tRhSehibAI4Fzfz9BIZYcPHil-nOqggNEW5M-YXpGEU1HchE9cxWiYVlswNxdicqwyTUsHROiUPH7nztXgpbliFI9qt1hID0W7Umrw6WvBZN4g2EZs15jAZ_QR8OUeaViClXCd_eDTljh3hUcxr8uOjgOgA",
        category: "SUV",
        featured: false
    },
    {
        id: "3",
        title: "Porsche Taycan 4S",
        description: "2024 • Electric • Frozen Blue",
        price: 410,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuW2g0MaMEmO-D0XHzu7xZLmLaRONKJqOjG8H-O_X4ZEf58vb22eHnvY83JUYyLhFisVJLejeLAgMlbblDQ5ftpic91pzLGcZk1PWh-vEvl1lJp1EW6ChcoLe2Trf0Al2tZkYmmncT1jPWMCWB2N2d9_rapm329Vk4PFHdfwRnQruNxnr175GmfPrJs7loLhcja8qQgl2yLdVKJqTXNPPeku093ElVw5xjttRspLA1MV7gKuqK0pwmso92TeM4UvmGbJSaejLi2_s",
        category: "Electric",
        featured: false
    },
    {
        id: "4",
        title: "BMW i7 M70",
        description: "2024 • Electric • Executive Lounge",
        price: 380,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa4X-cBm1syYhV5UxGAVumaxOScseYXKSYrbhI-70EgqYOK-YKcTcE7ocxr9eAQLxw01WTvXBXz81F9yDU08gzKBme2d6jFgzB8jH089uLps2DdUwHyXj-Vux0UxGgMZyFQUo7PPNDuq7x0jKonJttvtuqdfUQY7owkAOuGUXfxRsYljMV_NtMNaJ0gIsDx9kIo2XYDPjKzAHzous5zyQR2VOqnk1rr__1ddf1MMGm5Jf3JHpopa_zwzKtUeY7NqWlfLMcDEKGKTY",
        category: "Electric",
        featured: false
    },
    {
        id: "5",
        title: "Audi Q8 e-tron",
        description: "2024 • Electric • Quattro",
        price: 195,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTKc39eZ_aEkKXcIzugKAqChrFBDm0Shh_OSZoXg7SGoadWwcUOVIKg8s1QdMovSf4JS18xSXNbyxPhdq3D8FsZ1nfETOe5VDYHuwHPoPZV_VH52jKfsXSuMedzEBsPDSWP6K6pQB4a1WAHk__n-kI8TjfYzz1cYwA174tyYzokyvPVeX3-Ud7CYfcfANBd2rd1iW0JNPDjnhtloPIyXNEdmIAa_LP1-fQMDKT07l7aLyyJRH6uamPnwx2h59s7kNjf5jxNMXEaLo",
        category: "SUV",
        featured: false
    },
    {
        id: "6",
        title: "Tesla Model S Plaid",
        description: "2023 • Electric • 1020hp",
        price: 210,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZWleFy8a4wQwQkmrFG6xoE68ERzjHEor2_6WKZD_c_qIwvzGMLfIRwslrBg9qIq5i2cLxrrg-VTbA-Fr5TE6plTIlp6y5Uc4Vv1ir42mwXWGhnxbce2ffkK4BKB2qtGNyjso6azBeCEFpysKsQArIH5ICeXe8NEmYqWiAXgCxW6JgZoXyA4H7c7fjobXurnn3re_XV5RCDL1gp4v_Psq7MXT8EZ-vzN5WGjbp2siEIKAuMaZBZRC_nv0x2hdnJNIM6iMY8mlnDWs",
        category: "Electric",
        featured: false
    }
];

export default function ExplorePage() {
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
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-64">
                        <label className="block text-sm font-medium text-slate-500 mb-2 px-1 uppercase tracking-widest">Sort By</label>
                        <div className="relative">
                            <select className="w-full h-14 bg-surface-dark border border-white/5 rounded-xl px-4 appearance-none focus:ring-1 focus:ring-primary focus:border-primary text-white cursor-pointer outline-none">
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
                    <FilterSidebar />

                    {/* Main Content Grid */}
                    <div className="flex-1">
                        {/* Active Filters Tags */}
                        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
                            <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Active Filters:</span>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-primary/30">
                                Electric <span className="material-symbols-outlined text-[14px] cursor-pointer hover:bg-primary/20 rounded-full">close</span>
                            </span>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-primary/30">
                                $80 - $450 <span className="material-symbols-outlined text-[14px] cursor-pointer hover:bg-primary/20 rounded-full">close</span>
                            </span>
                            <button className="text-xs font-bold text-slate-500 hover:text-white transition-all underline underline-offset-4">Clear Results</button>
                        </div>

                        {/* Vehicle Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {MOCK_VEHICLES.map((vehicle) => (
                                <VehicleCard key={vehicle.id} {...vehicle} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-16 flex justify-center">
                            <nav className="flex items-center gap-2 p-1.5 bg-surface-dark border border-white/5 rounded-2xl">
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-500 transition-all">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-background-dark font-bold text-sm">1</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-white font-medium text-sm transition-all">2</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-white font-medium text-sm transition-all">3</button>
                                <span className="text-slate-500 px-2 text-sm">...</span>
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-white font-medium text-sm transition-all">12</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-400 transition-all">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
