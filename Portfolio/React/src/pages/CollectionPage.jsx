import Footer from "../components/Footer/Footer.jsx";
import Newsletter from "../components/Newsletter/Newsletter.jsx";
import PageHero from "../components/PageHero/PageHero.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { media, products, scents } from "../data/portfolioData.js";

export default function CollectionPage() {
  useReveal();

  return (
    <main className="site-shell">
      <PageHero
        eyebrow="Product Collection"
        title="Collection"
        copy="향수와 핸드 크림을 하나의 에디토리얼 흐름으로 보여주는 제품 아카이브"
        image={media.heroImage}
      />

      <section className="catalog section-pad" aria-labelledby="catalog-title">
        <div className="section-head" data-reveal>
          <h2 id="catalog-title">Objects</h2>
          <a className="small-link" href="#/stories">
            View Stories
          </a>
        </div>
        <div className="catalog__grid">
          {products.map((product) => (
            <a
              className="catalog-card"
              href={`#/collection/${product.slug}`}
              key={product.name}
              data-reveal
            >
              <figure>
                <img src={product.image} alt={product.alt} loading="lazy" />
              </figure>
              <div>
                <p>{product.category}</p>
                <h3>{product.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mood-strip section-pad">
        {scents.map((scent) => (
          <article className="mood-strip__item" key={scent.name} data-reveal>
            <img src={scent.image} alt={scent.alt} loading="lazy" />
            <h3>{scent.name}</h3>
          </article>
        ))}
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
