import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { chapters } from "./content";

const contentRoot = join(process.cwd(), "content");

export function readChapter(file: string) {
  return normalizeMarkdown(readFileSync(join(contentRoot, file), "utf8"));
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
