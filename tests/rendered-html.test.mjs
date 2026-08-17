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
  assert.match(html, /蜂巢Agent协同研发体系/);
  assert.match(html, /10万行之后/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.match(html, /<a(?=[^>]*class="chapter-card")(?=[^>]*href="\/chapters\/01")[^>]*>/);
});

test("renders a complete handbook chapter", async () => {
  const response = await render("/chapters/01");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /什么是ACDL/);
  assert.match(html, /Agent从AGENTS\.md开始阅读规则/);
});
