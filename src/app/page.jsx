import ImageWithFallback from "../components/ImageWithFallback";
import Link from "next/link";
import { createServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();
    const supabase = createServer(cookieStore);
    const { data: categories } = await supabase.from("categories").select("*");

    return (
        <div className="home-body">
            <h1>Home</h1>
            <div className="cards">
                {categories.map((category) => (
                    <Link
                        href={`/events/${category.id}`}
                        key={category.id}
                        className="card"
                    >
                        <ImageWithFallback
                            src={category.image_url}
                            alt={category.title}
                            width={225}
                            height={225}
                            className="image"
                            loading="eager"
                        />
                        <div className="flex flex-col">
                            <h2>{category.title}</h2>
                            <p>{category.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
