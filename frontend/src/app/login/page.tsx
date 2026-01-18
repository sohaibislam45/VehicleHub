"use client";

import { useAuth } from "@/context/AuthContext";
import { auth, googleProvider } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { useSweetAlert } from "@/hooks/useSweetAlert";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background-dark">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}

function LoginContent() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { showError, showSuccess, showLoading, closeLoading, showToast } = useSweetAlert();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect");

    // Redirect users based on role after successful login
    useEffect(() => {
        if (user) {
            if (redirectTo) {
                router.push(redirectTo);
                return;
            }
            if (user.role === 'admin') {
                router.push('/dashboard/admin');
            } else {
                // For regular users, we want them to stay on the same page where they were.
                // Since they are on /login, we go back in history.
                // If there's no history (direct visit), we fallback to home.
                router.back();
                // Fallback: if still on login page after a short delay, go to home
                setTimeout(() => {
                    if (window.location.pathname === '/login') {
                        router.push('/');
                    }
                }, 100);
            }
        }
    }, [user, router, redirectTo]);

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);
        // We can use showLoading if we want a full screen loader, or keep the button loader.
        // Let's use the button loader for the initial "signing in" feedback, 
        // but rely on SweetAlert for errors.
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            showToast('success', 'Successfully logged in!');
            // Wait a moment for AuthContext to sync user data
            await new Promise(resolve => setTimeout(resolve, 500));
            // Only redirect admins to dashboard, regular users stay on current page
            // Admin check will happen in AuthContext after sync
        } catch (err: any) {
            console.error("Login error:", err);
            // Customize error messages based on Firebase error codes if needed
            if (err.code === 'auth/invalid-login-credentials' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                showError("Login Failed", "Invalid email or password.");
            } else {
                showError("Login Failed", "Failed to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            showToast('success', 'Successfully logged in with Google!');
            // Wait a moment for AuthContext to sync user data
            await new Promise(resolve => setTimeout(resolve, 500));
            // Only redirect admins to dashboard, regular users stay on current page
        } catch (err: any) {
            console.error("Google login error:", err);
            showError("Google Login Failed", "Failed to sign in with Google.");
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

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            onClick={() => {
                                setValue("email", "user@vehiclehub.com");
                                setValue("password", "password123");
                            }}
                            className="h-10 text-[10px] uppercase font-bold tracking-widest border border-white/5 rounded-lg hover:bg-white/5 transition-all text-slate-400"
                        >
                            Demo User
                        </button>
                        <button
                            onClick={() => {
                                setValue("email", "admin@vehiclehub.com");
                                setValue("password", "password123");
                            }}
                            className="h-10 text-[10px] uppercase font-bold tracking-widest border border-white/5 rounded-lg hover:bg-white/5 transition-all text-slate-400"
                        >
                            Demo Admin
                        </button>
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
                            <div className="relative">
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-slate-100 placeholder:text-slate-600 transition-all pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
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
