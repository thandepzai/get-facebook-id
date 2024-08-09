import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const fburl = url.searchParams.get('url');
  console.log("🚀 ~ GET ~ fburl:", fburl)
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
