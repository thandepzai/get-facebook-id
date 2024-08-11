import AppVideo from "@/components/Video";
import { AppVideoProps, AppVideoType } from "@/components/Video/type";

export default async function Home() {
  const getAppVideoProps = (video: any): AppVideoProps => {
    return {
      type: AppVideoType.YOUTUBE,
      youtubeId: video,
    };
  };
  return (
    <div>
      <AppVideo
        {...getAppVideoProps("https://www.youtube.com/watch?v=U6446tlNDZc")}
      />
    </div>
  );
}
