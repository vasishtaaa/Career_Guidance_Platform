/**
 * Career Explorer Page Controller
 * Supports dynamic regional currency conversion and quick cross-linking to matched colleges.
 */

import { initNavigation } from "../modules/navigation.js";
import { CAREERS_DATA } from "../data/careers.js";
import { storage } from "../modules/storage.js";
import { formatSalaryRange, getActiveCurrency } from "../modules/currency.js";

let activeDomain = "All";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initFiltersFromURL();
  bindFilterEvents();
  renderCareers();

  window.addEventListener("currency_changed", () => {
    renderCareers();
  });
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
  const searchInput = document.getElementById("career-search-input");
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderCareers();
  });

  const domainBtns = document.querySelectorAll(".domain-filter-btn");
  domainBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      activeDomain = btn.getAttribute("data-domain");
      updateDomainButtons();
      renderCareers();
    });
  });

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
  const activeCurrency = getActiveCurrency();

  const salaryBadge = document.getElementById("salary-currency-badge");
  if (salaryBadge) {
    salaryBadge.textContent = `Salaries Localized in ${activeCurrency}`;
  }

  const filtered = CAREERS_DATA.filter(career => {
    const matchesDomain = activeDomain === "All" ||
      career.domain.toLowerCase().includes(activeDomain.toLowerCase());

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
    const localizedSalary = formatSalaryRange(career.minSalaryUSD, career.maxSalaryUSD, activeCurrency);

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
            <span style="color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Growth Rate:</span>
            <span style="font-weight: 600; color: var(--success);">${career.growthRate}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Required Edu:</span>
            <span style="color: var(--text-primary); text-align: right; max-width: 60%;">${career.educationLevel}</span>
          </div>
        </div>

        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-muted); margin-bottom: var(--space-2); text-transform: uppercase;">Core Competencies</div>
          <div style="display: flex; gap: var(--space-1); flex-wrap: wrap;">
            ${career.skills.map(s => `<span class="badge badge-neutral" style="font-size: 11px;">${s}</span>`).join("")}
          </div>
        </div>

        <div class="card-footer">
          <div>
            <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Compensation Band (${activeCurrency})</div>
            <div style="font-weight: 800; color: var(--primary); font-size: var(--font-size-sm);">${localizedSalary}</div>
          </div>
          <div style="display: flex; gap: var(--space-2);">
            <a href="colleges.html?discipline=${encodeURIComponent(career.domain)}" class="btn btn-outline btn-sm" title="Find universities offering courses for this career">Colleges</a>
            <a href="roadmap.html?careerId=${encodeURIComponent(career.id)}" class="btn btn-primary btn-sm">
              Roadmap &rarr;
            </a>
          </div>
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
