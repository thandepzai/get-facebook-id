import dynamic from "next/dynamic";
import { AppVideoProps } from "./type";

const DynamicAppVideo = dynamic(() => import("./DynamicAppVideo"), {
    ssr: false,
    loading: () => <div className="relative w-full aspect-video"></div>
});

const AppVideo = (props: AppVideoProps) => <DynamicAppVideo {...props} />;

export default AppVideo;
