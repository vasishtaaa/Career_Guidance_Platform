# Web Architecture & Technical Design Specification
**Career Guide**  
*Technologies: TypeScript, HTML5, CSS3 (CSS Grid Architecture), Web Architecture*

---

## 1. Executive Summary & Architectural Goals

The **Customized Digital Guidance Platform** is engineered as a high-performance, accessible, and privacy-first Multi-Page Application (MPA). Its primary mission is to deliver customized career discovery and higher education transition resources to students through real-time multi-dimensional assessment scoring, global university course matching, and automatic worldwide currency localization.

### Core Architectural Goals:
1. **Zero-Build Portability**: Executes natively in modern web browsers using standard ES6 modules without compilation or heavy toolchains.
2. **Worldwide Currency Localization**: Automatically detects the visitor's geographic region via browser `Intl` and timezone APIs, dynamically converting and formatting salary bands and college tuition in their native currency (INR, USD, EUR, GBP, CAD, AUD, JPY, SGD, AED, CHF).
3. **Global Higher Education Integration**: Seamlessly maps career paths to premier accredited universities and degree courses worldwide (USA, UK, Germany/Europe, Singapore, India, Canada, Australia, Japan) with entrance exam requirements and acceptance metrics.
4. **Defensive Data Sovereignty**: Operates client-first using an isolated LocalStorage adapter with JSON export/import capabilities.
5. **Token-Driven CSS3 Design System**: Implements unified design tokens via CSS custom properties, responsive Grid/Flexbox layouts, glassmorphic card overlays, and dynamic dark/light theming.

---

## 2. High-Level System Architecture

```mermaid
flowchart TD
    subgraph Presentation_Layer [Presentation Layer: Multi-Page UI]
        P1["index.html (Landing & Regional Stats)"]
        P2["assessment.html (4-Step Guidance Stepper)"]
        P3["explorer.html (Multi-Facet Filter & Search)"]
        P4["colleges.html (Global University & Course Finder)"]
        P5["roadmap.html (Sequential Milestone Checklist)"]
        P6["profile.html (Data Management & Portability)"]
    end

    subgraph Styling_Engine [CSS3 Design System]
        VARS["css/variables.css (Executive Tokens & Themes)"]
        BASE["css/base.css (Reset, Typography, Layout)"]
        COMP["css/components.css (Cards, Steppers, Timelines, Currency Picker)"]
        RESP["css/responsive.css (Mobile Breakpoints)"]
    end

    subgraph Controller_Layer [Page Controllers]
        PC1["home.js"]
        PC2["assessment.js"]
        PC3["explorer.js"]
        PC4["colleges.js"]
        PC5["roadmap.js"]
        PC6["profile.js"]
    end

    subgraph Core_Modules [Shared Logic & Utilities]
        NAV["modules/navigation.js (Drawer & Active Links)"]
        CURR["modules/currency.js (Geo-Detection & Exchange Converter)"]
        THM["modules/theme.js (OS Preference & Toggling)"]
        REC["modules/recommendation.js (Cosine Match Engine)"]
        STR["modules/storage.js (LocalStorage Adapter)"]
    end

    subgraph Data_Layer [Domain & State Models]
        D1["data/careers.js (Multi-Disciplinary Pathways)"]
        D2["data/colleges.js (Global Universities & Tuition)"]
        D3["data/quiz-questions.js (Weighted Dimensions)"]
        LS[("Browser LocalStorage (Encrypted / Isolated)")]
    end

    Presentation_Layer --> Styling_Engine
    Presentation_Layer --> Controller_Layer
    Controller_Layer --> Core_Modules
    Core_Modules --> Data_Layer
    STR <--> LS
```

---

## 3. Worldwide Currency & Geolocation Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor Visitor as Global Visitor
    participant Browser as Browser Client (Intl / Navigator)
    participant CurrencyEngine as modules/currency.js
    participant UI as Page Controller (explorer / colleges / roadmap)
    participant Store as modules/storage.js

    Visitor->>Browser: Opens web application
    CurrencyEngine->>Browser: Inspects Intl.DateTimeFormat().resolvedOptions().timeZone & navigator.language
    alt Detected Asia/Kolkata or -in
        CurrencyEngine->>CurrencyEngine: Resolves currency = INR (₹)
    else Detected Europe/London or -gb
        CurrencyEngine->>CurrencyEngine: Resolves currency = GBP (£)
    else Detected Continental Europe
        CurrencyEngine->>CurrencyEngine: Resolves currency = EUR (€)
    else Default
        CurrencyEngine->>CurrencyEngine: Resolves currency = USD ($)
    end
    CurrencyEngine->>Store: Persists active currency preference
    CurrencyEngine->>UI: Dispatches currency_changed event
    UI->>CurrencyEngine: formatCurrencyFromUSD(amountUSD, activeCurrency)
    UI->>Visitor: Renders salaries & university tuition in visitor's regional currency
```

---

## 4. Directory Structure

```
NP/
├── index.html                      # Landing, regional value prop & featured pathways
├── assessment.html                 # 4-Step interactive guidance stepper
├── explorer.html                   # Multi-facet search, domain filters & localized compensation
├── colleges.html                   # Global university finder, degree courses & tuition in local currency
├── roadmap.html                    # Sequential milestone checklist & matched colleges
├── profile.html                    # Saved bookmarks, past assessments & JSON portability
├── css/
│   ├── variables.css               # Design tokens, color scales & light/dark modes
│   ├── base.css                    # CSS reset, typography & layout containers
│   ├── components.css              # Cards, steppers, badges, buttons, timelines & currency picker
│   └── responsive.css              # Breakpoints (<992px, <768px, <480px)
├── js/
│   ├── data/
│   │   ├── careers.js              # Multi-disciplinary careers with numeric salary benchmarks
│   │   ├── colleges.js             # Global universities across 10+ countries with tuition & exams
│   │   └── quiz-questions.js       # 4-Step weighted assessment questions
│   ├── modules/
│   │   ├── currency.js             # Geolocation detection & exchange rate converter
│   │   ├── storage.js              # Storage Adapter (persistence & JSON portability)
│   │   ├── theme.js                # Dark/Light theme manager & OS listener
│   │   ├── navigation.js           # Responsive drawer, active links & currency dropdown
│   │   └── recommendation.js       # Cosine matching & scoring algorithm
│   └── pages/
│       ├── home.js                 # Homepage controller & dynamic banner
│       ├── assessment.js           # Quiz stepper & radar results controller
│       ├── explorer.js             # Live search, filters & bookmarking controller
│       ├── colleges.js             # Global university directory controller
│       ├── roadmap.js              # Timeline, checklist & matched courses controller
│       └── profile.js              # Student records & JSON export/import controller
├── docs/
│   ├── architecture.md             # Technical design specifications (this file)
│   └── resume-and-interview-guide.md # STAR resume bullet points & interview guide
└── README.md                       # Main documentation
```
