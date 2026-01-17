import type { Request, Response } from 'express';
import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// @desc Create a checkout session
// @route POST /api/bookings/create-checkout-session
export const createCheckoutSession = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { vehicleId, startDate, endDate, totalPrice, pickupLocation } = req.body;

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        // Create a pending booking first
        const booking = await Booking.create({
            userId: req.user._id,
            vehicleId,
            startDate,
            endDate,
            totalPrice,
            status: 'pending'
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        product_data: {
                            name: `Booking: ${vehicle.title}`,
                            description: `Rental from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()} at ${pickupLocation}`,
                            images: vehicle.images,
                        },
                        unit_amount: totalPrice * 100, // Stripe expects amount in cents/paisa
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment/success?vehicleId=${vehicleId}&bookingId=${booking._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/canceled?vehicleId=${vehicleId}`,
            customer_email: req.user.email,
            client_reference_id: booking._id.toString(),
            metadata: {
                bookingId: booking._id.toString(),
                vehicleId: vehicleId.toString(),
            },
        });

        res.json({ id: session.id, url: session.url });
    } catch (error: any) {
        console.error("Stripe Session Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc Webhook for Stripe events
export const stripeWebhook = async (req: Request, res: Response): Promise<any> => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        const rawBody = (req as any).rawBody;
        if (!rawBody) {
            throw new Error("Raw body not found. Check server.ts middleware.");
        }
        event = stripe.webhooks.constructEvent(rawBody, sig as string, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
        console.error("Webhook Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.client_reference_id;

        if (bookingId && mongoose.Types.ObjectId.isValid(bookingId)) {
            const booking = await Booking.findById(bookingId);
            if (booking) {
                booking.status = 'confirmed';
                await booking.save();

                // Update vehicle booking count
                const vehicle = await Vehicle.findById(booking.vehicleId);
                if (vehicle) {
                    vehicle.bookingCount = (vehicle.bookingCount || 0) + 1;
                    await vehicle.save();
                }
            }
        }
    }

    res.json({ received: true });
};

// @desc Create a booking (deprecated/fallback if needed)
export const createBooking = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { vehicleId, startDate, endDate, totalPrice } = req.body;

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        const booking = await Booking.create({
            userId: req.user._id,
            vehicleId,
            startDate,
            endDate,
            totalPrice,
            status: 'confirmed' // Assuming manual booking bypasses stripe
        });

        vehicle.bookingCount = (vehicle.bookingCount || 0) + 1;
        await vehicle.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: 'Invalid booking data' });
    }
};

// @desc Get user bookings
// @route GET /api/bookings/my
export const getMyBookings = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const bookings = await Booking.find({ userId: req.user?._id }).populate('vehicleId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Update booking status
// @route PATCH /api/bookings/:id/status
export const updateBookingStatus = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = req.body.status || booking.status;
        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
