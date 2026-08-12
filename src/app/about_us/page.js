import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    return (
        <div>
            <h1>About Us</h1>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex hic
                impedit tempora, minus blanditiis exercitationem commodi iusto
                harum facilis nam!
            </p>
            <h2>Our Team</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio iure minima, pariatur illum porro expedita sunt
                corrupti libero repellat facere fugiat ipsam! Quae modi
                laudantium, similique necessitatibus soluta dignissimos tenetur
                perferendis facere ullam ea, non ad dolorem pariatur aliquid
                quibusdam?
            </p>
            <ul className="about_us_list">
                <li>
                    <h3>Frontend</h3>
                    <div className="person">
                        <FontAwesomeIcon icon={faUser} />
                        <p>Yevhenii Holubovych</p>
                    </div>
                </li>
                <li>
                    <h3>Backend</h3>
                    <div className="person">
                        <FontAwesomeIcon icon={faUser} />
                        <p>Yevhenii Holubovych</p>
                    </div>
                </li>
                <li>
                    <h3>Designers</h3>
                    <div className="person">
                        <FontAwesomeIcon icon={faUser} />
                        <p>Jane Smith</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}
