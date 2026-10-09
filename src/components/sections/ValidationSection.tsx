import React from 'react';
import { AlertCircle, ShieldAlert, Scale, ExternalLink } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';

interface MetricItem {
  id: string;
  name: string;
  value: string;
  ciRange: string;
  ciLower: number;
  ciUpper: number;
  pointValue: number;
  sampleDetails: string;
  plainDefinition: string;
  honestInterpretation: string;
}

const EMPIRICAL_METRICS: MetricItem[] = [
  {
    id: 'precision',
    name: 'Precision',
    value: '100.0%',
    ciRange: '70.1% – 100.0%',
    ciLower: 70.1,
    ciUpper: 100.0,
    pointValue: 100.0,
    sampleDetails: '9 genuine probes retrieved / 9 total alerts flagged above θ = 0.8900',
    plainDefinition: 'When the system raised an alert, was it actually the missing person?',
    honestInterpretation: 'Zero false positive alerts were generated in the evaluation cohort. The 95% Wilson confidence interval reflects the sample size limit: precision could be as low as 70.1% in equivalent populations.',
  },
  {
    id: 'recall',
    name: 'Recall Rate',
    value: '45.0%',
    ciRange: '25.8% – 65.8%',
    ciLower: 25.8,
    ciUpper: 65.8,
    pointValue: 45.0,
    sampleDetails: '9 genuine probes detected out of 20 total enrolled subject probe images',
    plainDefinition: 'Out of all actual sightings of the missing person, how many did the system catch?',
    honestInterpretation: '55% of genuine probes (11/20) were not flagged because they fell below the frozen θ = 0.8900 cutoff. This is an intentional engineering trade-off: high false-positive rejection reduces overall retrieval.',
  },
  {
    id: 'fpr',
    name: 'False Positive Rate (FPR)',
    value: '0.0%',
    ciRange: '0.0% – 4.1%',
    ciLower: 0.0,
    ciUpper: 4.1,
    pointValue: 0.0,
    sampleDetails: '0 impostor comparison pairs crossed threshold out of 90 evaluated pairs',
    plainDefinition: 'How often was an innocent non-missing citizen incorrectly flagged?',
    honestInterpretation: 'No impostor crossed threshold in this 90-pair cohort. An observed 0.0% in-sample rate does not mean the real-world rate is zero: statistical Wilson bounds indicate the true FPR could be up to 4.1%.',
  },
  {
    id: 'f1',
    name: 'F1-Score',
    value: '62.1%',
    ciRange: 'Point Estimate',
    ciLower: 62.1,
    ciUpper: 62.1,
    pointValue: 62.1,
    sampleDetails: 'Harmonic mean of precision (1.00) and recall (0.45)',
    plainDefinition: 'A balanced single score combining precision and recall.',
    honestInterpretation: 'The score reflects FindU\'s deliberate prioritization of conservative precision over aggressive retrieval, ensuring public trust by preventing false investigative leads.',
  },
  {
    id: 'auroc',
    name: 'AUROC',
    value: '1.0000',
    ciRange: 'Empirical Curve',
    ciLower: 100.0,
    ciUpper: 100.0,
    pointValue: 100.0,
    sampleDetails: 'Area under empirical ROC curve across 110 total comparison pairs',
    plainDefinition: 'How well can the embedding space rank true matches higher than impostors across all cutoffs?',
    honestInterpretation: 'A perfect AUROC on this small controlled sample demonstrates clean separability on benchmark files, but does NOT imply infallible identification under uncontrolled real-world municipal CCTV conditions.',
  },
];

interface ResponsiblePrinciple {
  id: string;
  title: string;
  implementationStatus: 'Implemented in Architecture' | 'Demonstrated in Sandbox' | 'Operational Policy Requirement';
  statusBadgeClass: string;
  summary: string;
  operationalSafeguard: string;
}

