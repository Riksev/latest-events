import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, eventId } = body;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !eventId) {
            return NextResponse.json(
                {
                    message:
                        "Email and Event ID are required and must be valid.",
                },
                { status: 400 },
            );
        }
        return NextResponse.json(
            {
                message: `Thank you for registering with ${email} for the event ${eventId}.`,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to parse request body." },
            { status: 500 },
        );
    }
}
