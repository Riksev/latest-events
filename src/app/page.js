import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import data from "../../data/data.json";

export default function Home() {
  const { events_categories } = data;
  return (
    <div className={styles.intro}>
      {events_categories.map((eventCategory) => (
        <Link
          href={`/events/${eventCategory.id}`}
          className={styles.container}
          key={eventCategory.id}
        >
          <Image
            src={eventCategory.image}
            alt={eventCategory.title}
            width={300}
            height={0}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <h2>{eventCategory.title}</h2>
          <p>{eventCategory.description}</p>
        </Link>
      ))}
    </div>
  );
}
