"use client";

interface FilterSidebarProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    priceRange: { min: number; max: number };
    onPriceChange: (min: number, max: number) => void;
}

export default function FilterSidebar({ selectedCategory, onCategoryChange, priceRange, onPriceChange }: FilterSidebarProps) {
    const categories = [
        { name: "Electric", count: 12 },
        { name: "SUV", count: 28 },
        { name: "Sedan", count: 15 },
        { name: "Luxury", count: 6 }
    ];

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value) || 0;
        onPriceChange(val, priceRange.max);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value) || 0;
        onPriceChange(priceRange.min, val);
    };

    return (
        <aside className="w-full lg:w-72 space-y-8 shrink-0">
            <div className="p-6 rounded-2xl border border-white/5 bg-surface-dark/40 backdrop-blur-sm sticky top-28">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-slate-100">Filters</h3>
                    <button
                        onClick={() => {
                            onCategoryChange("");
                            onPriceChange(0, 1000);
                        }}
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

                {/* Price Range Inputs */}
                <div className="mb-8">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Price Range (Daily)</p>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Min Price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={handleMinChange}
                                    className="w-full bg-background-dark border border-white/10 rounded-xl py-2 pl-7 pr-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Max Price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={handleMaxChange}
                                    className="w-full bg-background-dark border border-white/10 rounded-xl py-2 pl-7 pr-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
