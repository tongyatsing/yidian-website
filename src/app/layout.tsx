import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif-sc",
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "知微｜危废管理智能体 · 亿点环保 YIDIAN CST",
  description: "广州市亿点环保有限公司 — 知微面向危险废物资料审查、跨资料一致性比对与鉴别复核辅助场景的专业智能审查引擎。",
  metadataBase: new URL("https://yidiancst.ai"),
  openGraph: {
    title: "知微｜危废管理智能体 — 亿点环保 YIDIAN CST",
    description: "面向危险废物资料审查、跨资料一致性比对与鉴别复核辅助场景，辅助发现问题、归集依据、构建证据链。广州市亿点环保有限公司。",
    url: "https://yidiancst.ai",
    siteName: "亿点环保 YIDIAN CST",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "知微｜危废管理智能体 — 亿点环保 YIDIAN CST",
    description: "面向危险废物资料审查、跨资料一致性比对与鉴别复核辅助场景的专业智能审查引擎。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.variable} ${notoSerifSC.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "广州市亿点环保有限公司",
              alternateName: "YIDIAN CST",
              url: "https://yidiancst.ai",
              description: "环保专业服务与危险废物管理场景数字化能力建设 — 知微危废管理智能体",
              address: {
                "@type": "PostalAddress",
                streetAddress: "天河区天慧路10号A409室",
                addressLocality: "广州市",
                addressRegion: "广东省",
                addressCountry: "CN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+86-13660969154",
                email: "yidianhuanbao@yeah.com",
                contactType: "customer service",
                availableLanguage: "Chinese",
              },
              sameAs: [],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
