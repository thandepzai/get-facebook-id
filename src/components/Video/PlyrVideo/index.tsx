import { AppVideoProps, AppVideoType } from "../type";
import EmbeddBunnyVideo from "./EmbeddBunny";
import { PlyrYoutubeVideo } from "./PlyrYoutubeVideo";

const PlyrVideo = ({ type, hlsSource = "", youtubeId = "", youtubeUrl }: AppVideoProps) => {
    // if (type == AppVideoType.HLS) return <PlyrHlsVideo key={hlsSource} hlsSource={hlsSource} />;
    if (type == AppVideoType.HLS) return <EmbeddBunnyVideo hlsSource={hlsSource} />;
    if (type == AppVideoType.YOUTUBE)
        return <PlyrYoutubeVideo key={youtubeId} youtubeId={youtubeId} youtubeUrl={youtubeUrl} />;
    return null;
};

export default PlyrVideo;
