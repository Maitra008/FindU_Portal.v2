import React from 'react';
import type { ReviewStatus } from '../../data/demoScenario';
import { ShieldCheck, XCircle, AlertTriangle, RotateCcw } from 'lucide-react';

interface HumanReviewPanelProps {
  nodeId: string;
  nodeName: string;
  currentStatus: ReviewStatus;
  onAuthorize: (nodeId: string) => void;
  onDismiss: (nodeId: string) => void;
  onReopen: (nodeId: string) => void;
}

export const HumanReviewPanel: React.FC<HumanReviewPanelProps> = ({
  nodeId,
  nodeName,
  currentStatus,
  onAuthorize,
  onDismiss,
  onReopen,
}) => {
  return (
    <div
      style={{
        border: '2px solid var(--ink)',
        backgroundColor: 'var(--paper-pure)',
        padding: 'var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Sworn Human Verification Gate // Node {nodeId}
          </span>
        </div>
        <span className="badge-evidence">EU AI Act Art. 14 Oversight Principle</span>
      </div>

      {/* Governance Constitutional Notice */}
      <div
        style={{
          backgroundColor: 'var(--paper)',
          borderLeft: '3px solid var(--accent)',
          padding: 'var(--space-3)',
          fontSize: '12px',
          color: 'var(--ink-90)',
          lineHeight: 1.5,
        }}
      >
        <strong>Mandatory Legal Gate:</strong> An algorithmic cosine match is strictly an investigative hypothesis.
        The FindU core protocol prohibits autonomous dispatch or surveillance watchlist escalation without sworn human review.
      </div>

      {/* Current Node Review Status Indicator */}
      <div
        style={{
          border: '1px solid var(--ink-15)',
          padding: 'var(--space-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          backgroundColor:
            currentStatus === 'authorized'
              ? 'var(--accent-08)'
              : currentStatus === 'dismissed'
              ? 'var(--paper-dim)'
              : 'var(--paper)',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-70)' }}>
            CURRENT STATUS FOR {nodeId} ({nodeName})
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 700, marginTop: '2px' }}>
            {currentStatus === 'authorized' && (
              <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> AUTHORIZED INVESTIGATIVE FIELD LEAD
              </span>
            )}
            {currentStatus === 'dismissed' && (
              <span style={{ color: 'var(--ink-70)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <XCircle size={16} /> DISMISSED AS NON-LEAD (INSUFFICIENT PROBABILITY)
              </span>
            )}
            {currentStatus === 'awaiting' && (
              <span style={{ color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={16} style={{ color: 'var(--accent)' }} /> AWAITING SWORN REVIEW SIGN-OFF
              </span>
            )}
          </div>
        </div>

        {currentStatus === 'authorized' && (
          <span className="badge-evidence verified">SIGNED: TASK FORCE LEAD #704</span>
        )}
      </div>

      {/* Decision Action Buttons */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {currentStatus === 'awaiting' ? (
          <>
            <button
              type="button"
              className="btn btn-accent"
              style={{ flex: '1 1 200px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.3, minHeight: '52px' }}
              onClick={() => onAuthorize(nodeId)}
            >
              <ShieldCheck size={16} /> Authorize Investigative Field Lead
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: '1 1 160px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.3, minHeight: '52px' }}
              onClick={() => onDismiss(nodeId)}
            >
              <XCircle size={16} /> Dismiss as Non-Lead
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: '1 1 180px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.3, minHeight: '52px' }}
              onClick={() => onReopen(nodeId)}
            >
              <RotateCcw size={14} /> Re-open Node {nodeId} for Review
            </button>
            {currentStatus === 'dismissed' && (
              <button
                type="button"
                className="btn btn-accent"
                style={{ flex: '1 1 200px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.3, minHeight: '52px' }}
                onClick={() => onAuthorize(nodeId)}
              >
                <ShieldCheck size={16} /> Escalate to Authorized Lead
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
