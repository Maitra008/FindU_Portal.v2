# FindU Public Portal

> **Architectural Specification & Interactive Forensic Investigation Demonstration**  
> Standalone public technical portal for FindU — an AI-assisted missing-person multi-camera search and verification platform.

[![CI Status](https://img.shields.io/badge/tests-76%20passed-brightgreen.svg)](#test-lint-and-typecheck)
[![TypeScript](https://img.shields.io/badge/typescript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-6.2-646cff.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)

---

## 1. Project Overview

**FindU Public Portal** is the official standalone technical documentation portal and client-side simulation workspace for the FindU platform. It transparently presents the mathematical methodology, distributed systems architecture, empirical validation metrics, and ethical oversight framework underlying multi-camera biometric search in municipal transit networks.

The portal provides an interactive, hands-on demonstration of a spatio-temporal missing-person investigation without requiring backend compute or live camera connectivity.

---

## 2. Problem Statement

Locating missing children and vulnerable individuals in high-throughput municipal environments (such as transit terminals, train stations, and public plazas) presents critical operational challenges:

* **Severe Manual Video Triage Delays:** Security personnel must manually scrub through dozens of disconnected RTSP video feeds, losing critical hours during early response windows.
* **Cognitive Fatigue & High False-Identification Rates:** Human visual search fatigue degrades detection fidelity over prolonged observation periods.
* **Risks of Unconstrained Mass Surveillance:** Traditional algorithmic surveillance systems risk persistent citizen tracking, biometric over-collection, and lack of accountability.
* **Fragmented Auditability:** Ad-hoc operator reviews fail to produce tamper-evident forensic audit trails suitable for judicial review or oversight scrutiny.

FindU addresses these challenges by replacing continuous human monitoring with **ephemeral 1.5-second buffer evaluation**, **frozen false-positive-suppression thresholds ($\theta = 0.8900$)**, **transit-velocity physical plausibility gating**, and **strict sworn-human-in-the-loop authorization gates**.

---

## 3. Purpose & Intended Audience

The portal serves as an authoritative architectural reference for:

* **Systems & Computer Vision Engineers:** Reviewing the 8-stage facial recognition and vector retrieval pipeline.
* **Public Transit & Infrastructure Operators:** Evaluating distributed edge node processing and network bandwidth requirements.
* **Governance & Oversight Bodies:** Auditing human oversight mechanisms, EU AI Act Article 14 alignment, and privacy-preserving design constraints.
* **Academic & Forensic Researchers:** Inspecting empirical test cohort metrics, Wilson Score confidence intervals, and dataset anomaly disclosures.

---

## 4. Key Features

* **Spatio-Temporal Investigation Simulator:** An interactive sandbox recreating synthetic incident `#FU-2026-084` across three distributed camera nodes (`C1 North Gate`, `C2 Terminal Plaza`, `C3 South Concourse`).
* **8-Stage Pipeline Breakdown:** Granular architectural walkthrough from reference image enrollment through FAISS index lookup to sworn human verification.
* **Split-Authority Governance Matrix:** Strict demarcation between algorithmic candidate discovery and exclusive sworn-human lead authorization.
* **Empirical Validation Dashboard:** Audited benchmarks reporting precision, recall, false positive rates, and Wilson Score confidence intervals alongside dataset mirroring disclosures.
* **Adaptive Theme Engine (Light/Dark):** High-contrast archival design system supporting light paper (`#FAF8F5`) and dark carbon (`#121212`) palettes with local storage persistence and zero hydration flicker.
* **Zero-Runtime Dependency Client Architecture:** 100% client-side execution with zero external analytics, zero tracking cookies, and zero background network calls.

---

## 5. Technical Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [React](https://react.dev/) | 19.0.0 | Declarative UI and component state management |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.7.3 | Static typing, contract enforcement, and strict compilation |
| **Bundler & Tooling** | [Vite](https://vitejs.dev/) | 6.2.1 | Fast HMR development server and Rollup production bundling |
| **Testing** | [Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/) | 3.0.8 / 16.2.0 | Unit, integration, responsive, and regression test suites |
| **Styling** | Pure CSS Custom Properties | Modern CSS | 3-token design system (`--paper`, `--ink`, `--accent`) |
| **Icons** | [Lucide React](https://lucide.dev/) | 1.16.0 | Minimalist iconography |

---

## 6. Project Architecture Overview

### Production Systems Architecture (Underlying FindU Platform)

```
[ CCTV Edge Nodes ] ──(RTSP Subsampled @ 2 FPS)──> [ SCRFD Detection & Quality Pre-Filter ]
                                                              │
                                                              ▼
[ Sworn Officer Queue ] <── [ Temporal & Velocity Gate ] <── [ ArcFace 512-D + FAISS Index ]
         │
         ▼
[ Authorized Lead or Dismissed Record ] ──> [ Tamper-Evident Audit Stream ]
```

1. **Ingestion & Edge Pre-Filtering:** 2.0 FPS subsampled video ingestion over volatile 1.5-second RAM buffers.
2. **Face Detection & Normalization:** SCRFD bounding box localization and 5-point facial landmark affine alignment.
3. **Hyperspherical Identity Embedding:** ArcFace ResNet-100 FP16 producing unit-normalized vectors $u \in \mathbb{S}^{511} \subset \mathbb{R}^{512}$.
4. **Sub-Millisecond Vector Retrieval:** FAISS `IndexFlatIP` inner-product search against enrolled reference templates.
5. **Consensus & Physical Plausibility Gating:** Multi-frame temporal consensus and inter-camera transit velocity filter ($v \le 2.5\text{ m/s}$).
6. **Governance & Sworn Authorization:** Dual-control human verification panel requiring affirmative officer badge approval.

### Public Portal Application Structure

```
FindU-Portal v2/
├── .gitignore                      # Git exclusion rules (build artifacts, caches, secrets)
├── .env.example                    # Environment variable documentation
├── LICENSE                         # MIT License
├── README.md                       # Repository master documentation
├── index.html                      # HTML root with anti-flash hydration script
├── package.json                    # Project dependencies and script declarations
├── package-lock.json               # Deterministic dependency lockfile
├── tsconfig.json                   # Strict TypeScript compiler configuration
├── vercel.json                     # Vercel security headers and routing configuration
├── vite.config.ts                  # Vite build and manual chunking configuration
├── vitest.config.ts                # Vitest test runner configuration
├── docs/                           # Architectural, audit, and quality documentation
│   ├── README.md                   # Documentation index
│   ├── asset-manifest.md           # Visual asset strategy and sourcing registry
│   ├── claim-verification-register.md # Empirical audit of biometric and performance claims
│   ├── phase-11-hardening-report.md# Production hardening and security header specifications
│   ├── phase-12-final-report.md    # Phase P12 theme toggle and visual polish report
│   └── visual-constitution.md      # Visual design constitution and 3-token rules
├── public/                         # Static assets served at root
│   ├── _headers                    # Cloudflare Pages / Netlify security headers
│   ├── _redirects                  # Single Page Application SPA fallback rules
│   ├── favicon.svg                 # Architectural brand mark
│   └── assets/
│       └── hero-transit-concourse.jpg # Hero architectural photography
├── src/                            # Application source code
│   ├── main.tsx                    # React application entry point with ThemeProvider
│   ├── App.tsx                     # Main layout orchestration
│   ├── contexts/
│   │   └── ThemeContext.tsx        # Light/Dark mode context with localStorage persistence
│   ├── data/
│   │   └── demoScenario.ts         # Synthetic incident scenario data (#FU-2026-084)
│   ├── styles/
│   │   ├── base.css                # Base typographic and layout resets
│   │   ├── components.css          # Modular component styles
│   │   ├── index.css               # Global style imports
│   │   └── tokens.css              # 3-token design system and dark theme definitions
│   └── components/
│       ├── layout/                 # Structural navigation, header, footer, containers
│       ├── sections/               # Semantic page sections (Hero, Problem, Investigation,
│       │                           # Methodology, Architecture, Validation, Closing)
│       └── investigation/          # Interactive forensic investigation demo modules
└── tests/                          # Automated Vitest test suites (76 tests across 12 files)
```

---

## 7. Prerequisites

* **Node.js:** `v18.0.0` or higher (Node `v20.x` LTS or `v22.x` recommended)
* **npm:** `v9.0.0` or higher

---

## 8. Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/Maitra008/FindU_Portal.v2.git
cd FindU_Portal.v2

# Install dependencies deterministically
npm install
```

---

## 9. Local Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

By default, the application will be accessible at:
```
http://localhost:5173
```

---

## 10. Production Build & Preview

Generate optimized static assets and preview the production build locally:

```bash
# Compile TypeScript and bundle production assets with Vite
npm run build

# Preview the production build locally
npm run preview
```

Production output is compiled into the `dist/` directory, optimized into granular chunks:
* `dist/assets/vendor-[hash].js`: React 19 core and DOM runtime
* `dist/assets/icons-[hash].js`: Lucide React icon vectors
* `dist/assets/index-[hash].js`: Application components and simulation data
* `dist/assets/index-[hash].css`: Unified stylesheet

---

## 11. Test, Lint, and Typecheck

Execute the automated test and quality verification suite:

```bash
# Run all Vitest test suites (76 tests across 12 suites)
npm test

# Run tests in interactive watch mode
npm run test:watch

# Execute TypeScript strict type checking
npm run lint
```

### Automated Test Coverage Summary
* `page-framework.test.tsx`: Semantic landmarks, skip-link, and section anchor IDs
* `hero-navigation.test.tsx`: Navigation interactions, HUD overlays, and mobile drawer accessibility
* `problem-narrative.test.tsx`: 3-act problem narrative, workflow switcher, and authority matrix
* `investigation-demo.test.tsx`: Investigation workspace node switching, timeline scrubbing, and sworn officer authorization
* `methodology-architecture.test.tsx`: 8-stage interactive stepper and 4-layer architecture stack
* `validation-responsible-use.test.tsx`: Wilson Score confidence intervals, dataset anomaly disclosures, and ethical boundaries
* `cross-device-responsiveness.test.tsx`: Viewport testing across 320px, 375px, 412px, 768px, 1024px, and 1440px
* `production-hardening.test.tsx`: Zero innerHTML scan, reverse tabnabbing checks, and chunk splitting validation
* `p12-theme-toggle.test.tsx`: Theme switcher, dark mode persistence, stage label overflow checks, and button wrapping

---

## 12. Theme Toggle Behaviour

The portal features an adaptive theme toggle adhering to the strict **3-token design constitution**:

* **Light Mode (Archival Paper):**
  * `--paper: #FAF8F5` (warm archival linen background)
  * `--ink: #141414` (carbon print typography and hairline rules)
  * `--accent: #C84B31` (Kodachrome safelight vermilion)
* **Dark Mode (Carbon Night):**
  * `--paper: #121212` (dense carbon substrate)
  * `--ink: #F0EDE6` (warm off-white typography)
  * `--accent: #E05A3E` (adjusted optical safelight)
* **Preference Persistence:** Automatically synchronizes with `localStorage.getItem('findu-theme')` and respects system preferences (`prefers-color-scheme`).
* **Zero-Flicker Hydration:** An inline anti-flash script in `index.html` evaluates the saved theme before the DOM paints, preventing flash-of-unstyled-content (FOUC).
* **State Preservation:** Toggling themes does not reset the active investigation simulator state or active stage selection.

---

## 13. Simulated Investigation Demonstration

The portal features a live, client-side interactive investigation workspace based on synthetic incident `#FU-2026-084`:

* **Incident Context:** Synthetic missing person test subject **Alex Mercer** (`ID: SYN-084`, Age: 9).
* **Multi-Node Telemetry:** Users can toggle between three camera nodes:
  * **Node C1 (North Concourse Gate):** Initial transit sighting; low bounding-box resolution.
  * **Node C2 (Terminal Central Plaza):** Candidate match with similarity score $S = 0.9234$ exceeding the decision threshold ($\theta = 0.8900$).
  * **Node C3 (South Platform Link):** Transit continuation; velocity gate validation.
* **Forensic Probe Slate:** Displays detected face crops, aligned landmark crops, Euclidean similarity metrics, and confidence indicators.
* **Transit Velocity Filter:** Demonstrates physical plausibility checking ($v = 1.34\text{ m/s} \le 2.50\text{ m/s}$ walking speed gate).
* **Human Verification Gate:** Simulates sworn officer decision-making with dedicated badge authorization (`#704`) and lead dismissal, dynamically appending entries to an immutable audit stream.

*Note: All images, names, and telemetry in the demonstration are synthetic and constructed solely for technical evaluation.*

---

## 14. Responsible-Use Principles & Known Limitations

### Responsible-Use Principles

1. **Purpose Limitation:** Exclusively intended for locating missing children, vulnerable seniors, and endangered persons under active legal missing-person reports. Never for general surveillance or crowd monitoring.
2. **Mandatory Human-in-the-Loop:** Algorithms produce prioritized candidate leads; only sworn human officers hold authorization to trigger field deployment.
3. **Ephemeral Ingestion Buffering:** Edge buffers operate on a 1.5-second sliding RAM window. Unflagged frames are permanently discarded without persistent storage.
4. **Conservative Decision Threshold ($\theta = 0.8900$):** Operating threshold is frozen to enforce a 0.0% false-positive rate in the evaluation cohort.
5. **No Continuous Mass Surveillance Storage:** Video feeds are not centrally recorded or indefinitely archived.
6. **Transparent Auditing:** Every algorithmic lead, score, and officer review action generates a timestamped, tamper-evident audit record.

### Known Technical Limitations

* **Benchmark Evaluation Scope:** Quantitative metrics are derived from a controlled 110-pair evaluation cohort ($n=20$ positive probes, $n=90$ negative impostor pairs).
* **Conservative Recall:** Operating at $\theta = 0.8900$ prioritizes false-positive suppression, yielding 45.0% recall (95% Wilson Score CI: 25.8%–65.8%). 55% of genuine probes in challenging angles fail retrieval.
* **Demographic Parity:** Demographic fairness across racial, gender, and age subgroups has not been independently measured in current benchmark sets.
* **Hardware Benchmarks:** Measured latency figures (< 15 ms detection, < 28 ms embedding) reflect NVIDIA RTX 3060 TensorRT FP16 workstations; edge CPU devices will exhibit higher latency.
* **Research Prototype Status:** FindU is an architectural research prototype and has not been deployed in municipal law enforcement operations.

---

## 15. Environment Configuration

The FindU Public Portal is an entirely client-side application requiring **zero backend servers, databases, or API keys**.

An example configuration file is provided in [`.env.example`](./.env.example):

```bash
# Optional base URL configuration for custom sub-path hosting
VITE_BASE_URL=/
```

---

## 16. Deployment Preparation

The project is pre-configured for automated static deployment across major edge platforms:

* **Cloudflare Pages & Netlify:** Pre-configured with [`public/_headers`](./public/_headers) (strict Content-Security-Policy, HSTS, X-Content-Type-Options) and [`public/_redirects`](./public/_redirects) (SPA routing).
* **Vercel:** Pre-configured with [`vercel.json`](./vercel.json) (header security policies and SPA rewrites).
* **Static Hosting (AWS S3 / GitHub Pages / NGINX):** Build output in `dist/` can be served directly by any web server configured with Single Page Application routing (rewriting 404 to `/index.html`).

---

## 17. Documentation Index

Detailed architectural and forensic reports are maintained in the [`docs/`](./docs/) directory:

* [`docs/README.md`](./docs/README.md) — Documentation index and reading guide.
* [`docs/visual-constitution.md`](./docs/visual-constitution.md) — Visual design rules, typography hierarchy, and 3-token constraints.
* [`docs/claim-verification-register.md`](./docs/claim-verification-register.md) — Claim verification register and empirical audit log.
* [`docs/asset-manifest.md`](./docs/asset-manifest.md) — Asset sourcing strategy, architectural photography standards, and asset registry.
* [`docs/phase-11-hardening-report.md`](./docs/phase-11-hardening-report.md) — Phase P11 performance and security hardening verification report.
* [`docs/phase-12-final-report.md`](./docs/phase-12-final-report.md) — Phase P12 theme toggle implementation and visual defect resolution report.

---

## 18. Licensing & Asset Attribution

* **Software License:** Licensed under the [MIT License](./LICENSE). Copyright &copy; 2026 Partho Maitra.
* **Asset Attributions:** Architectural photography and vector schematics conform to open public domain licenses or bespoke project licensing as cataloged in the [Asset Manifest](./docs/asset-manifest.md).
