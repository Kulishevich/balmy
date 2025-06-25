export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/robots.txt`);
  const text = await res.text();

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
