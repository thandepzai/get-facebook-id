import AppVideo from "@/components/Video";
import { AppVideoProps, AppVideoType } from "@/components/Video/type";

export default function Home() {
  const getAppVideoProps = (video: any): AppVideoProps => {
    return {
      type: AppVideoType.YOUTUBE,
      youtubeId: video,
    };
  };
  return (
    <div>
      <div className="w-[500px] mx-auto">
        <AppVideo
          {...getAppVideoProps("https://www.youtube.com/watch?v=U6446tlNDZc")}
        />
      </div>
    </div>
  );
}
