"use client";
import { Metadata, ResolvingMetadata } from "next";
import { useSearchParams } from "next/navigation";

// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const title = searchParams.title
//     ? String(searchParams.title)
//     : "Default Title";
//   const images = searchParams.images
//     ? String(searchParams.images)
//     : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg";

//   return {
//     openGraph: {
//       title: title,
//       description: "Chưa biết ghi gì luôn",
//       url: "https://mapstudy.edu.vn/",
//       type: "website",
//       phoneNumbers: "abc",
//       images: images,
//     },
//   };
// }

export default function ShareView() {
  const searchParams = useSearchParams();
  const images = searchParams.get("images");
  console.log("🚀 ~ ShareView ~ images:", images);
  return (
    <div>
      <head>
        <meta name="og:url" content="https://mapstudy.edu.vn/" />
        <meta name="og:title" content="Thân đẹp zai" />
        <meta name="og:description" content="Cái gì cơ" />
        <meta name="og:type" content="website" />
        <meta name="og:images" content={images ?? "abc"} />
      </head>
      <img src="images" alt="" />
    </div>
  );
}
