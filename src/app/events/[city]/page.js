import Link from "next/link";
import data from "../../../../data/data.json";

export async function generateStaticParams() {
  return data.events_categories.map((category) => ({
    city: category.id,
  }));
}

export const dynamicParams = false;

export default async function EventsPerCityPage({ params }) {
  const { city } = await params;
  console.log(city);
  return (
    <div>
      <h1>Events in London</h1>
      <div>
        <Link href="/events/london/event1">
          <h2>Event 1</h2>
        </Link>
        <Link href="/events/london/event2">
          <h2>Event 2</h2>
        </Link>
        <Link href="/events/london/event3">
          <h2>Event 3</h2>
        </Link>
      </div>
    </div>
  );
}
