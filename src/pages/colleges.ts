import { initNavigation } from "../modules/navigation.js";
import { COLLEGES_DATA } from "../data/colleges.js";
import { formatTuition, getActiveCurrency } from "../modules/currency.js";

let activeCountry = "All";
let activeDiscipline = "All";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initURLParams();
  bindFilterEvents();
  renderColleges();

  window.addEventListener("currency_changed", () => {
    renderColleges();
  });
});

function initURLParams(): void {
  const params = new URLSearchParams(window.location.search);
  const disciplineParam = params.get("discipline") || params.get("domain");
  if (disciplineParam) {
    activeDiscipline = disciplineParam;
    const select = document.getElementById("discipline-select") as HTMLSelectElement | null;
    if (select) select.value = disciplineParam;
  }

  const countryParam = params.get("country");
  if (countryParam) {
    activeCountry = countryParam;
    updateCountryButtons();
  }
}

function bindFilterEvents(): void {
  const searchInput = document.getElementById("college-search-input") as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
      searchQuery = target.value.trim().toLowerCase();
      renderColleges();
    });
  }

  const disciplineSelect = document.getElementById("discipline-select") as HTMLSelectElement | null;
  if (disciplineSelect) {
    disciplineSelect.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLSelectElement;
      activeDiscipline = target.value;
      renderColleges();
    });
  }

  const countryBtns = document.querySelectorAll(".country-filter-btn");
  countryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      activeCountry = btn.getAttribute("data-country") || "All";
      updateCountryButtons();
      renderColleges();
    });
  });

  const resetBtn = document.getElementById("reset-colleges-filter-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      activeCountry = "All";
      activeDiscipline = "All";
      searchQuery = "";
      if (searchInput) searchInput.value = "";
      if (disciplineSelect) disciplineSelect.value = "All";
      updateCountryButtons();
      renderColleges();
    });
  }
}

function updateCountryButtons(): void {
  const countryBtns = document.querySelectorAll(".country-filter-btn");
  countryBtns.forEach(btn => {
    const country = btn.getAttribute("data-country") || "";
    if (country === activeCountry) {
      btn.className = "btn btn-primary btn-sm country-filter-btn";
    } else {
      btn.className = "btn btn-outline btn-sm country-filter-btn";
    }
  });
}

function renderColleges(): void {
  const grid = document.getElementById("colleges-grid");
  const noResults = document.getElementById("no-colleges");
  const countText = document.getElementById("colleges-count-text");
  const currentCurrency = getActiveCurrency();

  const currencyBadge = document.getElementById("currency-indicator-badge");
  if (currencyBadge) {
    currencyBadge.textContent = `Tuition: Localized in ${currentCurrency}`;
  }

  const filtered = COLLEGES_DATA.filter(college => {
    const matchesCountry = activeCountry === "All" || college.country.toLowerCase() === activeCountry.toLowerCase();

    const matchesDiscipline = activeDiscipline === "All" ||
      college.matchedCareerDomains.some(d => d.toLowerCase().includes(activeDiscipline.toLowerCase()));

    const matchesSearch = !searchQuery ||
      college.name.toLowerCase().includes(searchQuery) ||
      college.city.toLowerCase().includes(searchQuery) ||
      college.country.toLowerCase().includes(searchQuery) ||
      college.flagshipPrograms.some(p => p.toLowerCase().includes(searchQuery)) ||
      college.entranceExams.some(e => e.toLowerCase().includes(searchQuery));

    return matchesCountry && matchesDiscipline && matchesSearch;
  });

  if (countText) {
    countText.textContent = `Showing ${filtered.length} of ${COLLEGES_DATA.length} premier global universities`;
  }

  if (!grid || !noResults) return;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  grid.innerHTML = filtered.map(college => {
    const localizedTuition = formatTuition(college.annualTuitionUSD, currentCurrency);

    return `
      <article class="card">
        <div class="card-header" style="align-items: flex-start;">
          <div>
            <div style="display: flex; gap: var(--space-2); align-items: center; margin-bottom: var(--space-2); flex-wrap: wrap;">
              <span class="badge badge-neutral" style="font-weight: 800; font-size: 10px; letter-spacing: 0.05em;">${college.flag}</span>
              <span class="badge ${college.badgeClass}" style="font-size: 10px;">${college.globalRank}</span>
              <span class="badge badge-neutral" style="font-size: 10px;">Acceptance: ${college.acceptanceRate}</span>
            </div>
            <h3 class="card-title" style="font-size: 1.2rem; line-height: 1.3;">${college.name}</h3>
            <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 500; display: inline-flex; align-items: center; gap: 4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${college.city}, ${college.country}
            </span>
          </div>
        </div>

        <p class="card-body" style="font-size: var(--font-size-xs); margin-bottom: var(--space-3); color: var(--text-secondary);">
          ${college.notableFocus}
        </p>

        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: var(--space-2);">
            Flagship Courses & Degrees
          </div>
          <ul style="padding-left: var(--space-4); margin: 0; font-size: var(--font-size-xs); color: var(--text-primary); display: flex; flex-direction: column; gap: 4px;">
            ${college.flagshipPrograms.map(prog => `<li>${prog}</li>`).join("")}
          </ul>
        </div>

        <div style="margin-bottom: var(--space-4); background-color: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-md);">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">
            Entrance Exams & Admissions
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            ${college.entranceExams.map(ex => `<span class="badge badge-neutral" style="font-size: 10px; background-color: var(--bg-card);">${ex}</span>`).join("")}
          </div>
        </div>

        <div class="card-footer" style="padding-top: var(--space-3);">
          <div>
            <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Estimated Annual Tuition</div>
            <div style="font-size: var(--font-size-sm); font-weight: 800; color: var(--primary);">${localizedTuition}</div>
          </div>
          <a href="explorer.html?domain=${encodeURIComponent(college.matchedCareerDomains[0])}" class="btn btn-outline btn-sm">
            View Careers &rarr;
          </a>
        </div>
      </article>
    `;
  }).join("");
}
