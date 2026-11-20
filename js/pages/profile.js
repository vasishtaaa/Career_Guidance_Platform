import { initNavigation } from "../modules/navigation.js";
import { storage } from "../modules/storage.js";
import { CAREERS_DATA } from "../data/careers.js";
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderProfile();
    bindDataActions();
});
function renderProfile() {
    const state = storage.getState();
    renderAssessmentHistory(state.lastAssessment);
    renderBookmarks(state.bookmarkedCareerIds || []);
}
function renderAssessmentHistory(lastAssessment) {
    const container = document.getElementById("assessment-history-content");
    if (!container)
        return;
    if (!lastAssessment || !lastAssessment.topMatches || lastAssessment.topMatches.length === 0) {
        container.innerHTML = `
      <div style="text-align: center; padding: var(--space-8); background-color: var(--bg-tertiary); border-radius: var(--radius-lg);">
        <p style="margin-bottom: var(--space-4); color: var(--text-secondary);">No assessment results recorded yet.</p>
        <a href="assessment.html" class="btn btn-primary btn-sm">Take 3-Minute Assessment &rarr;</a>
      </div>
    `;
        return;
    }
    const topMatch = lastAssessment.topMatches[0];
    const dateStr = lastAssessment.completedAt ? new Date(lastAssessment.completedAt).toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    }) : "Recent";
    container.innerHTML = `
    <div style="background-color: var(--bg-tertiary); border-radius: var(--radius-lg); padding: var(--space-5);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-3); flex-wrap: wrap; gap: var(--space-2);">
        <div>
          <span class="badge ${topMatch.badgeClass}">${topMatch.domain}</span>
          <h4 style="font-size: var(--font-size-xl); margin-top: var(--space-2); margin-bottom: var(--space-1);">${topMatch.title}</h4>
          <span style="font-size: var(--font-size-xs); color: var(--text-muted);">Completed: ${dateStr}</span>
        </div>
        <div style="text-align: right;">
          <div style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--primary);">${topMatch.matchScore}%</div>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Compatibility</div>
        </div>
      </div>

      <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-4);">${topMatch.description}</p>

      <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
        <a href="roadmap.html?careerId=${encodeURIComponent(topMatch.id)}" class="btn btn-primary btn-sm">Open Milestone Roadmap</a>
        <a href="colleges.html?discipline=${encodeURIComponent(topMatch.domain)}" class="btn btn-secondary btn-sm">Find Colleges</a>
        <a href="assessment.html" class="btn btn-outline btn-sm">Retake Assessment</a>
      </div>
    </div>
  `;
}
function renderBookmarks(bookmarkedIds) {
    const container = document.getElementById("bookmarks-list");
    const countBadge = document.getElementById("saved-count-badge");
    if (countBadge)
        countBadge.textContent = `${bookmarkedIds.length} Saved`;
    if (!container)
        return;
    if (bookmarkedIds.length === 0) {
        container.innerHTML = `
      <div style="text-align: center; padding: var(--space-8); background-color: var(--bg-tertiary); border-radius: var(--radius-lg);">
        <p style="margin-bottom: var(--space-4); color: var(--text-secondary);">You haven't bookmarked any career pathways yet.</p>
        <a href="explorer.html" class="btn btn-outline btn-sm">Explore Career Directory &rarr;</a>
      </div>
    `;
        return;
    }
    const bookmarkedCareers = CAREERS_DATA.filter(c => bookmarkedIds.includes(c.id));
    container.innerHTML = bookmarkedCareers.map(career => {
        const completedList = storage.getCompletedMilestones(career.id);
        const progressPercent = career.milestones.length > 0
            ? Math.round((completedList.length / career.milestones.length) * 100)
            : 0;
        return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) var(--space-5); background-color: var(--bg-tertiary); border-radius: var(--radius-lg); border: 1px solid var(--border-color); flex-wrap: wrap; gap: var(--space-3);">
        <div style="flex: 1; min-width: 240px;">
          <span class="badge ${career.badgeClass}" style="margin-bottom: var(--space-1);">${career.domain}</span>
          <h4 style="margin: 0; font-size: var(--font-size-base);">${career.title}</h4>
          <span style="font-size: var(--font-size-xs); color: var(--text-muted);">${career.domain} • Roadmap Progress: ${progressPercent}%</span>
        </div>

        <div style="display: flex; gap: var(--space-2); align-items: center;">
          <a href="roadmap.html?careerId=${encodeURIComponent(career.id)}" class="btn btn-primary btn-sm">Roadmap &rarr;</a>
          <button class="remove-bookmark-btn btn btn-outline btn-sm" data-id="${career.id}" style="color: var(--danger);" title="Remove bookmark">
            Remove
          </button>
        </div>
      </div>
    `;
    }).join("");
    container.querySelectorAll(".remove-bookmark-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id") || "";
            storage.toggleBookmark(id);
            renderProfile();
        });
    });
}
function bindDataActions() {
    const exportBtn = document.getElementById("export-json-btn");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            storage.exportProfileJSON();
        });
    }
    const importInput = document.getElementById("import-json-input");
    if (importInput) {
        importInput.addEventListener("change", (e) => {
            const target = e.target;
            const file = target.files && target.files[0];
            if (!file)
                return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result;
                const success = storage.importProfileJSON(content);
                if (success) {
                    alert("Profile successfully restored from backup!");
                    renderProfile();
                }
                else {
                    alert("Failed to parse JSON file. Please ensure it is a valid guidance profile export.");
                }
            };
            reader.readAsText(file);
        });
    }
    const resetBtn = document.getElementById("reset-all-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset all stored quiz results and bookmarks? This action cannot be undone.")) {
                storage.resetAllData();
                renderProfile();
            }
        });
    }
}
