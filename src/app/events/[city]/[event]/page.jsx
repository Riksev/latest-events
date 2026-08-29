import EventForm from "@/components/EventForm";
import ImageWithFallback from "@/components/ImageWithFallback";
import { createClient } from "@/utils/supabase/client";
import { createServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function generateStaticParams() {
    const supabase = createClient();
    const { data } = await supabase.from("events").select("id, category_id");
    return data.map((event) => ({
        city: event.category_id,
        event: event.id,
    }));
}

export const dynamicParams = false;

export default async function EventPage({ params }) {
    const { city, event } = await params;
    const cookieStore = await cookies();
    const supabase = createServer(cookieStore);
    const { data: certainEvent } = await supabase
        .from("events")
        .select("*")
        .eq("id", event)
        .single();

    return (
        <div className="event_page">
            <h1>{certainEvent.title}</h1>
            <ImageWithFallback
                src={certainEvent.image_url}
                alt={certainEvent.title}
                width={430}
                height={430}
                className="image my-4"
            />
            <h2>{city}</h2>
            <p>{certainEvent.description}</p>
            <p className="self-start mt-4">Register for this event:</p>
            <EventForm event={event} />
        </div>
    );
}
