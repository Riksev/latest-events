import Image from "next/image";
import Link from "next/link";
import data from "../../../data/data.json";
import styles from ".././page.module.css";

export default function EventsPage() {
  const { events_categories } = data;
  return (
    <div className={styles.intro}>
      <h1>Events</h1>
      {events_categories.map((eventCategory) => (
        <Link
          href={`/events/${eventCategory.id}2`}
          className={styles.container}
          key={eventCategory.id}
        >
          <Image
            src={eventCategory.image}
            alt={eventCategory.title}
            width={500}
            height={400}
          />
          <h2>{eventCategory.title}</h2>
        </Link>
      ))}
    </div>
  );
}
