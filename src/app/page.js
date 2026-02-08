import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.intro}>
      <Link href="/" className={styles.container}>
        <Image
          src="/next.svg"
          alt="Events in London"
          width={350}
          height={200}
          style={{filter: "invert(100%)"}}
        />
        <h2>Events in London</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          nemo labore nisi nam ab autem quidem quod repudiandae. Vel officiis
          eligendi, commodi laborum suscipit quidem!
        </p>
      </Link>
      <Link href="/" className={styles.container}>
        <Image
          src="/next.svg"
          alt="Events in San Francisco"
          width={350}
          height={200}
          style={{filter: "invert(100%)"}}
        />
        <h2>Events in San Francisco</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          nemo labore nisi nam ab autem quidem quod repudiandae. Vel officiis
          eligendi, commodi laborum suscipit quidem!
        </p>
      </Link>
      <Link href="/" className={styles.container}>
        <Image
          src="/next.svg"
          alt="Events in Barcelona"
          width={350}
          height={200}
          style={{filter: "invert(100%)"}}
        />
        <h2>Events in Barcelona</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          nemo labore nisi nam ab autem quidem quod repudiandae. Vel officiis
          eligendi, commodi laborum suscipit quidem!
        </p>
      </Link>
    </div>
  );
}
