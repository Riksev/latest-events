import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import { createServer } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EventsPage({
    params,
}: {
    params: Promise<{ city: string }>;
}): Promise<React.JSX.Element> {
    const resolvedParams = await params;
    const supabase = await createServer();

    const { data: category } = await supabase
        .from("categories")
        .select("*")
        .eq("id", resolvedParams.city)
        .single();

    if (!category) {
        return notFound();
    }

    const { data: events } = await supabase
        .from("events")
        .select("*")
        .eq("category_id", category.id);

    return (
        <div className="city_page">
            <h1>
                Events in{" "}
                {resolvedParams.city[0].toUpperCase() +
                    resolvedParams.city.slice(1)}
            </h1>
            <div className="cards">
                {events?.map((event) => (
                    <Link
                        href={`/events/${resolvedParams.city}/${event.id}`}
                        key={event.id}
                        className="card"
                    >
                        <ImageWithFallback
                            src={String(event.image_url)}
                            alt={String(event.title)}
                            width={230}
                            height={230}
                            className="image"
                        />
                        <h2>{event.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
