import PlyrVideo from "./PlyrVideo";
import VideoJS from "./VideoJs";
import { AppVideoProps, AppVideoType } from "./type";

const DynamicAppVideo = (props: AppVideoProps) => {
    const { type } = props;
    if (type == AppVideoType.HLS) return <VideoJS key={props.hlsSource} {...props} />;
    if (type == AppVideoType.YOUTUBE) return <PlyrVideo {...props} />;
    return null;
};

export default DynamicAppVideo;
