import Link from "next/link";
import Image from "next/image";
import data from "../../../../data/data.json";

export async function generateStaticParams() {
    return data.events_categories.map((category) => ({
        city: category.id,
    }));
}

export const dynamicParams = false;

export default async function EventsPerCityPage({ params }) {
    const { city } = await params;
    const { allEvents } = data;
    const events = allEvents.filter(
        (event) => event.city.toLowerCase() === city,
    );
    return (
        <div className="city_page">
            <h1>Events in {city[0].toUpperCase() + city.slice(1)}</h1>
            <div className="cards">
                {events.map((event) => (
                    <Link
                        href={`/events/${event.city.toLowerCase()}/${event.id}`}
                        key={event.id}
                        className="card"
                    >
                        <Image
                            src={event.image}
                            alt={event.title}
                            width={230}
                            height={75}
                            className="image"
                        />
                        <h2>{event.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
