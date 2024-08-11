export enum AppVideoType {
    YOUTUBE = "youtube",
    HLS = "hls"
}

export interface AppVideoProps {
    type: AppVideoType;
    hlsSource?: string;
    youtubeId?: string;
    youtubeUrl?: string;
    timePlayback?: number;
    onPlay?: () => void;
    onPause?: () => void;
    onTimeUpdate?: ({ now, total }: { now: number; total: number }) => void;
}
