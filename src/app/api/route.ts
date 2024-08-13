import { NextResponse } from "next/server";

async function fetchWithTimeout(
  resource: string,
  timeout: number,
  options?: RequestInit
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const fburl = url.searchParams.get("url");
  if (fburl) {
    try {
      const response = await fetchWithTimeout(
        `https://ffb.vn/api/tool/get-id-fb?idfb=${fburl}`,
        5000
      );
      if (response.ok) {
        const data = await response.json();
        if (!data.id || data.id === "") throw new Error();
        return NextResponse.json({ id: data.id }, { status: 200 });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("First API failed:", error);

      try {
        const formData = new FormData();
        formData.append("link", fburl);
        const secondResponse = await fetchWithTimeout(
          `https://id.traodoisub.com/api.php`,
          5000,
          {
            method: "POST",
            body: formData,
          }
        );
        if (secondResponse.ok) {
          const data = await secondResponse.json();
          if (!data.id || data.id === "") throw new Error();
          return NextResponse.json({ id: data.id }, { status: 200 });
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("Second API failed:", error);

        try {
          const formData = new FormData();
          formData.append("fburl", fburl);
          formData.append("check", "Lookup");
          const thirdResponse = await fetchWithTimeout(
            `https://lookup-id.com/`,
            5000,
            {
              method: "POST",
              body: formData,
            }
          );
          if (thirdResponse.ok) {
            const htmlData = await thirdResponse.text();
            const idMatch = htmlData.match(/<span id="code">(\d+)<\/span>/);
            const id = idMatch ? idMatch[1] : "";
            return NextResponse.json({ id }, { status: 200 });
          } else {
            throw new Error();
          }
        } catch (error) {
          console.error("Third API failed:", error);
          return NextResponse.json(
            { error: "Internal Server Error", id: "" },
            { status: 500 }
          );
        }
      }
    }
  }

  return NextResponse.json({ id: "" }, { status: 500 });
}
