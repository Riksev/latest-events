import Image from "next/image";
import data from "../../../../../data/data.json";

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
    <div>
      <h1>{certainEvent.title}</h1>
      <h2>{certainEvent.city[0].toUpperCase() + certainEvent.city.slice(1)}</h2>
      <Image
        src={certainEvent.image}
        alt={certainEvent.title}
        width={430}
        height={275}
      />
      <p>{certainEvent.description}</p>
    </div>
  );
}
