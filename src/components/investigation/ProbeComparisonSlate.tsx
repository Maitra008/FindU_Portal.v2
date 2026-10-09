import React from 'react';
import type { CameraDetection } from '../../data/demoScenario';
import { UserCheck, Binary, Sliders } from 'lucide-react';

interface ProbeComparisonSlateProps {
  camera: CameraDetection;
  subjectName: string;
  subjectId: string;
}

export const ProbeComparisonSlate: React.FC<ProbeComparisonSlateProps> = ({
  camera,
  subjectName,
  subjectId,
}) => {
  const delta = camera.cosineSimilarity - camera.threshold;
  const simPercent = Math.min(Math.max((camera.cosineSimilarity - 0.7) / (1.0 - 0.7) * 100, 0), 100);
  const thresholdPercent = ((camera.threshold - 0.7) / (1.0 - 0.7)) * 100;

  return (
    <div
      style={{
        border: '1px solid var(--ink-15)',
        backgroundColor: 'var(--paper-pure)',
        padding: 'var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Sliders size={14} style={{ color: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Biometric Slate // Vector Cosine Comparison
          </span>
        </div>
        <span className="badge-evidence">ArcFace 512-D Spherical Space</span>
      </div>

      {/* Side-by-side Dual Slate */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {/* Enrolled Reference Template Slate */}
        <div
          style={{
            border: '1px solid var(--ink-15)',
            backgroundColor: 'var(--paper)',
            padding: 'var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-70)' }}>
              ENROLLED GALLERY REFERENCE
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', fontWeight: 600 }}>
              v_ref (3 Photos)
            </span>
          </div>

          {/* Reference Avatar / Biometric Rendering */}
          <div
            style={{
              height: '110px',
              backgroundColor: 'var(--paper-dim)',
              border: '1px dashed var(--ink-30)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: 'var(--space-2)',
              textAlign: 'center',
            }}
          >
            <UserCheck size={28} style={{ color: 'var(--ink-70)', marginBottom: '4px' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600 }}>
              {subjectName}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-70)' }}>
              ID: {subjectId} · Normal L2 Norm
            </div>
          </div>

          <div style={{ fontSize: '10px', color: 'var(--ink-70)', fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>
            <div>ENROLLED: 3 reference angles</div>
            <div>STATUS: Averaged centroid vector</div>
          </div>
        </div>

        {/* Live Surveillance Probe Slate */}
        <div
          style={{
            border: '1px solid var(--accent)',
            backgroundColor: 'var(--accent-08)',
            padding: 'var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', fontWeight: 600 }}>
              SURVEILLANCE PROBE CROP
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', fontWeight: 600 }}>
              u_probe (Node {camera.nodeId})
            </span>
          </div>

          {/* Probe Crop Rendering */}
          <div
            style={{
              height: '110px',
              backgroundColor: 'var(--paper)',
              border: '1px solid var(--accent)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: 'var(--space-2)',
              textAlign: 'center',
            }}
          >
            <Binary size={28} style={{ color: 'var(--accent)', marginBottom: '4px' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--accent)' }}>
              {camera.probeCropLabel}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-70)' }}>
              Affine Aligned 5 Landmarks
            </div>
          </div>

          <div style={{ fontSize: '10px', color: 'var(--accent)', fontFamily: 'var(--font-mono)', lineHeight: 1.4, fontWeight: 600 }}>
            <div>CAPTURE TIME: {camera.timestamp} ({camera.wallClockTime})</div>
            <div>CAMERA NODE: {camera.nodeId} // {camera.locationCode}</div>
          </div>
        </div>
      </div>

      {/* Similarity Metric Gauge Bar */}
      <div
        style={{
          border: '1px solid var(--ink-15)',
          backgroundColor: 'var(--paper)',
          padding: 'var(--space-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)', marginRight: '6px' }}>
              Cosine Similarity Metric:
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--accent)' }}>
              {camera.cosineSimilarity.toFixed(4)}
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
            Operating Cutoff: &theta; = <strong>{camera.threshold.toFixed(4)}</strong> (&Delta; = +{delta.toFixed(4)})
          </div>
        </div>

        {/* Progress bar container */}
        <div
          style={{
            position: 'relative',
            height: '14px',
            backgroundColor: 'var(--paper-dim)',
            border: '1px solid var(--ink-30)',
            width: '100%',
          }}
        >
          {/* Active fill */}
          <div
            style={{
              height: '100%',
              width: `${simPercent}%`,
              backgroundColor: 'var(--accent)',
              transition: 'width var(--transition-normal)',
            }}
          />
          {/* Threshold marker needle */}
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              bottom: '-4px',
              left: `${thresholdPercent}%`,
              width: '2px',
              backgroundColor: 'var(--ink)',
              zIndex: 2,
            }}
            title="Threshold θ = 0.8900"
          />
        </div>

        {/* Meter Legend */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--ink-70)',
          }}
        >
          <span>Baseline (0.70)</span>
          <span style={{ fontWeight: 600, color: 'var(--ink)' }}>&theta; Cutoff (0.89)</span>
          <span>Exact Match (1.00)</span>
        </div>
      </div>
    </div>
  );
};

