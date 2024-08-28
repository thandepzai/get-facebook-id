"use client"
import { useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const images = searchParams.get("images");
  return (
    <html lang="en">
        <head>
          <meta name="og:url" content="https://mapstudy.edu.vn/" />
          <meta name="og:title" content="Thân đẹp zai" />
          <meta name="og:description" content="Cái gì cơ" />
          <meta name="og:type" content="website" />
          <meta name="og:images" content={images ?? "abc"} />
        </head>
      <body>{children}</body>
    </html>
  );
}
