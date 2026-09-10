"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

type Mode = "signup" | "login";

export default function AuthenticationForm({ mode }: { mode: Mode }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const handleGoogleSignIn = async () => {
        setError("");
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=/profile`,
            },
        });

        if (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (mode === "signup" && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            if (mode === "login") {
                const { error: signInError } =
                    await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });
                if (signInError) {
                    setError(signInError.message);
                    return;
                }
                router.refresh();
                router.push("/profile");
            } else {
                const { data, error: signUpError } = await supabase.auth.signUp(
                    {
                        email,
                        password,
                    },
                );
                if (signUpError) {
                    setError(signUpError.message);
                    return;
                }
                if (data.user && !data.session) {
                    setSuccess(true);
                    return;
                }
                router.refresh();
                router.push("/profile");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth_form">
            <h1>{mode === "signup" ? "Sign Up" : "Log In"}</h1>
            {!success ? (
                <div className="w-full mx-auto mt-4 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 p-2 border border-mist-800 rounded-lg font-medium transition-colors duration-500 cursor-pointer hover:border-blue-400 hover:bg-blue-200/50 mb-4"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        Continue with Google
                    </button>
                    <div className="relative flex items-center justify-center my-2">
                        <div className="border-t border-slate-400 w-full" />
                        <span className="bg-slate-50 px-3 text-sm text-slate-500 uppercase">
                            or
                        </span>
                        <div className="border-t border-slate-400 w-full" />
                    </div>
                    <form
                        className="flex flex-col gap-4 text-lg w-full"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@email.com"
                                className="p-2 border border-mist-800 rounded-lg hover:border-blue-400 duration-500 focus:duration-0 focus:outline-blue-400"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="At least 8 characters"
                                className="p-2 border border-mist-800 rounded-lg hover:border-blue-400 duration-500 focus:duration-0 focus:outline-blue-400"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                autoComplete={
                                    mode === "signup"
                                        ? "new-password"
                                        : "current-password"
                                }
                                required
                            />
                            {mode === "signup" && (
                                <>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="sr-only"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        className="p-2 border border-mist-800 rounded-lg hover:border-blue-400 duration-500 focus:duration-0 focus:outline-blue-400"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setError("");
                                        }}
                                        autoComplete="new-password"
                                        required
                                    />
                                </>
                            )}
                        </div>
                        {error && (
                            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="p-2 bg-cyan-300 rounded-lg shadow-md font-bold hover:cursor-pointer hover:bg-blue-400 duration-500"
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : mode === "signup"
                                  ? "Create Account"
                                  : "Log In"}
                        </button>
                        <Link
                            href={mode === "signup" ? "/login" : "/signup"}
                            className="text-blue-400 hover:cursor-pointer hover:text-blue-600 duration-500 mt-2 text-center"
                        >
                            {mode === "login"
                                ? "Do not have an account? Sign up"
                                : "Already have an account? Log in"}
                        </Link>
                    </form>
                </div>
            ) : (
                <div className="auth_form max-w-md mx-auto mt-4 p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <h2 className="text-2xl font-bold mb-2">
                        Check your inbox
                    </h2>
                    <p className="p-3 text-sm text-green-700 bg-green-100 rounded-lg border border-green-300">
                        We sent a confirmation link to{" "}
                        <span className="font-semibold text-slate-800">
                            {email}
                        </span>
                        . Click the link to complete your registration.
                    </p>
                    <Link
                        href="/login"
                        className="text-blue-500 hover:text-blue-700 font-medium mt-4"
                    >
                        Back to Log In
                    </Link>
                </div>
            )}
        </div>
    );
}
