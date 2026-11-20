/**
 * Home Page Controller
 */

import { initNavigation } from "../modules/navigation.js";
import { storage } from "../modules/storage.js";
import { CAREERS_DATA } from "../data/careers.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderAssessmentBanner();
  renderFeaturedCareers();
});

function renderAssessmentBanner() {
  const lastAssessment = storage.getQuizResult();
  const container = document.getElementById("assessment-status-container");
  if (!container) return;

  if (lastAssessment && lastAssessment.topMatches && lastAssessment.topMatches.length > 0) {
    const topMatch = lastAssessment.topMatches[0];
    document.getElementById("top-match-title").textContent = topMatch.title;
    document.getElementById("top-match-badge").textContent = `${topMatch.matchScore}% Match`;
    document.getElementById("top-match-desc").textContent = `${topMatch.description} Key strength alignment: ${topMatch.primaryAlignment}.`;
    
    const roadmapLink = document.getElementById("top-match-roadmap-link");
    if (roadmapLink) {
      roadmapLink.href = `roadmap.html?careerId=${encodeURIComponent(topMatch.id)}`;
    }
    container.style.display = "block";
  }
}

function renderFeaturedCareers() {
  const grid = document.getElementById("featured-careers-grid");
  if (!grid) return;

  // Select 3 diverse careers
  const featured = [CAREERS_DATA[0], CAREERS_DATA[3], CAREERS_DATA[5]];

  grid.innerHTML = featured.map(career => {
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
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: var(--font-size-xs); font-weight: var(--font-weight-bold); color: var(--text-muted); margin-bottom: var(--space-1); text-transform: uppercase;">Key Skills</div>
          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
            ${career.skills.slice(0, 3).map(skill => `<span class="badge badge-neutral">${skill}</span>`).join("")}
          </div>
        </div>
        <div class="card-footer">
          <span style="font-weight: var(--font-weight-bold); color: var(--text-primary); font-size: var(--font-size-sm);">${career.salaryRange}</span>
          <a href="roadmap.html?careerId=${encodeURIComponent(career.id)}" class="btn btn-primary btn-sm">View Roadmap &rarr;</a>
        </div>
      </article>
    `;
  }).join("");

  // Attach bookmark toggle listeners
  grid.querySelectorAll(".bookmark-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const saved = storage.toggleBookmark(id);
      btn.textContent = saved ? "★ Saved" : "☆ Save";
    });
  });
}
