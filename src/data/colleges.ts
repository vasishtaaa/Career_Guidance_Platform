import { College } from "../types/index.js";

export const COLLEGES_DATA: College[] = [
  // --- UNITED STATES ---
  {
    id: "univ-mit",
    name: "Massachusetts Institute of Technology (MIT)",
    country: "United States",
    city: "Cambridge, MA",
    flag: "🇺🇸",
    globalRank: "#1 Worldwide (QS Ranking)",
    badgeClass: "badge-tech",
    matchedCareerDomains: ["Technology", "Engineering", "Business & Finance"],
    flagshipPrograms: [
      "B.S. / M.Eng. in Artificial Intelligence & Decision Making",
      "M.S. in Computational Science & Engineering",
      "Ph.D. in Robotics and Autonomous Systems",
      "Master of Finance (MFin)"
    ],
    entranceExams: ["SAT / ACT (Undergrad)", "GRE (Grad)", "TOEFL / IELTS"],
    annualTuitionUSD: 60150,
    acceptanceRate: "3.9% (Highly Selective)",
    scholarshipsAvailable: true,
    notableFocus: "Pioneering neural network research at CSAIL, Media Lab, and MIT Energy Initiative."
  },
  {
    id: "univ-stanford",
    name: "Stanford University",
    country: "United States",
    city: "Stanford, CA",
    flag: "🇺🇸",
    globalRank: "#5 Worldwide",
    badgeClass: "badge-tech",
    matchedCareerDomains: ["Technology", "Creative Arts", "Business & Finance", "Healthcare"],
    flagshipPrograms: [
      "B.S. in Symbolic Systems (AI & HCI)",
      "M.S. in Computer Science (AI / Systems tracks)",
      "MBA & MS Joint Degree (Product Leadership)",
      "Bioinformatics & Biomedical Informatics (BMI)"
    ],
    entranceExams: ["SAT / ACT", "GRE / GMAT", "TOEFL"],
    annualTuitionUSD: 62484,
    acceptanceRate: "3.7%",
    scholarshipsAvailable: true,
    notableFocus: "Deep integration with Silicon Valley tech ecosystem, d.school design thinking."
  },
  {
    id: "univ-cmu",
    name: "Carnegie Mellon University (CMU)",
    country: "United States",
    city: "Pittsburgh, PA",
    flag: "🇺🇸",
    globalRank: "#1 in Computer Science & Robotics",
    badgeClass: "badge-eng",
    matchedCareerDomains: ["Technology", "Engineering", "Creative Arts"],
    flagshipPrograms: [
      "B.S. in Artificial Intelligence (School of CS)",
      "M.S. in Robotic Systems Development (MRSD)",
      "Master of Entertainment Technology (MET)",
      "Master of Human-Computer Interaction (MHCI)"
    ],
    entranceExams: ["SAT / ACT", "GRE", "TOEFL / IELTS"],
    annualTuitionUSD: 61344,
    acceptanceRate: "11.2%",
    scholarshipsAvailable: true,
    notableFocus: "Home to the world-renowned Robotics Institute and Heinz Information Systems College."
  },

  // --- UNITED KINGDOM ---
  {
    id: "univ-oxford",
    name: "University of Oxford",
    country: "United Kingdom",
    city: "Oxford",
    flag: "🇬🇧",
    globalRank: "#3 Worldwide",
    badgeClass: "badge-business",
    matchedCareerDomains: ["Technology", "Healthcare", "Business & Finance"],
    flagshipPrograms: [
      "MSc in Advanced Computer Science",
      "MSc in Mathematical and Computational Finance",
      "MSc in Precision Cancer Medicine",
      "MBA (Saïd Business School)"
    ],
    entranceExams: ["A-Levels / IB", "MAT / GAT", "IELTS (7.5+)"],
    annualTuitionUSD: 44500,
    acceptanceRate: "13.5%",
    scholarshipsAvailable: true,
    notableFocus: "Deep research in ethical AI, Oxford-Man Institute of Quantitative Finance."
  },
  {
    id: "univ-cambridge",
    name: "University of Cambridge",
    country: "United Kingdom",
    city: "Cambridge",
    flag: "🇬🇧",
    globalRank: "#2 Worldwide",
    badgeClass: "badge-health",
    matchedCareerDomains: ["Technology", "Healthcare", "Engineering"],
    flagshipPrograms: [
      "MPhil in Machine Learning and Machine Intelligence",
      "MPhil in Computational Biology",
      "M.Eng in Information & Computer Engineering",
      "MPhil in Energy Technologies"
    ],
    entranceExams: ["STEP / NSAA", "IELTS / Cambridge English"],
    annualTuitionUSD: 46200,
    acceptanceRate: "15.7%",
    scholarshipsAvailable: true,
    notableFocus: "Silicon Fen tech cluster, Cambridge Stem Cell Institute, Cavendish Laboratory."
  },
  {
    id: "univ-imperial",
    name: "Imperial College London",
    country: "United Kingdom",
    city: "London",
    flag: "🇬🇧",
    globalRank: "#6 Worldwide",
    badgeClass: "badge-eng",
    matchedCareerDomains: ["Engineering", "Technology", "Healthcare"],
    flagshipPrograms: [
      "MSc in Computing (Artificial Intelligence & Machine Learning)",
      "MSc in Health Data Analytics & Machine Learning",
      "MSc in Renewable Energy Engineering",
      "MSc in Security and Resilience"
    ],
    entranceExams: ["A-Levels / STEP", "GRE (Optional)", "IELTS (7.0)"],
    annualTuitionUSD: 45800,
    acceptanceRate: "12.0%",
    scholarshipsAvailable: true,
    notableFocus: "Global leader in STEM research, Institute of Global Health Innovation."
  },

  // --- CONTINENTAL EUROPE ---
  {
    id: "univ-eth-zurich",
    name: "ETH Zurich (Swiss Federal Institute of Technology)",
    country: "Switzerland",
    city: "Zurich",
    flag: "🇨🇭",
    globalRank: "#7 Worldwide (Top in Continental Europe)",
    badgeClass: "badge-eng",
    matchedCareerDomains: ["Technology", "Engineering", "Business & Finance"],
    flagshipPrograms: [
      "Master in Robotics, Systems and Control",
      "Master in Computer Science (Data Management & Systems)",
      "Master in Quantitative Finance (with Univ of Zurich)",
      "Master in Energy Science and Technology"
    ],
    entranceExams: ["B.Sc. Degree in STEM", "GRE (recommended)", "IELTS / TOEFL"],
    annualTuitionUSD: 1650,
    acceptanceRate: "27.0%",
    scholarshipsAvailable: true,
    notableFocus: "Extremely low public tuition fees; world-leading robotics and autonomous systems labs."
  },
  {
    id: "univ-tum",
    name: "Technical University of Munich (TUM)",
    country: "Germany",
    city: "Munich",
    flag: "🇩🇪",
    globalRank: "#28 Worldwide (Top in Germany)",
    badgeClass: "badge-eng",
    matchedCareerDomains: ["Technology", "Engineering", "Healthcare"],
    flagshipPrograms: [
      "M.Sc. in Robotics, Cognition, Intelligence",
      "M.Sc. in Biomedical Computing",
      "M.Sc. in Informatics & Cloud Architectures",
      "M.Sc. in Power Engineering & Clean Grids"
    ],
    entranceExams: ["Aptitude Assessment Test", "IELTS / German Proficiency (Program dependent)"],
    annualTuitionUSD: 4300,
    acceptanceRate: "24.0%",
    scholarshipsAvailable: true,
    notableFocus: "Pioneering industry collaborations with BMW, Siemens, and Munich Medical Center."
  },

  // --- ASIA ---
  {
    id: "univ-nus",
    name: "National University of Singapore (NUS)",
    country: "Singapore",
    city: "Singapore",
    flag: "🇸🇬",
    globalRank: "#8 Worldwide (Top in Asia)",
    badgeClass: "badge-tech",
    matchedCareerDomains: ["Technology", "Business & Finance", "Healthcare"],
    flagshipPrograms: [
      "Master of Computing in Artificial Intelligence",
      "MSc in Digital Financial Technology (FinTech)",
      "Master of Science in Biomedical Informatics",
      "MSc in Venture Creation (Product Leadership)"
    ],
    entranceExams: ["GRE / GMAT", "TOEFL / IELTS"],
    annualTuitionUSD: 28500,
    acceptanceRate: "14.5%",
    scholarshipsAvailable: true,
    notableFocus: "Premier gateway to Asian technology headquarters, Smart Nation research."
  },
  {
    id: "univ-tokyo",
    name: "The University of Tokyo",
    country: "Japan",
    city: "Tokyo",
    flag: "🇯🇵",
    globalRank: "#23 Worldwide",
    badgeClass: "badge-eng",
    matchedCareerDomains: ["Engineering", "Technology", "Healthcare"],
    flagshipPrograms: [
      "International Graduate Program in Mechatronics & Robotics",
      "Graduate School of Information Science and Technology",
      "Translational Medical Data Science Program"
    ],
    entranceExams: ["University Entrance Exam / GRE", "TOEFL"],
    annualTuitionUSD: 4100,
    acceptanceRate: "16.0%",
    scholarshipsAvailable: true,
    notableFocus: "Premier Japanese research institution; leader in humanoid robotics and nanotechnology."
  },

  // --- INDIA ---
  {
    id: "univ-iit-bombay",
    name: "Indian Institute of Technology (IIT) Bombay",
    country: "India",
    city: "Mumbai",
    flag: "🇮🇳",
    globalRank: "#118 Worldwide (Top in India)",
    badgeClass: "badge-tech",
    matchedCareerDomains: ["Technology", "Engineering", "Business & Finance"],
    flagshipPrograms: [
      "B.Tech / M.Tech in Computer Science & Engineering",
      "M.Tech in Systems & Control Engineering",
      "Center for Machine Intelligence & Data Science (C-MInDS)",
      "Master of Management (Shailesh J. Mehta School of Mgmt)"
    ],
    entranceExams: ["JEE Advanced (Undergraduate)", "GATE / CAT (Postgraduate)"],
    annualTuitionUSD: 2700,
    acceptanceRate: "0.2% (Extremely Competitive)",
    scholarshipsAvailable: true,
    notableFocus: "Unrivaled alumni network leading Fortune 500 tech companies and high-growth startups."
  },
  {
    id: "univ-iit-delhi",
    name: "Indian Institute of Technology (IIT) Delhi",
    country: "India",
    city: "New Delhi",
    flag: "🇮🇳",
    globalRank: "#145 Worldwide",
    badgeClass: "badge-eng",
    matchedCareerDomains: ["Technology", "Engineering", "Healthcare"],
    flagshipPrograms: [
      "M.Tech in Artificial Intelligence (ScAI)",
      "B.Tech in Energy Engineering & Clean Power",
      "M.S. Research in Biomedical Engineering",
      "Cybersecurity and Cyber Defense Center"
    ],
    entranceExams: ["JEE Advanced", "GATE", "JAM"],
    annualTuitionUSD: 2650,
    acceptanceRate: "0.3%",
    scholarshipsAvailable: true,
    notableFocus: "Home to the Yardi School of Artificial Intelligence (ScAI) and clean energy microgrid labs."
  },
  {
    id: "univ-iisc-bangalore",
    name: "Indian Institute of Science (IISc) Bangalore",
    country: "India",
    city: "Bangalore",
    flag: "🇮🇳",
    globalRank: "#1 in India for Scientific Research",
    badgeClass: "badge-health",
    matchedCareerDomains: ["Technology", "Healthcare", "Engineering"],
    flagshipPrograms: [
      "M.Tech in Computational and Data Sciences (CDS)",
      "M.Tech in Artificial Intelligence & Robotics",
      "Center for BioSystems Science and Engineering (BSSE)",
      "M.Tech in Smart Grid & Renewable Energy Systems"
    ],
    entranceExams: ["GATE", "JEE Advanced / NEET", "JAM"],
    annualTuitionUSD: 1800,
    acceptanceRate: "0.5%",
    scholarshipsAvailable: true,
    notableFocus: "Premier scientific research university situated in the heart of Bangalore's Silicon Valley."
  },

  // --- CANADA ---
  {
    id: "univ-toronto",
    name: "University of Toronto",
    country: "Canada",
    city: "Toronto, ON",
    flag: "🇨🇦",
    globalRank: "#21 Worldwide (Top in Canada)",
    badgeClass: "badge-tech",
    matchedCareerDomains: ["Technology", "Healthcare", "Business & Finance"],
    flagshipPrograms: [
      "Master of Science in Applied Computing (MScAC - AI track)",
      "Master of Health Informatics (MHI)",
      "Master of Financial Risk Management (MFRM)",
      "B.A.Sc. in Engineering Science (Robotics)"
    ],
    entranceExams: ["High School Diploma / SAT", "IELTS / TOEFL", "GRE (Optional)"],
    annualTuitionUSD: 39500,
    acceptanceRate: "43.0%",
    scholarshipsAvailable: true,
    notableFocus: "Birthplace of modern deep learning; affiliated with the Vector Institute for AI."
  },

  // --- AUSTRALIA ---
  {
    id: "univ-melbourne",
    name: "University of Melbourne",
    country: "Australia",
    city: "Melbourne, VIC",
    flag: "🇦🇺",
    globalRank: "#14 Worldwide (Top in Australia)",
    badgeClass: "badge-business",
    matchedCareerDomains: ["Technology", "Healthcare", "Business & Finance", "Creative Arts"],
    flagshipPrograms: [
      "Master of Information Technology (Cybersecurity & AI)",
      "Master of Digital Infrastructure & Cloud Engineering",
      "Master of Business Analytics (Melbourne Business School)",
      "Master of Interaction Design & HCI"
    ],
    entranceExams: ["Bachelor's Degree", "IELTS (6.5+) / TOEFL"],
    annualTuitionUSD: 33800,
    acceptanceRate: "70.0%",
    scholarshipsAvailable: true,
    notableFocus: "Ranked #1 in Australia; strong post-study work visa pathways for international students."
  }
];
