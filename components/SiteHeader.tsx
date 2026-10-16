import Link from "next/link";
import { HeaderActions } from "@/components/HeaderActions";

export function SiteHeader({ reader = false }: { reader?: boolean }) {
  return (
    <header className={reader ? "reader-header" : "site-header"}>
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label="ACDL·Agent协同研发体系首页">
          <span className="brand-mark">ACDL</span>
          <span>Agent协同研发体系</span>
        </Link>
        <HeaderActions directoryHref={reader ? "/#chapters" : "#chapters"} />
      </div>
    </header>
  );
}
