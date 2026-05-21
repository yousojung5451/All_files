import { useRef } from "react";
import Header from "../Header/Header.jsx";
import VideoControls from "../VideoControls/VideoControls.jsx";

export default function Hero({ image, video }) {
  const videoRef = useRef(null);

  return (
    <section className="hero" id="top" aria-label="Tamburins luxury fragrance campaign">
      <div className="hero__media" aria-hidden="true">
        {video ? (
          <video ref={videoRef} className="hero__video" autoPlay muted loop playsInline poster={image}>
            <source src={video} type="video/mp4" />
          </video>
        ) : null}
        <img className="hero__fallback" src={image} alt="" />
      </div>

      <div className="hero__veil" aria-hidden="true" />
      <Header />

      <div className="hero__content" data-reveal>
        <p className="hero__eyebrow">Scented Journey</p>
        <h1>
          Scent
          <br />
          Experience
          <br />
          Archive
        </h1>
        <p className="hero__copy">
          향을 기록하고 경험하는
          <br />
          감각적인 뷰티 아카이브
        </p>
        <a className="text-link hero__cta" href="#/collection">
          <span>Explore</span>
          <span aria-hidden="true" />
        </a>
      </div>

      {video ? <VideoControls videoRef={videoRef} className="hero__controls" /> : null}

      <div className="hero__indicator" aria-label="Slide 1 of 3">
        <span>01</span>
        <i />
        <strong>01</strong>
        <span>02</span>
        <i />
        <span>03</span>
      </div>

      <div className="hero__dots" aria-hidden="true">
        <span className="is-active" />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
