import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = searchParams.title
    ? String(searchParams.title)
    : "Default Title";
  const images = searchParams.images
    ? String(searchParams.images)
    : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg";
  return {
    title: String(title),
    openGraph: {
      url: "https://mapstudy.edu.vn/",
      images: images,
      description: "Chúc mừng bạn tôi",
      phoneNumbers: images,
    },
  };
}

export default function ShareView() {
  return <div>fsdfs</div>;
}
