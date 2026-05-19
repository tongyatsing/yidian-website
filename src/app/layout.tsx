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
  title: "知微 ZHIWEI｜危废规范化管理与鉴别复核智能审查 · 广州市亿点环保",
  description: "知微是危险废物规范化管理与鉴别复核的智能审查助手——在台账、申报、联单与鉴别报告中主动发现合规偏差与证据缺口。广州市亿点环保有限公司。",
  metadataBase: new URL("https://yidiancst.ai"),
  openGraph: {
    title: "知微 ZHIWEI — 危废规范化管理与鉴别复核智能审查",
    description: "危险废物规范化管理合规自查与鉴别复核辅助。全程本地可控，辅助而不替代专家判定。广州市亿点环保有限公司。",
    url: "https://yidiancst.ai",
    siteName: "知微 ZHIWEI · 广州市亿点环保",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "知微 ZHIWEI — 危废规范化管理与鉴别复核智能审查",
    description: "危险废物规范化管理合规自查与鉴别复核辅助，全程本地可控。",
  },
  robots: { index: true, follow: true },
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
              alternateName: "知微 ZHIWEI",
              url: "https://yidiancst.ai",
              description: "危险废物规范化管理与鉴别复核智能审查辅助，及环保专业咨询服务 — 广州市亿点环保有限公司",
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
