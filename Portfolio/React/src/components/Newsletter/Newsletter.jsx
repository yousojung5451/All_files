export default function Newsletter() {
  return (
    <section className="newsletter section-pad" aria-labelledby="newsletter-title">
      <div className="newsletter__content" data-reveal>
        <h2 id="newsletter-title">Newsletter</h2>
        <p>새로운 컬렉션과 향의 이야기를 가장 먼저 받아보세요.</p>
      </div>
      <form className="newsletter__form" data-reveal>
        <label htmlFor="newsletter-email">Your Email</label>
        <div>
          <input id="newsletter-email" type="email" placeholder="your email" />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </section>
  );
}
