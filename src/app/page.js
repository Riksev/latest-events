import Image from "next/image";
import Link from "next/link";
import data from "../../data/data.json";

export default function Home() {
    const { events_categories } = data;
    return (
        <div className="home-body">
            <h1>Home</h1>
            <div className="cards">
                {events_categories.map((eventCategory) => (
                    <Link
                        href={`/events/${eventCategory.id}`}
                        key={eventCategory.id}
                        className="card"
                    >
                        <Image
                            src={eventCategory.image}
                            alt={eventCategory.title}
                            width={225}
                            height={100}
                            className="rounded-lg aspect-square object-cover"
                        />
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold mb-2">
                                {eventCategory.title}
                            </h2>
                            <p className="text-left">
                                {eventCategory.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
