"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/details/ImageGallery";
import BookingWidget from "@/components/details/BookingWidget";
import ReviewsSection from "@/components/details/ReviewsSection";
import RelatedVehicles from "@/components/details/RelatedVehicles";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data for the details page
const VEHICLE_DATA = {
    id: "1",
    title: "Tesla Model S Plaid",
    location: "Los Angeles, CA",
    price: 249,
    rating: 4.9,
    reviews: 128,
    images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBlrh9UwyBPsLZaBtVaWyplDKypacQLby3ItqimfIl4JDVisQuvW95wbNoFFOkwU9UymyCdvaGnYI9o1q9AUGeLdHyWgOru4sjUXnODUHfAnetkfnpczCeM_NW-VSnHg7l3PRw9jgrBBy7SI7IYoE9XrWky0AXpffpWk4NR6p5Lf2yY3IGrhdk12fsFH4I1S0ZcGuwYFz9BdrsljHEiCCHm7PsKudC9NM8SlbLJ9lOTqy1iO2t9CONeAd3Ufpgu5yErk-eMSRFTNi0",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHMQOMp1nBFwWShneArLSiOrmGdh74v3l1ok5pXbCnEYljT8nT3tvmP4nHjnUxfNf7q04Ohfp1scb3XV9gVkUeoz6K-Ver2RmUbymw94fX6ukD96RqEmcnHhR6BLwsqM6tdBET0qyHkBvT7UoUdDR7_DMwumQP_02WtfShRToyIDL4EOdlTCd3ndB9Pr8-JqJVk4bL7lxfBQ9pxjm6wBMADKxGVIqA8sCcyNvxCJEwDDRBx7HDun3nUY4FGvI8iQf_2T1a9IiFoPg",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKnUYqi56gyZV8hSZQp6gbjO4HjjjUBZfRUljiP0WNC_tgkEgG3pLMmTDpE8Bol2-thp_HEF0xSIPNosuwfOMNelx5UoCLd2pP18FlWuzMcV0xAGUYodqnLEzXGKCjpu2V0kmPPjPKw-cHJq-k9TtdhF5vsxVkj7x0z7xFcnPnZuF0OAO9rpnaxZI2UMrIyM0xpOIX8P4_VODqS_XL3NWZI5du3G5Fos0Ndx4cBckJg7rgE1Iw4mo8yDgaKghGY99IVj5S1Rbctz4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAexXHLWkwNAlSKxyvrAKbspqRR02EPD_qKFbrRXjUcdC6BvmO_qkN9oiLwrQMzDu2s6yWuczRz_CNJ7et0UkZ2menkRKM8VsVWY7SFoQp-vkJMktkfqF-rbh-Fijx7AHCOq11fn8PyJGSZOqENGGu1xAKjjU8T7r-MCv4C_NkjSNhlo5k-7b1QPZ0akWzZ_l4zmQdXn6cEwdRT-nUhy344f4RHQrF4tDl8S0xB-mreqcZNe4axc-tU75xC60yYIytDFqBW9yXfTx4"
    ],
    specs: [
        { icon: "speed", label: "Performance", value: "1,020 hp" },
        { icon: "ev_station", label: "Range", value: "396 mi" },
        { icon: "airline_seat_recline_extra", label: "Seats", value: "5 Adults" },
        { icon: "settings", label: "Drive", value: "Tri-Motor" }
    ],
    overview: "The Tesla Model S Plaid is the quickest accelerating car in production today. With 0-60 mph in 1.99 seconds, this vehicle redefines the limits of electric performance. Our Plaid edition comes fully equipped with the 21\" Arachnid wheels, Cream premium interior with carbon fiber decor, and the controversial yet futuristic yoke steering wheel.",
    features: [
        { label: "Supercharging costs are included up to 100 miles.", icon: "check_circle", positive: true },
        { label: "Strictly no smoking or pets allowed inside.", icon: "cancel", positive: false },
        { label: "Contactless pickup and dropoff available.", icon: "check_circle", positive: true },
        { label: "Minimum age of 25 required for this category.", icon: "cancel", positive: false }
    ]
};

export default function VehicleDetailsPage() {
    const params = useParams();

    return (
        <div className="bg-background-dark min-h-screen">
            <main className="max-w-7xl mx-auto layout-padding py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-slate-500">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link href="/explore" className="hover:text-primary transition-colors">Luxury Vehicles</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-white">{VEHICLE_DATA.title}</span>
                </nav>

                <ImageGallery
                    images={VEHICLE_DATA.images}
                    title={VEHICLE_DATA.title}
                    location={VEHICLE_DATA.location}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Details */}
                    <div className="col-span-1 lg:col-span-8 space-y-12">
                        {/* Key Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {VEHICLE_DATA.specs.map((spec) => (
                                <div key={spec.label} className="p-6 rounded-2xl bg-surface-dark border border-white/5 flex flex-col items-center text-center">
                                    <span className="material-symbols-outlined text-primary mb-3">{spec.icon}</span>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{spec.label}</p>
                                    <p className="text-white font-bold text-lg">{spec.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Vehicle Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Vehicle Overview</h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                {VEHICLE_DATA.overview}
                            </p>
                        </section>

                        {/* Rules & Notes */}
                        <section className="bg-surface-dark p-8 rounded-3xl border border-white/5">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">gavel</span> Rental Rules & Notes
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {VEHICLE_DATA.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-400">
                                        <span className={`material-symbols-outlined text-sm mt-1 ${feature.positive ? 'text-green-500' : 'text-red-500'}`}>
                                            {feature.icon}
                                        </span>
                                        <span>{feature.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <ReviewsSection />
                    </div>

                    {/* Right Column: Booking Sidebar */}
                    <div className="col-span-1 lg:col-span-4">
                        <BookingWidget
                            price={VEHICLE_DATA.price}
                            reviews={VEHICLE_DATA.reviews}
                            rating={VEHICLE_DATA.rating}
                        />
                    </div>
                </div>

                <RelatedVehicles />
            </main>
        </div>
    );
}
