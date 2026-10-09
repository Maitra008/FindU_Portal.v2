import React from 'react';
import type { AuditLogEntry } from '../../data/demoScenario';
import { ListFilter } from 'lucide-react';

interface AuditStreamProps {
  logs: AuditLogEntry[];
}

export const AuditStream: React.FC<AuditStreamProps> = ({ logs }) => {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <ListFilter size={14} style={{ color: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Forensic Audit &amp; Event Stream
          </span>
        </div>
        <span className="badge-evidence">{logs.length} Events Recorded</span>
      </div>

      {/* Log items container */}
      <div
        style={{
          maxHeight: '180px',
          overflowY: 'auto',
          backgroundColor: 'var(--paper-dim)',
          border: '1px solid var(--ink-15)',
          padding: 'var(--space-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
        }}
      >
        {logs.map((log) => {
          let badgeColor = 'var(--ink-70)';
          let textColor = 'var(--ink)';

          if (log.type === 'authorization') {
            badgeColor = 'var(--accent)';
            textColor = 'var(--accent)';
          } else if (log.type === 'dismissal') {
            badgeColor = 'var(--ink-30)';
            textColor = 'var(--ink-70)';
          } else if (log.type === 'reset') {
            badgeColor = 'var(--ink)';
            textColor = 'var(--ink)';
          }

          return (
            <div
              key={log.id}
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                alignItems: 'flex-start',
                padding: '2px 4px',
                borderBottom: '1px solid var(--ink-04)',
              }}
            >
              <span style={{ color: 'var(--ink-30)', flexShrink: 0 }}>[{log.timestamp}]</span>
              <span style={{ color: badgeColor, fontWeight: 600, flexShrink: 0 }}>
                {log.type.toUpperCase()}:
              </span>
              <span style={{ color: textColor, flexGrow: 1 }}>{log.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

