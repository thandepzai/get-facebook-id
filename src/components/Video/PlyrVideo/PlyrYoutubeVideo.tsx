"use client";
import PlyrJS from "plyr";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import "plyr/dist/plyr.css";
import styles from "./style.module.css";
import { PlyrVideoConfig } from "./config";

export const PlyrYoutubeVideo = (
  props: Partial<any> & {
    youtubeUrl?: string;
    youtubeId: string;
    videoRef?: MutableRefObject<any>;
  }
) => {
  const playerRef = useRef<any>();
  const iframeRef = useRef<HTMLIFrameElement>(null); // Tham chiếu cho iframe
  const secondVideoRef = useRef<HTMLIFrameElement>(null);

  const options = useMemo(
    () => ({
      tooltips: {
        controls: true,
        seek: true,
      },
      speed: PlyrVideoConfig.speed,
      controls: PlyrVideoConfig.controls,
      i18n: PlyrVideoConfig.i18n,
      youtube: {
        noCookie: true,
      },
      ...props.options,
    }),
    [props.options]
  );

  useEffect(() => {
    // Khởi tạo Plyr
    createPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);
  let check = 0;
  const createPlayer = () => {
    const plyrPlayer = new PlyrJS("#mapstudy-plyr-ytb");

    if (playerRef.current?.plyr) {
      playerRef.current.plyr = plyrPlayer;
    }

    const plyrContainer = document.querySelector("#mapstudy-plyr-ytb");
    if (plyrContainer) {
      plyrContainer.classList.add("[&>div>div>iframe]:pointer-events-none");
    }

    // plyrPlayer.on("play", () => {
    //   if (check === 1) return;
    //   if (secondVideoRef.current) {
    //     // Gửi lệnh "play" đến video thứ hai khi video đầu tiên phát
    //     secondVideoRef.current.contentWindow?.postMessage(
    //       '{"event":"command","func":"pauseVideo","args":""}',
    //       "*"
    //     );
    //   }
    //   check = 1;
    //   plyrPlayer.pause();
    // });

    // // Xử lý sự kiện khi iframe YouTube đã load xong
    // setTimeout(() => {
    //   if (secondVideoRef.current) {
    //     // Gửi lệnh "play" đến video thứ hai khi video đầu tiên phát
    //     secondVideoRef.current.contentWindow?.postMessage(
    //       '{"event":"command","func":"playVideo","args":""}',
    //       "*"
    //     );
    //   }

    // }, 200); // 1000ms = 1 giây
    // setTimeout(() => {
    //     if (secondVideoRef.current) {
    //       // Gửi lệnh "pause" đến video thứ hai khi video đầu tiên dừng
    //       secondVideoRef.current.contentWindow?.postMessage(
    //         '{"event":"command","func":"pauseVideo","args":""}',
    //         "*"
    //       );
    //     }
    //   }, 1300);
  };

  return (
    <div>
      <div className={styles["plyr-wrapper"]}>
        <div className="plyr__video-embed plyr" id="mapstudy-plyr-ytb">
          <iframe
            src={props.youtubeId}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ref={iframeRef} // Gán tham chiếu
          ></iframe>
        </div>
        <iframe
          className="w-full max-w-[500px] overflow-hidden"
          height="300"
          src={`${props.youtubeId}?autoplay=1&mute=1&enablejsapi=1`} // Thay đổi autoplay thành 1
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ref={secondVideoRef}
        ></iframe>
      </div>
    </div>
  );
};
