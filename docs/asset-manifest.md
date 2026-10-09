# FindU Public Portal — Visual Asset Strategy & Manifest Specification

## 1. Photography Art Direction

### 1.1 Core Principles
* **Documentary Realism**: Imagery must look like authentic archival surveillance photography, urban infrastructure, transit architecture, and forensic workstations.
* **Restrained & De-Sensationalized**: Strictly avoid dramatic, sensationalized, or fear-inducing imagery. No distressed faces, police sirens, or exploited vulnerable individuals.
* **Optical Discipline**: Mimic realistic camera sensor optics—natural lens distortion, real architectural lighting (fluorescent concourse, outdoor daylight, tunnel shadows), and monochrome/low-saturation toning that harmonizes with `--paper: #FAF8F5` and `--ink: #141414`.
* **Clear Demonstration Distinction**: Synthetic avatars and simulated scenarios (e.g. subject Alex Mercer `SYN-084`) must always be labeled with clear synthetic provenance tags (`SIMULATION`, `SYNTHETIC SUBJECT`).

---

## 2. Asset Sourcing Strategy

| Category | Permissible Use | Criteria & Provenance | Prohibitions |
| :--- | :--- | :--- | :--- |
| **1. Bespoke Synthetic Imagery** | Illustrating synthetic probe detection crops and test subjects (e.g. `SYN-084`). | Must be generated with explicit synthetic labeling; neutral head pose and documentary lighting. | Must **never** be presented as real missing individuals. |
| **2. Architectural & Transit Photography** | Establishing municipal infrastructure, concourse camera nodes, and public transit link topology. | Verifiable public domain (CC0) or Unsplash/Pexels open-access rights. High architectural quality. | No recognizable, unconsenting private citizens' faces in high detail. |
| **3. Authentic Repository Artifacts** | Direct empirical evidence: validation ROC curves, confusion matrices, architecture diagrams from `Maitra008/FindU`. | Exact replication of repo files (e.g. `roc_curve.png`, `similarity_by_condition.png`). | No manual tampering with benchmark graphs. |
| **4. Architectural SVG & Vector Schematics** | Network topology diagrams, 8-stage pipeline flow, sensor aperture icons. | Pure inline SVG conforming to `--paper`, `--ink`, and `--accent`. Zero external image dependencies. | No generic decorative icon libraries. |

---

## 3. Asset Manifest Specification & Registry Template

Every visual asset introduced into the repository must adhere to this structured manifest schema:

```text
Asset Identifier:       [e.g. ASSET-SURV-C2]
Filename:               [e.g. public/assets/c2-plaza-node.jpg]
Target Section:         [e.g. Interactive Demo / Topology Grid]
Purpose:                [e.g. Depicts CCTV node C2 Terminal Central Plaza]
Source / Generation:    [e.g. CC0 Architectural transit photography]
License / Rights:       [e.g. Creative Commons Zero / Open Public Domain]
Desktop Crop:           [e.g. 16:9 aspect ratio, 1200x675]
Mobile Crop:            [e.g. 4:3 aspect ratio, 600x450]
Accessibility Alt:      [e.g. Fixed wide-angle ceiling surveillance perspective of an airport central transit plaza with overhead terminal signage]
Optimization:           [e.g. WebP / AVIF, max 120 kB, responsive srcset]
```

### 3.1 Initial Asset Manifest (Phase P1 Approved Roster)

| Asset ID | Filename | Section & Purpose | Source & License | Crop (Desktop/Mobile) | Accessibility Alt Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ASSET-BRAND-FAVICON` | `public/favicon.svg` | Browser tab & masthead brand mark | Handcrafted SVG / MIT | 1:1 (32x32) | Architectural camera aperture and optical record tally mark. |
| `ASSET-HERO-CONCOURSE` | `public/assets/hero-transit-concourse.jpg` | Section 01 Hero architectural context | Bespoke AI architectural photo / Project License | Aspect 16:9 / 4:3 | High-angle documentary perspective of a modern municipal transit concourse with exposed concrete pillars, steel trusses, and natural overhead daylight across stone flooring. |
| `ASSET-SCHEM-PIPELINE` | `src/assets/pipeline-diagram.svg` | 8-Stage Architecture section | Architectural vector / MIT | Aspect 21:9 / 4:3 | Flowchart showing 8 stages from reference enroller to sworn verification. |
| `ASSET-TOPOLOGY-MAP` | `src/assets/topology-schematic.svg` | Forensic workspace topology | Architectural vector / MIT | Aspect 16:9 / 1:1 | Three-node distributed camera mesh showing nodes C1, C2, and C3 with transit vectors. |
| `ASSET-PROBE-SYNTH` | `public/assets/syn-084-probe.jpg` | Interactive demo probe card | Synthetic test crop / MIT | Aspect 1:1 (300x300) | Synthetic probe facial crop of test avatar Alex Mercer (ID: SYN-084) with detection bounding box. |
| `ASSET-EVID-ROC` | `public/assets/roc-curve-test.png` | Empirical evidence section | Upstream FindU validation audit | Aspect 4:3 (800x600) | Empirical ROC curve from FindU test cohort demonstrating AUROC of 1.0000. |

---

## 4. Responsive Cropping & Optimization Pipeline
* High-density displays: Provide `@1x` and `@2x` versions or vector SVGs where possible.
* Web format: SVGs must be cleaned with zero inline metadata; bitmap assets must be under 150 kB in WebP/JPEG format.
* Responsive rules:
  - Mobile: Tight aspect ratio (`1:1` or `4:3`) focused on center subject.
  - Desktop: Wide contextual aspect ratio (`16:9` or `3:2`).

