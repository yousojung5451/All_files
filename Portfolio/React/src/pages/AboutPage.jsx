import Footer from "../components/Footer/Footer.jsx";
import PageHero from "../components/PageHero/PageHero.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { media } from "../data/portfolioData.js";

const values = ["Natural Light", "Soft Shadow", "Cinematic Texture", "Korean Beauty"];

export default function AboutPage() {
  useReveal();

  return (
    <main className="site-shell">
      <PageHero
        eyebrow="Brand Mood"
        title="About"
        copy="Tamburins와 Aesop의 절제된 감도를 참고한 럭셔리 코리안 뷰티 포트폴리오"
        image={media.filmImage}
      />

      <section className="about-editorial section-pad">
        <div className="about-editorial__copy" data-reveal>
          <p className="section-kicker">Mood Direction</p>
          <h2>Quiet, Sensory, Premium</h2>
          <p>
            베이지와 아이보리, 블랙 톤을 중심으로 자연광과 부드러운 그림자를 살려
            제품이 가진 촉각적인 이미지를 차분하게 보여주는 방향입니다.
          </p>
        </div>
        <div className="about-editorial__values">
          {values.map((value) => (
            <span key={value} data-reveal>
              {value}
            </span>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
