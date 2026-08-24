import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

async function readRoute(path = "index.html") {
  return readFile(fileURLToPath(new URL(`../out/${path}`, import.meta.url)), "utf8");
}

test("renders the public ACDL landing page", async () => {
  const html = await readRoute();
  assert.match(html, /<h1[^>]*>Agent协同研发体系<\/h1>/);
  assert.match(html, /<span>Agent协同研发体系<\/span>/);
  assert.doesNotMatch(html, /# Agent协同研发体系/);
  assert.match(html, /从认识体系，到形成正式版本/);
  assert.match(html, /研发全生命周期/);
  assert.match(html, /<a(?=[^>]*class="directory-link")(?=[^>]*href="#chapters")[^>]*>目录<\/a>/);
  assert.match(html, /class="version-badge">V1\.0\.0<\/span>/);
  assert.doesNotMatch(html, /class="blog-link"/);
  for (const [stage, chapter] of [["认知", "01"], ["设计", "05"], ["实施", "08"], ["验证", "10"]]) {
    assert.match(html, new RegExp(`<a(?=[^>]*class="lifecycle-stage")(?=[^>]*href="#chapter-${chapter}")(?=[^>]*aria-label="定位到目录中的第${chapter}章，${stage}阶段)[^>]*>`));
    assert.match(html, new RegExp(`<a(?=[^>]*class="chapter-row")(?=[^>]*id="chapter-${chapter}")[^>]*>`));
  }
  assert.doesNotMatch(html, /codex-preview/);
  assert.match(html, /<a(?=[^>]*class="chapter-row")(?=[^>]*href="\/acdl\/chapters\/01\/")[^>]*>/);
  assert.match(html, /property="og:image" content="https:\/\/www\.bluexiii\.com\/acdl\/og\.png"/);
  assert.doesNotMatch(html, /hive-acdl\.evanstessa22\.chatgpt\.site/);
});

test("renders a complete handbook chapter", async () => {
  const html = await readRoute("chapters/01/index.html");
  assert.match(html, /ACDL是什么/);
  assert.match(html, /Agent进入仓库后从哪里开始/);
  assert.match(html, /<span>Agent协同研发体系<\/span>/);
  assert.doesNotMatch(html, /# Agent协同研发体系/);
  assert.match(html, /class="version-badge">V1\.0\.0<\/span>/);
  assert.match(html, /<a(?=[^>]*class="directory-link")(?=[^>]*href="\/acdl\/#chapters")[^>]*>目录<\/a>/);
  assert.doesNotMatch(html, /class="blog-link"/);
  assert.match(html, /property="og:title" content="认识ACDL｜ACDL"/);
  assert.match(html, /name="twitter:title" content="认识ACDL｜ACDL"/);
  assert.doesNotMatch(html, /property="og:image"/);
});

test("renders appendix metadata without the site-wide image", async () => {
  const html = await readRoute("chapters/15/index.html");
  assert.match(html, /property="og:title" content="设计要求与验证追踪｜ACDL"/);
  assert.match(html, /name="twitter:description" content="让稳定要求与验证证据保持一致"/);
  assert.doesNotMatch(html, /property="og:image"/);
});

test("exports every chapter and the GitHub Pages support files", async () => {
  const chapters = Array.from({ length: 15 }, (_, index) => String(index + 1).padStart(2, "0"));
  await Promise.all(chapters.map((id) => readRoute(`chapters/${id}/index.html`)));
  await Promise.all([readRoute("404.html"), readRoute(".nojekyll")]);
});
