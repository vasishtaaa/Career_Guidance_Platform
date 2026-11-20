/**
 * Roadmap Page Controller
 */

import { initNavigation } from "../modules/navigation.js";
import { CAREERS_DATA } from "../data/careers.js";
import { storage } from "../modules/storage.js";

let currentCareer = null;

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initCareerSelector();
  loadCareerFromURL();
});

function initCareerSelector() {
  const select = document.getElementById("career-select");
  if (!select) return;

  select.innerHTML = CAREERS_DATA.map(c => `
    <option value="${c.id}">${c.title} (${c.domain})</option>
  `).join("");

  select.addEventListener("change", (e) => {
    const selectedId = e.target.value;
    // Update URL query parameter without full reload
    const url = new URL(window.location);
    url.searchParams.set("careerId", selectedId);
    window.history.pushState({}, "", url);

    loadCareer(selectedId);
  });
}

function loadCareerFromURL() {
  const params = new URLSearchParams(window.location.search);
  const careerId = params.get("careerId");

  // Check if careerId is valid, otherwise default to first
  const career = CAREERS_DATA.find(c => c.id === careerId) || CAREERS_DATA[0];
  loadCareer(career.id);
}

function loadCareer(careerId) {
  currentCareer = CAREERS_DATA.find(c => c.id === careerId) || CAREERS_DATA[0];

  // Update select dropdown value
  const select = document.getElementById("career-select");
  if (select) select.value = currentCareer.id;

  // Header & Meta
  document.getElementById("roadmap-title").textContent = currentCareer.title;
  const metaContainer = document.getElementById("roadmap-meta");
  metaContainer.innerHTML = `
    <div><strong style="color: var(--text-muted); font-size: 11px; text-transform: uppercase;">Domain:</strong> <span>${currentCareer.domain}</span></div>
    <div><strong style="color: var(--text-muted); font-size: 11px; text-transform: uppercase;">Salary Band:</strong> <span>${currentCareer.salaryRange}</span></div>
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

  // Curated Resources
  const resourcesGrid = document.getElementById("resources-grid");
  resourcesGrid.innerHTML = currentCareer.curatedResources.map(res => `
    <div style="padding: var(--space-4); background-color: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <span class="badge badge-tech" style="margin-bottom: var(--space-2); font-size: 10px;">${res.type}</span>
      <h4 style="font-size: var(--font-size-sm); margin: 0; color: var(--text-primary);">${res.name}</h4>
    </div>
  `).join("");
}

function renderMilestones() {
  const container = document.getElementById("timeline-container");
  const completedList = storage.getCompletedMilestones(currentCareer.id);

  // Update progress bar
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
            <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); cursor: pointer; user-select: none;">
              <input type="checkbox" class="milestone-checkbox" data-id="${milestone.id}" ${isDone ? "checked" : ""}>
              <span>${isDone ? "Completed" : "Mark as Done"}</span>
            </label>
          </div>
          <p style="margin: 0; font-size: var(--font-size-sm); color: var(--text-secondary);">${milestone.detail}</p>
        </div>
      </div>
    `;
  }).join("");

  // Attach milestone checkbox events
  container.querySelectorAll(".milestone-checkbox").forEach(box => {
    box.addEventListener("change", () => {
      const milestoneId = box.getAttribute("data-id");
      storage.toggleMilestone(currentCareer.id, milestoneId);
      renderMilestones();
    });
  });
}
