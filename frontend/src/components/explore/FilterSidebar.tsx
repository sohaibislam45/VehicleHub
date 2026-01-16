"use client";

import { useState } from "react";

interface FilterSidebarProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function FilterSidebar({ selectedCategory, onCategoryChange }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState([80, 450]);

    const categories = [
        { name: "Electric", count: 12 },
        { name: "SUV", count: 28 },
        { name: "Sedan", count: 15 },
        { name: "Luxury", count: 6 }
    ];

    return (
        <aside className="w-full lg:w-72 space-y-8 shrink-0">
            <div className="p-6 rounded-2xl border border-white/5 bg-surface-dark/40 backdrop-blur-sm sticky top-28">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-slate-100">Filters</h3>
                    <button
                        onClick={() => onCategoryChange("")}
                        className="text-primary text-xs font-bold uppercase tracking-wider hover:underline"
                    >
                        Reset All
                    </button>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Vehicle Category</p>
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <label key={category.name} className="flex items-center group cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategory === category.name}
                                    onChange={() => onCategoryChange(selectedCategory === category.name ? "" : category.name)}
                                    className="rounded border-white/10 bg-background-dark text-primary focus:ring-primary h-5 w-5 mr-3 transition-all cursor-pointer"
                                />
                                <span className="text-slate-100 group-hover:text-primary transition-colors text-sm font-medium">{category.name}</span>
                                <span className="ml-auto text-xs text-slate-500">{category.count}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Slider (Visual for now) */}
                <div className="mb-8">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Price Range (Daily)</p>
                    <div className="relative h-1 bg-white/10 rounded-full mb-6">
                        <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full"></div>
                        <div className="absolute left-1/4 -top-2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-lg shadow-primary/20 cursor-grab active:cursor-grabbing"></div>
                        <div className="absolute right-1/4 -top-2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-lg shadow-primary/20 cursor-grab active:cursor-grabbing"></div>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="bg-background-dark px-3 py-1 rounded-lg border border-white/10 text-slate-100">$80</span>
                        <span className="text-slate-500 font-normal">to</span>
                        <span className="bg-background-dark px-3 py-1 rounded-lg border border-white/10 text-slate-100">$450</span>
                    </div>
                </div>

                {/* Quick Toggles */}
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Features</p>
                    <div className="flex flex-wrap gap-2">
                        {["Autopilot", "AWD", "Sunroof", "Pet Friendly"].map((feature, idx) => (
                            <button
                                key={feature}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${idx === 1 ? 'border border-primary bg-primary/10 text-primary' : 'border border-white/10 bg-background-dark text-slate-300 hover:border-primary'}`}
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
