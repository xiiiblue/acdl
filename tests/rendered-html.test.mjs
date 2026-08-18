import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the public ACDL landing page", async () => {
  const response = await render();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /<h1>Agent协同研发体系<\/h1>/);
  assert.match(html, /# Agent协同研发体系/);
  assert.match(html, /从认识体系，到形成正式版本/);
  assert.match(html, /10万行之后/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.match(html, /<a(?=[^>]*class="chapter-card")(?=[^>]*href="\/chapters\/01")[^>]*>/);
  assert.match(html, /property="og:image" content="https:\/\/hive-acdl\.evanstessa22\.chatgpt\.site\/og\.png"/);
});

test("renders a complete handbook chapter", async () => {
  const response = await render("/chapters/01");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /什么是ACDL/);
  assert.match(html, /Agent从AGENTS\.md开始阅读规则/);
  assert.match(html, /# Agent协同研发体系/);
  assert.match(html, /class="version-badge">V1\.0\.0<\/span>/);
  assert.match(html, /property="og:title" content="认识ACDL｜ACDL"/);
  assert.match(html, /name="twitter:title" content="认识ACDL｜ACDL"/);
  assert.doesNotMatch(html, /property="og:image"/);
});

test("renders appendix metadata without the site-wide image", async () => {
  const response = await render("/chapters/15");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /property="og:title" content="设计要求与验证追踪｜ACDL"/);
  assert.match(html, /name="twitter:description" content="让稳定要求与验证证据保持一致"/);
  assert.doesNotMatch(html, /property="og:image"/);
});
