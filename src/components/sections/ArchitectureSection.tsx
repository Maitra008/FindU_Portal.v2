import React from 'react';
import { ArrowUpRight, Lock, Layers } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';

interface LatencyMetric {
  label: string;
  value: string;
  context: string;
  benchmarkHardware: string;
}

const LATENCY_METRICS: LatencyMetric[] = [
  {
    label: 'SCRFD DETECTION OVERHEAD',
    value: '< 15 ms',
    context: 'Per 1080p frame at 2.0 FPS subsampling',
    benchmarkHardware: 'NVIDIA RTX 3060 / TensorRT FP16',
  },
  {
    label: 'ARCFACE 512-D EXTRACTION',
    value: '< 28 ms',
    context: 'ResNet-100 FP16 backbone per aligned face',
    benchmarkHardware: 'CUDA 12.1 / cuDNN 8.9',
  },
  {
    label: 'FAISS VECTOR SEARCH',
    value: '< 0.8 ms',
    context: 'Exact IndexFlatIP inner-product lookup',
    benchmarkHardware: 'Single-thread AVX2 / CPU',
  },
  {
    label: 'END-TO-END ALERT CYCLE',
    value: '< 85 ms',
    context: 'Ingest to operator queue (detection + search + gates)',
    benchmarkHardware: 'Complete edge node pipeline',
  },
];

interface ArchitectureLayer {
  tier: string;
  name: string;
  techStack: string;
  duties: string[];
}

const ARCH_LAYERS: ArchitectureLayer[] = [
  {
    tier: 'LAYER 01',
    name: 'Ingestion & Optical Pre-Filter Tier',
    techStack: 'OpenCV RTSP · Frame Subsampler (2 FPS) · Laplacian Sharpness Evaluator',
    duties: [
      'Subsamples 1080p RTSP surveillance camera streams at 2.0 frames per second.',
      'Executes deterministic OpenCV Laplacian gradient variance check (sharpness ≥ 0.65).',
      'Filters motion-blurred, out-of-focus, or extreme-angle frames before allocating GPU memory.',
    ],
  },
  {
    tier: 'LAYER 02',
    name: 'Forensic Biometric Feature Tier',
    techStack: 'InsightFace SCRFD-2.5G · ArcFace ResNet-100 FP16 · TensorRT',
    duties: [
      'Performs single-shot face localization and 5-point facial landmark keypoint alignment.',
      'Normalizes localized face chips to 112×112px canonical affine orientation.',
      'Projects aligned crops into 512-dimensional hyperspherical unit embeddings (||u||₂ = 1.000).',
    ],
  },
  {
    tier: 'LAYER 03',
    name: 'Vector Index & Spatio-Temporal Reasoning Tier',
    techStack: 'faiss.IndexFlatIP · Temporal Consensus State Machine · Transit Graph Engine',
    duties: [
      'Executes exact inner-product search against enrolled gallery templates at frozen threshold θ = 0.8900.',
      'Enforces sliding temporal agreement consensus window (2/2 consecutive matching frames).',
      'Calculates Euclidean corridor distance and velocity constraints across camera nodes (v ≤ 2.2 m/s).',
    ],
  },
  {
    tier: 'LAYER 04',
    name: 'Sworn Operator Gateway & Forensic Audit Tier',
    techStack: 'Human-in-the-Loop Verification Slate · SHA-256 Audit Trail',
    duties: [
      'Presents flagged multi-camera candidate sightings to authorized investigators for side-by-side review.',
      'Prohibits autonomous law enforcement dispatch or facial recognition database watchlist escalation.',
      'Records cryptographic event log tracking investigator decisions, timestamps, and justifications.',
    ],
  },
];

