import Image from "next/image";
import Link from "next/link";
import data from "../../data/data.json";

export default function Home() {
    const { events_categories } = data;
    return (
        <div>
            <h1>Home</h1>
            {events_categories.map((eventCategory) => (
                <Link
                    href={`/events/${eventCategory.id}`}
                    key={eventCategory.id}
                >
                    <Image
                        src={eventCategory.image}
                        alt={eventCategory.title}
                        width={400}
                        height={300}
                    />
                    <h2>{eventCategory.title}</h2>
                    <p>{eventCategory.description}</p>
                </Link>
            ))}
        </div>
    );
}
