import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const fburl = url.searchParams.get("url");

  try {
    const response = await fetch(
      `https://ffb.vn/api/tool/get-id-fb?idfb=${fburl}`
    );

    if (response.ok) {
      const htmlData = await response.json();
      return NextResponse.json({ id: htmlData.id }, { status: 200 });
    } else {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
