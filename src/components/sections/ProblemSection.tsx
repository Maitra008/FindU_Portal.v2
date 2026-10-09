import React, { useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';

interface WorkflowStep {
  id: string;
  number: string;
  title: string;
  category: 'Detection' | 'Connection' | 'Human Verification';
  headline: string;
  description: string;
  technicalRule: string;
  statusTag: string;
  provenance: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'step-detection',
    number: '01',
    title: 'Camera Ingestion & Localization',
    category: 'Detection',
    headline: 'A surveillance camera captures a fleeting candidate face.',
    description: 'Video frames from physical surveillance nodes are sampled at fixed intervals (2 FPS). SCRFD localized bounding boxes scan incoming pedestrians without tracking or cataloging bystanders.',
    technicalRule: 'SCRFD Convolutional Detector · IoU ≥ 0.50',
    statusTag: 'RAW PROBE LOCALIZED',
    provenance: 'InsightFace SCRFD inference (< 15 ms)',
  },
  {
    id: 'step-quality',
    number: '02',
    title: 'Quality Gate & Feature Extraction',
    category: 'Detection',
    headline: 'Motion-blurred and steep-angle frames are safely filtered out.',
    description: 'Surveillance cameras frequently capture low-quality imagery. The Laplacian sharpness filter discards blurred faces before neural embedding inference, eliminating false lookalike noise.',
    technicalRule: 'Laplacian Variance ≥ 0.65 · Pose Yaw ≤ 30°',
    statusTag: 'QUALITY GATE PASSED',
    provenance: 'OpenCV Laplacian & ArcFace 512-d unit vector',
  },
  {
    id: 'step-matching',
    number: '03',
    title: 'Hyperspherical Vector Similarity',
    category: 'Connection',
    headline: 'Mathematical cosine comparison against authorized gallery template.',
    description: 'The probe face crop is embedded onto a 512-dimensional hypersphere. FAISS IndexFlatIP executes an exact inner-product search against the enrolled missing person template archive.',
    technicalRule: 'Cosine Similarity: sim(u, v) = u · v ≥ 0.8900',
    statusTag: 'CANDIDATE SIGHTING FLAGGED',
    provenance: 'FAISS IndexFlatIP (exact search < 0.8 ms)',
  },
  {
    id: 'step-temporal',
    number: '04',
    title: 'Multi-Camera Transit Linking',
    category: 'Connection',
    headline: 'Sightings at separate cameras are connected into a movement path.',
    description: 'A sighting at Camera C2 is evaluated against subsequent sightings at adjacent Camera C3. The system constructs a continuous transit vector across physical nodes instead of treating each camera in isolation.',
    technicalRule: 'Topology Graph: Node C2 (Plaza) → Node C3 (Corridor) → Node C1 (Gate)',
    statusTag: 'SPATIO-TEMPORAL CONTINUITY',
    provenance: 'Physical camera topology matrix',
  },
  {
    id: 'step-velocity',
    number: '05',
    title: 'Physical Transit Plausibility Gate',
    category: 'Connection',
    headline: 'Impossible transitions are mathematically disqualified.',
    description: 'Human movement between locations is physically constrained. If a candidate appears at Camera A and Camera B faster than human locomotion allows, the lead is suppressed as physically impossible.',
    technicalRule: 'Transit Velocity v = distance / Δt ≤ 2.2 m/s',
    statusTag: 'TRANSIT GATE PLAUSIBLE',
    provenance: 'Empirical walking speed gate (1.4 m/s typical)',
  },
  {
    id: 'step-verification',
    number: '06',
    title: 'Sworn Investigator Verification',
    category: 'Human Verification',
    headline: 'AI matches are leads, never automated conclusions of identity.',
    description: 'Qualified candidate alerts are routed directly to sworn detectives. The investigator compares probe imagery side-by-side with reference photos, inspects clothing, and authorizes investigative response.',
    technicalRule: 'Sworn Officer Digital Signature Required for Action',
    statusTag: 'HUMAN-IN-THE-LOOP MANDATE',
    provenance: 'Autonomous enforcement strictly prohibited',
  },
];

