"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react";
import { chapters } from "@/lib/content";

export function ChapterNavigation({ currentId }: { currentId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`chapter-navigation${open ? " is-open" : ""}`}>
      <p className="sidebar-label">手册目录<span>15篇</span></p>
      <button className="chapter-menu-toggle" type="button" aria-expanded={open} aria-controls="reader-chapters" onClick={() => setOpen(!open)}>
        <span>章节目录 <small>{chapters.find(chapter => chapter.id === currentId)?.label}</small></span>
        <CaretDown size={16} aria-hidden="true" />
      </button>
      <nav id="reader-chapters" aria-label="章节导航">
        {chapters.map(item => (
          <Link className={item.id === currentId ? "active" : ""} aria-current={item.id === currentId ? "page" : undefined} href={`/chapters/${item.id}`} key={item.id} onClick={() => setOpen(false)}>
            <span>{item.label}</span>{item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
