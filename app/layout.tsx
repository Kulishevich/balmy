import "@/styles/globals.css";
import type { Metadata } from "next";
import { Quicksand, Golos_Text } from "next/font/google";
import InitialWrapper from "@/components/initial-wrapper";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import Script from "next/script";
import AnimationThemeLayout from "@/components/animation-theme/animation-theme";
import { getSettings } from "@/api/settings";
import { getActiveTheme } from "@/api/themes";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoTags("home");
  const settings = await getSettings();

  return {
    title: seo.title || "Balmy",
    description: seo.description || "Balmy",
    keywords: seo.keywords,
    alternates: {
      canonical: config.homeUrl,
    },
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      url: config?.homeUrl,
    },
    icons: {
      icon: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${settings?.favicon}`,
    },
    verification: {
      yandex: "3144b55aa33ab7e1",
      google: "D4fuQbmjBjy7Mr3MuI1g8YNSc0c9bit7DPrU40z0uPU",
    },
  };
}

const golosText = Golos_Text({
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-golos",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activeTheme = await getActiveTheme();
  console.log(activeTheme);
  return (
    <html lang="ru">
      <head>
        {/* Yandex Metrika */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(96679665, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/96679665"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RQCSZQF6LK"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RQCSZQF6LK');
            `,
          }}
        />
        <meta
          name="google-site-verification"
          content="MYzskVibuO1uN0vli5GFxZ1XRWd2cbp0xA7U5MIrn_c"
        />
      </head>
      <body
        className={`${quicksand.variable} ${golosText.variable} flex flex-col h-full bg-dark-grey`}
      >
        <InitialWrapper>
          <AnimationThemeLayout activeTheme={activeTheme}>
            {children}
          </AnimationThemeLayout>
        </InitialWrapper>
      </body>
    </html>
  );
}