export const ProblemSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [narrativeTab, setNarrativeTab] = useState<'problem' | 'solution' | 'governance'>('problem');

  const currentStep = WORKFLOW_STEPS[activeStepIndex];

  return (
    <SectionWrapper
      id="problem"
      sectionIndex="02"
      sectionLabel="Problem Narrative &amp; Solution Story"
      title="Why Finding a Missing Person Shouldn't Stop at One Camera"
      leadText="Traditional municipal search is bottlenecked by disconnected video recorders. FindU connects potential sightings across locations and time into a coherent movement timeline—anchored by sworn human verification."
    >
      {/* 3-Act Narrative Architecture Navigation */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          borderBottom: '1px solid var(--ink-15)',
          paddingBottom: 'var(--space-4)',
          marginBottom: 'var(--space-10)',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setNarrativeTab('problem')}
          className="btn"
          style={{
            backgroundColor: narrativeTab === 'problem' ? 'var(--ink)' : 'transparent',
            color: narrativeTab === 'problem' ? 'var(--paper)' : 'var(--ink)',
            border: '1px solid var(--ink)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
          }}
        >
          Act I // The Fragmentation Crisis
        </button>
        <button
          type="button"
          onClick={() => setNarrativeTab('solution')}
          className="btn"
          style={{
            backgroundColor: narrativeTab === 'solution' ? 'var(--ink)' : 'transparent',
            color: narrativeTab === 'solution' ? 'var(--paper)' : 'var(--ink)',
            border: '1px solid var(--ink)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
          }}
        >
          Act II // The Connected Workflow
        </button>
        <button
          type="button"
          onClick={() => setNarrativeTab('governance')}
          className="btn"
          style={{
            backgroundColor: narrativeTab === 'governance' ? 'var(--accent)' : 'transparent',
            color: narrativeTab === 'governance' ? 'var(--paper)' : 'var(--ink)',
            border: `1px solid ${narrativeTab === 'governance' ? 'var(--accent)' : 'var(--ink)'}`,
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
          }}
        >
          Act III // AI Match ≠ Identification
        </button>
      </div>

      {/* ACT I: THE PROBLEM NARRATIVE (Three Core Roadblocks) */}
      {narrativeTab === 'problem' && (
        <div>
          <div className="grid-cols-3" style={{ marginBottom: 'var(--space-10)' }}>
            {/* Roadblock 1: The Single-Camera Trap */}
            <div className="placeholder-panel">
              <div className="placeholder-meta">
                <span>01 // THE DETECTION GAP</span>
                <span className="badge-evidence">VIDEO SILOS</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 'var(--space-2)' }}>
                1. A Sighting Without Direction
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-70)', lineHeight: 'var(--leading-relaxed)' }}>
                When a missing individual is spotted on a municipal CCTV feed, investigators have only a frozen
                data point in time. Without knowing which adjacent corridor or doorway the subject exited into,
                search teams are left guessing among dozens of disconnected cameras.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--ink-15)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-50)' }}>
                LIMITATION: 0 SPATIO-TEMPORAL CONTINUITY
              </div>
            </div>

            {/* Roadblock 2: The Multi-Camera Void */}
            <div className="placeholder-panel">
              <div className="placeholder-meta">
                <span>02 // THE CONNECTION VOID</span>
                <span className="badge-evidence">MANUAL FATIGUE</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 'var(--space-2)' }}>
                2. Disconnected Timelines
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-70)', lineHeight: 'var(--leading-relaxed)' }}>
                Footage sits in incompatible Digital Video Recorders (DVRs) across municipal transit, stores, and concourses.
                Detectives manually scrub hundreds of hours of raw footage camera-by-camera, where cognitive fatigue sets in after minutes of video review.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--ink-15)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-50)' }}>
                LIMITATION: ASYNCHRONOUS RECORDERS
              </div>
            </div>

            {/* Roadblock 3: The Automation Danger */}
            <div className="placeholder-panel accent-border">
              <div className="placeholder-meta">
                <span style={{ color: 'var(--accent)' }}>03 // THE VERIFICATION IMPERATIVE</span>
                <span className="badge-evidence accent">HUMAN OVERSIGHT</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 'var(--space-2)', color: 'var(--accent)' }}>
                3. The Risk of Blind Automation
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-70)', lineHeight: 'var(--leading-relaxed)' }}>
                Unchecked facial recognition systems that trigger automated arrests or alarms create severe civil liberties risks.
                A mathematical similarity score alone cannot confirm identity; human judgment, clothing inspection, and contextual verification are essential.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--ink-15)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>
                PRINCIPLE: AI MATCH ≠ IDENTIFICATION
              </div>
            </div>
          </div>

          {/* Architectural Comparison Table */}
          <div
            style={{
              border: '2px solid var(--ink)',
              backgroundColor: 'var(--paper-pure)',
              padding: 'clamp(var(--space-4), 3vw, var(--space-6))',
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <span className="section-label" style={{ margin: 0 }}>
                METHODOLOGICAL SHIFT // CONVENTIONAL VS. FINDU SPATIO-TEMPORAL WORKFLOW
              </span>
              <span className="badge-evidence verified">VERIFIED ARCHITECTURAL BOUNDARY</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: 'var(--space-6)',
                borderTop: '1px solid var(--ink-15)',
                paddingTop: 'var(--space-4)',
                minWidth: 0,
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-50)', marginBottom: '4px' }}>
                  CONVENTIONAL MUNICIPAL PROTOCOL
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--text-sm)', color: 'var(--ink-70)' }}>
                  <li>✕ Scrub individual DVR footage sequentially camera by camera.</li>
                  <li>✕ High false alarm rate under surveillance blur and uneven lighting.</li>
                  <li>✕ Zero transit velocity checks (allows impossible jumps across city).</li>
                  <li>✕ Risk of unverified automated alerts dispatched to field units.</li>
                </ul>
              </div>

              <div style={{ borderLeft: '1px solid var(--ink-15)', paddingLeft: 'var(--space-6)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginBottom: '4px' }}>
                  FINDU MULTI-CAMERA SPATIO-TEMPORAL WORKFLOW
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>
                  <li>✓ Filters degraded probe crops early via Laplacian sharpness gate (≥ 0.65).</li>
                  <li>✓ Computes high-dimensional vector similarity against enrolled template (θ = 0.89).</li>
                  <li>✓ Enforces physical transit velocity plausibility (≤ 2.2 m/s walking bounds).</li>
                  <li>✓ Mandates sworn detective sign-off before any field response is authorized.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACT II: THE CONNECTED WORKFLOW (Visual 6-Step Connected Story) */}
      {narrativeTab === 'solution' && (
        <div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <span className="section-label accent">THE END-TO-END PIPELINE</span>
            <h3>How FindU Connects Sightings Across Space &amp; Time</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-70)', maxWidth: '65ch', marginTop: '4px' }}>
              Select any stage below to inspect how raw camera frames transform into high-confidence,
              physically verified investigative leads.
            </p>
          </div>

          {/* Workflow Step Indicator Ribbon */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-6)',
              minWidth: 0,
            }}
          >
            {WORKFLOW_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className="btn"
                  style={{
                    backgroundColor: isSelected ? 'var(--ink)' : 'var(--paper-pure)',
                    color: isSelected ? 'var(--paper)' : 'var(--ink)',
                    border: `1px solid ${isSelected ? 'var(--ink)' : 'var(--ink-15)'}`,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: 'var(--space-3) var(--space-4)',
                    minHeight: '64px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: 'var(--font-mono)', fontSize: '11px', color: isSelected ? 'var(--accent)' : 'var(--ink-50)' }}>
                    <span>STAGE {step.number}</span>
                    <span>{step.category.slice(0, 3)}</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '2px', lineHeight: '1.2' }}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Showcase Slate */}
          <div
            style={{
              border: '2px solid var(--ink)',
              backgroundColor: 'var(--paper-pure)',
              padding: 'clamp(var(--space-4), 4vw, var(--space-8))',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(var(--space-4), 4vw, var(--space-8))',
              alignItems: 'center',
              minWidth: 0,
              maxWidth: '100%',
            }}
          >
            {/* Step Left: Narrative Description */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <span className="badge-evidence verified">STAGE {currentStep.number} OF 06</span>
                <span className="badge-evidence accent">{currentStep.statusTag}</span>
              </div>

              <h4 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', lineHeight: 'var(--leading-snug)' }}>
                {currentStep.headline}
              </h4>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-90)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                {currentStep.description}
              </p>

              <div
                style={{
                  backgroundColor: 'var(--paper)',
                  border: '1px solid var(--ink-15)',
                  padding: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-50)' }}>
                  TECHNICAL ENFORCEMENT CRITERION:
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink)' }}>
                  {currentStep.technicalRule}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>
                  {currentStep.provenance}
                </div>
              </div>
            </div>

            {/* Step Right: Architectural Visual Schematic */}
            <div
              style={{
                border: '1px solid var(--ink-15)',
                backgroundColor: 'var(--paper)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
                  VISUAL WORKFLOW SCHEMATIC
                </span>
                <span className="badge-evidence">SIMULATION LOG</span>
              </div>

              {/* Dynamic SVG Schematic corresponding to stage */}
              <div
                className="ratio-16-9 media-frame"
                style={{
                  backgroundColor: 'var(--paper-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--space-4)',
                }}
              >
                <svg viewBox="0 0 360 180" width="100%" height="100%" style={{ stroke: 'var(--ink)', fill: 'none' }}>
                  {/* Visualizing 3 Nodes C2 -> C3 -> C1 */}
                  <line x1="60" y1="90" x2="180" y2="90" strokeWidth="1.5" strokeDasharray={activeStepIndex >= 3 ? 'none' : '4 4'} stroke={activeStepIndex >= 3 ? 'var(--ink)' : 'var(--ink-30)'} />
                  <line x1="180" y1="90" x2="300" y2="90" strokeWidth="1.5" strokeDasharray={activeStepIndex >= 4 ? 'none' : '4 4'} stroke={activeStepIndex >= 4 ? 'var(--accent)' : 'var(--ink-30)'} />

                  {/* Node C2 */}
                  <circle cx="60" cy="90" r="16" fill={activeStepIndex === 0 ? 'var(--ink)' : 'var(--paper-pure)'} stroke="var(--ink)" strokeWidth="1.5" />
                  <text x="60" y="94" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={activeStepIndex === 0 ? 'var(--paper)' : 'var(--ink)'}>C2</text>
                  <text x="60" y="124" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--ink-70)">Plaza (00:00)</text>

                  {/* Node C3 */}
                  <circle cx="180" cy="90" r="16" fill={activeStepIndex >= 2 ? (activeStepIndex === 2 ? 'var(--accent)' : 'var(--paper-pure)') : 'var(--paper-pure)'} stroke={activeStepIndex >= 2 ? 'var(--accent)' : 'var(--ink)'} strokeWidth="1.5" />
                  <text x="180" y="94" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={activeStepIndex === 2 ? 'var(--paper)' : 'var(--ink)'}>C3</text>
                  <text x="180" y="124" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--ink-70)">Corridor (00:14)</text>

                  {/* Node C1 */}
                  <circle cx="300" cy="90" r="16" fill={activeStepIndex >= 4 ? 'var(--ink)' : 'var(--paper-pure)'} stroke="var(--ink)" strokeWidth="1.5" />
                  <text x="300" y="94" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={activeStepIndex >= 4 ? 'var(--paper)' : 'var(--ink)'}>C1</text>
                  <text x="300" y="124" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="var(--ink-70)">Gate A (00:20)</text>

                  {/* Highlight indicator above active stage */}
                  {activeStepIndex < 2 && (
                    <rect x="35" y="40" width="50" height="20" fill="var(--ink-15)" stroke="var(--ink)" strokeWidth="1" rx="0" />
                  )}
                  {activeStepIndex >= 2 && activeStepIndex < 4 && (
                    <rect x="155" y="40" width="50" height="20" fill="var(--accent-15)" stroke="var(--accent)" strokeWidth="1" rx="0" />
                  )}
                  {activeStepIndex >= 4 && (
                    <rect x="275" y="40" width="50" height="20" fill="var(--ink-15)" stroke="var(--ink)" strokeWidth="1" rx="0" />
                  )}
                </svg>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : WORKFLOW_STEPS.length - 1))}
                  className="btn btn-secondary"
                  style={{ minHeight: '36px', padding: '4px 12px', fontSize: '11px' }}
                >
                  ← Previous Stage
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
                  {activeStepIndex + 1} / {WORKFLOW_STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((prev) => (prev < WORKFLOW_STEPS.length - 1 ? prev + 1 : 0))}
                  className="btn btn-primary"
                  style={{ minHeight: '36px', padding: '4px 12px', fontSize: '11px' }}
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACT III: GOVERNANCE & RESPONSIBLE USE (AI Match != Identification) */}
      {narrativeTab === 'governance' && (
        <div>
          <div
            style={{
              border: '2px solid var(--accent)',
              backgroundColor: 'var(--paper-pure)',
              padding: 'clamp(var(--space-4), 4vw, var(--space-8))',
              marginBottom: 'var(--space-8)',
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <ShieldCheck size={22} color="var(--accent)" />
              <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--accent)', margin: 0 }}>
                The Decision Boundary: AI Match ≠ Identification
              </h3>
            </div>

            <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-90)', lineHeight: 'var(--leading-relaxed)', maxWidth: '72ch', marginBottom: 'var(--space-6)' }}>
              A biometric cosine similarity score crossing the operating threshold (θ = 0.89) signifies
              only that two facial bounding boxes share high mathematical affinity in hyperspherical embedding space.
              It is <strong>never</strong> an automated legal finding of identity.
            </p>

            {/* Split Authority Matrix */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: 'var(--space-6)',
                borderTop: '1px solid var(--ink-15)',
                paddingTop: 'var(--space-6)',
                minWidth: 0,
              }}
            >
              <div style={{ border: '1px solid var(--ink-15)', padding: 'var(--space-4)', backgroundColor: 'var(--paper)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)', marginBottom: '6px' }}>
                  AUTOMATED SYSTEM AUTHORITY (ALGORITHMIC SCOPE)
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--ink-90)' }}>
                  <li>• Reject frames failing sharpness threshold (Laplacian variance &lt; 0.65).</li>
                  <li>• Extract 512-dimensional ArcFace unit vectors.</li>
                  <li>• Flag candidate matches meeting operating threshold (θ ≥ 0.89).</li>
                  <li>• Verify transit velocity plausibility between cameras (≤ 2.2 m/s).</li>
                  <li>• Assemble side-by-side probe card for investigator review.</li>
                </ul>
              </div>

              <div style={{ border: '1px solid var(--accent)', padding: 'var(--space-4)', backgroundColor: 'var(--accent-08)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginBottom: '6px' }}>
                  SWORN HUMAN AUTHORITY (MANDATORY GATEWAY)
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--ink)' }}>
                  <li>• Inspect side-by-side probe facial geometry and landmarks.</li>
                  <li>• Evaluate clothing, gait, physical stature, and luggage context.</li>
                  <li>• Corroborate physical scene conditions (lighting, shadows, angles).</li>
                  <li>• Authorize field investigator dispatch or reject candidate false alarm.</li>
                  <li>• Digitally sign evidentiary provenance audit log.</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              border: '1px solid var(--ink-15)',
              backgroundColor: 'var(--paper)',
              padding: 'var(--space-4) var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <AlertCircle size={16} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                STRICT ARCHITECTURAL PROHIBITION:
              </span>
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)' }}>
              Autonomous dispatch, watchlist addition, or law enforcement action without human sign-off is blocked at the API level.
            </span>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};
