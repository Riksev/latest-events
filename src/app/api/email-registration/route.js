import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request) {
    const filePath = path.join(
        process.cwd(),
        "src",
        "app",
        "_data",
        "data.json",
    );
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
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);
        if (!data || !data.allEvents) {
            return NextResponse.json(
                { message: "Data in file is not valid." },
                { status: 500 },
            );
        }
        const targetEvent = data.allEvents.find((ev) => ev.id === eventId);
        if (!targetEvent) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 },
            );
        }
        targetEvent.registeredEmails = targetEvent.registeredEmails || [];
        if (targetEvent.registeredEmails.includes(email)) {
            return NextResponse.json(
                { message: "This email has already been registered." },
                { status: 409 },
            );
        }
        targetEvent.registeredEmails.push(email);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
        return NextResponse.json(
            {
                message: `Successfully registered ${email} for event ${eventId}!`,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Server error updating file." },
            { status: 500 },
        );
    }
}
