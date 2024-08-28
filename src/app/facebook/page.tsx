import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  return {
    openGraph: {
      title: "Thân đẹp zai",
      description: "Chưa biết ghi gì luôn",
        url: "Mapstudy.com",
      images:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
    },
  };
}

export default function ShareView() {
  return <div></div>;
}
