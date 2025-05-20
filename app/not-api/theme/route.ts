import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

const ALLOWED_ORIGIN = "https://admin.balmy.by";

export const GET = async () => {
  try {
    const { theme, themeCountElems } = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "public/localDb.json"), "utf8")
    );

    const response = NextResponse.json({
      theme: theme ?? "",
      themeCountElems: themeCountElems ?? "",
    });
    response.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    response.headers.set("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json("", { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    response.headers.set("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }

  if (origin !== ALLOWED_ORIGIN) {
    return NextResponse.json({ error: "CORS Error" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const localDb = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "public/localDb.json"), "utf8")
    );

    await writeFile(
      path.join(process.cwd(), "public/localDb.json"),
      JSON.stringify(
        {
          ...localDb,
          theme: body.theme ?? localDb.theme,
          themeCountElems: body.themeCountElems ?? localDb.themeCountElems,
        },
        null,
        2
      )
    );

    const response = NextResponse.json({ status: "OK" });
    response.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
};

export const OPTIONS = () => {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  response.headers.set("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
};
