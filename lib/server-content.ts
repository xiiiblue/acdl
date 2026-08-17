import "server-only";
import { chapters } from "./content";
import chapter01 from "../content/01-认识ACDL：为什么蜂巢需要新的研发体系.md?raw";
import chapter02 from "../content/02-冷启动：从想法到项目骨架.md?raw";
import chapter03 from "../content/03-文档工程：像维护代码一样建设文档.md?raw";
import chapter04 from "../content/04-流程总览：需求怎样走完整个ACDL.md?raw";
import chapter05 from "../content/05-需求管理：决定为什么要改变产品.md?raw";
import chapter06 from "../content/06-产品与架构设计：共同决定系统应该怎样工作.md?raw";
import chapter07 from "../content/07-ACL启动：把设计拆成可以独立验证的任务.md?raw";
import chapter08 from "../content/08-并行开发：让多个Agent在不同worktree工作.md?raw";
import chapter09 from "../content/09-实施与发布：完成代码、验证并更新环境.md?raw";
import chapter10 from "../content/10-DFL与ERL：通过真实使用和独立评审发现遗漏.md?raw";
import chapter11 from "../content/11-版本形成：结束Loop并冻结正式版本.md?raw";
import chapter12 from "../content/12-流程选择：不同工作从哪里开始，在哪里结束.md?raw";
import chapter13 from "../content/13-附录A：ACDL术语和对象关系.md?raw";
import chapter14 from "../content/14-附录B：登记表、状态和常用命令.md?raw";
import chapter15 from "../content/15-附录C：设计要求与验证追踪.md?raw";

const chapterSources = new Map([
  [chapters[0].file, chapter01], [chapters[1].file, chapter02], [chapters[2].file, chapter03],
  [chapters[3].file, chapter04], [chapters[4].file, chapter05], [chapters[5].file, chapter06],
  [chapters[6].file, chapter07], [chapters[7].file, chapter08], [chapters[8].file, chapter09],
  [chapters[9].file, chapter10], [chapters[10].file, chapter11], [chapters[11].file, chapter12],
  [chapters[12].file, chapter13], [chapters[13].file, chapter14], [chapters[14].file, chapter15],
]);

export function readChapter(file: string) {
  const source = chapterSources.get(file);
  if (!source) throw new Error(`Unknown chapter: ${file}`);
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
