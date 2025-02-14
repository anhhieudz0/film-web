"use client";
import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import Hls from "hls.js";
import "plyr/dist/plyr.css";
import { BsPlayCircle } from "react-icons/bs";
import { useRouter } from "next/router";

interface Props {
  url: string;
  poster?: string; // Optional poster image URL
  nextPart?: { poster?: string; name?: string; path: string };
  title?: string;
}

declare global {
  interface Window {
    hls: Hls;
  }
}

const CustomPlayer: React.FC<Props> = ({ url, poster, nextPart, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isShowNextPart, setIsShowNextPart] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    // Kiểm tra xem Media Session API có được hỗ trợ không
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        artwork: [
          {
            src: poster || "/images/poster-default.jpg",
            sizes: "96x96",
            type: "image/jpeg",
          },
          {
            src: poster || "/images/poster-default.jpg",
            sizes: "128x128",
            type: "image/jpeg",
          },
          {
            src: poster || "/images/poster-default.jpg",
            sizes: "192x192",
            type: "image/jpeg",
          },
          {
            src: poster || "/images/poster-default.jpg",
            sizes: "256x256",
            type: "image/jpeg",
          },
          {
            src: poster || "/images/poster-default.jpg",
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
        title,
      });

      // Tùy chỉnh các hành động (play, pause)
      navigator.mediaSession.setActionHandler(
        "play",
        () => videoRef.current && videoRef.current.play()
      );
      navigator.mediaSession.setActionHandler(
        "pause",
        () => videoRef.current && videoRef.current.pause()
      );
    }

    return () => {
      // Cleanup nếu cần thiết
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = null;
      }
    };
  }, [videoRef.current]);
  useEffect(() => {
    console.log("useEffect triggered");

    if (typeof window !== "undefined") {
      console.log("Running in browser environment");
      const savedTime = localStorage.getItem(`watchedTime_${url}`);

      if (savedTime) {
        const shouldResume = window.confirm("Bạn có muốn tiếp tục xem không?");
        if (shouldResume && videoRef.current) {
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.currentTime = parseFloat(savedTime);
            }
          }, 1000);
        } else {
          localStorage.removeItem(`watchedTime_${url}`);
        }
      }
      const video = videoRef.current;
      if (!video) {
        console.error("Video element not found");
        return;
      }

      const defaultOptions: Plyr.Options = {
        fullscreen: { enabled: true, iosNative: true },
        controls: [
          "play-large", // The large play button in the center
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
          "fullscreen", // Toggle fullscreen
          "lights-off", // Custom button for turning off the lights
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

      const toggleLights = () => {
        const videoContainer = video.parentElement;
        if (videoContainer) {
          videoContainer.classList.toggle("lights-off");
        }
      };

      if (!Hls.isSupported()) {
        console.log("Hls not supported, using standard video source");
        video.src = url;
        const player = new Plyr(video, defaultOptions);
        player.on("controlshidden", () => {
          const control = document.querySelector(".plyr__control--lights-off");
          if (control) {
            control.addEventListener("click", toggleLights);
          }
        });
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
              ".plyr__menu__container [data-plyr='quality'][value='0'] span"
            );
            if (span) {
              if (hls.autoLevelEnabled) {
                span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
              } else {
                span.innerHTML = `AUTO`;
              }
            }
          });

          const player = new Plyr(video, defaultOptions);

          // Save watched time to localStorage on time update
          player.on("timeupdate", () => {
            setIsShowNextPart(false);
            video.currentTime > 0 &&
              localStorage.setItem(
                `watchedTime_${url}`,
                video.currentTime.toString()
              );
          });
        });

        hls.attachMedia(video);
        window.hls = hls;
      }
    } else {
      console.error("Not running in browser environment");
    }
  }, [url]);

  // useEffect(() => {
  //   const handler = () => {
  //     if (!videoRef.current) {
  //       return;
  //     }
  //     const buttonElement = document.querySelector(
  //       '[data-plyr="fullscreen"]'
  //     ) as HTMLButtonElement;

  //     if (
  //       buttonElement &&
  //       window.matchMedia("(orientation: landscape)").matches &&
  //       videoRef.current.currentTime > 0
  //     ) {
  //       buttonElement?.click();
  //     }
  //   };
  //   window.addEventListener("resize", handler);
  //   return () => window.removeEventListener("resize", handler);
  // }, [videoRef]);

  return (
    <div className="video-container relative">
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
        onEnded={(e) => {
          setIsShowNextPart(true);
          localStorage.removeItem(`watchedTime_${url}`);
          if (document.fullscreenElement) {
            document.exitFullscreen().catch((err) => console.error(err));
          }
        }}
      ></video>
      {isShowNextPart && nextPart && (
        <div
          className={`absolute top-2 right-2 opacity-0 transition duration-500 z-10 w-[170px] shadow-sm cursor-pointer ${true ? "opacity-100" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            router.push(nextPart?.path);
          }}
        >
          <img src={nextPart?.poster} alt="poster_url" loading="lazy" />
          <span className="absolute bottom-0 left-0 right-0 p-1 pl-3 bg-slate-900 bg-opacity-75">
            {nextPart?.name}
          </span>
          <BsPlayCircle
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-white bg-green-500 rounded-full"
            size={30}
          />
        </div>
      )}
    </div>
  );
};

export default CustomPlayer;
