import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Events</h1>
      <div>
        <Link href="/events/london">
          <Image
            src="/next.svg"
            alt="Events in London"
            width={350}
            height={200}
            style={{filter: "invert(100%)"}}
          />
          <h2>Events in London</h2>
        </Link>
        <Link href="/events/san_francisco">
          <Image
            src="/next.svg"
            alt="Events in San Francisco"
            width={350}
            height={200}
            style={{filter: "invert(100%)"}}
          />
          <h2>Events in San Francisco</h2>
        </Link>
        <Link href="/events/barcelona">
          <Image
            src="/next.svg"
            alt="Events in Barcelona"
            width={350}
            height={200}
            style={{filter: "invert(100%)"}}
          />
          <h2>Events in Barcelona</h2>
        </Link>
      </div>
    </div>
  );
}
