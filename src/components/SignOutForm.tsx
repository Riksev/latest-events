"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function AuthenticationForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const supabase = createClient();
    const handleSignOut = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred while signing out.");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSignOut} className="mt-4 w-2/3">
            <button
                type="submit"
                className="p-2 bg-cyan-300 rounded-lg shadow-md font-bold hover:cursor-pointer hover:bg-blue-400 duration-500 w-full"
                disabled={loading}
            >
                {loading ? "Signing Out..." : "Sign Out"}
            </button>
            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
                    {error}
                </div>
            )}
        </form>
    );
}
