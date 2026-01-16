"use client";

import Link from "next/link";
import VehicleCard from "@/components/explore/VehicleCard";

// Reuse the simple card style but adapted for related strip or just use VehicleCard in a grid
// The design shows a horizontal scroll strip. I'll use a grid for simplicity in the first pass but with overflow handling.

const REL_MOCK = [
    {
        id: "1",
        title: "Lucid Air Grand Touring",
        description: "Luxury Electric",
        price: 210,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd5Bw5fBBeZZU-rpQqLtBI4_ci04WRVYotlpkBdq3SiZTF_gCc3eyDX8FmtZdFeRu8M4DVtl9WjsyRqAdN0Waxh-Dyb6fU1AGusDHcogdQJZuffEP8Q3vnOa5sH0ntKYeWZUMqFC-m9s8agOiad-hLx4jWmMil-TPeJWzpr87Jf4Iob6wKla39OJEKjLZuPzgWiZDkk1bd88evLqtqvDWqio13unJhr_wPfmVAWIdGpkCElbn5tvSv0573ObKxTvdPpJsLsX1a7Tw",
        category: "Sedan"
    },
    {
        id: "2",
        title: "Rivian R1S",
        description: "Adventure SUV",
        price: 185,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcuDKhgxPFuKjFJVfv81mH6ehk2m4Dl7iicS9V0JQnelBNpWEMuxpcZlW-QVF8_A8aErG4EZ5xmxsXN6J2PWU1J9Fshevf2k0yxMRdHGUsxcaxQjfPApEV6chSdOzPpU6h8NxrM4fI5B7XOrg4jVx1n63MjJGnv24v20uW8Xtc6dNw9aYH2lU4diZd-JSNr8PTd6LyJjot4SvM5bmWKSRcqp1CRS5TzGEvCQIRW1LARVomaWMGWeODyQ-4DtMf3KVwlpsclGzDVNU",
        category: "SUV"
    },
    {
        id: "3",
        title: "Porsche Taycan 4S",
        description: "Sport Electric",
        price: 275,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl9JkFJlYHO-Z-Z-1C66eXKygiPlEDptN4I78BWsW2B_Qrc0uLwU6lSvkiT-qXZHpb1ZdC44zozVDIx55i3RTNOUcvTXqse40TqJnRcxzN1iXUA69hbweW1XLaIE9b5uB7B2ZGKN0xO9h-vugctgqzZN86x8v0WHMJV5Z-QyYbH8t_oRh4UsUenN_zB_2NCPVN3qmzdmWsJrHXWbL3Ce7T_DKIC7_TaDwtMNE-VHj7p0rEkXmuclDSJeO3UeLZ14rKr9H7jHd5irs",
        category: "Sport"
    },
    {
        id: "4",
        title: "Polestar 3",
        description: "Crossover",
        price: 150,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFlG7bv1YhG0wxrLHOoBzJ9bjCzSWEiCAK5eqqWRQcA1k1gHT6rLLQuosuemrXFiPEqxybCGSyu19FJuZr2mEaWxQLPLUvoahYkJ_vn8ZC7_deCkQBik4ILlLI8jeO7g8-08osEDmeyrp5AdnZ6xK5JVRiTD2LCJHeoOEa-JaE176GXWVEP3GAXlZGwyaSuNTZWNgVXkncB3v9n5jEEYInjZqM4CeC-6xDj4duI2jk45Y9ofV2nPFruXqtsMHniDZfpwJ6GX0Yagc",
        category: "Crossover"
    }
];

export default function RelatedVehicles() {
    return (
        <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">You Might Also Like</h2>
                <div className="flex gap-2">
                    <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 no-scrollbar overflow-x-auto pb-4">
                {REL_MOCK.map((v) => (
                    <VehicleCard key={v.id} {...v} />
                ))}
            </div>
        </section>
    );
}
