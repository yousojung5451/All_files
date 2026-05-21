import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import Newsletter from "../components/Newsletter/Newsletter.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { products, scents } from "../data/portfolioData.js";

export default function ProductDetailPage({ slug }) {
  useReveal();

  const product = products.find((item) => item.slug === slug) || products[0];

  return (
    <main className="site-shell detail-page">
      <section className="product-detail">
        <Header />
        <figure className="product-detail__image" data-reveal>
          <img src={product.image} alt={product.alt} />
        </figure>
        <div className="product-detail__content" data-reveal>
          <p>{product.category}</p>
          <h1>{product.name}</h1>
          <span>
            부드러운 빛과 정제된 오브제 무드로 보여주는 {product.name} 상세 페이지입니다.
            실제 제품 설명, 노트, 용량 정보는 최종 자료가 모이면 연결할 수 있습니다.
          </span>
          <div className="detail-actions">
            <button type="button">Add to Cart</button>
            <a href="#/collection">Back to Collection</a>
          </div>
        </div>
      </section>

      <section className="detail-related section-pad">
        <div className="section-head" data-reveal>
          <h2>Related Mood</h2>
        </div>
        <div className="mood-strip">
          {scents.slice(0, 3).map((scent) => (
            <article className="mood-strip__item" key={scent.name} data-reveal>
              <img src={scent.image} alt={scent.alt} loading="lazy" />
              <h3>{scent.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
