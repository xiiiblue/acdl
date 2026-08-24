import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bluexiii.com/acdl/"),
  title: { default: "Agent协同研发体系", template: "%s｜ACDL" },
  description: "蜂巢项目形成的Agent Collaborative Development Lifecycle公开教程。",
  icons: { icon: "/acdl/favicon.svg" },
  openGraph: {
    title: "Agent协同研发体系",
    description: "从需求、设计、并行开发到验证和正式版本，系统理解ACDL。",
    images: ["https://www.bluexiii.com/acdl/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent协同研发体系",
    description: "从需求、设计、并行开发到验证和正式版本，系统理解ACDL。",
    images: ["https://www.bluexiii.com/acdl/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('acdl-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){}})()` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
