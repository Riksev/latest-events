"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { error: signOutError } = await supabase.auth.signOut();
            if (signOutError) {
                throw signOutError;
            }
            router.refresh();
            router.push("/login");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
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
