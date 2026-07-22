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
  const events = allEvents.filter((event) => event.city.toLowerCase() === city);
  return (
    <div>
      <h1>Events in {city[0].toUpperCase() + city.slice(1)}</h1>
      <div>
        {events.map((event) => (
          <Link
            href={`/events/${event.city.toLowerCase()}/${event.id}`}
            key={event.id}
          >
            <Image
              src={event.image}
              alt={event.title}
              width={430}
              height={275}
            />
            <h2>{event.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
