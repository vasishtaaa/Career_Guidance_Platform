/**
 * Roadmap Page Controller
 * Features interactive milestone progress checklists, localized compensation bands,
 * and matched global college degree courses.
 */

import { initNavigation } from "../modules/navigation.js";
import { CAREERS_DATA } from "../data/careers.js";
import { COLLEGES_DATA } from "../data/colleges.js";
import { storage } from "../modules/storage.js";
import { formatSalaryRange, formatTuition, getActiveCurrency } from "../modules/currency.js";

let currentCareer = null;

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initCareerSelector();
  loadCareerFromURL();

  window.addEventListener("currency_changed", () => {
    if (currentCareer) {
      loadCareer(currentCareer.id);
    }
  });
});

function initCareerSelector() {
  const select = document.getElementById("career-select");
  if (!select) return;

  select.innerHTML = CAREERS_DATA.map(c => `
    <option value="${c.id}">${c.title} (${c.domain})</option>
  `).join("");

  select.addEventListener("change", (e) => {
    const selectedId = e.target.value;
    const url = new URL(window.location);
    url.searchParams.set("careerId", selectedId);
    window.history.pushState({}, "", url);

    loadCareer(selectedId);
  });
}

function loadCareerFromURL() {
  const params = new URLSearchParams(window.location.search);
  const careerId = params.get("careerId");

  const career = CAREERS_DATA.find(c => c.id === careerId) || CAREERS_DATA[0];
  loadCareer(career.id);
}

function loadCareer(careerId) {
  currentCareer = CAREERS_DATA.find(c => c.id === careerId) || CAREERS_DATA[0];
  const activeCurrency = getActiveCurrency();

  const select = document.getElementById("career-select");
  if (select) select.value = currentCareer.id;

  // Header & Meta
  document.getElementById("roadmap-title").textContent = currentCareer.title;
  const metaContainer = document.getElementById("roadmap-meta");
  const localizedSalary = formatSalaryRange(currentCareer.minSalaryUSD, currentCareer.maxSalaryUSD, activeCurrency);

  metaContainer.innerHTML = `
    <div><strong style="color: var(--text-muted); font-size: 11px; text-transform: uppercase;">Domain:</strong> <span>${currentCareer.domain}</span></div>
    <div><strong style="color: var(--text-muted); font-size: 11px; text-transform: uppercase;">Compensation Band (${activeCurrency}):</strong> <span style="font-weight: 700; color: var(--primary);">${localizedSalary}</span></div>
    <div><strong style="color: var(--text-muted); font-size: 11px; text-transform: uppercase;">Growth Rate:</strong> <span style="color: var(--success); font-weight: 600;">${currentCareer.growthRate}</span></div>
    <div><strong style="color: var(--text-muted); font-size: 11px; text-transform: uppercase;">Education:</strong> <span>${currentCareer.educationLevel}</span></div>
  `;

  // Prerequisites
  const prereqList = document.getElementById("prerequisites-list");
  prereqList.innerHTML = currentCareer.prerequisites.map(p => `
    <li>${p}</li>
  `).join("");

  // Milestones Timeline
  renderMilestones();

  // Matched Universities & Courses
  renderMatchedColleges(activeCurrency);

  // Curated Resources
  const resourcesGrid = document.getElementById("resources-grid");
  resourcesGrid.innerHTML = currentCareer.curatedResources.map(res => `
    <div style="padding: var(--space-4); background-color: var(--bg-tertiary); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
      <span class="badge badge-tech" style="margin-bottom: var(--space-2); font-size: 10px;">${res.type}</span>
      <h4 style="font-size: var(--font-size-sm); margin: 0; color: var(--text-primary);">${res.name}</h4>
    </div>
  `).join("");

  // Link to Colleges page with discipline filter
  const allCollegesLink = document.getElementById("view-all-colleges-link");
  if (allCollegesLink) {
    allCollegesLink.href = `colleges.html?discipline=${encodeURIComponent(currentCareer.domain)}`;
  }
}

function renderMilestones() {
  const container = document.getElementById("timeline-container");
  const completedList = storage.getCompletedMilestones(currentCareer.id);

  const total = currentCareer.milestones.length;
  const completedCount = completedList.length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  document.getElementById("progress-percentage-text").textContent = `${percentage}% Completed (${completedCount}/${total})`;
  document.getElementById("roadmap-progress-fill").style.width = `${percentage}%`;

  container.innerHTML = currentCareer.milestones.map((milestone, idx) => {
    const isDone = completedList.includes(milestone.id);
    return `
      <div class="timeline-item ${isDone ? "completed" : ""}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2); flex-wrap: wrap; gap: var(--space-2);">
            <div>
              <span class="badge badge-neutral" style="font-size: 10px; margin-bottom: var(--space-1);">Phase ${idx + 1}</span>
              <h4 style="margin: 0; font-size: var(--font-size-base);">${milestone.title}</h4>
            </div>
            <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-size-xs); font-weight: 600; cursor: pointer; user-select: none;">
              <input type="checkbox" class="milestone-checkbox" data-id="${milestone.id}" ${isDone ? "checked" : ""}>
              <span>${isDone ? "Completed" : "Mark as Done"}</span>
            </label>
          </div>
          <p style="margin: 0; font-size: var(--font-size-sm); color: var(--text-secondary);">${milestone.detail}</p>
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".milestone-checkbox").forEach(box => {
    box.addEventListener("change", () => {
      const milestoneId = box.getAttribute("data-id");
      storage.toggleMilestone(currentCareer.id, milestoneId);
      renderMilestones();
    });
  });
}

function renderMatchedColleges(activeCurrency) {
  const grid = document.getElementById("matched-colleges-grid");
  if (!grid) return;

  // Filter colleges matching this career domain
  const matched = COLLEGES_DATA.filter(col =>
    col.matchedCareerDomains.some(d => d.toLowerCase() === currentCareer.domain.toLowerCase())
  ).slice(0, 3); // top 3 representative institutions

  if (matched.length === 0) {
    grid.innerHTML = `<p style="font-size: var(--font-size-sm); color: var(--text-muted);">Explore our global university directory for degree options.</p>`;
    return;
  }

  grid.innerHTML = matched.map(college => {
    const localizedTuition = formatTuition(college.annualTuitionUSD, activeCurrency);
    return `
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px;">
            <span>${college.flag}</span>
            <span style="font-size: 10px; font-weight: 700; color: var(--text-muted);">${college.globalRank}</span>
          </div>
          <h4 style="font-size: var(--font-size-sm); margin: 0 0 4px 0; color: var(--text-primary);">${college.name}</h4>
          <span style="font-size: 11px; color: var(--text-muted); display: block; margin-bottom: var(--space-2);">📍 ${college.city}, ${college.country}</span>
          <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: var(--space-3);">
            <strong>Top Course:</strong> ${college.flagshipPrograms[0]}
          </div>
        </div>
        <div style="padding-top: var(--space-2); border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: var(--font-size-xs); font-weight: 800; color: var(--primary);">${localizedTuition}</span>
          <a href="colleges.html?discipline=${encodeURIComponent(currentCareer.domain)}" style="font-size: 11px; font-weight: 700; color: var(--primary);">Details &rarr;</a>
        </div>
      </div>
    `;
  }).join("");
}
