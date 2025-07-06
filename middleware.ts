import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const decodedPath = decodeURIComponent(url.pathname);

  let updatedPath = decodedPath
    .replace("Бренды", "sets")
    .replace("Для бороды", "dlya-borody")
    .replace("Для бритья", "dlya-britya")
    .replace("Для волос и тела", "dlya-volos-i-tela")
    .replace("Наборы", "nabory")
    .replace("Аксессуары", "aksecsuary")
    .replace("Аксеcсуары", "aksecsuary")
    .replace("Скидки", "discounts");

  const pathSegments = updatedPath.split("/");

  if (pathSegments.length > 3) {
    const subcategoryIndex = 3;
    pathSegments[subcategoryIndex] = pathSegments[subcategoryIndex]
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[!]/g, "");
  }

  updatedPath = pathSegments.join("/");

  if (decodedPath !== updatedPath) {
    const redirectUrl = new URL(updatedPath, req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/catalog/:path*",
};
