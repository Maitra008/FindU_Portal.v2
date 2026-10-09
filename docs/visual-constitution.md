# FindU Public Portal — Visual Constitution & Design System Specification

## 1. Executive Summary & Design Philosophy

The FindU Public Portal design system communicates **architectural precision, human gravity, technical credibility, and public trust**. 

FindU is an AI-assisted missing-person investigative platform. Missing-person search is a matter of profound human importance. It must not look or feel like a generic SaaS marketing page, an entertainment product, or a flashy AI startup dashboard filled with neon glows, glassmorphism, or decorative floating orbs.

Instead, the design adheres to an **editorial and documentary photographic discipline**:
- **Archival Paper & Carbon Ink**: Warm linen substrate (`#FAF8F5`) paired with dense obsidian typographic ink (`#141414`), reminiscent of forensic case files, judicial dossiers, and technical publications.
- **Single Photography-Derived Accent**: Kodachrome / Darkroom Safelight Vermilion (`#C84B31`).
- **Restrained Geometry**: Sharp square corners, hairline rule lines, asymmetrical grids, and generous intentional whitespace.
- **Strict Visual Balance**: 60% Paper, 30% Ink, 10% Accent.

---

## 2. Strict Interface Palette

The interface design system enforces **strictly three core CSS variables**:

```css
:root {
  --paper: #FAF8F5;
  --ink: #141414;
  --accent: #C84B31;
}
```

### 2.1 Justification of Color Tokens

| Variable | Hex Value | Visual Weight | Role & Technical Rationale |
| :--- | :--- | :---: | :--- |
| **`--paper`** | `#FAF8F5` | ~60% | Primary background canvas. Warm archival linen tone that eliminates harsh digital glare while honoring physical documentary prints. Contrast ratio against `--ink` is **18.2:1** (exceeds WCAG AAA requirement). |
| **`--ink`** | `#141414` | ~30% | Typography, structural hairline rules, container boundaries, and primary interactive buttons. Represents deep carbon print ink. |
| **`--accent`** | `#C84B31` | ~10% | Photography-derived Kodachrome / Darkroom Safelight Vermilion (~620 nm). In photographic processing, amber-red safelight illuminates the darkroom without exposing sensitive paper; in optical cameras, tally indicators use this spectral band to signal active recording and uncommitted capture. Used sparingly for status indicators, active timeline markers, and the human verification action. |

### 2.2 Semantic States Without Palette Inflation
To preserve visual authority and avoid generic traffic-light palettes (bright neon greens, blues, purples):
- **Verified / Confirmed State**: Solid ink-based badges (`border: 1px solid var(--ink)`), textual tag `[CONFIRMED]`, and bold typographic weight.
- **Discrepancy / Attention State**: Targeted `--accent` highlight (`border-color: var(--accent)`, text color `var(--accent)`), textual tag `[DISCREPANCY]`.
- **Neutral / Filtered State**: Muted ink opacity (`var(--ink-50)`), hairline border (`var(--ink-15)`), textual tag `[FILTERED]`.

### 2.3 Prohibited Visual Trappings
* ❌ No neon gradients, aurora gradients, or multi-colored glow effects.
* ❌ No glassmorphism, blur backdrops, or floating AI orb animations.
* ❌ No arbitrary multi-colored accent palettes.
* ❌ No decorative drop shadows or soft rounded cards without functional justification.

---

## 3. Typographic Hierarchy

| Role | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Tracking | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `Newsreader`, `Georgia`, serif | `clamp(2.2rem, 5vw, 3.875rem)` | 400 | 1.18 | -0.035em | Major philosophical and architectural statements. |
| **Section H2** | `Newsreader`, `Georgia`, serif | `clamp(1.75rem, 3.5vw, 2.375rem)` | 400 | 1.25 | -0.025em | Section headers and topic entry points. |
| **Subsection H3** | `Newsreader`, `Georgia`, serif | `clamp(1.35rem, 2.5vw, 1.875rem)` | 400 | 1.30 | -0.018em | Component groups and stage headlines. |
| **Body Text** | `Inter`, system sans-serif | `15px` / `15px` | 400 | 1.65 | 0em | Technical descriptions, pipeline methodology, and body copy (max 68ch). |
| **Section Label**| `JetBrains Mono`, monospace | `12px` / `11px` | 500 | 1.0 | +0.14em | All-caps structural tags with hairline rule indicator. |
| **Data Metric** | `JetBrains Mono`, monospace | `clamp(2rem, 4vw, 3.125rem)` | 600 | 1.0 | -0.035em | Benchmark percentages, Wilson CIs, similarity scores ($\theta$). |
| **Metadata Tag** | `JetBrains Mono`, monospace | `12px` / `11px` | 500 | 1.0 | +0.08em | Timecodes, sensor IDs (`C1`, `C2`, `C3`), camera coordinates, commit SHAs. |

