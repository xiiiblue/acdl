import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { chapters } from "./content";

const contentDirectory = join(process.cwd(), "content");

export function readChapter(file: string) {
  if (!chapters.some((chapter) => chapter.file === file)) throw new Error(`Unknown chapter: ${file}`);
  const source = readFileSync(join(contentDirectory, file), "utf8");
  return normalizeMarkdown(source);
}

export function normalizeMarkdown(source: string) {
  let markdown = source.replace(/^> (文档状态|上一篇|下一篇)：.*\n(?:>\s*\n)?/gm, "");
  markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+\.md)\)/g, (match, label, target) => {
    const file = decodeURIComponent(target.split("/").pop() ?? "");
    const chapter = chapters.find((item) => item.file === file);
    return chapter ? `[${label}](/chapters/${chapter.id})` : `**${label}**`;
  });
  return markdown;
}

export function getSearchIndex() {
  return chapters.map((chapter) => {
    const markdown = readChapter(chapter.file);
    const headings = [...markdown.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => match[1].replace(/[`*_]/g, ""));
    return { id: chapter.id, label: chapter.label, title: chapter.title, summary: chapter.summary, headings };
  });
}
