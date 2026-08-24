import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function HeaderActions({ directoryHref }: { directoryHref: string }) {
  return (
    <nav className="header-actions" aria-label="主导航">
      <Link className="directory-link" href={directoryHref}>目录</Link>
      <a className="blog-link" href="https://www.bluexiii.com/">博客</a>
      <span className="version-badge">V1.0.0</span>
      <ThemeToggle />
    </nav>
  );
}
