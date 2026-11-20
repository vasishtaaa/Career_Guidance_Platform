import { QuizQuestion } from "../types/index.js";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    step: 1,
    category: "Core Interests & Drive",
    title: "What type of challenge excites you most?",
    subtitle: "Select the project scenario you would be most eager to dive into this weekend.",
    options: [
      {
        id: "q1_opt1",
        label: "Developing intelligent algorithms or writing code to automate complex systems",
        weights: { technology: 1.0, analytical: 0.8, problemSolving: 0.8, leadership: 0.2, creative: 0.4 }
      },
      {
        id: "q1_opt2",
        label: "Investigating biological data, health patterns, and medical research breakthroughs",
        weights: { technology: 0.6, analytical: 1.0, problemSolving: 0.8, leadership: 0.3, creative: 0.3 }
      },
      {
        id: "q1_opt3",
        label: "Defining product strategy, coordinating high-performing teams, and driving business growth",
        weights: { technology: 0.4, analytical: 0.7, problemSolving: 0.7, leadership: 1.0, creative: 0.6 }
      },
      {
        id: "q1_opt4",
        label: "Crafting beautiful interactive user experiences, visual aesthetics, or game worlds",
        weights: { technology: 0.5, analytical: 0.3, problemSolving: 0.6, leadership: 0.4, creative: 1.0 }
      },
      {
        id: "q1_opt5",
        label: "Building physical machines, robotics, or sustainable clean energy systems",
        weights: { technology: 0.8, analytical: 0.8, problemSolving: 1.0, leadership: 0.4, creative: 0.5 }
      }
    ]
  },
  {
    step: 2,
    category: "Analytical & Problem Solving Approach",
    title: "How do you prefer to tackle an ambiguous problem?",
    subtitle: "Think about your natural thought process when faced with an obstacle.",
    options: [
      {
        id: "q2_opt1",
        label: "Deconstruct it mathematically, test hypotheses, and rely on rigorous empirical data",
        weights: { technology: 0.7, analytical: 1.0, problemSolving: 0.9, leadership: 0.3, creative: 0.2 }
      },
      {
        id: "q2_opt2",
        label: "Experiment hands-on: prototype quickly, fail fast, and inspect iterative outputs",
        weights: { technology: 0.8, analytical: 0.6, problemSolving: 0.9, leadership: 0.5, creative: 0.8 }
      },
      {
        id: "q2_opt3",
        label: "Map out the user or stakeholder journey to identify friction points and human needs",
        weights: { technology: 0.3, analytical: 0.5, problemSolving: 0.7, leadership: 0.8, creative: 0.9 }
      },
      {
        id: "q2_opt4",
        label: "Analyze system architecture, fault tolerance, and security edge cases",
        weights: { technology: 0.95, analytical: 0.8, problemSolving: 1.0, leadership: 0.4, creative: 0.3 }
      }
    ]
  },
  {
    step: 3,
    category: "Working Style & Environment",
    title: "What daily work dynamic energizes you?",
    subtitle: "Every discipline has a rhythm. Choose your ideal operating mode.",
    options: [
      {
        id: "q3_opt1",
        label: "Deep focus: writing code, constructing models, and solving deep technical bugs",
        weights: { technology: 0.95, analytical: 0.85, problemSolving: 0.9, leadership: 0.2, creative: 0.4 }
      },
      {
        id: "q3_opt2",
        label: "Collaborative synthesis: leading workshops, negotiating priorities, and cross-team alignment",
        weights: { technology: 0.4, analytical: 0.6, problemSolving: 0.6, leadership: 1.0, creative: 0.7 }
      },
      {
        id: "q3_opt3",
        label: "Creative studio: collaborating with designers, refining layouts, and iterating on visual details",
        weights: { technology: 0.5, analytical: 0.3, problemSolving: 0.6, leadership: 0.5, creative: 1.0 }
      },
      {
        id: "q3_opt4",
        label: "Lab or field hybrid: testing hardware, sensor prototypes, and physical deployments",
        weights: { technology: 0.8, analytical: 0.8, problemSolving: 1.0, leadership: 0.4, creative: 0.4 }
      }
    ]
  },
  {
    step: 4,
    category: "Ultimate Impact & Value Creation",
    title: "What kind of legacy or long-term impact do you want to create?",
    subtitle: "What achievement would make you feel most fulfilled in 5 years?",
    options: [
      {
        id: "q4_opt1",
        label: "Pioneering state-of-the-art computational systems, AI algorithms, or cloud scale",
        weights: { technology: 1.0, analytical: 0.8, problemSolving: 0.9, leadership: 0.5, creative: 0.5 }
      },
      {
        id: "q4_opt2",
        label: "Improving healthcare outcomes, biomedical discoveries, and human well-being",
        weights: { technology: 0.6, analytical: 0.95, problemSolving: 0.85, leadership: 0.6, creative: 0.3 }
      },
      {
        id: "q4_opt3",
        label: "Building products used by millions or guiding market-leading business decisions",
        weights: { technology: 0.5, analytical: 0.75, problemSolving: 0.75, leadership: 1.0, creative: 0.7 }
      },
      {
        id: "q4_opt4",
        label: "Creating iconic digital experiences, intuitive interfaces, or interactive media",
        weights: { technology: 0.5, analytical: 0.4, problemSolving: 0.6, leadership: 0.5, creative: 1.0 }
      },
      {
        id: "q4_opt5",
        label: "Advancing clean energy transition or autonomous robotics solving real-world labor needs",
        weights: { technology: 0.8, analytical: 0.85, problemSolving: 1.0, leadership: 0.5, creative: 0.5 }
      }
    ]
  }
];
