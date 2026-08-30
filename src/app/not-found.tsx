import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-auto text-center">
            <h2>404 - Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className="text-blue-500 hover:text-blue-700 mt-2">
                Return Home
            </Link>
        </div>
    );
}
