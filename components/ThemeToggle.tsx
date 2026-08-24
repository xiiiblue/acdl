"use client";

import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("acdl-theme", next);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="切换明暗主题" title="切换明暗主题">
      <Moon className="theme-icon-light" size={17} weight="bold" />
      <Sun className="theme-icon-dark" size={17} weight="bold" />
    </button>
  );
}
