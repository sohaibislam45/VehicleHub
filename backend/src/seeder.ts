import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicle from './models/Vehicle.js';
import User from './models/User.js';

dotenv.config();

const vehicles = [
    {
        title: "Lucid Air Grand Touring",
        description: "2024 • Electric • 516mi Range. The Lucid Air Grand Touring is the longest range, fastest charging luxury electric car in the world.",
        price: 245,
        category: "Electric",
        location: "San Francisco, CA",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCYFRuHIBIHBSw3cue1rL_TyigsegSeSxNzIyK_skNegPVqrkGUI7-EyY68eifX2Xbv5qsG27FOkTtKSRJGWOX0vUn8j016BPn0sKcjvEbwq067hHK_3UD6KPQSlGM9XEcOAJpJTjpMSw3rZjNNDPu-zFwQJI4wxksQ-Q24gC_6qWDu3MFztyAbnBhaeKlKGoRwREQt4JiDNnA6MnUZwK2eTZp4cvW4bR6a46z8lSZLNiteN5w-u3SIE9Px5bndfoPrHuMAA1INwIU",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA39pjR8ZAYdeFhzirpkxiXENZetDtLyv9toTD1L_7Jx872Z5uN15h_qQIazKUqkuJwoUukG_YWi5ZqDM-13RyFfqmYXxY72ZZqQszS4fqmAXmAZFoSjDfBHLgONtGeq_GgkamV9Krqxzg9bkx2hmH2rHypTdk7mtjd62qSF0FRfCAp5RG3YCtEJXgrr1jFRHNebU9vq30H1hYJ20-15qzIVpz31WixOOXBXmZrghiOHsa6UqzqQ4NswTRvRpdPYfh3p5YWikH-rGE"
        ],
        specs: [
            { icon: "speed", label: "Performance", value: "819 hp" },
            { icon: "ev_station", label: "Range", value: "516 mi" },
            { icon: "airline_seat_recline_extra", label: "Seats", value: "5 Adults" },
            { icon: "settings", label: "Drive", value: "AWD" }
        ],
        features: [
            { label: "Free Supercharging", icon: "check_circle", positive: true },
            { label: "No Pets", icon: "cancel", positive: false }
        ]
    },
    {
        title: "Range Rover Sport",
        description: "2023 • Hybrid • Dynamic SE. Visceral, dramatic, and uncompromising. The Range Rover Sport is the most dynamic Range Rover.",
        price: 320,
        category: "SUV",
        location: "Los Angeles, CA",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDnA9LJQTTd6nN3XAu8tMV1-KJ6VL8p_DghqxAda9X9UQVMRA0H34wI6DoF91u0idfN9Q7-OUE2ut0HkpFREu2VmxY96sszizVojPvATkztZHM2hmp2tRhSehibAI4Fzfz9BIZYcPHil-nOqggNEW5M-YXpGEU1HchE9cxWiYVlswNxdicqwyTUsHROiUPH7nztXgpbliFI9qt1hID0W7Umrw6WvBZN4g2EZs15jAZ_QR8OUeaViClXCd_eDTljh3hUcxr8uOjgOgA"
        ],
        specs: [
            { icon: "speed", label: "Performance", value: "434 hp" },
            { icon: "local_gas_station", label: "MPG", value: "21 Combined" },
            { icon: "airline_seat_recline_extra", label: "Seats", value: "7 Adults" },
            { icon: "settings", label: "Drive", value: "AWD" }
        ],
        features: [
            { label: "Concierge Service", icon: "check_circle", positive: true },
            { label: "Premium Audio", icon: "check_circle", positive: true }
        ]
    },
    {
        title: "Porsche Taycan 4S",
        description: "2024 • Electric • Frozen Blue. The soul of a Porsche, powered by electricity. Pure emotion and instant torque.",
        price: 410,
        category: "Electric",
        location: "Miami, FL",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBuW2g0MaMEmO-D0XHzu7xZLmLaRONKJqOjG8H-O_X4ZEf58vb22eHnvY83JUYyLhFisVJLejeLAgMlbblDQ5ftpic91pzLGcZk1PWh-vEvl1lJp1EW6ChcoLe2Trf0Al2tZkYmmncT1jPWMCWB2N2d9_rapm329Vk4PFHdfwRnQruNxnr175GmfPrJs7loLhcja8qQgl2yLdVKJqTXNPPeku093ElVw5xjttRspLA1MV7gKuqK0pwmso92TeM4UvmGbJSaejLi2_s"
        ],
        specs: [
            { icon: "speed", label: "Performance", value: "522 hp" },
            { icon: "ev_station", label: "Range", value: "227 mi" },
            { icon: "airline_seat_recline_extra", label: "Seats", value: "4 Adults" },
            { icon: "settings", label: "Drive", value: "AWD" }
        ],
        features: [
            { label: "Sport Chrono", icon: "check_circle", positive: true }
        ]
    },
    {
        title: "Tesla Model S Plaid",
        description: "2023 • Electric • 1020hp. Beyond Ludicrous. This is the fastest accelerating production car allowed on the road.",
        price: 249,
        category: "Electric",
        location: "Los Angeles, CA",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBlrh9UwyBPsLZaBtVaWyplDKypacQLby3ItqimfIl4JDVisQuvW95wbNoFFOkwU9UymyCdvaGnYI9o1q9AUGeLdHyWgOru4sjUXnODUHfAnetkfnpczCeM_NW-VSnHg7l3PRw9jgrBBy7SI7IYoE9XrWky0AXpffpWk4NR6p5Lf2yY3IGrhdk12fsFH4I1S0ZcGuwYFz9BdrsljHEiCCHm7PsKudC9NM8SlbLJ9lOTqy1iO2t9CONeAd3Ufpgu5yErk-eMSRFTNi0",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAHMQOMp1nBFwWShneArLSiOrmGdh74v3l1ok5pXbCnEYljT8nT3tvmP4nHjnUxfNf7q04Ohfp1scb3XV9gVkUeoz6K-Ver2RmUbymw94fX6ukD96RqEmcnHhR6BLwsqM6tdBET0qyHkBvT7UoUdDR7_DMwumQP_02WtfShRToyIDL4EOdlTCd3ndB9Pr8-JqJVk4bL7lxfBQ9pxjm6wBMADKxGVIqA8sCcyNvxCJEwDDRBx7HDun3nUY4FGvI8iQf_2T1a9IiFoPg"
        ],
        specs: [
            { icon: "speed", label: "Performance", value: "1,020 hp" },
            { icon: "ev_station", label: "Range", value: "396 mi" },
            { icon: "airline_seat_recline_extra", label: "Seats", value: "5 Adults" },
            { icon: "settings", label: "Drive", value: "Tri-Motor" }
        ],
        features: [
            { label: "Supercharging Included", icon: "check_circle", positive: true },
            { label: "Yoke Steering", icon: "check_circle", positive: true }
        ]
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);

        await Vehicle.deleteMany();
        
        let adminUser = await User.findOne({ role: 'admin' });
        
        if (!adminUser) {
            console.log('Creating initial admin user...');
            adminUser = await User.create({
                firebaseId: 'seeder-admin-id',
                email: 'admin@vehiclehub.com',
                name: 'System Admin',
                role: 'admin'
            });
        }

        const sampleVehicles = vehicles.map(vehicle => {
            return { ...vehicle, ownerId: adminUser?._id };
        });

        await Vehicle.insertMany(sampleVehicles);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
