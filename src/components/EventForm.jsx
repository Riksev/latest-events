"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { createClient } from "@/utils/supabase/client";

export default function EventForm({ event }) {
    const [typeOfMessage, setTypeOfMessage] = useState("");
    const [message, setMessage] = useState("");
    const inputEmail = useRef();
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const email = inputEmail.current.value;
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
                } catch (error) {
                    setMessage(error.message);
                    setTypeOfMessage("errorNetwork");
                }
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
                        color={typeOfMessage === "success" ? "green" : "red"}
                    />
                )}
            </span>
        </form>
    );
}
