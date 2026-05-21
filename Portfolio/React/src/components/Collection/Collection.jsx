function ProductCard({ product }) {
  return (
    <article className="product-card" data-reveal>
      <figure>
        <img src={product.image} alt={product.alt} loading="lazy" />
      </figure>
      <div>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
      </div>
    </article>
  );
}

export default function Collection({ products }) {
  return (
    <section className="collection section-pad" id="collection" aria-labelledby="collection-title">
      <div className="section-head" data-reveal>
        <h2 id="collection-title">Collection</h2>
        <a className="small-link" href="#collection">
          View All
        </a>
      </div>

      <div className="collection__rail" aria-label="Product collection slider">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