export const ArchitectureSection: React.FC = () => {
  return (
    <SectionWrapper
      id="architecture"
      sectionIndex="05"
      sectionLabel="Systems Architecture"
      title="System Architecture &amp; Runtime Boundaries"
      leadText="A clear separation of concerns between this standalone client-side public portal and the production recognition core maintained in Maitra008/FindU."
    >
      {/* 2-Tier Architectural Separation Matrix */}
      <div className="grid-cols-2" style={{ marginBottom: 'var(--space-8)' }}>
        {/* Tier 01: Public Portal */}
        <div
          style={{
            border: '2px solid var(--ink)',
            backgroundColor: 'var(--paper-pure)',
            padding: 'clamp(var(--space-3), 3vw, var(--space-6))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
              TIER 01 // STANDALONE PUBLIC PORTAL
            </span>
            <span className="badge-evidence verified">THIS REPOSITORY</span>
          </div>

          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 0, marginBottom: 'var(--space-1)' }}>
              FindU-Portal v2.0 (Client-Side Static)
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>
              React 19 · TypeScript · Vite · Zero-Server Architecture
            </div>
          </div>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-90)', lineHeight: 1.6, margin: 0 }}>
            An independently deployable, client-side educational and verification portal. Runs 100% in-browser memory
            with zero backend servers, zero database connections, and zero live CCTV surveillance streams.
          </p>

          <div className="divider-hairline" />

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0, fontSize: 'var(--text-xs)', color: 'var(--ink-80)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              <span><strong>Deterministic Simulation Engine:</strong> In-memory multi-node forensic scenario simulation.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              <span><strong>Restrained Visual Constitution:</strong> Strict 3-variable palette (<code>--paper</code>, <code>--ink</code>, <code>--accent</code>).</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              <span><strong>Zero Citizen PII:</strong> Fictional synthetic scenarios without operational camera access.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              <span><strong>Edge Static Deployment:</strong> Optimized for Cloudflare Pages and Vercel edge networks.</span>
            </li>
          </ul>
        </div>

        {/* Tier 02: Operational Recognition Core */}
        <div
          style={{
            border: '2px solid var(--accent)',
            backgroundColor: 'var(--paper-pure)',
            padding: 'clamp(var(--space-3), 3vw, var(--space-6))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
              TIER 02 // RECOGNITION CORE
            </span>
            <span className="badge-evidence accent">MAITRA008/FINDU</span>
          </div>

          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 0, marginBottom: 'var(--space-1)' }}>
              FindU Operational Engine (Python / TensorRT)
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>
              Python 3.10 · PyTorch · TensorRT · FAISS · InsightFace
            </div>
          </div>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-90)', lineHeight: 1.6, margin: 0 }}>
            The operational computer vision and vector similarity pipeline maintained separately in the primary repository.
            Deploys on edge municipal hardware to process RTSP video feeds under strict legal mandates.
          </p>

          <div className="divider-hairline" />

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0, fontSize: 'var(--text-xs)', color: 'var(--ink-80)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              <span><strong>InsightFace SCRFD:</strong> 5-point landmark keypoint detection and alignment.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              <span><strong>ArcFace ResNet-100:</strong> 512-dimensional hyperspherical embedding inference.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              <span><strong>FAISS IndexFlatIP:</strong> Exact sub-millisecond inner-product search index.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              <span><strong>Temporal &amp; Graph Gate:</strong> Consecutive frame agreement and physical transit velocity filters.</span>
            </li>
          </ul>

          <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
            <a
              href="https://github.com/Maitra008/FindU"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%', minHeight: '40px', fontSize: 'var(--text-xs)' }}
            >
              Inspect Upstream Repository <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* 4-Layer Operational Pipeline Topology Diagram */}
      <div
        style={{
          border: '1px solid var(--ink-15)',
          backgroundColor: 'var(--paper)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Layers size={14} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Production Engine 4-Layer Architecture Stack
            </span>
          </div>
          <span className="badge-evidence">Edge Node Deployment</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {ARCH_LAYERS.map((layer) => (
            <div
              key={layer.tier}
              style={{
                border: '1px solid var(--ink-15)',
                backgroundColor: 'var(--paper-pure)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>
                    {layer.tier}
                  </span>
                  <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)' }}>
                    {layer.name}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-70)', backgroundColor: 'var(--paper-dim)', padding: '2px 8px', border: '1px solid var(--ink-15)' }}>
                  {layer.techStack}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                {layer.duties.map((duty, idx) => (
                  <div key={idx} style={{ fontSize: '11px', color: 'var(--ink-80)', lineHeight: 1.4, paddingLeft: '8px', borderLeft: '2px solid var(--ink-15)' }}>
                    {duty}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latency & Hardware Parameters Table */}
      <div
        style={{
          border: '1px solid var(--ink-15)',
          backgroundColor: 'var(--paper-pure)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div className="section-label" style={{ margin: 0 }}>
            Audited Operational Latency Specifications
          </div>
          <span className="badge-evidence verified">Empirically Profiled</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {LATENCY_METRICS.map((metric) => (
            <div
              key={metric.label}
              style={{
                border: '1px solid var(--ink-15)',
                backgroundColor: 'var(--paper)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-70)' }}>
                {metric.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--accent)' }}>
                {metric.value}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--ink-80)', fontWeight: 500 }}>
                {metric.context}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--ink-50)', fontFamily: 'var(--font-mono)', marginTop: 'var(--space-1)' }}>
                Hardware: {metric.benchmarkHardware}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security, Privacy & Compliance Architecture Card */}
      <div
        style={{
          border: '1px solid var(--ink)',
          backgroundColor: 'var(--paper)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Lock size={16} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Data Governance, Privacy &amp; Public Trust Architecture
            </span>
          </div>
          <span className="badge-evidence verified">Zero Mass Surveillance Storage</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
              Ephemeral Frame Buffering
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              Unmatched CCTV video probe frames are held in volatile RAM only for the sliding consensus window (1.5 seconds) and immediately dropped. No perpetual citizen video archive is created.
            </p>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
              Zero Non-Candidate PII Storage
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              Only missing persons enrolled by active law enforcement incident files exist in the FAISS index. Bystander face embeddings are never indexed, stored, or correlated with external registries.
            </p>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
              Cryptographic Audit Logging
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-70)', margin: 0, lineHeight: 1.5 }}>
              Every candidate alert, sworn officer authorization, and non-lead dismissal is hashed and recorded with an immutable SHA-256 operator identity for post-incident judicial oversight.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
