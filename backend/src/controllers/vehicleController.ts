import type { Request, Response } from 'express';
import Vehicle from '../models/Vehicle.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// @desc Get all vehicles
// @route GET /api/vehicles
export const getVehicles = async (req: Request, res: Response) => {
    try {
        const { category, minPrice, maxPrice, location, search, sortBy, limit, userId } = req.query;
        let query: any = {};

        if (userId) query.ownerId = userId;

        if (category) query.category = category;
        if (location) query.location = new RegExp(location as string, 'i');
        if (search) {
            query.$or = [
                { title: new RegExp(search as string, 'i') },
                { description: new RegExp(search as string, 'i') }
            ];
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sorting logic
        let sortOptions: any = { createdAt: -1 }; // Default: Latest
        if (sortBy === 'PriceLow') sortOptions = { price: 1 };
        if (sortBy === 'PriceHigh') sortOptions = { price: -1 };
        if (sortBy === 'TopBooking') sortOptions = { bookingCount: -1 };
        if (sortBy === 'Recent') sortOptions = { createdAt: -1 };

        let mongooseQuery = Vehicle.find(query).populate('ownerId', 'name photoURL').sort(sortOptions);
        
        if (limit) {
            mongooseQuery = mongooseQuery.limit(Number(limit));
        }

        const vehicles = await mongooseQuery;
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Get vehicle by ID
// @route GET /api/vehicles/:id
export const getVehicleById = async (req: Request, res: Response) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate('ownerId', 'name photoURL');
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Create a vehicle
// @route POST /api/vehicles
export const createVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, price, category, images, specs, location, brand, model, year, availableFrom, availableTo, features, performance, range, seats, drive } = req.body;
        const vehicle = await Vehicle.create({
            ownerId: req.user._id,
            title,
            description,
            brand,
            model,
            year,
            price,
            category,
            images,
            specs: specs || [],
            features: features || [],
            location,
            availableFrom,
            availableTo,
            performance,
            range,
            seats,
            drive
        });
        res.status(201).json(vehicle);
    } catch (error) {
        console.error('Create vehicle error:', error);
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc Update vehicle
// @route PATCH /api/vehicles/:id
export const updateVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        // Check ownership
        if (vehicle.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc Delete vehicle
// @route DELETE /api/vehicles/:id
export const deleteVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        // Check ownership
        if (vehicle.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await vehicle.deleteOne();
        res.json({ message: 'Vehicle removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
