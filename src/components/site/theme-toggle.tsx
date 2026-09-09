import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function preferredTheme(): Theme {
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = preferredTheme();
    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);
    setReady(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={ready ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : "Change colour theme"}
      title={ready ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : "Change colour theme"}
      className="border border-border"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}