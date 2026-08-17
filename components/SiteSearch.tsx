"use client";

import { useMemo, useState } from "react";

type Entry = { id: string; label: string; title: string; summary: string; headings: string[] };

export function SiteSearch({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return [];
    return entries.filter((entry) => [entry.title, entry.summary, ...entry.headings].join(" ").toLocaleLowerCase().includes(needle)).slice(0, 8);
  }, [entries, query]);

  return (
    <div className="search-box">
      <label htmlFor="site-search">搜索手册</label>
      <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例如：worktree、ADR、版本" autoComplete="off" />
      {query && (
        <div className="search-results">
          {results.length ? results.map((entry) => (
            <a href={`/chapters/${entry.id}`} key={entry.id} onClick={() => setQuery("")}>
              <span>{entry.label}</span><strong>{entry.title}</strong><small>{entry.summary}</small>
            </a>
          )) : <p>没有找到相关章节</p>}
        </div>
      )}
    </div>
  );
}
