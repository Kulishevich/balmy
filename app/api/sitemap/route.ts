import { getCategories } from "@/api/category";
import { getProducts } from "@/api/products";
import { NextResponse } from "next/server";

export const revalidate = 86400;

const HOST = "https://balmy.by";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function generateUrlXml({
  loc,
  lastmod,
  changefreq,
  priority,
}: {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}) {
  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `;
}

export async function GET() {
  const now = new Date();
  const lastmod = formatDate(now);

  const staticPages = [
    { loc: `${HOST}/`, changefreq: "weekly", priority: 1.0 },
    { loc: `${HOST}/catalog/discounts`, changefreq: "weekly", priority: 0.8 },
    { loc: `${HOST}/news`, changefreq: "weekly", priority: 0.8 },
    { loc: `${HOST}/contacts`, changefreq: "monthly", priority: 0.8 },
    { loc: `${HOST}/delivery-payment`, changefreq: "monthly", priority: 0.5 },
    { loc: `${HOST}/offer-contract`, changefreq: "monthly", priority: 0.5 },
    { loc: `${HOST}/privacy-policy`, changefreq: "monthly", priority: 0.5 },
  ];

  const categories = await getCategories();
  const products = await getProducts();

  const categoryPages = categories.map((cat) => ({
    loc: `${HOST}/catalog/${cat.slug}`,
    changefreq: "daily",
    priority: 0.9,
  }));

  const subcategoryPages = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      loc: `${HOST}/catalog/${cat.slug}/${sub.slug}`,
      changefreq: "daily",
      priority: 0.8,
    }))
  );

  const productPages = products.data.map((p) => ({
    loc: `${HOST}/product/${p.slug}`,
    changefreq: "daily",
    priority: 0.8,
  }));

  const allPages = [
    ...staticPages,
    ...categoryPages,
    ...subcategoryPages,
    ...productPages,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => generateUrlXml({ ...page, lastmod })).join("")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
