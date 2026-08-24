import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { HeaderActions } from "@/components/HeaderActions";
import { MotionReveal } from "@/components/MotionReveal";
import { chapters } from "@/lib/content";

const stages = [
  { number: "01", title: "认知", detail: "理解ACDL与研发全生命周期", range: "01—04", target: "01" },
  { number: "02", title: "设计", detail: "定义需求、架构与任务边界", range: "05—07", target: "05" },
  { number: "03", title: "实施", detail: "并行开发与协同交付", range: "08—09", target: "08" },
  { number: "04", title: "验证", detail: "验证质量并形成正式版本", range: "10—15", target: "10" },
];

export default function Home() {
  return (
    <main className="home-page">
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">ACDL</span>
            <span>Agent协同研发体系</span>
          </Link>
          <HeaderActions directoryHref="#chapters" />
        </div>
      </header>

      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow hero-enter enter-1">Agent Collaborative Development Lifecycle</p>
          <h1 className="hero-enter enter-2">Agent协同研发体系</h1>
          <p className="hero-copy hero-enter enter-3">让需求、设计、并行开发、验证和版本形成保持一致。</p>
        </div>
      </section>

      <section className="lifecycle-section" aria-labelledby="lifecycle-title">
        <h2 className="sr-only" id="lifecycle-title">研发全生命周期</h2>
        <div className="lifecycle-track">
          {stages.map((stage, index) => (
            <a className="lifecycle-stage" href={`#chapter-${stage.target}`} key={stage.number} style={{ animationDelay: `${420 + index * 110}ms` }} aria-label={`定位到目录中的第${stage.target}章，${stage.title}阶段`}>
              <div className="stage-heading"><span>{stage.number}</span><strong>{stage.title}</strong></div>
              <p>{stage.detail}</p>
              <small>{stage.range}章</small>
            </a>
          ))}
        </div>
      </section>

      <section className="chapters-section" id="chapters">
        <h2 className="sr-only">从认识体系，到形成正式版本</h2>
        <div className="chapter-list">
          {chapters.map((chapter) => (
            <MotionReveal key={chapter.id} delay={(Number(chapter.id) % 4) * 45}>
              <Link className="chapter-row" href={`/chapters/${chapter.id}`} id={`chapter-${chapter.id}`}>
                <span className="chapter-number">{chapter.id}</span>
                <div><span>{chapter.label}</span><h3>{chapter.title}</h3></div>
                <p>{chapter.summary}</p>
                <ArrowRight className="chapter-arrow" size={20} weight="bold" aria-hidden="true" />
              </Link>
            </MotionReveal>
          ))}
        </div>
      </section>

      <footer className="site-footer"><span>ACDL V1.0.0</span><a href="https://www.bluexiii.com/">BlueXIII</a></footer>
    </main>
  );
}
