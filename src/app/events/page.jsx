import ImageWithFallback from "@/app/_components/ImageWithFallback";
import Link from "next/link";
import data from "@/app/_data/data.json";

export default function EventsPage() {
    const { events_categories } = data;
    return (
        <div className="events_page">
            <h1>Events</h1>
            <div className="cards">
                {events_categories.map((eventCategory) => (
                    <Link
                        href={`/events/${eventCategory.id}`}
                        key={eventCategory.id + "2"}
                        className="card border-2 border-mist-800 rounded-xl"
                    >
                        <ImageWithFallback
                            src={eventCategory.image}
                            alt={eventCategory.title}
                            width={450}
                            height={350}
                            className="image"
                        />
                        <h2 className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-white/85 to-cyan-100/85 to-90% shadow-lg text-center py-2">
                            {eventCategory.title}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
