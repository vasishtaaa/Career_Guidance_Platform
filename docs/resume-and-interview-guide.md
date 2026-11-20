# Resume & Interview Talking Points Guide
**Career Guide**  
*Technologies: TypeScript, HTML5, CSS3 (CSS Grid Architecture), Web Architecture*

---

## 1. Resume Bullet Points (Tailored by Role)

### Option A: Front-End / Web Developer Focus
> • **Customized Digital Guidance Platform (2025)** | *TypeScript, HTML5, CSS3 (CSS Grid), Web Architecture*  
> – Architected a responsive Multi-Page Application (MPA) delivering personalized career roadmaps and higher education discovery across 10+ global universities and 5 disciplines.  
> – Designed an advanced CSS Grid design system comprising a 12-column Bento Box executive showcase, sticky dual-column filter workspaces, and adaptive auto-fill card directories.  
> – Implemented client-side geolocation detection via browser Intl APIs to dynamically convert and format salary bands and university tuition across 10 international currencies (INR, USD, EUR, GBP, CAD, etc.).  
> – Enforced 100% strict type safety using TypeScript (`Career`, `College`, `QuizQuestion`, `AppState`), eliminating runtime type errors and powering automated `tsc` build pipelines.

---

### Option B: Software Engineer / Full-Stack Focus
> • **Customized Digital Guidance Platform (2025)** | *TypeScript, ES2022, CSS Grid Architecture, LocalStorage*  
> – Engineered a modular guidance engine utilizing 5-dimensional vector cosine matching to score student aptitude compatibility, outputting ranked career tracks with sub-second latency.  
> – Structured a split-view roadmap tracker pairing phase-by-phase interactive milestone checklists with matched global university degree programs.  
> – Developed an offline-first storage adapter using browser LocalStorage with custom JSON export/import pipelines, ensuring user data privacy and zero server overhead.

---

### Option C: High-Impact STAR Format (Situation - Task - Action - Result)
> • **Customized Digital Guidance Platform (2025)**  
> – **Situation & Task**: High school and undergraduate students lack an intuitive, structured platform to align cognitive interests with both global university degrees and actionable industry milestones.  
> – **Action**: Built a production-grade web application with TypeScript and modern CSS Grid architecture, engineering a 4-step assessment quiz, real-time localized currency exchange engine, and global university finder.  
> – **Result**: Delivered a 100% type-safe, responsive application featuring sub-second compatibility scoring, auto-detection of regional currencies, and local JSON profile portability.

---

## 2. Technical Interview Talking Points ("The Why")

### Q1: "Why did you migrate to TypeScript and how did you configure the build pipeline?"
* **Answer**:  
  *"As the application grew to support complex multi-dimensional scoring vectors, global college databases with entrance exams, and currency exchange structures, type safety became essential.  
  I structured the codebase with strict TypeScript interfaces in `src/types/index.ts` covering `Career`, `College`, `QuizOption`, and `AppState`. The `tsconfig.json` compiles ES2022 modules directly into `js/`, maintaining zero-bundle native ES module performance in modern browsers while giving developers compile-time type validation via `npm run build` (`tsc`)."*

### Q2: "How did you implement CSS Grid across the application?"
* **Answer**:  
  *"Rather than relying on generic flexbox containers, I engineered distinct architectural grid systems in `css/grid-layout.css`:  
  1. **12-Column Bento Box Grid** on the homepage (`grid-template-columns: repeat(12, 1fr)`) with asymmetric cell spans (e.g., 8-column hero banner paired with a 4-column live currency stat tile).  
  2. **Dual-Column Explorer Layout** (`grid-template-columns: 280px 1fr`) pairing a sticky filter sidebar with an auto-fill card directory (`minmax(320px, 1fr)`).  
  3. **Split-Screen Roadmap View** (`grid-template-columns: 1.4fr 1fr`) displaying sequential milestones alongside sticky degree courses.  
  All grid layouts collapse smoothly to single-column streams on tablets and mobile screens using media queries."*

### Q3: "How does the worldwide currency localization work?"
* **Answer**:  
  *"The platform uses zero external API calls for location privacy. Upon initialization, `modules/currency.ts` probes `Intl.DateTimeFormat().resolvedOptions().timeZone` and `navigator.language`. If it detects an Indian timezone/locale, it resolves `INR (₹)`; if London, `GBP (£)`; if Continental Europe, `EUR (€)`; with fallback to `USD ($)`.  
  Exchange rates normalize all tuition and compensation values via `Intl.NumberFormat`. When a user toggles the header currency selector, a custom DOM event (`currency_changed`) fires, re-rendering all financial values across cards without a full page refresh."*

---

## 3. Two-Minute Live Demonstration Script

1. **Homepage (`index.html`)**:
   - Showcase the **12-Column Bento Grid Layout**: asymmetric feature cards, live regional currency badge, and global college network tile.
2. **Global Currency Toggle**:
   - Click the currency selector in the header (e.g. switch between **INR (₹)** and **USD ($)** or **EUR (€)**).
   - Point out how all compensation estimates instantly reformat with localized currency symbols.
3. **Colleges & Universities (`colleges.html`)**:
   - Browse top global institutions (MIT, Oxford, ETH Zurich, IIT Bombay, NUS).
   - Filter by region (e.g. "India" or "United Kingdom") or search for "Robotics": notice the tuition displayed in the active currency.
4. **Roadmap Split-Screen (`roadmap.html`)**:
   - Showcase the split-view CSS Grid: milestone checklist on the left, matching university programs on the right.
   - Check off a milestone to demonstrate live progress tracking.
5. **Codebase & TypeScript**:
   - Highlight the clean separation in `src/` (`types/`, `modules/`, `data/`, `pages/`) and run `npm run build` to show strict TypeScript compilation.
