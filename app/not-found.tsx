import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader reader />
      <main className="not-found-page site-container" id="main-content">
        <p className="eyebrow">404 · 页面不存在</p>
        <h1>没有找到这篇内容</h1>
        <p>地址可能有误。可以返回手册目录，继续阅读ACDL。</p>
        <Link href="/#chapters">返回手册目录<ArrowRight size={18} aria-hidden="true" /></Link>
      </main>
    </>
  );
}
