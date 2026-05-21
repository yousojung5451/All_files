import { useState } from "react";

const navItems = [
  { label: "Home", href: "#/" },
  { label: "Collection", href: "#/collection" },
  { label: "Stories", href: "#/stories" },
  { label: "About", href: "#/about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  const closePanel = () => setActivePanel(null);

  return (
    <>
      <header className="site-header">
        <a className="site-header__logo" href="#/" aria-label="Tamburins home">
          TAMBURINS
        </a>

        <nav className="site-header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__tools">
          <button type="button" onClick={() => setActivePanel("search")}>
            Search
          </button>
          <button type="button">KR</button>
          <button type="button" onClick={() => setActivePanel("cart")}>
            Cart (0)
          </button>
        </div>

        <button
          className={`site-header__menu ${isMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-nav ${isMenuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={`site-panel ${activePanel ? "is-open" : ""}`} aria-hidden={!activePanel}>
        <div className="site-panel__scrim" onClick={closePanel} />
        <aside className="site-panel__body" aria-label={activePanel === "search" ? "Search" : "Cart"}>
          <button className="site-panel__close" type="button" onClick={closePanel}>
            Close
          </button>

          {activePanel === "search" ? (
            <div className="site-panel__content">
              <p>Search</p>
              <label htmlFor="site-search">Search keyword</label>
              <input id="site-search" type="search" placeholder="Perfume, hand cream, story" />
              <span>검색 기능은 추후 제품 데이터와 연결할 수 있는 상태입니다.</span>
            </div>
          ) : null}

          {activePanel === "cart" ? (
            <div className="site-panel__content">
              <p>Cart</p>
              <h2>Your cart is empty</h2>
              <span>상품 상세 페이지와 연결하면 바로 장바구니 UI로 확장할 수 있습니다.</span>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
