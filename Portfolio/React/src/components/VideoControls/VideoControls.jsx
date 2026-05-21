import { useEffect, useState } from "react";

export default function VideoControls({ videoRef, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, videoRef]);

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted((current) => !current);
  };

  return (
    <div className={`video-controls ${className}`} aria-label="Video controls">
      <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause video" : "Play video"}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button type="button" onClick={toggleMute} aria-label={isMuted ? "Turn sound on" : "Turn sound off"}>
        {isMuted ? "Sound On" : "Sound Off"}
      </button>
    </div>
  );
}
