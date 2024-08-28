import { Metadata, ResolvingMetadata } from "next";

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
    openGraph: {
      title: title,
      description: "Chưa biết ghi gì luôn",
      url: "https://mapstudy.edu.vn/",
      type: "website",
      phoneNumbers: "abc",
      images: images,
    },
  };
}

export default function ShareView() {
  return <div></div>;
}
