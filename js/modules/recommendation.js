/**
 * Recommendation & Compatibility Scoring Engine
 * Uses multi-dimensional vector matching and cosine distance to rank career pathways.
 */

import { CAREERS_DATA } from "../data/careers.js";

export class RecommendationEngine {
  /**
   * Computes compatibility for all careers given user vector weights.
   * @param {Object} userWeights { technology: number, analytical: number, problemSolving: number, leadership: number, creative: number }
   * @returns {Array} Sorted list of careers with calculated match percentages and fit diagnostics
   */
  static evaluate(userWeights) {
    const dimensions = ["technology", "analytical", "problemSolving", "leadership", "creative"];

    // Compute user vector magnitude
    const userMag = Math.sqrt(
      dimensions.reduce((sum, dim) => sum + Math.pow(userWeights[dim] || 0, 2), 0)
    ) || 1;

    const scoredCareers = CAREERS_DATA.map(career => {
      const careerWeights = career.matchWeights;

      // Dot product
      const dotProduct = dimensions.reduce((sum, dim) => {
        const u = userWeights[dim] || 0;
        const c = careerWeights[dim] || 0;
        return sum + (u * c);
      }, 0);

      // Career vector magnitude
      const careerMag = Math.sqrt(
        dimensions.reduce((sum, dim) => sum + Math.pow(careerWeights[dim] || 0, 2), 0)
      ) || 1;

      // Cosine Similarity: [0..1]
      const cosineSim = Math.max(0, Math.min(1, dotProduct / (userMag * careerMag)));

      // Normalized match percentage between 60% and 98% for realistic advisory scoring
      const matchScore = Math.round(65 + (cosineSim * 33));

      // Identify top aligned dimension
      let topDim = dimensions[0];
      let maxScore = -1;
      dimensions.forEach(dim => {
        const score = (userWeights[dim] || 0) * (careerWeights[dim] || 0);
        if (score > maxScore) {
          maxScore = score;
          topDim = dim;
        }
      });

      return {
        ...career,
        matchScore,
        cosineSimilarity: Number(cosineSim.toFixed(3)),
        primaryAlignment: this._formatDimensionName(topDim)
      };
    });

    // Sort descending by matchScore
    return scoredCareers.sort((a, b) => b.matchScore - a.matchScore);
  }

  static _formatDimensionName(dim) {
    const names = {
      technology: "Computational Systems & Tech",
      analytical: "Analytical & Empirical Research",
      problemSolving: "Engineering & Applied Problem Solving",
      leadership: "Strategic Direction & Leadership",
      creative: "Aesthetic Design & Visual Storytelling"
    };
    return names[dim] || dim;
  }
}
