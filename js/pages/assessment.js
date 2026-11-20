/**
 * Assessment Page Controller
 */

import { initNavigation } from "../modules/navigation.js";
import { QUIZ_QUESTIONS } from "../data/quiz-questions.js";
import { RecommendationEngine } from "../modules/recommendation.js";
import { storage } from "../modules/storage.js";

let currentStep = 0;
const userSelections = {}; // { [stepIndex]: selectedOptionObject }

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initQuiz();
});

function initQuiz() {
  const prevBtn = document.getElementById("quiz-prev-btn");
  const nextBtn = document.getElementById("quiz-next-btn");
  const retakeBtn = document.getElementById("retake-quiz-btn");

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep(currentStep);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      currentStep++;
      renderStep(currentStep);
    } else {
      finishQuiz();
    }
  });

  retakeBtn.addEventListener("click", () => {
    currentStep = 0;
    Object.keys(userSelections).forEach(k => delete userSelections[k]);
    document.getElementById("results-wrapper").style.display = "none";
    document.getElementById("quiz-wrapper").style.display = "block";
    renderStep(0);
  });

  renderStep(0);
}

function renderStep(stepIndex) {
  const question = QUIZ_QUESTIONS[stepIndex];
  const totalSteps = QUIZ_QUESTIONS.length;

  // Update Stepper Visuals
  const fillPercent = ((stepIndex + 1) / totalSteps) * 100;
  document.getElementById("stepper-fill").style.width = `${fillPercent}%`;

  document.querySelectorAll(".step-node").forEach((node, idx) => {
    node.classList.remove("active", "completed");
    if (idx < stepIndex) {
      node.classList.add("completed");
    } else if (idx === stepIndex) {
      node.classList.add("active");
    }
  });

  // Update Question Content
  document.getElementById("quiz-category-badge").textContent = `${question.category} (Step ${stepIndex + 1} of ${totalSteps})`;
  document.getElementById("quiz-question-title").textContent = question.title;
  document.getElementById("quiz-question-subtitle").textContent = question.subtitle;

  // Render Options
  const optionsContainer = document.getElementById("quiz-options-list");
  optionsContainer.innerHTML = question.options.map((opt) => {
    const isSelected = userSelections[stepIndex] && userSelections[stepIndex].id === opt.id;
    return `
      <div class="quiz-option ${isSelected ? "selected" : ""}" data-opt-id="${opt.id}" role="radio" aria-checked="${isSelected}">
        <div class="quiz-option-radio"></div>
        <div class="quiz-option-text">${opt.label}</div>
      </div>
    `;
  }).join("");

  // Attach Click Handlers to Options
  optionsContainer.querySelectorAll(".quiz-option").forEach(elem => {
    elem.addEventListener("click", () => {
      const optId = elem.getAttribute("data-opt-id");
      const selectedOption = question.options.find(o => o.id === optId);
      userSelections[stepIndex] = selectedOption;

      // Update UI classes
      optionsContainer.querySelectorAll(".quiz-option").forEach(el => el.classList.remove("selected"));
      elem.classList.add("selected");

      // Enable Next Button
      document.getElementById("quiz-next-btn").disabled = false;
    });
  });

  // Navigation Buttons State
  const prevBtn = document.getElementById("quiz-prev-btn");
  const nextBtn = document.getElementById("quiz-next-btn");

  prevBtn.style.visibility = stepIndex === 0 ? "hidden" : "visible";
  nextBtn.disabled = !userSelections[stepIndex];
  nextBtn.textContent = stepIndex === totalSteps - 1 ? "Complete Assessment & View Matches ➔" : "Next Step ➔";
}

