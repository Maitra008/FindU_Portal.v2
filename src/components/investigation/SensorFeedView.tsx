import React from 'react';
import type { CameraDetection } from '../../data/demoScenario';
import { Camera, CheckCircle, Crosshair } from 'lucide-react';

interface SensorFeedViewProps {
  camera: CameraDetection;
}

export const SensorFeedView: React.FC<SensorFeedViewProps> = ({ camera }) => {
  return (
    <div
      style={{
        border: '1px solid var(--ink-15)',
        backgroundColor: 'var(--paper)',
        padding: 'var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      {/* Header telemetry strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Camera size={14} style={{ color: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600 }}>
            {camera.cameraFeedLabel}
          </span>
          <span className="badge-evidence verified">LIVE RTSP STREAM</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
          {camera.resolution} · TIME: {camera.wallClockTime}
        </div>
      </div>

      {/* Simulated 16:9 Camera Feed Viewport */}
      <div
        className="ratio-16-9 media-frame"
        style={{
          backgroundColor: '#1E1E1E',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--ink)',
        }}
      >
        {/* Subtle Concourse Wireframe Background */}
        <svg
          viewBox="0 0 640 360"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        >
          {/* Architectural perspective grid */}
          <line x1="0" y1="360" x2="320" y2="160" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="640" y1="360" x2="320" y2="160" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="160" y1="360" x2="320" y2="160" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="480" y1="360" x2="320" y2="160" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="0" y1="260" x2="640" y2="260" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="0" y1="200" x2="640" y2="200" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="0" y1="160" x2="640" y2="160" stroke="#FFFFFF" strokeWidth="1" />
          {/* Columns */}
          <rect x="140" y="80" width="20" height="240" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <rect x="480" y="80" width="20" height="240" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        </svg>

        {/* HUD Overlay - Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            backgroundColor: 'rgba(20, 20, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '3px 6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#E0E0E0',
            lineHeight: 1.3,
            maxWidth: '55%',
            overflowWrap: 'break-word',
          }}
        >
          <div>NODE: {camera.nodeId} // {camera.locationCode}</div>
          <div>OFFSET: t+{camera.timestamp} ({camera.relativeTimeMinutes}m)</div>
          <div>SENSOR: SONY STARVIS II 4K @ 2 FPS</div>
        </div>

        {/* HUD Overlay - Top Right Optical Health */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(20, 20, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '3px 6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#E0E0E0',
            textAlign: 'right',
            lineHeight: 1.3,
            maxWidth: '42%',
            overflowWrap: 'break-word',
          }}
        >
          <div>BLUR VAR: {camera.laplacianScore.toFixed(3)} (PASS &ge; 0.65)</div>
          <div style={{ color: 'var(--accent)' }}>FLAGGED CANDIDATE</div>
        </div>

        {/* Central Simulated Candidate Localization Box (SCRFD Box) */}
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '38%',
            width: '120px',
            height: '150px',
            border: '2px solid var(--accent)',
            backgroundColor: 'rgba(200, 75, 49, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '4px',
            boxShadow: '0 0 16px rgba(200, 75, 49, 0.35)',
            maxWidth: 'calc(100% - 16px)',
          }}
        >
          {/* Top Tag inside Bounding Box */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              backgroundColor: 'var(--accent)',
              color: 'var(--paper)',
              padding: '1px 4px',
              fontWeight: 700,
            }}
          >
            <span>SCRFD-PROBE</span>
            <span>99.4%</span>
          </div>

          {/* 5 Facial Landmark Crosshairs (Biometric Alignment) */}
          <div style={{ position: 'relative', width: '100%', height: '70px' }}>
            {/* Left eye */}
            <Crosshair size={10} style={{ position: 'absolute', top: '18px', left: '26px', color: 'var(--accent)' }} />
            {/* Right eye */}
            <Crosshair size={10} style={{ position: 'absolute', top: '18px', right: '26px', color: 'var(--accent)' }} />
            {/* Nose tip */}
            <Crosshair size={10} style={{ position: 'absolute', top: '34px', left: '48%', color: 'var(--accent)' }} />
            {/* Left mouth */}
            <Crosshair size={10} style={{ position: 'absolute', top: '50px', left: '32px', color: 'var(--accent)' }} />
            {/* Right mouth */}
            <Crosshair size={10} style={{ position: 'absolute', top: '50px', right: '32px', color: 'var(--accent)' }} />
          </div>

          {/* Bottom Sim Score Tag */}
          <div
            style={{
              backgroundColor: 'rgba(20, 20, 20, 0.9)',
              color: 'var(--paper)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textAlign: 'center',
              padding: '2px 0',
              fontWeight: 600,
              borderTop: '1px solid var(--accent)',
            }}
          >
            SIM: {camera.cosineSimilarity.toFixed(4)} &ge; 0.8900
          </div>
        </div>

        {/* Bottom Left Frame Telemetry */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'rgba(255, 255, 255, 0.7)',
            backgroundColor: 'rgba(20, 20, 20, 0.85)',
            padding: '2px 6px',
            maxWidth: 'calc(100% - 16px)',
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
            lineHeight: 1.25,
          }}
        >
          CROP: 112×112px | NORM: L2 UNIT | DIM: 512-FLOAT
        </div>
      </div>

      {/* Telemetry Gate Summary Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-3)',
          backgroundColor: 'var(--paper-pure)',
          border: '1px solid var(--ink-15)',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <div>
          <span style={{ color: 'var(--ink-70)' }}>Laplacian Filter: </span>
          <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{camera.laplacianScore.toFixed(3)} (Pass)</span>
        </div>
        <div>
          <span style={{ color: 'var(--ink-70)' }}>Calculated Gait: </span>
          <span style={{ fontWeight: 600, color: 'var(--ink)' }}>
            {camera.calculatedVelocityMs > 0 ? `${camera.calculatedVelocityMs} m/s (Pass ≤ 2.2 m/s)` : 'Baseline / Entry'}
          </span>
        </div>
        <div>
          <span style={{ color: 'var(--ink-70)' }}>Temporal Check: </span>
          <span style={{ fontWeight: 600, color: 'var(--accent)' }}>
            <CheckCircle size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }} />
            2/2 Sequential Frames
          </span>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: 'var(--ink-70)', lineHeight: 1.5 }}>
        <strong>Sensor Context:</strong> {camera.notes}
      </div>
    </div>
  );
};

