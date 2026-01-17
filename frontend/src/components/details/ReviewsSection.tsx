"use client";

import { useState } from "react";

interface Review {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
}

const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        user: "Alex Thompson",
        avatar: "https://i.pravatar.cc/150?u=alex",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely incredible experience. The vehicle was in pristine condition and the pick-up process was seamless. Highly recommend for anyone looking for a premium ride in Dhaka."
    },
    {
        id: 2,
        user: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        rating: 4,
        date: "1 week ago",
        comment: "Great service and very professional. The car performed excellently. Will definitely book again for my next business trip."
    }
];

interface ReviewsSectionProps {
    rating: number;
    reviewsCount: number;
}

export default function ReviewsSection({ rating, reviewsCount }: ReviewsSectionProps) {
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReview.comment.trim()) return;

        const review: Review = {
            id: Date.now(),
            user: "Guest User",
            avatar: "https://i.pravatar.cc/150?u=guest",
            rating: newReview.rating,
            date: "Just now",
            comment: newReview.comment
        };

        setReviews([review, ...reviews]);
        setNewReview({ rating: 5, comment: "" });
        setShowForm(false);
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
                        <p className="text-6xl font-black text-white mb-2">{rating.toFixed(1)}</p>
                        <div className="flex justify-center gap-1 text-primary mb-4">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`material-symbols-outlined ${i < Math.round(rating) ? 'fill-[1]' : ''}`}>star</span>
                            ))}
                        </div>
                        <p className="text-slate-500 text-sm">Based on {reviewsCount} reviews</p>
                    </div>
                </div>

                <div className="md:col-span-8 lg:col-span-9 space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-4">
                            <span className="text-sm font-bold text-slate-400 w-4">{star}</span>
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-1000"
                                    style={{ width: `${star === 5 ? 85 : star === 4 ? 12 : 3}%` }}
                                />
                            </div>
                            <span className="text-sm text-slate-500 w-8">{star === 5 ? '85%' : star === 4 ? '12%' : '3%'}</span>
                        </div>
                    ))}
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
                                        className={`size-10 rounded-xl flex items-center justify-center transition-all ${newReview.rating >= s ? 'bg-primary text-background-dark shadow-[0_0_15px_rgba(23,191,207,0.4)]' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
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
                {reviews.map((review) => (
                    <div key={review.id} className="p-8 rounded-[2.5rem] bg-surface-dark border border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex items-center gap-4 mb-6">
                            <img src={review.avatar} alt={review.user} className="size-12 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                            <div>
                                <h4 className="font-bold text-white">{review.user}</h4>
                                <p className="text-xs text-slate-500">{review.date}</p>
                            </div>
                            <div className="ml-auto flex gap-0.5 text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`material-symbols-outlined text-[18px] ${i < review.rating ? 'fill-[1]' : ''}`}>star</span>
                                ))}
                            </div>
                        </div>
                        <p className="text-slate-400 leading-relaxed italic">
                            &quot;{review.comment}&quot;
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
