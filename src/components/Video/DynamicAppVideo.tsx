import PlyrVideo from "./PlyrVideo";
import { AppVideoProps, AppVideoType } from "./type";

const DynamicAppVideo = (props: AppVideoProps) => {
    const { type } = props;
    if (type == AppVideoType.YOUTUBE) return <PlyrVideo {...props} />;
    return null;
};

export default DynamicAppVideo;
