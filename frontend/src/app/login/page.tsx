"use client";

import { useAuth } from "@/context/AuthContext";
import { auth, googleProvider } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    // Redirect admins to dashboard after successful login
    useEffect(() => {
        if (user && user.role === 'admin') {
            router.push('/dashboard/admin');
        }
    }, [user, router]);

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            // Wait a moment for AuthContext to sync user data
            await new Promise(resolve => setTimeout(resolve, 500));
            // Only redirect admins to dashboard, regular users stay on current page
            // Admin check will happen in AuthContext after sync
        } catch (err: any) {
            console.error("Login error:", err);
            // Customize error messages based on Firebase error codes if needed
            if (err.code === 'auth/invalid-login-credentials' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError("Invalid email or password.");
            } else {
                setError("Failed to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithPopup(auth, googleProvider);
            // Wait a moment for AuthContext to sync user data
            await new Promise(resolve => setTimeout(resolve, 500));
            // Only redirect admins to dashboard, regular users stay on current page
        } catch (err: any) {
            console.error("Google login error:", err);
            setError("Failed to sign in with Google.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark/95 to-background-dark z-10"></div>
                {/* Optional: Add a subtle background image here if desired, verified against existing assets */}
            </div>

            <div className="relative z-20 w-full max-w-md">
                <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back</h1>
                        <p className="text-slate-400">Sign in to access your premium dashboard.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full h-12 flex items-center justify-center gap-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all mb-6 disabled:opacity-70"
                    >
                        <FcGoogle className="text-2xl" />
                        <span>Sign in with Google</span>
                    </button>

                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <span className="relative z-10 px-4 bg-[#181a1d] text-slate-500 text-xs uppercase tracking-widest font-medium">
                            Or continue with
                        </span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                            <input
                                {...register("email")}
                                type="email"
                                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-slate-100 placeholder:text-slate-600 transition-all"
                                placeholder="name@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <input
                                {...register("password")}
                                type="password"
                                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-slate-100 placeholder:text-slate-600 transition-all"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-red-400 text-xs ml-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-primary text-background-dark rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(23,191,207,0.4)] hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></span>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-primary font-bold hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
