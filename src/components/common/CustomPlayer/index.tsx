"use client";
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import Hls from "hls.js";
import "plyr/dist/plyr.css";

interface Props {
  url: string;
  poster?: string; // Optional poster image URL
}

declare global {
  interface Window {
    hls: Hls;
  }
}

const CustomPlayer: React.FC<Props> = ({ url, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("useEffect triggered");

    if (typeof window !== "undefined") {
      console.log("Running in browser environment");

      const video = videoRef.current;
      if (!video) {
        console.error("Video element not found");
        return;
      }

      const defaultOptions: Plyr.Options = {
        fullscreen: { enabled: true, iosNative: true },
        controls: [
          "play-large", // The large play button in the center
          // "restart", // Restart playback
          "rewind", // Rewind by the seek time (default 10 seconds)
          "play", // Play/pause playback
          "fast-forward", // Fast forward by the seek time (default 10 seconds)
          "progress", // The progress bar and scrubber for playback and buffering
          "current-time", // The current time of playback
          "duration", // The full duration of the media
          "mute", // Toggle mute
          "volume", // Volume control
          "captions", // Toggle captions
          "settings", // Settings menu
          "pip", // Picture-in-picture (currently Safari only)
          "airplay", // Airplay (currently Safari only)
          // "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
          "fullscreen", // Toggle fullscreen
        ],
      };

      const updateQuality = (newQuality: number) => {
        if (newQuality === 0) {
          window.hls.currentLevel = -1; // Enable AUTO quality if option.value = 0
        } else {
          window.hls.levels.forEach((level: any, levelIndex: number) => {
            if (level.height === newQuality) {
              console.log("Found quality match with " + newQuality);
              window.hls.currentLevel = levelIndex;
            }
          });
        }
      };

      if (!Hls.isSupported()) {
        console.log("Hls not supported, using standard video source");
        video.src = url;
        new Plyr(video, defaultOptions);
      } else {
        console.log("Hls supported, initializing Hls.js");
        const hls = new Hls();
        hls.loadSource(url);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("Hls manifest parsed");

          const availableQualities = hls.levels.map((l) => l.height);
          availableQualities.unshift(0); // Prepend 0 to quality array

          defaultOptions.quality = {
            default: 0, // Default - AUTO
            options: availableQualities,
            forced: true,
            onChange: updateQuality,
          };

          defaultOptions.i18n = {
            qualityLabel: {
              0: "Auto",
            },
          };

          hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
            const span = document.querySelector(
              ".plyr__menu__container [data-plyr='quality'][value='0'] span",
            );
            if (span) {
              if (hls.autoLevelEnabled) {
                span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
              } else {
                span.innerHTML = `AUTO`;
              }
            }
          });

          new Plyr(video, defaultOptions);
        });

        hls.attachMedia(video);
        window.hls = hls;
      }
    } else {
      console.error("Not running in browser environment");
    }
  }, [url]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="plyr__video-embed min-w-full"
        playsInline
        controls
        poster={poster || "/images/poster-default.jpg"} // Set poster image
        onError={(e) => {
          const target = e.target as HTMLVideoElement;
          target.poster = "/images/poster-default.jpg";
        }}
      ></video>
    </div>
  );
};

export default CustomPlayer;
