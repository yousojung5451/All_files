import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { media, stories } from "../data/portfolioData.js";

export default function StoryDetailPage({ slug }) {
  useReveal();

  const story = stories.find((item) => item.slug === slug) || stories[0];

  return (
    <main className="site-shell detail-page">
      <section className="story-detail">
        <Header />
        <div className="story-detail__media" aria-hidden="true">
          <img src={media.storyImage} alt="" />
        </div>
        <div className="story-detail__overlay" />
        <article className="story-detail__content" data-reveal>
          <p>Editorial Archive</p>
          <h1>{story.title}</h1>
          <span>{story.description}</span>
          <strong>
            자연광과 질감, 느린 움직임을 중심으로 향의 인상을 기록하는 페이지입니다.
            상세 원고와 캠페인 이미지가 모이면 이 영역을 실제 저널 콘텐츠로 확장할 수 있습니다.
          </strong>
          <a className="text-link text-link--light" href="#/stories">
            <span>Back to Stories</span>
            <span aria-hidden="true" />
          </a>
        </article>
      </section>

      <Footer />
    </main>
  );
}