const RESPONSIBLE_PRINCIPLES: ResponsiblePrinciple[] = [
  {
    id: 'human-gate',
    title: '1. Mandatory Human Verification Gate',
    implementationStatus: 'Implemented in Architecture',
    statusBadgeClass: 'verified',
    summary: 'An algorithmic vector match is strictly an investigative hypothesis. Autonomous police dispatch, tactical response, or watchlist escalation is programmatically blocked.',
    operationalSafeguard: 'Every flagged candidate sighting requires affirmative side-by-side verification by an authenticated investigator before operational dispatch.',
  },
  {
    id: 'purpose-limitation',
    title: '2. Strict Purpose Limitation',
    implementationStatus: 'Operational Policy Requirement',
    statusBadgeClass: '',
    summary: 'The recognition engine is restricted exclusively to active, legally authorized missing-person inquiries and endangered child welfare alerts.',
    operationalSafeguard: 'Prohibited from general crowd scanning, political rally surveillance, commercial tracking, or undocumented migrant profiling.',
  },
  {
    id: 'data-minimization',
    title: '3. Ephemeral In-Memory Processing & Data Minimization',
    implementationStatus: 'Implemented in Architecture',
    statusBadgeClass: 'verified',
    summary: 'Unflagged CCTV video frames are held in volatile RAM only for the duration of the 1.5-second sliding consensus window and immediately purged.',
    operationalSafeguard: 'Zero perpetual citizen video archives are stored. Bystander facial embeddings are never indexed, stored, or correlated with external registries.',
  },
  {
    id: 'access-control',
    title: '4. Role-Based Access Control & Case Scoping',
    implementationStatus: 'Operational Policy Requirement',
    statusBadgeClass: '',
    summary: 'System access is strictly partitioned by active case number. Only assigned investigators can query or enroll reference photographs for a specific incident file.',
    operationalSafeguard: 'Prevents unauthorized exploratory searches across CCTV networks without an active, registered missing-person docket.',
  },
  {
    id: 'cryptographic-audit',
    title: '5. Tamper-Evident Auditability & Provenance',
    implementationStatus: 'Implemented in Architecture',
    statusBadgeClass: 'verified',
    summary: 'Every candidate alert, verification sign-off, and non-lead dismissal generates an immutable SHA-256 hashed audit log record.',
    operationalSafeguard: 'Preserves judicial transparency and post-incident accountability. Logs include detector confidence, bounding box coordinates, and officer identity.',
  },
  {
    id: 'transparency',
    title: '6. Operational Transparency & Error Disclosure',
    implementationStatus: 'Demonstrated in Sandbox',
    statusBadgeClass: 'accent',
    summary: 'Full public disclosure of empirical benchmark performance, statistical uncertainty intervals, and dataset audit anomalies.',
    operationalSafeguard: 'Publicly discloses dataset mirroring anomalies (VALIDATION_AUDIT.md) rather than concealing benchmark imperfections.',
  },
  {
    id: 'error-handling',
    title: '7. Resilient Failure Mode Handling',
    implementationStatus: 'Operational Policy Requirement',
    statusBadgeClass: '',
    summary: 'Operational protocols anticipate both false positive lookalike spikes and false negative misses caused by adverse lighting or occlusion.',
    operationalSafeguard: 'Investigators are trained that non-detection on a camera node does not prove absence, and positive similarity scores require physical corroboration.',
  },
  {
    id: 'proportionality',
    title: '8. Proportionality & Non-Conviction Safeguard',
    implementationStatus: 'Operational Policy Requirement',
    statusBadgeClass: '',
    summary: 'Algorithmic similarity scores alone never constitute probable cause or legal determination of identity in judicial proceedings.',
    operationalSafeguard: 'Physical forensic evidence, eyewitness confirmation, and sworn investigative verification are legally required before taking adverse action.',
  },
];

