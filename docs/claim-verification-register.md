# FindU Public Portal — Claim Verification Register
**Phase P7 Audit & Technical Evidence Log**
*Audit Date: 2026-10-10 | Target Repository: Maitra008/FindU & FindU-Portal v2*

---

## 1. Overview & Evaluation Principles
This register audits every quantitative, technical, and governance claim published across the FindU Public Portal. All claims are classified into four strict evidentiary categories:
1. **Verified**: Backed by reproducible repository artifacts, code, test suites, or audited logs.
2. **Qualified**: Backed by prototype/benchmark data but requires explicit scope, hardware, or statistical boundary disclosures.
3. **Removed**: Unsubstantiated, speculative, or misleading claims that must be eliminated from public-facing copy.
4. **Unresolved**: Claims where evidentiary data is missing or incomplete; flagged for future experimental evaluation.

---

## 2. Recognition & Evaluation Claims

| Claim ID | Claim & Value | Source Reference | Evaluation Scope | Audit Finding | Status | Permissible Public Copy |
|---|---|---|---|---|---|---|
| **REC-01** | Frozen similarity threshold $\theta = 0.8900$ | `src/data/demoScenario.ts`, `VALIDATION_AUDIT.md` | Offline Benchmark & Portal Demo | Verified in test configuration. Calibrated against 90 impostor pairs. | **VERIFIED** | "Operating decision threshold frozen at $\theta = 0.8900$ to maintain zero false positives in the evaluation cohort." |
| **REC-02** | ArcFace 512-dimensional embeddings | `Maitra008/FindU` model config (`buffalo_l`), ResNet-100 FP16 | Production Core | Verified in upstream InsightFace pipeline. Generates $u \in \mathbb{S}^{511} \subset \mathbb{R}^{512}$. | **VERIFIED** | "512-dimensional unit-normalized hyperspherical identity embeddings." |
| **REC-03** | Precision: 100% (95% CI: 70.1%–100%) | `VALIDATION_AUDIT.md`, 9/9 retrieved probes | Offline Test Cohort (20 pos / 90 neg) | Verified across 110 evaluation pairs using Wilson Score method. Sample size $n=9$ retrieved positive probes. | **VERIFIED** | "100.0% precision (95% Wilson Score CI: 70.1%–100.0%) in controlled test set." |
| **REC-04** | Recall Rate: 45.0% (95% CI: 25.8%–65.8%) | `VALIDATION_AUDIT.md`, 9/20 genuine probes | Offline Test Cohort (20 pos / 90 neg) | Verified. 11/20 genuine probes failed $\theta = 0.8900$ cutoff. | **VERIFIED** | "45.0% recall (95% Wilson Score CI: 25.8%–65.8%). 55% of genuine probes rejected due to strict false-positive suppression." |
| **REC-05** | False Positive Rate: 0.0% (95% CI: 0.0%–4.1%) | `VALIDATION_AUDIT.md`, 0/90 impostor pairs | Offline Test Cohort (20 pos / 90 neg) | Verified in sample. With $n=90$, Wilson upper bound is 4.1%. Zero in-sample does NOT mean zero real-world. | **QUALIFIED** | "0.0% observed FPR in test cohort (95% Wilson Score CI: 0.0%–4.1%). Upper bound reflects sample size limits." |
| **REC-06** | AUROC: 1.0000 | `VALIDATION_AUDIT.md` ROC analysis | Offline Test Cohort (20 pos / 90 neg) | Verified on controlled 110-pair evaluation set. Does not guarantee perfect field discrimination. | **QUALIFIED** | "Empirical AUROC of 1.0000 on controlled benchmark cohort; does not imply error-free identification under open-world CCTV conditions." |
| **REC-07** | F1-Score: 62.1% | `VALIDATION_AUDIT.md`, harmonic mean | Offline Test Cohort | Verified point estimate $2 \cdot \frac{1.0 \cdot 0.45}{1.0 + 0.45} = 0.6207$. | **VERIFIED** | "F1-Score of 62.1%, reflecting conservative retrieval threshold." |
| **REC-08** | Dataset Mirroring Anomaly | `VALIDATION_AUDIT.md` lines 24–48 | Forensic audit report | Verified finding: impostors 01–05 were mirrored genuine images. | **VERIFIED** | "Transparent disclosure: Impostor set mirroring anomaly identified and isolated during dataset audit." |
| **REC-09** | Validated for Real-World Municipal Police Use | N/A | Operational | UNVERIFIED. The system has NOT been certified or tested in live municipal deployments. | **REMOVED** | Strictly state that FindU is an architectural research prototype evaluated on controlled benchmark datasets. |

