import Vehicle from '../models/Vehicle.js';
// @desc Get all vehicles
// @route GET /api/vehicles
export const getVehicles = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, location } = req.query;
        let query = {};
        if (category)
            query.category = category;
        if (location)
            query.location = new RegExp(location, 'i');
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        const vehicles = await Vehicle.find(query).populate('ownerId', 'name avatar');
        res.json(vehicles);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// @desc Get vehicle by ID
// @route GET /api/vehicles/:id
export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate('ownerId', 'name avatar');
        if (!vehicle)
            return res.status(404).json({ message: 'Vehicle not found' });
        res.json(vehicle);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// @desc Create a vehicle
// @route POST /api/vehicles
export const createVehicle = async (req, res) => {
    try {
        const { title, description, price, category, images, specs, location } = req.body;
        const vehicle = await Vehicle.create({
            ownerId: req.user._id,
            title,
            description,
            price,
            category,
            images,
            specs,
            location
        });
        res.status(201).json(vehicle);
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};
// @desc Update vehicle
// @route PATCH /api/vehicles/:id
export const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle)
            return res.status(404).json({ message: 'Vehicle not found' });
        // Check ownership
        if (vehicle.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedVehicle);
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};
// @desc Delete vehicle
// @route DELETE /api/vehicles/:id
export const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle)
            return res.status(404).json({ message: 'Vehicle not found' });
        // Check ownership
        if (vehicle.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await vehicle.deleteOne();
        res.json({ message: 'Vehicle removed' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
//# sourceMappingURL=vehicleController.js.map