export async function GET() {
  const res = await fetch("https://admin.balmy.by/robots.txt");
  const text = await res.text();

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
