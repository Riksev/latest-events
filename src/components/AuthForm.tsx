"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

type Mode = "signup" | "signin";

export default function AuthenticationForm() {
    const [mode, setMode] = useState<Mode>("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const handleModeSwitch = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess(false);
        setMode((prev) => (prev === "signin" ? "signup" : "signin"));
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        let hasError = false;

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (mode === "signup" && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            if (mode === "signin") {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) {
                    setError(error.message);
                    hasError = true;
                }
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) {
                    setError(error.message);
                    hasError = true;
                }
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            if (!hasError) {
                setSuccess(true);
                router.refresh();
            }
            setLoading(false);
        }
    };

    return (
        <>
            <h1>{mode === "signup" ? "Sign Up" : "Sign In"}</h1>
            <form
                className="flex flex-col gap-4 mt-6 text-lg w-full"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="you@email.com"
                        className="p-2 border border-mist-800 rounded-lg hover:border-blue-400 duration-500 focus:duration-0 focus:outline-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="At least 8 characters"
                        className="p-2 border border-mist-800 rounded-lg hover:border-blue-400 duration-500 focus:duration-0 focus:outline-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                                placeholder="Confirm Password"
                                className="p-2 border border-mist-800 rounded-lg hover:border-blue-400 duration-500 focus:duration-0 focus:outline-blue-400"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
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
                          : "Sign In"}
                </button>
                {success && mode === "signup" && (
                    <p className="p-3 text-sm text-green-700 bg-green-100 rounded-lg border border-green-300">
                        Success! Check your email for a confirmation link.
                    </p>
                )}
                <button
                    type="button"
                    onClick={handleModeSwitch}
                    className="text-blue-400 hover:cursor-pointer hover:text-blue-600 duration-500 mt-2"
                >
                    {mode === "signin"
                        ? "Do not have an account?"
                        : "Already have an account?"}
                </button>
            </form>
        </>
    );
}
