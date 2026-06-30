import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import { getConfig } from "@/lib/config";
import type { Metadata } from "next";

/** 🎯 动态元数据：每次请求拉取最新配置 */
export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig()
  return {
    title: {
      default: config.siteTitle || '我的博客',
      template: `%s | ${config.siteTitle || '我的博客'}`,
    },
    description: config.siteDescription || '分享技术、开发与生活的个人博客',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var hue = localStorage.getItem('theme-hue');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                  if (hue) {
                    document.documentElement.style.setProperty('--md-hue', hue);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ClientEffects />
      </body>
    </html>
  );
}