---

## 3. Performance & Latency Claims

| Claim ID | Claim & Value | Source Reference | Evaluation Scope | Audit Finding | Status | Permissible Public Copy |
|---|---|---|---|---|---|---|
| **PERF-01** | SCRFD Detection < 15 ms | Upstream benchmark log | NVIDIA RTX 3060 / TensorRT FP16 @ 1080p | Verified on dedicated desktop GPU test rig. Not guaranteed on edge CPUs or low-power embedded hardware. | **QUALIFIED** | "< 15 ms detection overhead measured on NVIDIA RTX 3060 TensorRT FP16 at 1080p." |
| **PERF-02** | ArcFace Extraction < 28 ms | Upstream benchmark log | NVIDIA RTX 3060 / CUDA 12.1 FP16 | Verified on dedicated GPU. Sub-30ms requires GPU acceleration. | **QUALIFIED** | "< 28 ms feature extraction measured on NVIDIA RTX 3060 ResNet-100 FP16." |
| **PERF-03** | FAISS Inner-Product < 0.8 ms | Upstream benchmark log | AVX2 CPU `IndexFlatIP` | Verified for small gallery index ($K \le 1,000$ identities). | **QUALIFIED** | "< 0.8 ms exact vector lookup for galleries under 1,000 active enrollments." |
| **PERF-04** | End-to-End Alert Latency < 85 ms | Upstream benchmark log | Edge node test harness | Measured sum of pipeline stages on reference GPU workstation. | **QUALIFIED** | "< 85 ms pipeline latency measured on reference workstation from frame ingest to operator queue." |
| **PERF-05** | 2.0 FPS Subsampled RTSP Rate | Upstream camera loop | Prototype software loop | Verified in code loop (`time.sleep(0.5)` or frame skipping). | **VERIFIED** | "2.0 FPS subsampled video ingestion rate, reducing compute load by 93%." |

---

## 4. Privacy, Security & Governance Claims

| Claim ID | Claim & Value | Source Reference | Evaluation Scope | Audit Finding | Status | Permissible Public Copy |
|---|---|---|---|---|---|---|
| **GOV-01** | EU AI Act Article 14 Human Oversight | EU Regulation 2024/1689 Art. 14 | Legal Framework | Article 14 establishes high-risk AI human oversight obligations. FindU adopts these as design principles. | **QUALIFIED** | "Engineered to satisfy EU AI Act Article 14 human oversight principles; not an official institutional certification." |
| **GOV-02** | Sworn Officer Lead Authorization | UI demonstration & mock badge `#704` | Synthetic Demo | Illustrative scenario in sandbox. Does not represent real-world police sign-off. | **QUALIFIED** | "Illustrated via synthetic incident #FU-2026-084; demonstrates human verification gate in client sandbox." |
| **GOV-03** | Ephemeral RAM Buffering (1.5s) | Software architecture design | Architectural Target | Implemented as a sliding consensus window in prototype; must be formally verified on edge deployments. | **QUALIFIED** | "Architecture specifies ephemeral volatile RAM buffering; unflagged frames discarded after consensus window." |
| **GOV-04** | Zero Mass Surveillance Storage | Operational design spec | Architectural Target | Upstream code stores only flagged candidate probe chips, not continuous video streams. | **QUALIFIED** | "System design retains only authorized investigative candidate crops; continuous video recording is excluded from core scope." |
| **GOV-05** | Demographic Parity / Fairness | N/A | Evaluation Benchmark | UNRESOLVED. The evaluation cohort lacks demographic stratification across ethnicity, gender, or age groups. | **UNRESOLVED** | Explicitly state: "Demographic fairness across subgroups has not been independently measured in current test cohorts." |

