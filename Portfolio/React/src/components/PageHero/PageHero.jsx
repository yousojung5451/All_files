import Header from "../Header/Header.jsx";

export default function PageHero({ eyebrow, title, copy, image }) {
  return (
    <section className="page-hero" aria-label={title}>
      <div className="page-hero__media" aria-hidden="true">
        <img src={image} alt="" />
      </div>
      <div className="page-hero__overlay" />
      <Header />
      <div className="page-hero__content" data-reveal>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{copy}</span>
      </div>
    </section>
  );
}
