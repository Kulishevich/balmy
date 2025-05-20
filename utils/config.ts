export const config = {
  homeUrl: process.env.NEXT_PUBLIC_HOME_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  seoUrl: process.env.NEXT_PUBLIC_SEO_URL || "http://localhost:3000/seo",
  instagramToken: process.env.INSTAGRAM_TOKEN || "",
  instagramId: process.env.INSTAGRAM_ID || "",
  tgBotToken: process.env.NEXT_PUBLIC_TG_BOT_TOKEN || "",
  tgBotChatId: process.env.NEXT_PUBLIC_TG_BOT_CHAT_ID || "",
};
