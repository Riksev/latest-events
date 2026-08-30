import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";
import { createServer } from "@/utils/supabase/server";

export default async function CategoriesPage(): Promise<React.JSX.Element> {
    const supabase = await createServer();
    const { data: categories } = await supabase.from("categories").select("*");

    return (
        <div className="events_page">
            <h1>Events</h1>
            <div className="cards">
                {categories?.map((category) => (
                    <Link
                        href={`/events/${category.id}`}
                        key={category.id + "2"}
                        className="card border-2 border-mist-800 rounded-xl"
                    >
                        <ImageWithFallback
                            src={category.image_url}
                            alt={category.title}
                            width={450}
                            height={450}
                            className="image"
                        />
                        <h2 className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-white/85 to-cyan-100/85 to-90% shadow-lg text-center py-2">
                            {category.title}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
