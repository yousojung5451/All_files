import Footer from "../components/Footer/Footer.jsx";
import PageHero from "../components/PageHero/PageHero.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { media, stories } from "../data/portfolioData.js";

export default function StoriesPage() {
  useReveal();

  return (
    <main className="site-shell">
      <PageHero
        eyebrow="Editorial Stories"
        title="Stories"
        copy="자연광, 질감, 움직임으로 향의 분위기를 기록한 브랜드 저널"
        image={media.storyImage}
      />

      <section className="journal section-pad" aria-label="Story list">
        {stories.map((story, index) => (
          <a className="journal-item" href={`#/stories/${story.slug}`} key={story.title} data-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p>Campaign Archive</p>
              <h2>{story.title}</h2>
              <strong>{story.description}</strong>
            </div>
          </a>
        ))}
      </section>

      <section className="wide-image">
        <img src={media.filmImage} alt="Editorial product scene" loading="lazy" />
      </section>

      <Footer />
    </main>
  );
}
