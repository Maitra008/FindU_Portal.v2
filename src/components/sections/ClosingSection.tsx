import React from 'react';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';

export const ClosingSection: React.FC = () => {
  return (
    <SectionWrapper
      id="closing"
      sectionIndex="07"
      sectionLabel="Colophon &amp; Next Steps"
      title="Independent Architectural Dossier &amp; Research Access"
      leadText="Inspect the codebase, review the automated test benchmarks, or examine the upstream operational recognition core."
    >
      <div
        style={{
          border: '2px solid var(--ink)',
          backgroundColor: 'var(--paper-pure)',
          padding: 'clamp(var(--space-4), 4vw, var(--space-8))',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: 'var(--space-2)' }}>
              Open-Source Technical Deliverable
            </div>
            <h3 style={{ fontSize: 'var(--text-xl)' }}>
              Explore the FindU Platform Architecture
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-70)', maxWidth: '60ch' }}>
              The recognition core is open for academic and technical peer review. Access the repository
              to run the automated test suite, inspect the FAISS index implementation, and verify the evaluation data.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <a
              href="https://github.com/Maitra008/FindU"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <GitBranch size={16} /> Open GitHub Repository <ArrowUpRight size={14} />
            </a>
            <a
              href="#hero"
              className="btn btn-secondary"
            >
              Back to Overview
            </a>
          </div>
        </div>

        {/* Technical Citation Block */}
        <div
          style={{
            borderTop: '1px solid var(--ink-15)',
            paddingTop: 'var(--space-4)',
            backgroundColor: 'var(--paper)',
            padding: 'var(--space-4)',
            border: '1px solid var(--ink-15)',
            minWidth: 0,
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)', marginBottom: '4px' }}>
            BIBLIOGRAPHIC REFERENCE / TECHNICAL CITATION:
          </div>
          <code
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--ink)',
              lineHeight: 'var(--leading-relaxed)',
              display: 'block',
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
            }}
          >
            FindU Architecture Group (2026). "FindU: Multi-Camera Spatio-Temporal Tracking &amp; Forensic Face Recognition for Missing Persons." Public Portal v2.0. https://github.com/Maitra008/FindU
          </code>
        </div>
      </div>
    </SectionWrapper>
  );
};

