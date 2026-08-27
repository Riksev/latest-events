import EventForm from "@/app/_components/EventForm";
import ImageWithFallback from "@/app/_components/ImageWithFallback";
import data from "@/app/_data/data.json";

export async function generateStaticParams() {
    return data.allEvents.map((event) => ({
        city: event.city.toLowerCase(),
        event: event.id,
    }));
}

export const dynamicParams = false;

export default async function EventPage({ params }) {
    const { city, event } = await params;
    const { allEvents } = data;
    const certainEvent = allEvents.find((ev) => ev.id === event);
    return (
        <div className="event_page">
            <h1>{certainEvent.title}</h1>
            <ImageWithFallback
                src={certainEvent.image}
                alt={certainEvent.title}
                width={430}
                height={275}
                className="image my-4"
            />
            <h2>{city}</h2>
            <p>{certainEvent.description}</p>
            <p className="self-start mt-4">Register for this event:</p>
            <EventForm event={event} />
        </div>
    );
}
