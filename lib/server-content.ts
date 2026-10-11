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

export function getMarkdownHeadings(markdown: string) {
  let fence: { marker: string; length: number } | undefined;
  return markdown.split("\n").flatMap((line) => {
    const delimiter = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (delimiter && delimiter[1][0] === fence.marker && delimiter[1].length >= fence.length && !delimiter[2].trim()) fence = undefined;
      return [];
    }
    if (delimiter) {
      fence = { marker: delimiter[1][0], length: delimiter[1].length };
      return [];
    }
    const heading = line.match(/^ {0,3}(#{2,3})\s+(.+)$/);
    return heading ? [{ level: heading[1].length, title: heading[2] }] : [];
  });
}

export function getSearchIndex() {
  return chapters.map((chapter) => {
    const markdown = readChapter(chapter.file);
    const headings = getMarkdownHeadings(markdown).map(({ title }) => title.replace(/[`*_]/g, ""));
    return { id: chapter.id, label: chapter.label, title: chapter.title, summary: chapter.summary, headings };
  });
}
