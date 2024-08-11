"use client"
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import VideoJS from "./VideoJs";
import { AppVideoProps } from "../type";
import "videojs-hls-quality-selector";

function VideoPlayer({ hlsSource = "", onPlay, onPause, onTimeUpdate, timePlayback }: AppVideoProps) {
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (playerRef.current !== null && timePlayback) {
            playerRef.current.currentTime(timePlayback);
        }
    }, [timePlayback]);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: hlsSource,
                type: "application/x-mpegURL",
                withCredentials: false
            }
        ],
        playbackRates: [0.75, 1, 1.25, 1.5, 2],
        playsinline: true,
        controlBar: {
            skipButtons: {
                forward: 10,
                backward: 10
            }
        }
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.hlsQualitySelector({ displayCurrentQuality: true });

        player.on("timeupdate", () => {
            if (onTimeUpdate) onTimeUpdate({ now: player.currentTime(), total: player.duration() });
        });

        player.on("play", () => {
            if (onPlay) onPlay();
        });

        player.on("pause", () => {
            if (onPause) onPause();
        });
        // You can handle player events here, for example:
        player.on("waiting", () => {
            videojs.log("player is waiting");
        });

        player.on("dispose", () => {
            videojs.log("player will dispose");
        });
    };

    return (
        <div>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
    );
}

export default React.memo(VideoPlayer);
