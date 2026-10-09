import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SectionWrapper } from '../layout/SectionWrapper';
import {
  DEMO_INCIDENT,
  DEMO_CAMERAS,
  type ReviewStatus,
  type AuditLogEntry,
} from '../../data/demoScenario';
import { SchematicMap } from '../investigation/SchematicMap';
import { SensorFeedView } from '../investigation/SensorFeedView';
import { ProbeComparisonSlate } from '../investigation/ProbeComparisonSlate';
import { HumanReviewPanel } from '../investigation/HumanReviewPanel';
import { InvestigationTimeline } from '../investigation/InvestigationTimeline';
import { AuditStream } from '../investigation/AuditStream';

const INITIAL_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '14:32:10 UTC',
    type: 'system',
    message: 'System: Candidate probe localized at Node C2 (Terminal Central Plaza). Sim = 0.9412 ≥ 0.8900.',
  },
  {
    id: 'log-2',
    timestamp: '14:46:10 UTC',
    type: 'system',
    message: 'System: Spatio-temporal link C2 → C3 established. Δt = 14m, distance = 1,176m, v = 1.4 m/s (Plausible gait ≤ 2.2 m/s).',
  },
  {
    id: 'log-3',
    timestamp: '14:52:10 UTC',
    type: 'system',
    message: 'System: Trajectory endpoint candidate localized at Node C1 (North Concourse Gate A). Sim = 0.8945.',
  },
];

export const InvestigationSection: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('C2');
  const [reviewStatuses, setReviewStatuses] = useState<Record<string, ReviewStatus>>({
    C2: 'awaiting',
    C3: 'awaiting',
    C1: 'awaiting',
  });
  const [logs, setLogs] = useState<AuditLogEntry[]>(INITIAL_LOGS);

  const activeCamera = DEMO_CAMERAS.find((c) => c.nodeId === activeNodeId) || DEMO_CAMERAS[0];

  const handleSelectNode = (nodeId: string) => {
    setActiveNodeId(nodeId);
  };

  const handleAuthorize = (nodeId: string) => {
    setReviewStatuses((prev) => ({ ...prev, [nodeId]: 'authorized' }));
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      type: 'authorization',
      message: `Human Reviewer #704: Candidate at Node ${nodeId} verified and authorized as Sworn Investigative Field Lead.`,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleDismiss = (nodeId: string) => {
    setReviewStatuses((prev) => ({ ...prev, [nodeId]: 'dismissed' }));
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      type: 'dismissal',
      message: `Human Reviewer #704: Candidate at Node ${nodeId} dismissed as non-lead (insufficient confidence).`,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleReopen = (nodeId: string) => {
    setReviewStatuses((prev) => ({ ...prev, [nodeId]: 'awaiting' }));
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      type: 'reset',
      message: `Human Reviewer #704: Node ${nodeId} status returned to Awaiting Sworn Review.`,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleResetScenario = () => {
    setActiveNodeId('C2');
    setReviewStatuses({
      C2: 'awaiting',
      C3: 'awaiting',
      C1: 'awaiting',
    });
    const resetLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      type: 'reset',
      message: 'System: Investigation workspace reset to initial unreviewed state.',
    };
    setLogs([resetLog, ...INITIAL_LOGS]);
  };

  return (
    <SectionWrapper
      id="investigation"
      sectionIndex="03"
      sectionLabel="Unified Forensic Workspace"
      title="Deterministic Multi-Camera Investigation Workspace"
      leadText="An interactive simulation illustrating how FindU connects distributed camera nodes over space and time while preserving human-in-the-loop authorization."
      isAccentLabel
    >
      {/* Simulation Banner Notice with Reset Control */}
      <div
        style={{
          border: '1px solid var(--ink-15)',
          backgroundColor: 'var(--paper-pure)',
          padding: 'var(--space-3) var(--space-4)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="tally-dot active" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600 }}>
              SYNTHETIC INVESTIGATION SCENARIO: ALEX MERCER (ID: {DEMO_INCIDENT.subjectId})
            </span>
          </div>
          <span className="badge-evidence">Zero Live CCTV / 100% Client-Side Sandbox</span>
        </div>

        <button
          type="button"
          onClick={handleResetScenario}
          className="btn btn-secondary"
          style={{ minHeight: '36px', padding: 'var(--space-1) var(--space-3)', fontSize: '11px' }}
          title="Reset scenario to initial unreviewed state"
        >
          <RotateCcw size={12} /> Reset Scenario
        </button>
      </div>

      {/* Main Workspace Frame */}
      <div
        style={{
          border: '2px solid var(--ink)',
          backgroundColor: 'var(--paper-pure)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          padding: 'clamp(var(--space-3), 3vw, var(--space-6))',
        }}
      >
        {/* Workspace Context Bar */}
        <div
          style={{
            borderBottom: '1px solid var(--ink-15)',
            paddingBottom: 'var(--space-4)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                INCIDENT: #{DEMO_INCIDENT.incidentId}
              </span>
              <span className="badge-evidence verified">SIMULATION ACTIVE</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
                Target: {DEMO_INCIDENT.subjectName} ({DEMO_INCIDENT.subjectId})
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-70)' }}>
              Operational Gate: Algorithmic vectors generate leads; only sworn operators authorize field dispatch.
            </div>
          </div>

          {/* Quick Node Selector Tabs */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {DEMO_CAMERAS.map((cam) => {
              const isSelected = cam.nodeId === activeNodeId;
              const status = reviewStatuses[cam.nodeId];

              return (
                <button
                  key={cam.nodeId}
                  type="button"
                  onClick={() => handleSelectNode(cam.nodeId)}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ minHeight: '40px', padding: 'var(--space-2) var(--space-3)', fontSize: '11px' }}
                >
                  <span>Node {cam.nodeId} ({cam.timestamp})</span>
                  {status === 'authorized' && <ShieldCheck size={12} style={{ color: 'var(--accent)' }} />}
                  {status === 'awaiting' && <AlertTriangle size={12} style={{ color: 'var(--accent)' }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Coordinated Topology & Timeline Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <SchematicMap
            cameras={DEMO_CAMERAS}
            activeNodeId={activeNodeId}
            onSelectNode={handleSelectNode}
            reviewStatuses={reviewStatuses}
          />

          <InvestigationTimeline
            cameras={DEMO_CAMERAS}
            activeNodeId={activeNodeId}
            onSelectNode={handleSelectNode}
            reviewStatuses={reviewStatuses}
          />
        </div>

        {/* 2-Column Split: Sensor Feed vs. Probe Slate & Human Gate */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Live Sensor Viewport */}
          <SensorFeedView camera={activeCamera} />

          {/* Right Column: Biometric Slate & Human Review Gate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <ProbeComparisonSlate
              camera={activeCamera}
              subjectName={DEMO_INCIDENT.subjectName}
              subjectId={DEMO_INCIDENT.subjectId}
            />

            <HumanReviewPanel
              nodeId={activeCamera.nodeId}
              nodeName={activeCamera.name}
              currentStatus={reviewStatuses[activeCamera.nodeId]}
              onAuthorize={handleAuthorize}
              onDismiss={handleDismiss}
              onReopen={handleReopen}
            />
          </div>
        </div>

        {/* Bottom Block: Audit Stream */}
        <AuditStream logs={logs} />
      </div>
    </SectionWrapper>
  );
};
