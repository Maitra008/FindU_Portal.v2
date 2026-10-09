# FindU Public Portal — Documentation Index

This directory contains technical specifications, architectural decisions, verification logs, and engineering reports for the FindU Public Portal.

---

## Technical Specifications & Standards

1. [Visual Constitution & Design System Specification](./visual-constitution.md)
   * Defines the 3-token archival design system (`--paper: #FAF8F5`, `--ink: #141414`, `--accent: #C84B31`).
   * Details typography scale (`Newsreader`, `Inter`, `JetBrains Mono`), layout rules, and anti-trapping constraints.

2. [Visual Asset Strategy & Manifest Specification](./asset-manifest.md)
   * Outlines art direction, documentary realism guidelines, synthetic avatar tagging, and asset registry template.
   * Catalogs licensed architectural imagery and vector schematics.

3. [Claim Verification Register & Evidence Log](./claim-verification-register.md)
   * Comprehensive audit of biometric, performance, and governance claims.
   * Documents ArcFace embedding dimensions ($512$-D), decision threshold ($\theta = 0.8900$), Wilson Score confidence intervals, and EU AI Act Article 14 human oversight alignment.

---

## Phase Execution & Quality Reports

4. [Phase P11: Performance, Security & Production Hardening Report](./phase-11-hardening-report.md)
   * Zero-runtime dependency AST audit, script injection prevention, and bundle chunk splitting metrics.
   * Deployment headers and Content-Security-Policy configurations for Cloudflare Pages, Netlify, and Vercel.

5. [Phase P12: Theme Toggle & Visual Polish Report](./phase-12-final-report.md)
   * Resolution of methodology stage text overflow and human review panel button wrapping.
   * Adaptive light/dark theme engine implementation (`data-theme="dark"`), anti-flash hydration, and `localStorage` persistence.

