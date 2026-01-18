"use client";

import { useState, useEffect, useMemo } from "react";
import { vehicleService } from "@/services/vehicleService";
import { useParams } from "next/navigation";

import { useSweetAlert } from "@/hooks/useSweetAlert";

interface Review {
    _id: string;
    userId: {
        _id: string;
        name: string;
        photoURL?: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewsSectionProps {
    rating: number;
    reviewsCount: number;
}

export default function ReviewsSection({ rating: initialRating, reviewsCount: initialCount }: ReviewsSectionProps) {
    const params = useParams();
    const vehicleId = params.id as string;
    const { showSuccess, showError } = useSweetAlert();

    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const stats = useMemo(() => {
        if (reviews.length === 0) return {
            avg: initialRating,
            count: initialCount,
            distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        };

        const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let total = 0;
        reviews.forEach(r => {
            dist[r.rating as keyof typeof dist]++;
            total += r.rating;
        });

        return {
            avg: total / reviews.length,
            count: reviews.length,
            distribution: dist
        };
    }, [reviews, initialRating, initialCount]);

    useEffect(() => {
        if (vehicleId) {
            fetchReviews();
        }
    }, [vehicleId]);

    const fetchReviews = async () => {
        try {
            const data = await vehicleService.getReviews(vehicleId);
            setReviews(data);
        } catch (err) {
            console.error("Failed to fetch reviews", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReview.comment.trim()) return;

        try {
            await vehicleService.submitReview({
                vehicleId,
                rating: newReview.rating,
                comment: newReview.comment
            });

            setNewReview({ rating: 5, comment: "" });
            setShowForm(false);
            fetchReviews(); // Refresh list
            showSuccess("Review Submitted", "Thank you for sharing your experience!");
        } catch (err) {
            console.error("Failed to submit review", err);
            showError("Submission Failed", "Failed to submit review. Please ensure you are logged in.");
        }
    };

    return (
        <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Guest Reviews</h2>
                    <p className="text-slate-500">Real feedback from our global community</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-primary">edit_note</span>
                        Write a review
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                <div className="md:col-span-4 lg:col-span-3">
                    <div className="p-8 rounded-3xl bg-surface-dark border border-white/5 text-center">
                        <p className="text-6xl font-black text-white mb-2">{stats.avg.toFixed(1)}</p>
                        <div className="flex justify-center gap-1 text-primary mb-4">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`material - symbols - outlined ${i < Math.round(stats.avg) ? 'fill-[1]' : ''} `}>star</span>
                            ))}
                        </div>
                        <p className="text-slate-500 text-sm">Based on {stats.count} reviews</p>
                    </div>
                </div>

                <div className="md:col-span-8 lg:col-span-9 space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = stats.distribution[star as keyof typeof stats.distribution];
                        const percentage = stats.count > 0 ? (count / stats.count) * 100 : 0;
                        return (
                            <div key={star} className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-400 w-4">{star}</span>
                                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-1000"
                                        style={{ width: `${percentage}% ` }}
                                    />
                                </div>
                                <span className="text-sm text-slate-500 w-12">{Math.round(percentage)}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Review Form */}
            {showForm && (
                <div className="mb-12 p-8 rounded-3xl bg-primary/5 border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className="text-xl font-bold text-white mb-6">Your Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-3">Rating</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: s })}
                                        className={`size - 10 rounded - xl flex items - center justify - center transition - all ${newReview.rating >= s ? 'bg-primary text-background-dark shadow-[0_0_15px_rgba(23,191,207,0.4)]' : 'bg-white/5 text-slate-500 hover:bg-white/10'} `}
                                    >
                                        <span className="material-symbols-outlined fill-[1]">star</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-3">Comment</p>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                placeholder="Share your experience with this vehicle..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 min-h-[150px] transition-all"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-8 py-4 bg-primary text-background-dark font-black rounded-2xl hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_0_20px_rgba(23,191,207,0.3)]"
                            >
                                Submit Review
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/5"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loading ? (
                    <div className="col-span-full py-12 text-center text-slate-500">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                    <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl text-slate-500 font-medium">
                        No reviews yet. Be the first to share your experience!
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="p-8 rounded-[2.5rem] bg-surface-dark border border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-4 mb-6">
                                <img src={review.userId.photoURL || `https://i.pravatar.cc/150?u=${review.userId._id}`} alt={review.userId.name} className="size-12 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                                <div>
                                    <h4 className="font-bold text-white">{review.userId.name}</h4>
                                    <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="ml-auto flex gap-0.5 text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`material-symbols-outlined text-[18px] ${i < review.rating ? 'fill-[1]' : ''}`}>star</span>
                                    ))}
                                </div>
                            </div >
                            <p className="text-slate-400 leading-relaxed italic">
                                &quot;{review.comment}&quot;
                            </p>
                        </div >
                    ))
                )}
            </div >
        </section >
    );
}
