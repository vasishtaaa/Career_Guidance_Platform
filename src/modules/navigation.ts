import { storage } from "./storage.js";
import { initTheme } from "./theme.js";
import { initCurrencySelector } from "./currency.js";

export function initNavigation(): void {
  initTheme();
  initCurrencySelector();

  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as Node;
      if (!navMenu.contains(target) && !menuBtn.contains(target) && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  updateBookmarkBadges();
  window.addEventListener("guidance_state_updated", updateBookmarkBadges);
}

export function updateBookmarkBadges(): void {
  const bookmarks = storage.getBookmarks();
  const badges = document.querySelectorAll(".bookmark-count-badge");
  badges.forEach(badge => {
    badge.textContent = bookmarks.length > 0 ? `(${bookmarks.length})` : "";
  });
}
