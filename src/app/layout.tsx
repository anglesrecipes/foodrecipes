import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Global/Header/Navbar";
import Main from "@/app/components/Global/Footer/Main";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import Head from 'next/head';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

export const metadata: Metadata = {
  title: {
    default: "Get the Best Chicken, Cookies, Bread, Cake Recipes",
    template: "%s | FoudRecipes",
  },
  description: "Explore a collection of delicious recipes with step-by-step instructions for every occasion, from quick meals to gourmet dishes, ensuring a perfect cooking experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <GoogleTagManager gtmId="GTM-PM6TF3JQ" />
      <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2356442701807253"
            crossOrigin="anonymous"
          ></script>

          {/* Google AdSense Meta Tag (Optional) */}
          <meta name="google-adsense-account" content="ca-pub-2356442701807253" />
        </Head>
      <body className={`${inter.className} antialiased bg-slate-50`}>
        <Navbar />
        {children}
        <Main />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=GTM-PM6TF3JQ"
        />
        <Script
          id="gtag-init" // Added id attribute here
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
          }}
        />
      </body>
    </html>
  );
}
