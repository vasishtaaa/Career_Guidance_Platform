import { CAREERS_DATA } from "../data/careers.js";
export class RecommendationEngine {
    static evaluate(userWeights) {
        const dimensions = ["technology", "analytical", "problemSolving", "leadership", "creative"];
        const userMag = Math.sqrt(dimensions.reduce((sum, dim) => sum + Math.pow(userWeights[dim] || 0, 2), 0)) || 1;
        const scoredCareers = CAREERS_DATA.map(career => {
            const careerWeights = career.matchWeights;
            const dotProduct = dimensions.reduce((sum, dim) => {
                const u = userWeights[dim] || 0;
                const c = careerWeights[dim] || 0;
                return sum + (u * c);
            }, 0);
            const careerMag = Math.sqrt(dimensions.reduce((sum, dim) => sum + Math.pow(careerWeights[dim] || 0, 2), 0)) || 1;
            const cosineSim = Math.max(0, Math.min(1, dotProduct / (userMag * careerMag)));
            const matchScore = Math.round(65 + (cosineSim * 33));
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
        return scoredCareers.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
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
