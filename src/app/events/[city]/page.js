import Link from "next/link";

export default function Page() {
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
