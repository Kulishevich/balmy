import { getProducts } from "@/api/products";
import { NextResponse } from "next/server";

function escapeXml(unsafe: string | null | undefined) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const products = await getProducts();

  const xml = `<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
    <channel>
      <title>Balmy</title>
      <link>https://balmy.by/</link>
      ${products.data
        .map(
          (product) => `
      <item>
        <title>${escapeXml(product.name)}</title>
        <link>https://balmy.by/product/${escapeXml(product.slug)}</link>
        <description>${escapeXml(product.description)}</description>
        <g:price>${escapeXml(String(product.price))} BYN</g:price>
        <g:sale_price>${escapeXml(String(product.discount))} BYN</g:sale_price>
        <g:availability>${escapeXml(
          !!product.quantity ? "in stock" : "not in stock"
        )}</g:availability>
        <g:condition>${escapeXml(
          product.is_popular ? "popular" : "new"
        )}</g:condition>
        <g:id>${escapeXml(product.sku)}</g:id>
        ${
          product?.images?.[0] &&
          `<g:image_link>${escapeXml(
            product.images[0].image_path
          )}</g:image_link>`
        }
          ${
            product?.images?.[1] &&
            `<g:additional_image_link>${escapeXml(
              product.images[1].image_path
            )}</g:additional_image_link>`
          }
        	<g:shipping>
						<g:country>BY</g:country>
						<g:price> ${escapeXml(String(product.discount))} BYN</g:price>
					</g:shipping>
        <g:brand>${escapeXml(product?.brand.name)}</g:brand>
      </item>`
        )
        .join("\n")}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
