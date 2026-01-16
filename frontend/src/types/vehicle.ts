export interface Vehicle {
    _id: string;
    ownerId: {
        _id: string;
        name: string;
        photoURL?: string;
    };
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    specs: {
        icon: string;
        label: string;
        value: string;
    }[];
    location: string;
    features: {
        label: string;
        icon: string;
        positive: boolean;
    }[];
    rating?: number;
    reviewsCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface VehicleQuery {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
}
