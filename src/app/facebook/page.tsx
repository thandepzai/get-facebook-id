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
        "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/455815989_473219259021016_1809018766819897025_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xiXA_E5HlCEQ7kNvgFR_tR_&_nc_ht=scontent.fhan17-1.fna&oh=00_AYCNsTm0Br_y5dszUFHfvebs-6gk93WMJjIXGdPYG8a8Sg&oe=66D47FF9",
    },
  };
}

export default function ShareView() {
  return <div>abc</div>;
}
