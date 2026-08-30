import EventForm from "@/components/EventForm";
import ImageWithFallback from "@/components/ImageWithFallback";
import { createServer } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EventPage({
    params,
}: {
    params: Promise<{ city: string; event: string }>;
}): Promise<React.JSX.Element> {
    const { city, event } = await params;
    const supabase = await createServer();
    const { data: certainEvent } = await supabase
        .from("events")
        .select("*")
        .eq("id", event)
        .eq("category_id", city)
        .single();

    if (!certainEvent) {
        return notFound();
    }

    const { data: registrationsCount } = await supabase.rpc(
        "get_registration_count",
        {
            event_id_param: certainEvent.id,
        },
    );

    return (
        <div className="event_page">
            <h1>{certainEvent.title}</h1>
            <ImageWithFallback
                src={String(certainEvent.image_url)}
                alt={String(certainEvent.title)}
                width={430}
                height={430}
                className="image my-4"
            />
            <div className="flex items-center justify-between w-full">
                <h2>{city}</h2>
                <p className="p-2 bg-cyan-300 rounded-lg shadow-md font-bold text-sm">
                    Registrations: {registrationsCount}
                </p>
            </div>

            <p>{certainEvent.description}</p>
            <p className="self-start mt-4">Register for this event:</p>
            <EventForm event={event} />
        </div>
    );
}
