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
            <form
                method="post"
                className="flex flex-col gap-2 mt-4 self-start "
            >
                <h2>{city}</h2>
                <p>{certainEvent.description}</p>
                <div className="flex gap-2 mt-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-mist-800 rounded-md p-2 hover:border-blue-400 hover:cursor-pointer duration-400"
                    />
                    <button
                        className="bg-mist-800 text-white rounded-md p-2 hover:bg-blue-400 hover:cursor-pointer duration-400"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
