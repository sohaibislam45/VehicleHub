import api from "@/lib/api";
import { Vehicle, VehicleQuery } from "@/types/vehicle";

export const vehicleService = {
    getAll: async (query?: VehicleQuery): Promise<Vehicle[]> => {
        const params = new URLSearchParams();
        if (query?.category) params.append("category", query.category);
        if (query?.minPrice) params.append("minPrice", query.minPrice.toString());
        if (query?.maxPrice) params.append("maxPrice", query.maxPrice.toString());
        if (query?.location) params.append("location", query.location);
        if (query?.search) params.append("search", query.search);
        if (query?.sortBy) params.append("sortBy", query.sortBy);
        if (query?.limit) params.append("limit", query.limit.toString());

        const response = await api.get<Vehicle[]>(`/vehicles?${params.toString()}`);
        return response.data;
    },

    getById: async (id: string): Promise<Vehicle> => {
        const response = await api.get<Vehicle>(`/vehicles/${id}`);
        return response.data;
    },

    create: async (data: Partial<Vehicle>): Promise<Vehicle> => {
        const response = await api.post<Vehicle>("/vehicles", data);
        return response.data;
    }
};
