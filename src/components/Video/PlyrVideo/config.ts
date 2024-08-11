export class PlyrVideoConfig {
    static speed = { selected: 1, options: [0.5, 1, 1.25, 1.5, 2] };

    static i18n = {
        restart: "Phát lại từ đầu",
        rewind: "Quay lại {seektime} giây",
        play: "Phát",
        pause: "Tạm dừng",
        fastForward: "Tua nhanh {seektime} giây",
        seek: "Seek",
        played: "Played",
        buffered: "Buffered",
        currentTime: "Current time",
        duration: "Thời lượng",
        volume: "Âm lượng",
        mute: "Tắt tiếng",
        unmute: "Bật tiếng",
        enableCaptions: "Enable captions",
        disableCaptions: "Disable captions",
        enterFullscreen: "Toàn màn hình",
        exitFullscreen: "Thoát toàn màn hình",
        frameTitle: "Player for {title}",
        captions: "Captions",
        settings: "Cài đặt",
        speed: "Tốc độ",
        normal: "Bình thường",
        quality: "Chất lượng",
        loop: "Loop",
        start: "Start",
        end: "End",
        all: "All",
        reset: "Reset",
        disabled: "Disabled",
        advertisement: "Ad"
    };

    static controls = [
        "play-large", // The large play button in the center
        "restart", // Restart playback
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
        "fullscreen" // Toggle fullscreen
    ];
}
