"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { uploadMultipleToImgBB } from "@/services/imgbbService";
import api from "@/lib/api";
import { useSweetAlert } from "@/hooks/useSweetAlert";

const DHAKA_LOCATIONS = [
    "Gulshan Circle 1",
    "Bashundhara City Mall",
    "Jamuna Future Park",
    "University of Dhaka",
    "Ramna Park",
    "Old Dhaka / Sadarghat Riverfront",
    "National Parliament House",
    "Ahsan Manzil Area (Old Dhaka)",
    "Hatirjheel",
    "Banani / Kamal Ataturk Avenue"
];

export default function EditVehiclePage() {
    const router = useRouter();
    const params = useParams();
    const { showError, showSuccess, showWarning, showLoading, closeLoading, showToast } = useSweetAlert();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Sedan",
        price: "",
        location: DHAKA_LOCATIONS[0],
        year: "",
        brand: "",
        model: "",
        performance: "",
        range: "",
        seats: "",
        drive: "",
        availableFrom: "",
        availableTo: "",
    });

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await api.get(`/vehicles/${params.id}`);
                const vehicle = response.data;

                setFormData({
                    title: vehicle.title,
                    description: vehicle.description,
                    category: vehicle.category,
                    price: vehicle.price.toString(),
                    location: vehicle.location,
                    year: vehicle.year.toString(),
                    brand: vehicle.brand,
                    model: vehicle.model,
                    performance: vehicle.performance || "",
                    range: vehicle.range || "",
                    seats: vehicle.seats?.toString() || "",
                    drive: vehicle.drive || "",
                    availableFrom: vehicle.availableFrom ? vehicle.availableFrom.split('T')[0] : "",
                    availableTo: vehicle.availableTo ? vehicle.availableTo.split('T')[0] : "",
                });
                setUploadedImages(vehicle.images);
            } catch (error) {
                console.error("Error fetching vehicle:", error);
                showError("Load Failed", "Failed to load vehicle details. Please try again.");
                router.push("/dashboard/user/vehicles");
            } finally {
                setFetching(false);
            }
        };

        if (params.id) {
            fetchVehicle();
        }
    }, [params.id, router, showError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingImages(true);
        showLoading("Uploading Images", "Processing your photos...");
        try {
            const fileArray = Array.from(files);
            const urls = await uploadMultipleToImgBB(fileArray);
            setUploadedImages([...uploadedImages, ...urls]);
            closeLoading();
            showToast('success', `${urls.length} new images uploaded`);
        } catch (error) {
            closeLoading();
            showError("Upload Failed", "Failed to upload images. Please check your connection and try again.");
        } finally {
            setUploadingImages(false);
        }
    };

    const removeImage = (index: number) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (uploadedImages.length < 3) {
            showWarning("More Photos Needed", "Please keep at least 3 images to showcase your vehicle.");
            return;
        }

        setLoading(true);
        showLoading("Updating Listing", "Saving your changes...");
        try {
            await api.patch(`/vehicles/${params.id}`, {
                ...formData,
                images: uploadedImages,
                price: parseFloat(formData.price),
                year: parseInt(formData.year),
                seats: formData.seats ? parseInt(formData.seats) : undefined,
            });

            closeLoading();
            showSuccess("Vehicle Updated!", "Your listing has been successfully updated.");
            router.push("/dashboard/user/vehicles");
        } catch (error: any) {
            console.error("Error updating vehicle:", error);
            closeLoading();
            showError("Update Failed", error.response?.data?.message || "Failed to update vehicle details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-black text-white tracking-tight mb-3">Edit Vehicle</h2>
                <p className="text-slate-400 text-lg">Update your listing details and keep everything fresh.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <section className="bg-surface-dark p-8 rounded-xl border border-border-dark">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">image</span>
                        Vehicle Gallery
                    </h3>

                    <div className="border-2 border-dashed border-border-dark rounded-xl p-12 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all group cursor-pointer relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={uploadingImages}
                        />
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">
                                {uploadingImages ? "progress_activity" : "cloud_upload"}
                            </span>
                        </div>
                        <div className="text-center pointer-events-none">
                            <p className="font-bold text-lg text-white">
                                {uploadingImages ? "Uploading..." : "Drag & drop to add more photos"}
                            </p>
                            <p className="text-slate-400 text-sm">Supports JPG, PNG (Max 10MB per file)</p>
                        </div>
                        <button
                            type="button"
                            className="mt-2 px-6 py-2 rounded-lg bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity pointer-events-none"
                        >
                            Browse Files
                        </button>
                    </div>

                    {/* Uploaded Images Preview */}
                    {uploadedImages.length > 0 && (
                        <div className="mt-6 grid grid-cols-4 gap-4">
                            {uploadedImages.map((url, index) => (
                                <div key={index} className="relative group">
                                    <img src={url} alt={`Upload ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-border-dark" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 size-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <span className="material-symbols-outlined text-white text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Basic Info Section */}
                <section className="bg-surface-dark p-8 rounded-xl border border-border-dark">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        General Information
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-bold text-slate-300">Vehicle Name</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
                                placeholder="e.g. Tesla Model 3 Performance"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                                placeholder="e.g. Tesla"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">Model</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                                placeholder="e.g. Model 3"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">Year</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                                placeholder="2024"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                            >
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Sports">Sports</option>
                                <option value="Electric">Electric</option>
                                <option value="Truck">Truck</option>
                            </select>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-bold text-slate-300">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white resize-none"
                                placeholder="Tell potential renters what makes your vehicle special..."
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6 col-span-2">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300">Performance (Hp)</label>
                                <input
                                    type="text"
                                    name="performance"
                                    value={formData.performance}
                                    onChange={handleChange}
                                    className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                                    placeholder="e.g. 3.1s"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300">Range (Miles)</label>
                                <input
                                    type="text"
                                    name="range"
                                    value={formData.range}
                                    onChange={handleChange}
                                    className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                                    placeholder="e.g. 300 mi"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300">Seats</label>
                                <input
                                    type="number"
                                    name="seats"
                                    value={formData.seats}
                                    onChange={handleChange}
                                    className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                                    placeholder="e.g. 5"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300">Drive Type</label>
                                <input
                                    type="text"
                                    name="drive"
                                    value={formData.drive}
                                    onChange={handleChange}
                                    className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                                    placeholder="e.g. AWD"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing & Location */}
                <div className="grid grid-cols-2 gap-6">
                    <section className="bg-surface-dark p-8 rounded-xl border border-border-dark">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">payments</span>
                            Pricing
                        </h3>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">Price per Day (৳)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">৳</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-background-dark border border-border-dark rounded-lg pl-8 pr-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-surface-dark p-8 rounded-xl border border-border-dark">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            Location
                        </h3>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">Pick-up Location</label>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white appearance-none"
                            >
                                {DHAKA_LOCATIONS.map(loc => (
                                    <option key={loc} value={loc} className="bg-surface-dark">{loc}</option>
                                ))}
                            </select>
                        </div>
                    </section>
                </div>

                {/* Availability */}
                <section className="bg-surface-dark p-8 rounded-xl border border-border-dark">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">event_available</span>
                        Availability
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">Available From</label>
                            <input
                                type="date"
                                name="availableFrom"
                                min={today}
                                value={formData.availableFrom}
                                onChange={handleChange}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white [color-scheme:dark]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">Available To</label>
                            <input
                                type="date"
                                name="availableTo"
                                min={formData.availableFrom || today}
                                value={formData.availableTo}
                                onChange={handleChange}
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-white [color-scheme:dark]"
                            />
                        </div>
                    </div>
                </section>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-border-dark">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-4 rounded-xl font-bold text-slate-400 hover:bg-surface-dark transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || uploadingImages}
                        className="px-12 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                        <span>{loading ? "Saving Changes..." : "Save Changes"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
