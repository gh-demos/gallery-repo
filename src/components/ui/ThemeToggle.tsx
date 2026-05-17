"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let storedTheme: string | null = null;
    try {
      storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {}

    const hasStoredTheme = storedTheme === "dark" || storedTheme === "light";
    const mediaQuery = typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
    const initialTheme: Theme = hasStoredTheme
      ? storedTheme === "dark"
        ? "dark"
        : "light"
      : mediaQuery?.matches
        ? "dark"
        : "light";

    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);

    if (hasStoredTheme || !mediaQuery) {
      return;
    }

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const nextTheme: Theme = event.matches ? "dark" : "light";
      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    if (typeof mediaQuery.addEventListener !== "function") {
      return;
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const handleToggle = () => {
    setTheme((currentTheme) => {
      const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {}
      return nextTheme;
    });
  };

  const toggleIcon = !mounted
    ? null
    : theme === "dark"
      ? <Sun className="h-5 w-5" />
      : <Moon className="h-5 w-5" />;

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="btn-secondary p-2"
      aria-pressed={theme === "dark"}
      aria-label={mounted ? `Theme toggle, currently ${theme} mode` : "Toggle theme"}
    >
      {toggleIcon}
    </button>
  );
}
