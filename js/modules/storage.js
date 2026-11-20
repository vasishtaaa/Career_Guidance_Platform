/**
 * Client-Side Storage Adapter
 * Encapsulates LocalStorage persistence, profile serialization, JSON export/import, and defensive fallbacks.
 */

const STORAGE_KEY = "customized_digital_guidance_2025_state";

const DEFAULT_STATE = {
  version: "1.0.0",
  theme: "light",
  lastAssessment: null,
  bookmarkedCareerIds: [],
  milestoneProgress: {}, // { [careerId]: [milestoneId1, milestoneId2] }
  userProfile: {
    fullName: "Guest Student",
    educationLevel: "Undergraduate",
    interests: []
  }
};

class StorageAdapter {
  constructor() {
    this._init();
  }

  _init() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      }
    } catch (e) {
      console.warn("LocalStorage access error (e.g. private mode). Using in-memory fallback.", e);
      this._memoryFallback = { ...DEFAULT_STATE };
    }
  }

  getState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { ...DEFAULT_STATE };
    } catch (e) {
      return this._memoryFallback || { ...DEFAULT_STATE };
    }
  }

  saveState(newState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      this._memoryFallback = newState;
    }
    window.dispatchEvent(new CustomEvent("guidance_state_updated", { detail: newState }));
  }

  // --- Assessment Results ---
  saveQuizResult(result) {
    const state = this.getState();
    state.lastAssessment = {
      ...result,
      timestamp: new Date().toISOString()
    };
    this.saveState(state);
    return state.lastAssessment;
  }

  getQuizResult() {
    return this.getState().lastAssessment;
  }

  // --- Bookmarks ---
  getBookmarks() {
    return this.getState().bookmarkedCareerIds || [];
  }

  isBookmarked(careerId) {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(careerId);
  }

  toggleBookmark(careerId) {
    const state = this.getState();
    const index = state.bookmarkedCareerIds.indexOf(careerId);
    let bookmarked = false;

    if (index > -1) {
      state.bookmarkedCareerIds.splice(index, 1);
      bookmarked = false;
    } else {
      state.bookmarkedCareerIds.push(careerId);
      bookmarked = true;
    }

    this.saveState(state);
    return bookmarked;
  }

  // --- Milestone Checklists ---
  getCompletedMilestones(careerId) {
    const state = this.getState();
    return (state.milestoneProgress && state.milestoneProgress[careerId]) || [];
  }

  toggleMilestone(careerId, milestoneId) {
    const state = this.getState();
    if (!state.milestoneProgress) state.milestoneProgress = {};
    if (!state.milestoneProgress[careerId]) state.milestoneProgress[careerId] = [];

    const list = state.milestoneProgress[careerId];
    const idx = list.indexOf(milestoneId);
    let completed = false;

    if (idx > -1) {
      list.splice(idx, 1);
      completed = false;
    } else {
      list.push(milestoneId);
      completed = true;
    }

    this.saveState(state);
    return completed;
  }

  // --- Portability (JSON Export & Import) ---
  exportProfileJSON() {
    const state = this.getState();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `guidance-profile-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  importProfileJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid format");
      this.saveState({ ...DEFAULT_STATE, ...parsed });
      return true;
    } catch (e) {
      console.error("Import failed:", e);
      return false;
    }
  }

  resetAllData() {
    this.saveState(DEFAULT_STATE);
  }
}

export const storage = new StorageAdapter();
