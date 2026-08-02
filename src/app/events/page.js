import Image from "next/image";
import Link from "next/link";
import data from "../../../data/data.json";

export default function EventsPage() {
    const { events_categories } = data;
    return (
        <div>
            <h1>Events</h1>
            {events_categories.map((eventCategory) => (
                <Link
                    href={`/events/${eventCategory.id}`}
                    key={eventCategory.id + "2"}
                >
                    <Image
                        src={eventCategory.image}
                        alt={eventCategory.title}
                        width={500}
                        height={400}
                    />
                    <h2>{eventCategory.title}</h2>
                </Link>
            ))}
        </div>
    );
}