export const ValidationSection: React.FC = () => {
  return (
    <SectionWrapper
      id="validation"
      sectionIndex="06"
      sectionLabel="Empirical Evidence &amp; Governance"
      title="Controlled Evaluation Benchmarks &amp; Responsible Use"
      leadText="An unvarnished publication of empirical test cohort results, statistical uncertainty intervals, dataset audit disclosures, known technical limitations, and responsible-use governance."
      isAccentLabel
    >
      {/* Overview Context Box */}
      <div
        style={{
          border: '1px solid var(--ink-15)',
          backgroundColor: 'var(--paper)',
          padding: 'var(--space-4) var(--space-6)',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Evaluation Cohort Specification &amp; Methodology
            </span>
          </div>
          <span className="badge-evidence verified">Offline Test Split // n = 110 Comparison Pairs</span>
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-80)', margin: 0, lineHeight: 1.6 }}>
          Evaluated against a clean, independent test set comprising <strong>20 genuine missing-person probe photos</strong> and <strong>90 negative impostor comparison pairs</strong>.
          Operating threshold is frozen at <strong>&theta; = 0.8900</strong>. Confidence bounds are calculated using the <strong>Wilson Score Interval with continuity correction</strong> (95% confidence level).
          Results describe offline benchmark performance; they are not an operational guarantee under uncontrolled municipal CCTV conditions.
        </p>
      </div>

      {/* Main Empirical Metrics Slate */}
      <div
        style={{
          border: '2px solid var(--ink)',
          backgroundColor: 'var(--paper-pure)',
          padding: 'clamp(var(--space-3), 3vw, var(--space-6))',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)', borderBottom: '1px solid var(--ink-15)', paddingBottom: 'var(--space-4)' }}>
          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>
              Audited Empirical Evaluation Metrics
            </h3>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', marginTop: '2px' }}>
              Frozen Cutoff &theta; = 0.8900 · 95% Wilson Score Confidence Bounds
            </div>
          </div>
          <span className="badge-evidence">Zero Observed In-Sample False Alarms</span>
        </div>

        {/* Metric Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'var(--space-4)',
            minWidth: 0,
          }}
        >
          {EMPIRICAL_METRICS.map((metric) => (
            <div
              key={metric.id}
              style={{
                border: '1px solid var(--ink-15)',
                backgroundColor: 'var(--paper)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--ink)' }}>
                  {metric.name.toUpperCase()}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
                  95% CI: {metric.ciRange}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 700,
                    color: metric.id === 'precision' ? 'var(--accent)' : 'var(--ink)',
                  }}
                >
                  {metric.value}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--ink-70)', fontFamily: 'var(--font-mono)' }}>
                  {metric.ciRange !== 'Point Estimate' && metric.ciRange !== 'Empirical Curve' ? `[${metric.ciRange}]` : ''}
                </span>
              </div>

              {/* Confidence Interval Visual Range Indicator */}
              {metric.ciLower !== metric.ciUpper && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', margin: 'var(--space-1) 0' }}>
                  <div
                    style={{
                      height: '6px',
                      backgroundColor: 'var(--paper-dim)',
                      border: '1px solid var(--ink-30)',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: `${metric.ciLower}%`,
                        width: `${metric.ciUpper - metric.ciLower}%`,
                        height: '100%',
                        backgroundColor: metric.id === 'precision' ? 'var(--accent)' : 'var(--ink-70)',
                        opacity: 0.65,
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: `${metric.pointValue}%`,
                        width: '3px',
                        height: '10px',
                        top: '-2px',
                        backgroundColor: 'var(--ink)',
                      }}
                      title={`Point Estimate: ${metric.value}`}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-50)' }}>
                    <span>0%</span>
                    <span>CI Bounds ({metric.ciLower.toFixed(1)}% – {metric.ciUpper.toFixed(1)}%)</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              <div style={{ fontSize: '11px', color: 'var(--ink)', fontWeight: 600, marginTop: '2px' }}>
                {metric.plainDefinition}
              </div>

              <div style={{ fontSize: '11px', color: 'var(--ink-70)', lineHeight: 1.5 }}>
                {metric.honestInterpretation}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--ink-50)', borderTop: '1px solid var(--ink-08)' }}>
                Sample: {metric.sampleDetails}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Audit Forensic Disclosure Callout */}
      <div
        style={{
          border: '2px solid var(--ink)',
          backgroundColor: 'var(--paper)',
          padding: 'clamp(var(--space-3), 3vw, var(--space-6))',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <AlertCircle size={16} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Full Evidentiary Disclosure // Dataset Mirroring Anomaly (VALIDATION_AUDIT.md)
            </span>
          </div>
          <a
            href="https://github.com/Maitra008/FindU"
            target="_blank"
            rel="noopener noreferrer"
            className="link-editorial"
            style={{ fontSize: '11px', minHeight: 'auto' }}
          >
            Review Source Audit <ExternalLink size={12} />
          </a>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-90)', margin: 0, lineHeight: 1.6 }}>
          During internal threshold calibration, anomalous impostor similarity scores (0.9226 – 0.9668) were uncovered crossing the decision threshold.
          A forensic evaluation discovered that impostors <code>impostor_01</code> through <code>impostor_05</code> were horizontally mirrored transformations of enrolled subjects.
          Because ArcFace hyperspherical representations are geometrically invariant to bilateral reflection, the embeddings clustered tightly, revealing a dataset labeling anomaly rather than neural leakage.
          FindU openly documents this finding to ensure complete methodological transparency and reproducibility.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--ink-70)', backgroundColor: 'var(--paper-pure)', padding: 'var(--space-3)', border: '1px solid var(--ink-15)' }}>
          <div>● Discovered: Calibration Phase</div>
          <div>● Root Cause: Synthetic Image Mirroring</div>
          <div>● Impact: Remediated in Clean Split</div>
          <div>● Policy: Public Transparency Mandate</div>
        </div>
      </div>

      {/* Prominent Technical Limitations Block */}
      <div
        style={{
          border: '1px solid var(--ink-15)',
          backgroundColor: 'var(--paper-pure)',
          padding: 'clamp(var(--space-3), 3vw, var(--space-6))',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <ShieldAlert size={16} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Known Technical Limitations &amp; Boundary Constraints
            </span>
          </div>
          <span className="badge-evidence accent">Mandatory Operational Constraints</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'var(--space-4)',
            minWidth: 0,
          }}
        >
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--paper)', border: '1px solid var(--ink-15)' }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)', marginBottom: '4px' }}>
              Curated Datasets vs. Real-World CCTV
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              Benchmark test images feature relatively controlled illumination and standard resolution. Live municipal CCTV feeds introduce adverse weather, severe lens distortion, low night illumination, and motion blur that significantly degrade probe facial resolution.
            </p>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--paper)', border: '1px solid var(--ink-15)' }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)', marginBottom: '4px' }}>
              Conservative Recall Trade-Off (45%)
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              The frozen operating cutoff of &theta; = 0.8900 rejects 55% of genuine candidate probe sightings. In operational searches, genuine sightings under non-ideal angles will not trigger automated alerts and require manual detective timeline reconstruction.
            </p>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--paper)', border: '1px solid var(--ink-15)' }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)', marginBottom: '4px' }}>
              Demographic Fairness Unmeasured
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              The existing benchmark cohort of 110 pairs has NOT been evaluated across demographic sub-strata (ethnicity, gender, age cohorts). Independent algorithmic bias and subgroup parity audits remain necessary prior to municipal field piloting.
            </p>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--paper)', border: '1px solid var(--ink-15)' }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)', marginBottom: '4px' }}>
              Candidate Match &ne; Confirmed Identity
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              A high cosine similarity score indicates geometric feature alignment in hyperspherical space. It is strictly an investigative clue, never a legal determination of identity or sufficient grounds for arrest or tactical interception.
            </p>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--paper)', border: '1px solid var(--ink-15)' }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)', marginBottom: '4px' }}>
              Sample Size &amp; Statistical Uncertainty
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              With n = 90 negative impostor pairs, an observed 0.0% false positive rate carries a 95% Wilson upper bound of 4.1%. In a city scanning thousands of daily pedestrian transits, larger validation samples are required to prove sub-0.01% false alarm rates.
            </p>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--paper)', border: '1px solid var(--ink-15)' }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)', marginBottom: '4px' }}>
              Prototype Status &ne; Certified Police System
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              FindU is an architectural research project and public educational demonstration. It is not certified by law enforcement standards boards, nor is it currently integrated with municipal police dispatch networks.
            </p>
          </div>
        </div>
      </div>

      {/* Responsible-Use Framework: 8 Core Safeguards */}
      <div
        style={{
          border: '2px solid var(--ink)',
          backgroundColor: 'var(--paper)',
          padding: 'clamp(var(--space-3), 3vw, var(--space-6))',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--ink-15)', paddingBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Scale size={16} style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
                Responsible-Use &amp; Public Trust Governance Framework
              </h3>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', marginTop: '2px' }}>
              Distinguishing implemented architectural controls, simulated sandbox demonstrations, and operational policy mandates
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
            <span className="badge-evidence verified">Implemented</span>
            <span className="badge-evidence accent">Demonstrated</span>
            <span className="badge-evidence">Policy Mandate</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'var(--space-4)',
            minWidth: 0,
          }}
        >
          {RESPONSIBLE_PRINCIPLES.map((principle) => (
            <div
              key={principle.id}
              style={{
                border: '1px solid var(--ink-15)',
                backgroundColor: 'var(--paper-pure)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--ink)' }}>
                  {principle.title}
                </span>
                <span
                  className={`badge-evidence ${principle.statusBadgeClass}`}
                  style={{ flexShrink: 0, fontSize: '9px' }}
                >
                  {principle.implementationStatus}
                </span>
              </div>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-90)', margin: 0, lineHeight: 1.5 }}>
                {principle.summary}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', fontSize: '11px', color: 'var(--ink-70)', borderTop: '1px solid var(--ink-08)', lineHeight: 1.4 }}>
                <strong>Operational Control:</strong> {principle.operationalSafeguard}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
