import { AppState, AssessmentResult } from "../types/index.js";

const STORAGE_KEY = "customized_digital_guidance_2025_state";

const DEFAULT_STATE: AppState = {
  version: "2.0.0",
  theme: "light",
  currency: "USD",
  lastAssessment: null,
  bookmarkedCareerIds: [],
  milestoneProgress: {},
  userProfile: {
    fullName: "Guest Student",
    educationLevel: "Undergraduate",
    interests: []
  }
};

class StorageAdapter {
  private _memoryFallback: AppState | null = null;

  constructor() {
    this._init();
  }

  private _init(): void {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      }
    } catch (e) {
      console.warn("LocalStorage access error. Using in-memory fallback.", e);
      this._memoryFallback = { ...DEFAULT_STATE };
    }
  }

  public getState(): AppState {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { ...DEFAULT_STATE };
    } catch (e) {
      return this._memoryFallback || { ...DEFAULT_STATE };
    }
  }

  public saveState(newState: AppState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      this._memoryFallback = newState;
    }
    window.dispatchEvent(new CustomEvent("guidance_state_updated", { detail: newState }));
  }

  public saveQuizResult(result: AssessmentResult): AssessmentResult {
    const state = this.getState();
    state.lastAssessment = {
      ...result,
      timestamp: new Date().toISOString()
    };
    this.saveState(state);
    return state.lastAssessment;
  }

  public getQuizResult(): AssessmentResult | null {
    return this.getState().lastAssessment;
  }

  public getBookmarks(): string[] {
    return this.getState().bookmarkedCareerIds || [];
  }

  public isBookmarked(careerId: string): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(careerId);
  }

  public toggleBookmark(careerId: string): boolean {
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

  public getCompletedMilestones(careerId: string): string[] {
    const state = this.getState();
    return (state.milestoneProgress && state.milestoneProgress[careerId]) || [];
  }

  public toggleMilestone(careerId: string, milestoneId: string): boolean {
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

  public exportProfileJSON(): void {
    const state = this.getState();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `guidance-profile-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  public importProfileJSON(jsonString: string): boolean {
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

  public resetAllData(): void {
    this.saveState(DEFAULT_STATE);
  }
}

export const storage = new StorageAdapter();
