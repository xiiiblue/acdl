import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SiteSearch } from "@/components/SiteSearch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { chapters, findChapter } from "@/lib/content";
import { getSearchIndex, readChapter } from "@/lib/server-content";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() { return chapters.map(({ id }) => ({ id })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const chapter = findChapter((await params).id);
  return chapter ? {
    title: chapter.title,
    description: chapter.summary,
    openGraph: { title: `${chapter.title}｜ACDL`, description: chapter.summary, images: [] },
    twitter: { title: `${chapter.title}｜ACDL`, description: chapter.summary, images: [] },
  } : {};
}

function headingId(children: unknown) {
  return String(children).replace(/<[^>]+>/g, "").replace(/[\s：，。、《》()（）/]+/g, "-").replace(/^-|-$/g, "");
}

export default async function ChapterPage({ params }: PageProps) {
  const chapter = findChapter((await params).id);
  if (!chapter) notFound();
  const markdown = readChapter(chapter.file);
  const current = chapters.findIndex((item) => item.id === chapter.id);
  const previous = chapters[current - 1];
  const next = chapters[current + 1];
  const toc = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => ({ title: match[1].replace(/[`*_]/g, ""), id: headingId(match[1]) }));

  return (
    <div className="reader-shell">
      <ReadingProgress />
      <header className="reader-header">
        <Link className="brand" href="/"><span className="brand-mark">ACDL</span><span>Agent协同研发体系</span></Link>
        <div className="reader-actions"><a href="https://www.bluexiii.com/">博客</a><span className="version-badge">V1.0.0</span><ThemeToggle /></div>
      </header>
      <aside className="reader-sidebar">
        <SiteSearch entries={getSearchIndex()} />
        <nav aria-label="章节导航">
          {chapters.map((item) => <Link className={item.id === chapter.id ? "active" : ""} href={`/chapters/${item.id}`} key={item.id}><span>{item.label}</span>{item.title}</Link>)}
        </nav>
      </aside>
      <main className="reader-main">
        <div className="chapter-kicker">{chapter.label} · {chapter.summary}</div>
        <h1 className="chapter-title">{chapter.title}</h1>
        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            h1: () => null,
            h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
            h3: ({ children }) => <h3 id={headingId(children)}>{children}</h3>,
            a: ({ href, children }) => href?.startsWith("/chapters/") ? <Link href={href}>{children}</Link> : <span>{children}</span>,
          }}>{markdown}</ReactMarkdown>
        </article>
        <nav className="page-nav" aria-label="前后章节">
          {previous ? <Link href={`/chapters/${previous.id}`}><span>上一篇</span><strong>{previous.title}</strong></Link> : <span />}
          {next ? <Link href={`/chapters/${next.id}`} className="next"><span>下一篇</span><strong>{next.title}</strong></Link> : <Link href="/" className="next"><span>阅读完成</span><strong>返回首页</strong></Link>}
        </nav>
      </main>
      <aside className="reader-toc">
        <p>本章目录</p>
        <nav>{toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}</nav>
      </aside>
    </div>
  );
}
