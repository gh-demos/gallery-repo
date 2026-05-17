"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : getSystemTheme();

    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="btn-secondary p-2"
      aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
    >
      {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
