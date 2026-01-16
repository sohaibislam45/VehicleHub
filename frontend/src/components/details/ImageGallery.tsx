"use client";

interface ImageGalleryProps {
    images: string[];
    title: string;
    location: string;
}

export default function ImageGallery({ images, title, location }: ImageGalleryProps) {
    const mainImage = images[0];
    const sideImages = images.slice(1, 4);

    return (
        <section className="grid grid-cols-12 gap-4 mb-12 h-[500px]">
            {/* Main Hero Image */}
            <div className="col-span-12 lg:col-span-8 relative group overflow-hidden rounded-3xl bg-surface-dark">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-8 left-8 z-20">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/30">Available Now</span>
                    <h1 className="text-4xl font-bold text-white mt-4">{title}</h1>
                    <p className="text-slate-300 mt-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm">location_on</span> {location}
                    </p>
                </div>
                <div
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${mainImage}')` }}
                ></div>
                <div className="absolute top-6 right-6 z-20 flex gap-2">
                    <button className="size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all">
                        <span className="material-symbols-outlined">favorite</span>
                    </button>
                    <button className="size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all">
                        <span className="material-symbols-outlined">share</span>
                    </button>
                </div>
            </div>

            {/* Side Grid */}
            <div className="hidden lg:grid col-span-4 grid-rows-3 gap-4 h-full">
                {sideImages.map((img, idx) => (
                    <div
                        key={idx}
                        className="rounded-2xl overflow-hidden bg-surface-dark bg-center bg-cover relative"
                        style={{ backgroundImage: `url('${img}')` }}
                    >
                        {idx === 2 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-black/40 transition-colors">
                                <span className="flex flex-col items-center">
                                    <span className="material-symbols-outlined text-3xl">gallery_thumbnail</span>
                                    <span className="mt-2 text-sm">+12 Photos</span>
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
