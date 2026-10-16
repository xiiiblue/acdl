import { ArrowRight, Files, GitBranch, ListChecks, NotePencil } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { chapters } from "@/lib/content";

const stages = [
  { number: "01", title: "认知", detail: "理解ACDL与研发全生命周期", range: "01—04", target: "01" },
  { number: "02", title: "设计", detail: "定义需求、架构与任务边界", range: "05—07", target: "05" },
  { number: "03", title: "实施", detail: "并行开发与协同交付", range: "08—09", target: "08" },
  { number: "04", title: "验证", detail: "验证质量并形成正式版本", range: "10—15", target: "10" },
];
const records = [
  { icon: NotePencil, title: "为什么改变", detail: "需求与目标", label: "REQ" },
  { icon: Files, title: "系统怎样工作", detail: "设计与取舍", label: "DESIGN" },
  { icon: GitBranch, title: "实际做了什么", detail: "代码、测试与实施记录", label: "BUILD" },
  { icon: ListChecks, title: "最终交付什么", detail: "环境、证据与版本", label: "VERIFY" },
];
const groups = [
  { title: "认识体系", detail: "从项目起点到完整流程", start: "01", end: "04", number: "01" },
  { title: "明确设计", detail: "先说清目标，再拆解工作", start: "05", end: "07", number: "02" },
  { title: "协同实施", detail: "按任务分工，按证据交付", start: "08", end: "09", number: "03" },
  { title: "验证与版本", detail: "从实际使用回到交付结果", start: "10", end: "12", number: "04" },
  { title: "随时查阅", detail: "术语、状态与验证追踪", start: "13", end: "15", number: "附录" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="home-page" id="main-content">
        <section className="home-hero site-container">
          <div className="home-hero-copy">
            <p className="eyebrow"><span />源自蜂巢实践的公开研发手册</p>
            <h1>Agent协同研发体系</h1>
            <p className="hero-copy">从为什么改，到怎样交付。<br />让人和Agent的协作，成为可以延续的研发过程。</p>
            <p className="hero-english">Agent Collaborative Development Lifecycle</p>
            <div className="hero-facts" aria-label="手册内容概览">
              <span><strong>12</strong>章系统讲解</span>
              <span><strong>3</strong>篇实用附录</span>
              <span>需求 → 设计 → 实施 → 验证</span>
            </div>
          </div>
          <div className="record-map" role="img" aria-label="协作记录概念图：需求说明为什么改变，设计说明系统怎样工作，实施记录实际做了什么，环境与版本记录最终交付什么；按任务范围选择所需记录。">
            <div className="record-map-heading"><span>让上下文留在仓库里</span><span className="record-map-symbol" aria-hidden="true">↗</span></div>
            <div className="record-list">
              {records.map(({icon: Icon, title, detail, label}) => (
                <div className="record-item" key={label}>
                  <span className="record-icon"><Icon size={20} weight="regular" /></span>
                  <div><strong>{title}</strong><small>{detail}</small></div>
                  <span className="record-label">{label}</span>
                </div>
              ))}
            </div>
            <p className="record-map-note">概念示意 · 按任务范围选择所需记录</p>
          </div>
        </section>

        <section className="lifecycle-section" aria-labelledby="lifecycle-title">
          <div className="site-container">
            <div className="section-intro"><h2 id="lifecycle-title">研发全生命周期</h2><p>四个阶段，按当前任务找到阅读起点。</p></div>
            <div className="lifecycle-track">
              {stages.map(stage => (
                <a className="lifecycle-stage" href={`#chapter-${stage.target}`} key={stage.number} aria-label={`定位到目录中的第${stage.target}章，${stage.title}阶段`}>
                  <div className="stage-heading"><span>{stage.number}</span><strong>{stage.title}</strong></div>
                  <p>{stage.detail}</p>
                  <small>{stage.range}章</small>
                  <ArrowRight size={17} className="stage-arrow" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="chapters-section site-container" id="chapters">
          <div className="section-heading">
            <div><p className="eyebrow">完整手册</p><h2>从认识体系，到形成正式版本</h2></div>
            <p>第一次可以按顺序阅读。<br />实际工作时，按问题回到相应章节。</p>
          </div>
          <div className="chapter-groups">
            {groups.map(group => (
              <section className="chapter-group" key={group.start} aria-labelledby={`group-${group.start}`}>
                <div className="chapter-group-heading"><span>{group.number}</span><h3 id={`group-${group.start}`}>{group.title}</h3><p>{group.detail}</p></div>
                <div className="chapter-list">
                  {chapters.filter(chapter => chapter.id >= group.start && chapter.id <= group.end).map(chapter => (
                    <Link className="chapter-row" href={`/chapters/${chapter.id}`} id={`chapter-${chapter.id}`} key={chapter.id}>
                      <span className="chapter-number">{chapter.id}</span>
                      <div><span>{chapter.label}</span><h3>{chapter.title}</h3></div>
                      <p>{chapter.summary}</p>
                      <ArrowRight className="chapter-arrow" size={19} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="reading-note"><span>从一项具体工作开始</span><p>不必为每次修改走完全部流程。先判断工作范围，再选择足够的设计、实施和验证。</p><Link href="/chapters/12">查阅流程选择<ArrowRight size={16} aria-hidden="true" /></Link></div>
        </section>
      </main>
    </>
  );
}
