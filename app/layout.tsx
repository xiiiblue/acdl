import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "蜂巢Agent协同研发体系", template: "%s｜蜂巢ACDL" },
  description: "蜂巢项目形成的Agent Collaborative Development Lifecycle公开教程。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "蜂巢Agent协同研发体系",
    description: "从需求、设计、并行开发到验证和正式版本，系统理解ACDL。",
    images: ["/acdl-social-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
