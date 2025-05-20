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
  const { products } = await getProducts();

  const xml = `<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
    <channel>
      <title>Balmy</title>
      <link>https://balmy.by/</link>
      ${products
        .map(
          (product) => `
      <item>
        <title>${escapeXml(product.name)}</title>
        <link>https://balmy.by/product/${escapeXml(product.slug)}</link>
        <description>${escapeXml(product.description)}</description>
        <g:price>${escapeXml(String(product.salePrices))} BYN</g:price>
        <g:sale_price>${escapeXml(
          String(product.discountPrices)
        )} BYN</g:sale_price>
        <g:availability>${escapeXml(
          !!product.quantity ? "in stock" : "not in stock"
        )}</g:availability>
        <g:condition>${escapeXml(
          product.popular ? "popular" : "new"
        )}</g:condition>
        <g:id>${escapeXml(product.article)}</g:id>
        <g:image_link>${escapeXml(product.images[0])}</g:image_link>
				<g:additional_image_link>${escapeXml(
          product.images[1] || product.images[0]
        )}</g:additional_image_link>
        	<g:shipping>
						<g:country>BY</g:country>
						<g:price> ${escapeXml(String(product.discountPrices))} BYN</g:price>
					</g:shipping>
        <g:brand>${escapeXml(product.brand)}</g:brand>
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
