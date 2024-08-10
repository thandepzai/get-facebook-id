import { NextResponse } from "next/server";

function fetchWithTimeout(url: string, options: any, timeout = 8000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout)
    ),
  ]);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const fburl = url.searchParams.get("url");
  try {
    const response = await fetch(
      `https://ffb.vn/api/tool/get-id-fb?idfb=${fburl}`
    );

    if (response.ok) {
      const htmlData = await response.json();
      if (htmlData.id === "") throw new Error();
      return NextResponse.json({ id: htmlData.id }, { status: 200 });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