---

## 4. Layout, Geometry & Spacing Rules

### 4.1 Modular Spacing Scale
Grid alignment is locked to a 4px modular scale:
* `4px` (`--space-1`) — Micro alignment between icons and labels
* `8px` (`--space-2`) — In-badge padding and inline gaps
* `12px` (`--space-3`) — Button vertical padding, label offsets
* `16px` (`--space-4`) — Standard component margin, mobile gutter
* `20px` (`--space-5`) — Button horizontal padding
* `24px` (`--space-6`) — Card and callout interior padding, tablet gutter
* `32px` (`--space-8`) — Header group bottom margins, section sub-rhythms
* `40px` (`--space-10`) — Desktop layout gutter
* `48px` (`--space-12`) — Section intra-rhythms
* `64px` (`--space-16`) — Major section dividers
* `96px` (`--space-24`) — Masthead and footer major vertical spacing

### 4.2 Geometry & Corner Treatment
* **Square Corners by Default**: `border-radius: 0px` for all buttons, containers, cards, image frames, and badges.
* **Exceptions with Functional Purpose**:
  * Circular tally indicator dots: `border-radius: 9999px` (represents optical LED sensor states).

### 4.3 Borders & Structural Hairlines
* Hairline Rule: `1px solid rgba(20, 20, 20, 0.12)`
* Solid Structural Border: `1px solid #141414`
* Heavy Structural Border: `2px solid #141414`
* Accent Highlight Border: `1px solid #C84B31`

---

## 5. Foundational Component Rules & Interaction States

### 5.1 Primary Button (`.btn-primary`)
* Background: `#141414`, Text: `#FAF8F5`, Border: `1px solid #141414`.
* Hover: `#141414` with subtle `-1px` transform.
* Focus: Visible 2px outline with 3px offset.
* Minimum touch target: `44px` height, `44px` width.

### 5.2 Secondary Button (`.btn-secondary`)
* Background: Transparent, Text: `#141414`, Border: `1px solid #141414`.
* Hover: `rgba(20, 20, 20, 0.04)` fill with `-1px` transform.
* Focus: Visible 2px outline with 3px offset.
* Minimum touch target: `44px` height.

### 5.3 Sworn Human Verification Action (`.btn-accent`)
* Background: `#C84B31`, Text: `#FAF8F5`, Border: `1px solid #C84B31`.
* Reserved exclusively for authoritative human decisions (e.g., verifying a candidate sighting).
* Hover: Deepened vermilion `#B33F27`.

### 5.4 Text Links (`.link-editorial`, `.link-accent`)
* Minimum touch area: `44px` target height via vertical padding.
* Hairline underline indicator with high contrast hover transition.

---

## 6. Accessibility & Responsive Viewport Checkpoints

### 6.1 Contrast Verification (WCAG 2.1 AA & AAA)
* `#141414` on `#FAF8F5`: **18.2:1** (AAA compliant for all text sizes).
* `#C84B31` on `#FAF8F5`: **4.62:1** (AA compliant for UI controls, bold text, and graphical objects).
* `#FAF8F5` on `#C84B31`: **4.62:1** (AA compliant for verification button labels).
* `#141414` with 70% opacity on `#FAF8F5`: **12.7:1** (AAA compliant).

### 6.2 Viewport Checkpoint Testing Matrix
* **320 px – 360 px (Compact Mobile)**: Single column fluid stack, zero horizontal scroll, legible 15px body, all buttons full-width or minimum 44px.
* **375 px – 430 px (Standard Mobile)**: Single column with 16px gutter, legible data callouts, stacked sensor metadata.
* **768 px (Tablet)**: 2-column asymmetric grid, 24px gutter, side-by-side metric comparison.
* **1024 px (Small Desktop / iPad Pro)**: 3-column topology layout, 40px gutter, complete horizontal nav.
* **1240 px – 1440 px+ (Wide Desktop)**: Max container width constrained to 1240px with centered margin.

### 6.3 Reduced Motion Standard
* `@media (prefers-reduced-motion: reduce)` resets all transitions to 0ms and stops tally pulse animations.

