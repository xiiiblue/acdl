import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <div className="footer-intro">
          <Link href="/" className="footer-brand">ACDL<span>Agent协同研发体系</span></Link>
          <p>让协作有依据，让结果可延续。</p>
        </div>
        <nav className="footer-links" aria-label="页脚导航">
          <Link href="/#chapters">手册目录</Link>
          <Link href="/chapters/13">术语与对象</Link>
          <Link href="/chapters/14">状态与命令</Link>
          <a href="https://github.com/xiiiblue/hive-acdl" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </nav>
        <p className="footer-note">源自蜂巢研发实践<br />公开手册 · V1.2.0</p>
      </div>
      <div className="site-container footer-bottom">
        <span>Agent Collaborative Development Lifecycle</span>
        <div className="footer-meta">
          <span className="site-counter" aria-label="站点访问统计">
            <span id="busuanzi_container_site_uv">访客 <strong id="busuanzi_value_site_uv" /></span>
            <span id="busuanzi_container_site_pv">浏览 <strong id="busuanzi_value_site_pv" /></span>
          </span>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">鲁ICP备18050487号-1</a>
        </div>
      </div>
    </footer>
  );
}
