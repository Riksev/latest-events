"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { createClient } from "@/utils/supabase/client";
import ImageWithFallback from "./ImageWithFallback";
import { useRouter } from "next/navigation";

export default function EventForm({ event }: { event: string }) {
    const router = useRouter();
    const [typeOfMessage, setTypeOfMessage] = useState<
        "" | "success" | "errorEmail" | "errorNetwork"
    >("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputEmail = useRef<HTMLInputElement>(null);
    const buttonSubmit = useRef<HTMLButtonElement>(null);
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                buttonSubmit.current?.toggleAttribute("disabled");
                const email: string = inputEmail.current?.value || "";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setMessage("Please enter a valid email address.");
                    setTypeOfMessage("errorEmail");
                    return;
                }
                try {
                    const supabase = createClient();
                    const { error } = await supabase
                        .from("registrations")
                        .insert({ event_id: event, email });
                    if (error) {
                        if (error.code === "23505") {
                            console.log(
                                "This user is already registered for this event!",
                            );
                            throw new Error("You are already registered.");
                        }
                        throw new Error(
                            "An unexpected error occurred. Please try again.",
                        );
                    }
                    setMessage("Registration successful!");
                    setTypeOfMessage("success");
                    router.refresh();
                } catch (error) {
                    if (error instanceof Error) {
                        setMessage(error.message);
                    } else {
                        setMessage("An unknown error occurred.");
                    }
                    setTypeOfMessage("errorNetwork");
                }
                setIsSubmitting(false);
                buttonSubmit.current?.toggleAttribute("disabled");
            }}
            className="flex flex-col gap-2 mt-4 self-start"
        >
            <div className="flex gap-2 mb-2">
                <input
                    ref={inputEmail}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={`border p-2 rounded outline-none duration-400 ${
                        typeOfMessage === "errorEmail"
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 hover:ring-1"
                    }`}
                    autoComplete="on"
                />
                <button
                    className="bg-mist-800 text-white rounded-md py-2 px-4 hover:bg-blue-400 hover:cursor-pointer duration-400"
                    type="submit"
                    ref={buttonSubmit}
                >
                    Submit
                </button>
                <button
                    className="bg-mist-800 text-white rounded-md py-2 px-4 hover:bg-blue-400 hover:cursor-pointer duration-400"
                    type="reset"
                    onClick={() => {
                        setMessage("");
                        setTypeOfMessage("");
                    }}
                >
                    Reset
                </button>
            </div>
            {isSubmitting ? (
                <div className="flex justify-start w-full text-left gap-4">
                    <ImageWithFallback
                        src={"/images/loading-gif.gif"}
                        alt="Loading"
                        width={20}
                        height={20}
                    />
                    <p className="text-gray-500">Submitting...</p>
                </div>
            ) : (
                <>
                    <span
                        className={`whitespace-pre-line text-shadow-2xl font-bold text-shadow-black ${
                            typeOfMessage === "success"
                                ? "text-blue-400"
                                : "text-red-500"
                        }`}
                    >
                        {message + " "}
                        {typeOfMessage !== "" && (
                            <FontAwesomeIcon
                                icon={
                                    typeOfMessage === "success"
                                        ? faCircleCheck
                                        : faCircleXmark
                                }
                                color={
                                    typeOfMessage === "success"
                                        ? "green"
                                        : "red"
                                }
                            />
                        )}
                    </span>
                </>
            )}
        </form>
    );
}
