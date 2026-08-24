import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function HeaderActions({ directoryHref }: { directoryHref: string }) {
  return (
    <nav className="header-actions" aria-label="主导航">
      <Link className="directory-link" href={directoryHref}>目录</Link>
      <span className="version-badge">V1.1.0</span>
      <ThemeToggle />
    </nav>
  );
}
