export const CAREERS_DATA = [
    // --- 1. TECHNOLOGY ---
    {
        id: "tech-ai-engineer",
        title: "AI & Machine Learning Engineer",
        domain: "Technology",
        badgeClass: "badge-tech",
        description: "Architects, trains, and deploys intelligent models and neural architectures to solve complex computational and operational challenges.",
        minSalaryUSD: 120000,
        maxSalaryUSD: 185000,
        growthRate: "+32% (High Demand)",
        educationLevel: "Bachelor's or Master's in CS / Data Science",
        matchedCourseFields: ["Computer Science", "Artificial Intelligence", "Data Science & Analytics"],
        matchWeights: { technology: 0.95, analytical: 0.9, problemSolving: 0.9, leadership: 0.5, creative: 0.6 },
        skills: ["Python", "PyTorch / TensorFlow", "Vector Databases", "MLOps", "Model Fine-Tuning", "Mathematics & Statistics"],
        prerequisites: ["Strong linear algebra & calculus", "Proficiency in Python programming", "Basic understanding of data structures & algorithms"],
        milestones: [
            { id: "m1", title: "Core Mathematical Fundamentals", detail: "Master Python for Data Science, linear algebra, vector calculus, and statistical distributions." },
            { id: "m2", title: "Deep Learning & Neural Architectures", detail: "Train convolutional and transformer models from scratch using PyTorch with GPU acceleration." },
            { id: "m3", title: "RAG & Foundation Model Systems", detail: "Engineer Retrieval-Augmented Generation pipelines, vector embeddings, and parameter-efficient fine-tuning (PEFT/LoRA)." },
            { id: "m4", title: "Production MLOps & Inference Scale", detail: "Deploy quantized models to containerized cloud clusters (Docker, Kubernetes) with latency telemetry." }
        ],
        curatedResources: [
            { name: "DeepLearning.AI Specializations", type: "Certification Course" },
            { name: "Fast.ai Practical Deep Learning", type: "Interactive Course" },
            { name: "Hugging Face LLM Course", type: "Technical Guide" }
        ]
    },
    {
        id: "tech-cloud-architect",
        title: "Cloud Solutions Architect",
        domain: "Technology",
        badgeClass: "badge-tech",
        description: "Designs scalable, fault-tolerant, and secure enterprise cloud computing strategies and distributed microservice topologies.",
        minSalaryUSD: 130000,
        maxSalaryUSD: 190000,
        growthRate: "+24% (Very High)",
        educationLevel: "Bachelor's in CS, IT, or equivalent experience",
        matchedCourseFields: ["Computer Science", "Information Technology", "Cloud & Network Security"],
        matchWeights: { technology: 0.9, analytical: 0.85, problemSolving: 0.9, leadership: 0.7, creative: 0.4 },
        skills: ["AWS / GCP / Azure", "Terraform & IaC", "Kubernetes & Docker", "Network Security", "Disaster Recovery", "System Design"],
        prerequisites: ["Understanding of operating systems & networking (TCP/IP, DNS)", "Basic scripting (Bash/Python)"],
        milestones: [
            { id: "m1", title: "Networking & Linux Administration", detail: "Master Linux terminal commands, VPC configuration, subnets, and security groups." },
            { id: "m2", title: "Cloud Associate Certification", detail: "Achieve AWS Certified Solutions Architect or GCP Associate Cloud Engineer credential." },
            { id: "m3", title: "Infrastructure as Code (IaC)", detail: "Automate zero-downtime multi-region provisioning with Terraform and CI/CD pipelines." },
            { id: "m4", title: "Enterprise Resilience Auditing", detail: "Perform cost optimization, security hardening (Zero Trust), and chaos engineering tests." }
        ],
        curatedResources: [
            { name: "AWS Solutions Architecture Blueprint Library", type: "Official Docs" },
            { name: "HashiCorp Terraform Associate", type: "Certification" }
        ]
    },
    {
        id: "tech-cybersecurity-analyst",
        title: "Cybersecurity Defense Analyst",
        domain: "Technology",
        badgeClass: "badge-tech",
        description: "Protects critical organizational infrastructure, investigates threat vectors, performs vulnerability assessments, and implements defense-in-depth.",
        minSalaryUSD: 95000,
        maxSalaryUSD: 155000,
        growthRate: "+31% (Critical Demand)",
        educationLevel: "Bachelor's in Cybersecurity / Information Assurance",
        matchedCourseFields: ["Cybersecurity", "Computer Science", "Information Systems"],
        matchWeights: { technology: 0.85, analytical: 0.95, problemSolving: 0.9, leadership: 0.5, creative: 0.5 },
        skills: ["SIEM (Splunk, Elastic)", "Network Packet Analysis (Wireshark)", "Incident Response", "Penetration Testing", "Threat Modeling", "Compliance (SOC2, ISO 27001)"],
        prerequisites: ["Solid grasp of network protocols", "Understanding of ethical hacking principles and operating systems"],
        milestones: [
            { id: "m1", title: "Foundations of Network Defense", detail: "Obtain CompTIA Security+ or Cisco CCNA to solidify packet analysis and firewall principles." },
            { id: "m2", title: "SOC Operations & Threat Hunting", detail: "Monitor telemetry, detect anomaly beacons, and write Sigma/Suricata detection rules." },
            { id: "m3", title: "Red Team / Blue Team Drills", detail: "Participate in Capture The Flag (CTF) events and hands-on labs (TryHackMe / HackTheBox)." },
            { id: "m4", title: "Incident Response Playbook Design", detail: "Author automated incident mitigation runbooks for ransomware and credential stuffing." }
        ],
        curatedResources: [
            { name: "MITRE ATT&CK Framework Guide", type: "Industry Standard" },
            { name: "CompTIA Security+ Certification Path", type: "Credential" }
        ]
    },
    // --- 2. HEALTHCARE & BIOINFORMATICS ---
    {
        id: "health-biomedical-data-scientist",
        title: "Biomedical Data Scientist",
        domain: "Healthcare",
        badgeClass: "badge-health",
        description: "Analyzes genomics, clinical trial outcomes, and electronic health records (EHR) to accelerate precision therapeutics and medical discovery.",
        minSalaryUSD: 105000,
        maxSalaryUSD: 160000,
        growthRate: "+21% (Expanding)",
        educationLevel: "Master's or Ph.D. in Bioinformatics, Computational Biology, or Biostatistics",
        matchedCourseFields: ["Bioinformatics", "Biomedical Engineering", "Biostatistics", "Molecular Biology"],
        matchWeights: { technology: 0.8, analytical: 0.95, problemSolving: 0.85, leadership: 0.4, creative: 0.5 },
        skills: ["R & Bioconductor", "Python for Genomics", "Statistical Modeling", "Clinical Trial Protocols", "Next-Gen Sequencing (NGS)", "HIPAA Compliance"],
        prerequisites: ["Strong foundation in molecular biology/genetics", "Applied statistical analysis"],
        milestones: [
            { id: "m1", title: "Molecular Biology & R Programming", detail: "Gain command of tidyverse, Bioconductor packages, and statistical hypothesis testing." },
            { id: "m2", title: "NGS Pipeline Construction", detail: "Construct RNA-seq and variant-calling pipelines with Nextflow or Snakemake." },
            { id: "m3", title: "Clinical Data Governance & Standards", detail: "Study CDISC, FHIR, and OMOP Common Data Models for clinical trial reporting." },
            { id: "m4", title: "Precision Medicine Research Project", detail: "Publish or present predictive survival models based on TCGA patient cohorts." }
        ],
        curatedResources: [
            { name: "EMBL-EBI Bioinformatics Training", type: "Academic Portal" },
            { name: "NCBI Genomic Data Analysis", type: "Research Resource" }
        ]
    },
    {
        id: "health-informatics-specialist",
        title: "Healthcare Informatics Specialist",
        domain: "Healthcare",
        badgeClass: "badge-health",
        description: "Bridges clinical workflows and healthcare IT systems to improve patient safety, diagnostic accuracy, and hospital operational efficiency.",
        minSalaryUSD: 85000,
        maxSalaryUSD: 135000,
        growthRate: "+17% (Steady Growth)",
        educationLevel: "Bachelor's in Health Informatics, Nursing, or Health Information Management",
        matchedCourseFields: ["Health Informatics", "Healthcare Administration", "Public Health"],
        matchWeights: { technology: 0.65, analytical: 0.8, problemSolving: 0.8, leadership: 0.75, creative: 0.4 },
        skills: ["Epic / Cerner EHR Systems", "HL7 & FHIR Interoperability", "Healthcare Analytics", "Clinical Workflow Optimization", "Regulatory Compliance"],
        prerequisites: ["Understanding of healthcare systems", "Data literacy and process documentation skills"],
        milestones: [
            { id: "m1", title: "Medical Terminology & EHR Architecture", detail: "Understand clinical charting workflows, billing codes (ICD-10/CPT), and EHR databases." },
            { id: "m2", title: "FHIR API & Data Interoperability", detail: "Learn health data exchange standards (HL7 v2/v3, FHIR JSON schemas, DICOM)." },
            { id: "m3", title: "Clinical Decision Support Systems (CDSS)", detail: "Design automated alerting logic for drug interactions and sepsis risk detection." },
            { id: "m4", title: "Hospital Workflow Audit", detail: "Execute a user adoption study reducing physician burnout during EHR data entry." }
        ],
        curatedResources: [
            { name: "AMIA Health Informatics Roadmap", type: "Professional Association" },
            { name: "HL7 FHIR Official Specification", type: "Technical Standard" }
        ]
    },
    // --- 3. BUSINESS & FINANCE ---
    {
        id: "biz-product-manager",
        title: "Digital Product Manager",
        domain: "Business & Finance",
        badgeClass: "badge-business",
        description: "Drives product strategy from ideation to launch, aligning engineering teams, business stakeholders, and end-user requirements.",
        minSalaryUSD: 110000,
        maxSalaryUSD: 175000,
        growthRate: "+18% (High Demand)",
        educationLevel: "Bachelor's in Business, Engineering, or relevant discipline",
        matchedCourseFields: ["Business Administration (MBA)", "Management Information Systems", "Computer Science"],
        matchWeights: { technology: 0.6, analytical: 0.8, problemSolving: 0.9, leadership: 0.95, creative: 0.75 },
        skills: ["Product Roadmap Strategy", "User Journey Mapping", "Agile / Scrum Methodologies", "A/B Testing & Data Metrics", "Stakeholder Communication", "Go-To-Market (GTM)"],
        prerequisites: ["Strong cross-functional communication", "Analytical thinking and customer empathy"],
        milestones: [
            { id: "m1", title: "User Discovery & Market Research", detail: "Conduct user interviews, synthesize customer pain points, and define PRDs with clear KPIs." },
            { id: "m2", title: "Product Analytics & Funnels", detail: "Master cohort analysis, retention metrics, and funnel conversion using Mixpanel or Amplitude." },
            { id: "m3", title: "Cross-Functional Agile Execution", detail: "Lead sprint planning, grooming sessions, and technical trade-off decisions with engineers." },
            { id: "m4", title: "Feature Launch & Post-Mortem", detail: "Execute a phased product rollout with telemetry monitoring and ROI analysis." }
        ],
        curatedResources: [
            { name: "Reforge Product Strategy Series", type: "Executive Learning" },
            { name: "Pragmatic Institute Product Certification", type: "Credential" }
        ]
    },
    {
        id: "biz-quant-analyst",
        title: "Financial Quantitative Analyst",
        domain: "Business & Finance",
        badgeClass: "badge-business",
        description: "Develops mathematical trading strategies, risk mitigation models, and asset valuation algorithms for investment institutions.",
        minSalaryUSD: 125000,
        maxSalaryUSD: 210000,
        growthRate: "+15% (Competitive)",
        educationLevel: "Master's or Ph.D. in Financial Engineering, Mathematics, or Economics",
        matchedCourseFields: ["Financial Engineering", "Quantitative Finance", "Applied Mathematics", "Economics"],
        matchWeights: { technology: 0.75, analytical: 0.98, problemSolving: 0.9, leadership: 0.5, creative: 0.4 },
        skills: ["Python / C++", "Stochastic Calculus", "Time-Series Econometrics", "Monte Carlo Simulations", "Portfolio Optimization", "Financial Derivatives"],
        prerequisites: ["Advanced multivariable calculus and probability theory", "Statistical programming"],
        milestones: [
            { id: "m1", title: "Financial Mathematics & Derivatives", detail: "Deep dive into Black-Scholes pricing models, interest rate curves, and options greeks." },
            { id: "m2", title: "Time-Series Modeling & Backtesting", detail: "Build vectorized backtesting engines evaluating Sharpe, Sortino, and drawdown metrics." },
            { id: "m3", title: "Algorithmic Execution & Slippage", detail: "Simulate order book dynamics, market microstructure, and latency minimization." },
            { id: "m4", title: "Regulatory Risk Portfolio Audit", detail: "Compute Value at Risk (VaR), Stress Testing, and Basel III regulatory capital buffers." }
        ],
        curatedResources: [
            { name: "CFA Institute Quantitative Methods", type: "Curriculum" },
            { name: "QuantConnect Open Research Engine", type: "Interactive Platform" }
        ]
    },
    // --- 4. CREATIVE ARTS & DIGITAL MEDIA ---
    {
        id: "creative-uiux-architect",
        title: "UX/UI Product Designer",
        domain: "Creative Arts",
        badgeClass: "badge-creative",
        description: "Crafts intuitive, accessible, and delightful digital user interfaces, design systems, and seamless interactive product experiences.",
        minSalaryUSD: 85000,
        maxSalaryUSD: 145000,
        growthRate: "+16% (Strong)",
        educationLevel: "Bachelor's in HCI, Interaction Design, Graphic Design, or Portfolio",
        matchedCourseFields: ["Human-Computer Interaction (HCI)", "Interaction Design", "Digital Media & Web Design"],
        matchWeights: { technology: 0.55, analytical: 0.65, problemSolving: 0.8, leadership: 0.6, creative: 0.95 },
        skills: ["Figma & Design Systems", "Information Architecture", "Wireframing & Prototyping", "Usability Testing", "Accessibility (WCAG 2.1)", "HTML/CSS Basics"],
        prerequisites: ["Visual aesthetics and layout composition", "Empathy and observational research skills"],
        milestones: [
            { id: "m1", title: "User Research & Heuristic Evaluation", detail: "Analyze digital interfaces against Nielsen Norman Group usability heuristics." },
            { id: "m2", title: "Figma Component & Variable Systems", detail: "Build tokenized component libraries with auto-layout, variants, and interactive states." },
            { id: "m3", title: "Interactive Prototyping & User Testing", detail: "Run moderated user testing sessions, capturing task completion rate and SUS scores." },
            { id: "m4", title: "Design-to-Engineering Handoff", detail: "Write spec documents, CSS design tokens, and motion guidelines for front-end developers." }
        ],
        curatedResources: [
            { name: "Nielsen Norman Group UX Articles", type: "Research Foundation" },
            { name: "Interaction Design Foundation (IxDF)", type: "Courses" }
        ]
    },
    {
        id: "creative-game-designer",
        title: "Technical Game & Simulation Designer",
        domain: "Creative Arts",
        badgeClass: "badge-creative",
        description: "Blends creative narrative, game mechanics balance, and real-time interactive physics to create engaging game worlds and simulation engines.",
        minSalaryUSD: 75000,
        maxSalaryUSD: 130000,
        growthRate: "+14% (Competitive)",
        educationLevel: "Bachelor's in Game Design, Computer Science, or Interactive Media",
        matchedCourseFields: ["Game Design & Development", "Computer Science", "Interactive Simulation"],
        matchWeights: { technology: 0.7, analytical: 0.65, problemSolving: 0.75, leadership: 0.5, creative: 0.95 },
        skills: ["Unreal Engine / Unity", "C# / C++ Scripting", "Gameplay Mechanics & Balance", "Level Design & Lighting", "3D Asset Workflows (Blender)", "Player Psychology"],
        prerequisites: ["Visual storytelling ability", "Basic scripting/programming logic"],
        milestones: [
            { id: "m1", title: "Gameplay Prototyping Foundations", detail: "Build 2D and 3D playable prototypes focusing on responsive movement and player feedback." },
            { id: "m2", title: "Systems Design & Progression Math", detail: "Design game economy curves, combat math, and player reward loops in spreadsheets." },
            { id: "m3", title: "3D Level Architecture & Lighting", detail: "Build interactive game levels incorporating environmental storytelling and sightlines." },
            { id: "m4", title: "Playtesting & Performance Optimization", detail: "Profile draw calls, vertex counts, and frame rates for target hardware platforms." }
        ],
        curatedResources: [
            { name: "GDC (Game Developers Conference) Vault", type: "Conference Talks" },
            { name: "Unreal Engine Developer Community", type: "Tutorial Series" }
        ]
    },
    // --- 5. ENGINEERING & HARDWARE SYSTEMS ---
    {
        id: "eng-robotics-engineer",
        title: "Robotics & Autonomous Systems Engineer",
        domain: "Engineering",
        badgeClass: "badge-eng",
        description: "Develops autonomous mobile robots, robotic manipulators, sensor fusion algorithms, and embedded control loops.",
        minSalaryUSD: 105000,
        maxSalaryUSD: 165000,
        growthRate: "+22% (Rapid Expansion)",
        educationLevel: "Bachelor's or Master's in Robotics, Mechatronics, or Electrical Engineering",
        matchedCourseFields: ["Robotics Engineering", "Mechatronics", "Electrical Engineering", "Mechanical Engineering"],
        matchWeights: { technology: 0.9, analytical: 0.9, problemSolving: 0.95, leadership: 0.45, creative: 0.6 },
        skills: ["ROS / ROS 2", "C++ / Python", "Kinematics & Dynamics", "SLAM (Simultaneous Localization & Mapping)", "Sensor Fusion (LiDAR/IMU)", "Microcontrollers (RTOS)"],
        prerequisites: ["Rigid body mechanics and coordinate frame transformations", "Proficiency in modern C++"],
        milestones: [
            { id: "m1", title: "Embedded Systems & Sensor Interfacing", detail: "Write embedded C++ firmware reading IMU, encoders, and motor drivers via CAN/I2C." },
            { id: "m2", title: "Kinematic Simulation & ROS 2", detail: "Simulate mobile robot navigation and obstacle avoidance in Gazebo with Nav2." },
            { id: "m3", title: "LIDAR SLAM & State Estimation", detail: "Implement Extended Kalman Filters (EKF) and point-cloud scan matching algorithms." },
            { id: "m4", title: "Hardware-in-the-Loop Validation", detail: "Construct a physical differential-drive rover and benchmark trajectory tracking accuracy." }
        ],
        curatedResources: [
            { name: "ROS 2 Official Documentation", type: "Technical Framework" },
            { name: "Modern Robotics (Northwestern University)", type: "Video Lecture Series" }
        ]
    },
    {
        id: "eng-renewable-energy-engineer",
        title: "Renewable Energy Systems Engineer",
        domain: "Engineering",
        badgeClass: "badge-eng",
        description: "Designs, models, and optimizes clean energy generation grids, solar PV architectures, battery storage systems (BESS), and power distribution.",
        minSalaryUSD: 88000,
        maxSalaryUSD: 140000,
        growthRate: "+25% (Very High)",
        educationLevel: "Bachelor's in Electrical, Mechanical, or Energy Systems Engineering",
        matchedCourseFields: ["Renewable Energy Engineering", "Power Systems Engineering", "Environmental Engineering"],
        matchWeights: { technology: 0.75, analytical: 0.85, problemSolving: 0.9, leadership: 0.6, creative: 0.5 },
        skills: ["Power Systems Modeling (MATLAB/Simulink)", "Solar PV Design (PVsyst)", "Battery Energy Storage Systems (BESS)", "Grid Interconnection Standards", "Energy Yield Assessment", "AutoCAD Electrical"],
        prerequisites: ["Circuit analysis and thermodynamics", "Renewable energy technologies overview"],
        milestones: [
            { id: "m1", title: "Power Distribution & Circuit Analysis", detail: "Master AC/DC power flow, transformer sizing, and electrical single-line diagrams (SLD)." },
            { id: "m2", title: "Utility-Scale Solar & Wind Simulation", detail: "Model generation loss factors (soiling, shading, degradation) in PVsyst software." },
            { id: "m3", title: "Grid Storage (BESS) Integration", detail: "Design lithium-ion thermal management and power conversion system (PCS) controls." },
            { id: "m4", title: "Clean Energy Microgrid Capstone", detail: "Publish feasibility and payback financial models for a hybrid solar-storage microgrid." }
        ],
        curatedResources: [
            { name: "NREL (National Renewable Energy Lab) Tools", type: "Research Software" },
            { name: "IEEE Power & Energy Society Tutorials", type: "Technical Papers" }
        ]
    }
];
