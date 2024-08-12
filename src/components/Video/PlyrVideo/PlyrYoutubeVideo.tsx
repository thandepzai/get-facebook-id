"use client"
import PlyrJS from "plyr";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
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

    const options = useMemo(
        () => ({
            tooltips: {
                controls: true,
                seek: true
            },
            speed: PlyrVideoConfig.speed,
            controls: PlyrVideoConfig.controls,
            i18n: PlyrVideoConfig.i18n,
            youtube: {
                noCookie: true
            },
            ...props.options
        }),
        [props.options]
    );

    useEffect(() => {
        createPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    const createPlayer = () => {
        const plyrPlayer = new PlyrJS("#mapstudy-plyr-ytb", options);

        if (playerRef.current?.plyr) {
            playerRef.current.plyr = plyrPlayer;
        }

        // const plyrContainer = document.querySelector("#mapstudy-plyr-ytb");
        // if (plyrContainer) {
        //     plyrContainer.classList.add("[&>div>div>iframe]:pointer-events-none");
        // }
    };

    return (
        <div className={styles["plyr-wrapper"]}>
            <div className="plyr__video-embed plyr" id="mapstudy-plyr-ytb">
                <iframe
                    src={
                        props.youtubeUrl
                            ? props.youtubeUrl
                            : `https://www.youtube-nocookie.com/embed/${props.youtubeId}?` +
                              "origin=https://plyr.io&amp;iv_load_policy=3" +
                              "&amp;modestbranding=1" +
                              "&amp;playsinline=1" +
                              "&amp;showinfo=0" +
                              "&amp;rel=0" +
                              "&amp;enablejsapi=1" +
                              "&controls=0"
                    }
                    allowFullScreen
                    allowTransparency
                    allow="autoplay"
                ></iframe>
            </div>
        </div>
    );
};
