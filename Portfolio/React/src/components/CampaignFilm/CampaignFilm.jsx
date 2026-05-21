import { useRef } from "react";
import VideoControls from "../VideoControls/VideoControls.jsx";

export default function CampaignFilm({ image, video }) {
  const videoRef = useRef(null);

  const toggleFilm = async () => {
    const currentVideo = videoRef.current;

    if (!currentVideo) return;

    if (currentVideo.paused) {
      await currentVideo.play();
      return;
    }

    currentVideo.pause();
  };

  return (
    <section className="film" id="film" aria-labelledby="film-title">
      <div className="film__media" aria-hidden="true">
        {video ? (
          <video ref={videoRef} autoPlay muted loop playsInline poster={image}>
            <source src={video} type="video/mp4" />
          </video>
        ) : null}
        <img src={image} alt="" />
      </div>
      <div className="film__overlay" />

      <div className="film__content" data-reveal>
        <p className="section-kicker">Campaign Film</p>
        <h2 id="film-title">Campaign Film</h2>
        <p>빛과 움직임 사이에 남는 향의 순간을 시네마틱하게 감상해보세요.</p>
        <a className="text-link text-link--light" href="#/stories">
          <span>Watch Film</span>
          <span aria-hidden="true" />
        </a>
      </div>

      <button className="film__play" type="button" aria-label="Play or pause campaign film" onClick={toggleFilm}>
        <span />
      </button>

      {video ? <VideoControls videoRef={videoRef} className="film__controls" /> : null}
    </section>
  );
}
