export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__brand">
        <a href="#/">TAMBURINS</a>
        <p>Luxury beauty campaign archive</p>
      </div>
      <nav className="site-footer__nav" aria-label="Footer navigation">
        <a href="#/about">About</a>
        <a href="#/collection">Store</a>
        <a href="#/stories">Journal</a>
        <a href="#footer">Customer Care</a>
      </nav>
      <div className="site-footer__social">
        <a href="#footer">Instagram</a>
        <a href="#footer">Youtube</a>
        <a href="#footer">Facebook</a>
      </div>
      <p className="site-footer__copy">© TAMBURINS. All rights reserved.</p>
    </footer>
  );
}
