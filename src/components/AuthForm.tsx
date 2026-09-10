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
                <form
                    className="flex flex-col gap-4 mt-6 text-lg w-full"
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
