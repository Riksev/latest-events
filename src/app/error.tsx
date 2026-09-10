"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("App-level error caught:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="max-w-md w-full p-8 border border-mist-800 rounded-xl bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Something went wrong
                </h2>
                <p className="text-slate-600 text-sm mb-6">
                    {error.message ||
                        "An unexpected error occurred while loading this page."}
                </p>
                {error.digest && (
                    <p className="text-xs text-slate-400 font-mono mb-6">
                        Digest: {error.digest}
                    </p>
                )}
                <div className="flex justify-center items-center gap-3">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-4 py-2 bg-cyan-300 hover:bg-blue-400 font-bold rounded-lg transition-colors duration-300 cursor-pointer text-slate-900"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-mist-800 hover:bg-slate-100 rounded-lg font-semibold transition-colors duration-300 text-slate-700"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
