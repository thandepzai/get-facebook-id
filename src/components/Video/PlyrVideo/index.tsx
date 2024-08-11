import { AppVideoProps, AppVideoType } from "../type";
import { PlyrYoutubeVideo } from "./PlyrYoutubeVideo";

const PlyrVideo = ({ type, hlsSource = "", youtubeId = "", youtubeUrl }: AppVideoProps) => {
    if (type == AppVideoType.YOUTUBE)
        return <PlyrYoutubeVideo key={youtubeId} youtubeId={youtubeId} youtubeUrl={youtubeUrl} />;
    return null;
};

export default PlyrVideo;
