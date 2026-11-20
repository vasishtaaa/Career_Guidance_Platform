import { storage } from "./storage.js";

export function initTheme(): void {
  const savedState = storage.getState();
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = savedState.theme || (systemPrefersDark ? "dark" : "light");

  applyTheme(currentTheme);

  const toggleBtns = document.querySelectorAll(".theme-toggle");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = activeTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);

      const state = storage.getState();
      state.theme = nextTheme;
      storage.saveState(state);
    });
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      const hasSavedTheme = Boolean(storage.getState().theme);
      if (!hasSavedTheme) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }
}

export function applyTheme(theme: "light" | "dark"): void {
  document.documentElement.setAttribute("data-theme", theme);
  const toggleBtns = document.querySelectorAll(".theme-toggle");
  toggleBtns.forEach(btn => {
    btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    btn.innerHTML = theme === "dark"
      ? `<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
      : `<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
  });
}
