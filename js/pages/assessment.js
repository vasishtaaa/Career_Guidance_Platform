import { initNavigation } from "../modules/navigation.js";
import { QUIZ_QUESTIONS } from "../data/quiz-questions.js";
import { RecommendationEngine } from "../modules/recommendation.js";
import { storage } from "../modules/storage.js";
let currentStep = 0;
const userSelections = {};
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initQuiz();
});
function initQuiz() {
    const prevBtn = document.getElementById("quiz-prev-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    const retakeBtn = document.getElementById("retake-quiz-btn");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                renderStep(currentStep);
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentStep < QUIZ_QUESTIONS.length - 1) {
                currentStep++;
                renderStep(currentStep);
            }
            else {
                finishQuiz();
            }
        });
    }
    if (retakeBtn) {
        retakeBtn.addEventListener("click", () => {
            currentStep = 0;
            Object.keys(userSelections).forEach(k => delete userSelections[Number(k)]);
            const resultsWrapper = document.getElementById("results-wrapper");
            const quizWrapper = document.getElementById("quiz-wrapper");
            if (resultsWrapper)
                resultsWrapper.style.display = "none";
            if (quizWrapper)
                quizWrapper.style.display = "block";
            renderStep(0);
        });
    }
    renderStep(0);
}
function renderStep(stepIndex) {
    const question = QUIZ_QUESTIONS[stepIndex];
    const totalSteps = QUIZ_QUESTIONS.length;
    const fillPercent = ((stepIndex + 1) / totalSteps) * 100;
    const stepperFill = document.getElementById("stepper-fill");
    if (stepperFill)
        stepperFill.style.width = `${fillPercent}%`;
    document.querySelectorAll(".step-node").forEach((node, idx) => {
        node.classList.remove("active", "completed");
        if (idx < stepIndex) {
            node.classList.add("completed");
        }
        else if (idx === stepIndex) {
            node.classList.add("active");
        }
    });
    const categoryBadge = document.getElementById("quiz-category-badge");
    const questionTitle = document.getElementById("quiz-question-title");
    const questionSubtitle = document.getElementById("quiz-question-subtitle");
    if (categoryBadge)
        categoryBadge.textContent = `${question.category} (Step ${stepIndex + 1} of ${totalSteps})`;
    if (questionTitle)
        questionTitle.textContent = question.title;
    if (questionSubtitle)
        questionSubtitle.textContent = question.subtitle;
    const optionsContainer = document.getElementById("quiz-options-list");
    if (!optionsContainer)
        return;
    optionsContainer.innerHTML = question.options.map((opt) => {
        const isSelected = userSelections[stepIndex] && userSelections[stepIndex].id === opt.id;
        return `
      <div class="quiz-option ${isSelected ? "selected" : ""}" data-opt-id="${opt.id}" role="radio" aria-checked="${isSelected}">
        <div class="quiz-option-radio"></div>
        <div class="quiz-option-text">${opt.label}</div>
      </div>
    `;
    }).join("");
    optionsContainer.querySelectorAll(".quiz-option").forEach(elem => {
        elem.addEventListener("click", () => {
            const optId = elem.getAttribute("data-opt-id");
            const selectedOption = question.options.find(o => o.id === optId);
            if (selectedOption) {
                userSelections[stepIndex] = selectedOption;
            }
            optionsContainer.querySelectorAll(".quiz-option").forEach(el => el.classList.remove("selected"));
            elem.classList.add("selected");
            const nextBtn = document.getElementById("quiz-next-btn");
            if (nextBtn)
                nextBtn.disabled = false;
        });
    });
    const prevBtn = document.getElementById("quiz-prev-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    if (prevBtn)
        prevBtn.style.visibility = stepIndex === 0 ? "hidden" : "visible";
    if (nextBtn) {
        nextBtn.disabled = !userSelections[stepIndex];
        nextBtn.textContent = stepIndex === totalSteps - 1 ? "Complete Assessment & View Matches ➔" : "Next Step ➔";
    }
}
function finishQuiz() {
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
                aggregatedWeights[dim] = (aggregatedWeights[dim] || 0) + option.weights[dim];
            });
        }
    });
    const scoredCareers = RecommendationEngine.evaluate(aggregatedWeights);
    const topMatches = scoredCareers.slice(0, 3);
    storage.saveQuizResult({
        weights: aggregatedWeights,
        topMatches: topMatches,
        completedAt: new Date().toISOString()
    });
    const quizWrapper = document.getElementById("quiz-wrapper");
    const resultsWrapper = document.getElementById("results-wrapper");
    if (quizWrapper)
        quizWrapper.style.display = "none";
    if (resultsWrapper)
        resultsWrapper.style.display = "block";
    renderResults(aggregatedWeights, topMatches);
}
function getAssessmentBookmarkMarkup(isSaved) {
    const fill = isSaved ? "currentColor" : "none";
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> <span>${isSaved ? "Saved to Profile" : "Save to Profile"}</span>`;
}
function renderResults(weights, topMatches) {
    const dimensionsContainer = document.getElementById("dimension-bars");
    const maxWeightPossible = QUIZ_QUESTIONS.length * 1.0;
    const dimensionLabels = {
        technology: "Technology & Computational Engineering",
        analytical: "Data Analysis & Scientific Research",
        problemSolving: "Systems Design & Applied Problem Solving",
        leadership: "Strategy, Coordination & Product Vision",
        creative: "User Experience, Narrative & Creative Media"
    };
    if (dimensionsContainer) {
        dimensionsContainer.innerHTML = Object.entries(weights).map(([dim, val]) => {
            const percentage = Math.min(100, Math.round((val / maxWeightPossible) * 100));
            return `
        <div>
          <div style="display: flex; justify-content: space-between; font-size: var(--font-size-sm); font-weight: 600; margin-bottom: var(--space-1);">
            <span>${dimensionLabels[dim] || dim}</span>
            <span style="font-weight: 800; color: var(--primary);">${percentage}%</span>
          </div>
          <div style="height: 8px; background-color: var(--border-color); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${percentage}%; height: 100%; background: var(--gradient-brand); border-radius: var(--radius-full); transition: width 0.8s ease;"></div>
          </div>
        </div>
      `;
        }).join("");
    }
    const matchesContainer = document.getElementById("top-matches-list");
    if (matchesContainer) {
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
              ${getAssessmentBookmarkMarkup(isBookmarked)}
            </button>
            <div style="display: flex; gap: var(--space-2);">
              <a href="colleges.html?discipline=${encodeURIComponent(career.domain)}" class="btn btn-outline btn-sm">Find Colleges</a>
              <a href="roadmap.html?careerId=${encodeURIComponent(career.id)}" class="btn btn-primary btn-sm">
                Launch Milestone Roadmap &rarr;
              </a>
            </div>
          </div>
        </div>
      `;
        }).join("");
        matchesContainer.querySelectorAll(".bookmark-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id") || "";
                const isSaved = storage.toggleBookmark(id);
                btn.innerHTML = getAssessmentBookmarkMarkup(isSaved);
            });
        });
    }
    const topRoadmapBtn = document.getElementById("view-primary-roadmap-btn");
    if (topRoadmapBtn && topMatches[0]) {
        topRoadmapBtn.href = `roadmap.html?careerId=${encodeURIComponent(topMatches[0].id)}`;
    }
}
