import { chapters } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="topbar" aria-label="主导航">
          <a className="brand" href="/">
            <span className="brand-mark">ACDL</span>
            <span>蜂巢研发体系</span>
          </a>
          <a className="nav-link" href="/chapters/01">开始阅读</a>
        </nav>
        <div className="hero-inner">
          <p className="eyebrow">Agent Collaborative Development Lifecycle</p>
          <h1>蜂巢Agent协同研发体系</h1>
          <p className="hero-copy">一套为大型Agent研发项目形成的工程方法，让需求、设计、并行开发、验证和版本形成保持一致。</p>
          <div className="hero-actions">
            <a className="button primary" href="/chapters/01">从第一章开始</a>
            <a className="button secondary" href="#chapters">浏览全部章节</a>
          </div>
          <div className="scale-note">
            <strong>10万行之后，速度不再是唯一难题。</strong>
            <span>上下文分散、目标漂移、并行冲突和版本失真会一起出现。</span>
          </div>
        </div>
      </section>

      <section className="intro-grid" aria-label="ACDL核心特点">
        <article><span>01</span><h2>文档是代码的源码</h2><p>需求和设计先定义系统，再由代码、测试与运行证据证明实现结果。</p></article>
        <article><span>02</span><h2>人和Agent共同设计</h2><p>方向与取舍由人负责，调查、推演、实施和复核由双方协同完成。</p></article>
        <article><span>03</span><h2>按任务安全并行</h2><p>每项任务在独立worktree中推进，并带着自己的目标、边界和验证结果返回主线。</p></article>
      </section>

      <section className="chapters-section" id="chapters">
        <div className="section-heading">
          <p className="eyebrow">READING GUIDE</p>
          <h2>从认识体系，到形成正式版本</h2>
          <p>前12章构成主线，3份附录用于实际工作时查阅。</p>
        </div>
        <div className="chapter-grid">
          {chapters.map((chapter) => (
            <a className="chapter-card" href={`/chapters/${chapter.id}`} key={chapter.id}>
              <span>{chapter.label}</span><h3>{chapter.title}</h3><p>{chapter.summary}</p><b aria-hidden="true">→</b>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
