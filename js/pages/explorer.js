/**
 * Career Explorer Page Controller
 */

import { initNavigation } from "../modules/navigation.js";
import { CAREERS_DATA } from "../data/careers.js";
import { storage } from "../modules/storage.js";

let activeDomain = "All";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initFiltersFromURL();
  bindFilterEvents();
  renderCareers();
});

function initFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const domainParam = params.get("domain");
  if (domainParam) {
    activeDomain = domainParam;
    updateDomainButtons();
  }
}

function bindFilterEvents() {
  // Search input
  const searchInput = document.getElementById("career-search-input");
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderCareers();
  });

  // Domain filter pills
  const domainBtns = document.querySelectorAll(".domain-filter-btn");
  domainBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      activeDomain = btn.getAttribute("data-domain");
      updateDomainButtons();
      renderCareers();
    });
  });

  // Reset filters
  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      activeDomain = "All";
      searchQuery = "";
      searchInput.value = "";
      updateDomainButtons();
      renderCareers();
    });
  }
}

function updateDomainButtons() {
  const domainBtns = document.querySelectorAll(".domain-filter-btn");
  domainBtns.forEach(btn => {
    const domain = btn.getAttribute("data-domain");
    if (domain === activeDomain || (activeDomain !== "All" && domain.toLowerCase().includes(activeDomain.toLowerCase()))) {
      btn.className = "btn btn-primary btn-sm domain-filter-btn";
    } else {
      btn.className = "btn btn-outline btn-sm domain-filter-btn";
    }
  });
}

function renderCareers() {
  const grid = document.getElementById("careers-grid");
  const noResults = document.getElementById("no-results");
  const countText = document.getElementById("results-count-text");

  const filtered = CAREERS_DATA.filter(career => {
    // Domain filter
    const matchesDomain = activeDomain === "All" ||
      career.domain.toLowerCase().includes(activeDomain.toLowerCase());

    // Search query filter
    const matchesSearch = !searchQuery ||
      career.title.toLowerCase().includes(searchQuery) ||
      career.description.toLowerCase().includes(searchQuery) ||
      career.skills.some(s => s.toLowerCase().includes(searchQuery)) ||
      career.domain.toLowerCase().includes(searchQuery);

    return matchesDomain && matchesSearch;
  });

  countText.textContent = `Showing ${filtered.length} of ${CAREERS_DATA.length} pathways`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  grid.innerHTML = filtered.map(career => {
    const isBookmarked = storage.isBookmarked(career.id);
    return `
      <article class="card">
        <div class="card-header">
          <div>
            <span class="badge ${career.badgeClass}">${career.domain}</span>
            <h3 class="card-title" style="margin-top: var(--space-2);">${career.title}</h3>
          </div>
          <button class="bookmark-btn btn btn-outline btn-sm" data-id="${career.id}" aria-label="Bookmark ${career.title}">
            ${isBookmarked ? "★ Saved" : "☆ Save"}
          </button>
        </div>

        <p class="card-body">${career.description}</p>

        <div style="margin-bottom: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--font-size-xs);">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted); font-weight: var(--font-weight-bold); text-transform: uppercase;">Growth Rate:</span>
            <span style="font-weight: var(--font-weight-semibold); color: var(--success);">${career.growthRate}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted); font-weight: var(--font-weight-bold); text-transform: uppercase;">Required Edu:</span>
            <span style="color: var(--text-primary); text-align: right; max-width: 60%;">${career.educationLevel}</span>
          </div>
        </div>

        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: var(--font-size-xs); font-weight: var(--font-weight-bold); color: var(--text-muted); margin-bottom: var(--space-2); text-transform: uppercase;">Core Competencies</div>
          <div style="display: flex; gap: var(--space-1); flex-wrap: wrap;">
            ${career.skills.map(s => `<span class="badge badge-neutral" style="font-size: 11px;">${s}</span>`).join("")}
          </div>
        </div>

        <div class="card-footer">
          <span style="font-weight: var(--font-weight-bold); color: var(--text-primary); font-size: var(--font-size-sm);">${career.salaryRange}</span>
          <a href="roadmap.html?careerId=${encodeURIComponent(career.id)}" class="btn btn-primary btn-sm">
            Roadmap &rarr;
          </a>
        </div>
      </article>
    `;
  }).join("");

  // Attach bookmark toggle listeners
  grid.querySelectorAll(".bookmark-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const isSaved = storage.toggleBookmark(id);
      btn.textContent = isSaved ? "★ Saved" : "☆ Save";
    });
  });
}
