import React from 'react';
import type { CameraDetection, ReviewStatus } from '../../data/demoScenario';
import { Clock, Check, X, AlertCircle } from 'lucide-react';

interface InvestigationTimelineProps {
  cameras: CameraDetection[];
  activeNodeId: string;
  onSelectNode: (nodeId: string) => void;
  reviewStatuses: Record<string, ReviewStatus>;
}

export const InvestigationTimeline: React.FC<InvestigationTimelineProps> = ({
  cameras,
  activeNodeId,
  onSelectNode,
  reviewStatuses,
}) => {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Clock size={14} style={{ color: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Multi-Node Chronological Scrubber
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
          Total Elapsed Window: 20 Minutes
        </span>
      </div>

      {/* Interactive Timeline Track */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-2)',
        }}
      >
        {cameras.map((cam, idx) => {
          const isActive = cam.nodeId === activeNodeId;
          const status = reviewStatuses[cam.nodeId] || 'awaiting';

          return (
            <button
              key={cam.nodeId}
              type="button"
              onClick={() => onSelectNode(cam.nodeId)}
              style={{
                textAlign: 'left',
                padding: 'var(--space-3)',
                backgroundColor: isActive ? 'var(--paper-pure)' : 'var(--paper-dim)',
                border: isActive ? '2px solid var(--accent)' : '1px solid var(--ink-15)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isActive ? 'var(--accent)' : 'var(--ink)',
                  }}
                >
                  STEP 0{idx + 1} // NODE {cam.nodeId}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--ink-70)',
                  }}
                >
                  t = {cam.timestamp}
                </span>
              </div>

              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>
                {cam.name}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-1)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-70)' }}>
                  Sim: {cam.cosineSimilarity.toFixed(4)}
                </span>
                {status === 'authorized' && (
                  <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Check size={10} /> Authorized
                  </span>
                )}
                {status === 'dismissed' && (
                  <span style={{ fontSize: '10px', color: 'var(--ink-70)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <X size={10} /> Dismissed
                  </span>
                )}
                {status === 'awaiting' && (
                  <span style={{ fontSize: '10px', color: 'var(--ink-90)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <AlertCircle size={10} style={{ color: 'var(--accent)' }} /> Awaiting
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