function finishQuiz() {
  // Aggregate user dimensional weights
  const aggregatedWeights = {
    technology: 0,
    analytical: 0,
    problemSolving: 0,
    leadership: 0,
    creative: 0
  };

  Object.values(userSelections).forEach(option => {
    if (option && option.weights) {
      Object.keys(option.weights).forEach(dim => {
        aggregatedWeights[dim] += option.weights[dim];
      });
    }
  });

  // Evaluate compatibility
  const scoredCareers = RecommendationEngine.evaluate(aggregatedWeights);
  const topMatches = scoredCareers.slice(0, 3);

  // Save to LocalStorage
  storage.saveQuizResult({
    weights: aggregatedWeights,
    topMatches: topMatches,
    completedAt: new Date().toISOString()
  });

  // Transition UI
  document.getElementById("quiz-wrapper").style.display = "none";
  const resultsWrapper = document.getElementById("results-wrapper");
  resultsWrapper.style.display = "block";

  renderResults(aggregatedWeights, topMatches);
}

function renderResults(weights, topMatches) {
  // 1. Render Dimensional Strength Bars
  const dimensionsContainer = document.getElementById("dimension-bars");
  const maxWeightPossible = QUIZ_QUESTIONS.length * 1.0;

  const dimensionLabels = {
    technology: "Technology & Computational Engineering",
    analytical: "Data Analysis & Scientific Research",
    problemSolving: "Systems Design & Applied Problem Solving",
    leadership: "Strategy, Coordination & Product Vision",
    creative: "User Experience, Narrative & Creative Media"
  };

  dimensionsContainer.innerHTML = Object.entries(weights).map(([dim, val]) => {
    const percentage = Math.min(100, Math.round((val / maxWeightPossible) * 100));
    return `
      <div>
        <div style="display: flex; justify-content: space-between; font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); margin-bottom: var(--space-1);">
          <span>${dimensionLabels[dim] || dim}</span>
          <span style="font-weight: var(--font-weight-bold); color: var(--primary);">${percentage}%</span>
        </div>
        <div style="height: 8px; background-color: var(--border-color); border-radius: var(--radius-full); overflow: hidden;">
          <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: var(--radius-full); transition: width 0.8s ease;"></div>
        </div>
      </div>
    `;
  }).join("");

  // 2. Render Top Career Matches
  const matchesContainer = document.getElementById("top-matches-list");
  matchesContainer.innerHTML = topMatches.map((career, index) => {
    const isBookmarked = storage.isBookmarked(career.id);
    return `
      <div class="card" style="border-left: 5px solid ${index === 0 ? "var(--primary)" : "var(--secondary)"};">
        <div class="card-header">
          <div>
            <div style="display: flex; gap: var(--space-2); align-items: center; margin-bottom: var(--space-2);">
              <span class="badge ${career.badgeClass}">${career.domain}</span>
              <span class="badge badge-neutral">Rank #${index + 1}</span>
            </div>
            <h3 class="card-title">${career.title}</h3>
            <p style="font-size: var(--font-size-xs); color: var(--text-muted); margin: 0;">Primary Factor: ${career.primaryAlignment}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: var(--font-size-2xl); font-weight: 800; color: ${index === 0 ? "var(--primary)" : "var(--secondary)"};">${career.matchScore}%</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted); text-transform: uppercase;">Compatibility</div>
          </div>
        </div>
        
        <p class="card-body" style="margin-bottom: var(--space-4);">${career.description}</p>

        <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-4);">
          ${career.skills.map(s => `<span class="badge badge-neutral">${s}</span>`).join("")}
        </div>

        <div class="card-footer">
          <button class="bookmark-btn btn btn-outline btn-sm" data-id="${career.id}">
            ${isBookmarked ? "★ Saved to Profile" : "☆ Save to Profile"}
          </button>
          <a href="roadmap.html?careerId=${encodeURIComponent(career.id)}" class="btn btn-primary btn-sm">
            Launch Milestone Roadmap &rarr;
          </a>
        </div>
      </div>
    `;
  }).join("");

  // Attach bookmarks
  matchesContainer.querySelectorAll(".bookmark-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const isSaved = storage.toggleBookmark(id);
      btn.textContent = isSaved ? "★ Saved to Profile" : "☆ Save to Profile";
    });
  });

  // Top Roadmap Button link
  const topRoadmapBtn = document.getElementById("view-primary-roadmap-btn");
  if (topRoadmapBtn && topMatches[0]) {
    topRoadmapBtn.href = `roadmap.html?careerId=${encodeURIComponent(topMatches[0].id)}`;
  }
}
