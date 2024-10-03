import konular from "@/app/data/konular.json";
import Header from "./header";
import Link from "next/link";
import Image from "next/image";
import HTML from "@/app/img/HTML.png";
import CSS from "@/app/img/CSS.png";
import JS from "@/app/img/JS.png";
import Acs from "@/app/img/Acs.png";

export default function QuizSelector() {
  return (
    <div className="container">
      <Header />
      <div className="quiz-selector">
        <div className="Startcontainer">
          <div className="StartHeader">
            <h4>Hafızanı Zorla 
              <br />
              <span>Frontend Testi</span>
            </h4>
            <p>Başlamak için bir konu seçin.</p>
          </div>
          <div className="categories">
            {konular.map((x) => (
              <Link href={`/${x.konu}`} key={x.id} className="categoryItem">
                <span className="category-icon">
                  {x.konu === "HTML" && (
                    <Image
                      style={{ backgroundColor: "#FFF1E9" }}
                      src={HTML}
                      width={40}
                      height={40}
                      alt="HTML Icon"
                    />
                  )}
                  {x.konu === "CSS" && (
                    <Image
                      style={{ backgroundColor: "#E0FDEF" }}
                      src={CSS}
                      width={40}
                      height={40}
                      alt="CSS Icon"
                    />
                  )}
                  {x.konu === "JS" && (
                    <Image
                      style={{ backgroundColor: "#EBF0FF" }}
                      src={JS}
                      width={40}
                      height={40}
                      alt="JS Icon"
                    />
                  )}
                  {x.konu === "Accessibility" && (
                    <Image
                      style={{ backgroundColor: "#F6E7FF" }}
                      src={Acs}
                      width={40}
                      height={40}
                      alt="Accessibility Icon"
                    />
                  )}
                </span>
                <h3>{x.konu}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
