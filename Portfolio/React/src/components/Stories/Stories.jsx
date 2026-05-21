export function ScentFinder({ scents, background }) {
  return (
    <section
      className="scent section-pad section-dark"
      id="scent"
      aria-labelledby="scent-title"
      style={{ "--scent-bg": `url(${background})` }}
    >
      <div className="scent__intro" data-reveal>
        <p className="section-kicker">Find Your Scent</p>
        <h2 id="scent-title">
          Find Your
          <br />
          Scent
        </h2>
        <p>당신의 시간과 감각에 어울리는 향을 천천히 발견해보세요.</p>
        <a className="text-link text-link--light" href="#collection">
          <span>Start Exploring</span>
          <span aria-hidden="true" />
        </a>
      </div>

      <div className="scent__grid">
        {scents.map((scent) => (
          <article className="scent-card" key={scent.name} data-reveal>
            <img src={scent.image} alt={scent.alt} loading="lazy" />
            <div className="scent-card__overlay" />
            <h3>{scent.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Stories({ stories, image }) {
  return (
    <section className="stories section-pad" id="stories" aria-labelledby="stories-title">
      <div className="section-head" data-reveal>
        <h2 id="stories-title">Stories</h2>
        <a className="small-link" href="#stories">
          Discover More
        </a>
      </div>

      <div className="stories__layout">
        <figure className="stories__image" data-reveal>
          <img src={image} alt="Perfume on stone object in cinematic warm light" loading="lazy" />
        </figure>

        <div className="story-list">
          {stories.map((story, index) => (
            <article className="story-item" key={story.title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <a className="small-link" href="#stories">
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
