/**
 * Shared Navigation & Header Controller
 * Manages responsive mobile menu drawer, active page highlighting, and live bookmark counter.
 */

import { storage } from "./storage.js";
import { initTheme } from "./theme.js";

export function initNavigation() {
  initTheme();

  // Mobile menu drawer
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuBtn.contains(e.target) && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active link detection
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

  // Update live bookmark counters
  updateBookmarkBadges();
  window.addEventListener("guidance_state_updated", updateBookmarkBadges);
}

export function updateBookmarkBadges() {
  const bookmarks = storage.getBookmarks();
  const badges = document.querySelectorAll(".bookmark-count-badge");
  badges.forEach(badge => {
    badge.textContent = bookmarks.length > 0 ? `(${bookmarks.length})` : "";
  });
}
