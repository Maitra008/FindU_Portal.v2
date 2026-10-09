import React from 'react';
import type { CameraDetection } from '../../data/demoScenario';

interface SchematicMapProps {
  cameras: CameraDetection[];
  activeNodeId: string;
  onSelectNode: (nodeId: string) => void;
  reviewStatuses: Record<string, 'awaiting' | 'authorized' | 'dismissed'>;
}

export const SchematicMap: React.FC<SchematicMapProps> = ({
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
        padding: 'clamp(var(--space-3), 3vw, var(--space-4))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        minWidth: 0,
        maxWidth: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Transit Hub Schematic Topology
          </span>
          <span className="badge-evidence">Level 1 &amp; Level 2 Concourse</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-70)' }}>
          Vector Distance: 1,608m Total
        </span>
      </div>

      {/* SVG Map Canvas */}
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          backgroundColor: 'var(--paper-dim)',
          border: '1px solid var(--ink-15)',
          padding: 'var(--space-2)',
        }}
      >
        <svg
          viewBox="0 0 760 260"
          style={{ width: '100%', height: 'auto', minWidth: '460px', display: 'block' }}
          role="img"
          aria-label="Schematic topological map of transit camera nodes"
        >
          <defs>
            {/* Marker arrow for transit direction */}
            <marker
              id="transit-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--ink-70)" />
            </marker>
            <marker
              id="transit-arrow-active"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Architectural Background Grid */}
          <g stroke="var(--ink-08)" strokeWidth="1">
            <line x1="40" y1="40" x2="720" y2="40" />
            <line x1="40" y1="100" x2="720" y2="100" />
            <line x1="40" y1="160" x2="720" y2="160" />
            <line x1="40" y1="220" x2="720" y2="220" />
            <line x1="120" y1="20" x2="120" y2="240" />
            <line x1="280" y1="20" x2="280" y2="240" />
            <line x1="480" y1="20" x2="480" y2="240" />
            <line x1="640" y1="20" x2="640" y2="240" />
          </g>

          {/* Zone Labels */}
          <text x="50" y="32" fill="var(--ink-30)" fontFamily="var(--font-mono)" fontSize="10">ZONE A: SOUTH ENTRANCE</text>
          <text x="310" y="32" fill="var(--ink-30)" fontFamily="var(--font-mono)" fontSize="10">ZONE B: CENTRAL MEZZANINE</text>
          <text x="560" y="32" fill="var(--ink-30)" fontFamily="var(--font-mono)" fontSize="10">ZONE C: NORTH GATES</text>

          {/* Transit Path Segments */}
          {/* Path 1: C2 (120, 190) -> C3 (380, 130) */}
          <path
            d="M 120 190 L 380 130"
            stroke={activeNodeId === 'C3' || activeNodeId === 'C2' ? 'var(--accent)' : 'var(--ink-30)'}
            strokeWidth={activeNodeId === 'C3' ? '2.5' : '1.5'}
            strokeDasharray="4 4"
            markerEnd={activeNodeId === 'C3' ? 'url(#transit-arrow-active)' : 'url(#transit-arrow)'}
          />
          {/* Label 1: Distance & Velocity */}
          <rect x="210" y="142" width="105" height="18" fill="var(--paper)" stroke="var(--ink-15)" strokeWidth="1" />
          <text x="215" y="155" fill="var(--ink-70)" fontFamily="var(--font-mono)" fontSize="9">
            1,176m · 14m · 1.4 m/s
          </text>

          {/* Path 2: C3 (380, 130) -> C1 (640, 80) */}
          <path
            d="M 380 130 L 640 80"
            stroke={activeNodeId === 'C1' ? 'var(--accent)' : 'var(--ink-30)'}
            strokeWidth={activeNodeId === 'C1' ? '2.5' : '1.5'}
            strokeDasharray="4 4"
            markerEnd={activeNodeId === 'C1' ? 'url(#transit-arrow-active)' : 'url(#transit-arrow)'}
          />
          {/* Label 2: Distance & Velocity */}
          <rect x="475" y="90" width="100" height="18" fill="var(--paper)" stroke="var(--ink-15)" strokeWidth="1" />
          <text x="480" y="103" fill="var(--ink-70)" fontFamily="var(--font-mono)" fontSize="9">
            432m · 6m · 1.2 m/s
          </text>

          {/* Interactive Camera Nodes */}
          {cameras.map((cam) => {
            const isActive = cam.nodeId === activeNodeId;
            const status = reviewStatuses[cam.nodeId] || 'awaiting';

            let statusFill = 'var(--paper-pure)';
            let statusStroke = 'var(--ink)';
            if (status === 'authorized') {
              statusFill = 'var(--accent-15)';
              statusStroke = 'var(--accent)';
            } else if (status === 'dismissed') {
              statusFill = 'var(--paper-dim)';
              statusStroke = 'var(--ink-30)';
            }

            return (
              <g
                key={cam.nodeId}
                onClick={() => onSelectNode(cam.nodeId)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectNode(cam.nodeId);
                  }
                }}
                aria-label={`Select camera ${cam.nodeId}: ${cam.name}`}
              >
                {/* Active Focus Aura */}
                {isActive && (
                  <circle
                    cx={cam.mapCoords.x}
                    cy={cam.mapCoords.y}
                    r="24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.85"
                  />
                )}

                {/* Node Outer Circle */}
                <circle
                  cx={cam.mapCoords.x}
                  cy={cam.mapCoords.y}
                  r="16"
                  fill={statusFill}
                  stroke={isActive ? 'var(--accent)' : statusStroke}
                  strokeWidth={isActive ? '2.5' : '1.5'}
                />

                {/* Node ID Text */}
                <text
                  x={cam.mapCoords.x}
                  y={cam.mapCoords.y + 4}
                  textAnchor="middle"
                  fill={isActive ? 'var(--accent)' : 'var(--ink)'}
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight="700"
                >
                  {cam.nodeId}
                </text>

                {/* Node Label Box Below */}
                <rect
                  x={cam.mapCoords.x - 70}
                  y={cam.mapCoords.y + 24}
                  width="140"
                  height="34"
                  fill="var(--paper)"
                  stroke={isActive ? 'var(--accent)' : 'var(--ink-15)'}
                  strokeWidth={isActive ? '1.5' : '1'}
                />
                <text
                  x={cam.mapCoords.x}
                  y={cam.mapCoords.y + 38}
                  textAnchor="middle"
                  fill="var(--ink)"
                  fontFamily="var(--font-sans)"
                  fontSize="10"
                  fontWeight="600"
                >
                  {cam.name}
                </text>
                <text
                  x={cam.mapCoords.x}
                  y={cam.mapCoords.y + 50}
                  textAnchor="middle"
                  fill={isActive ? 'var(--accent)' : 'var(--ink-70)'}
                  fontFamily="var(--font-mono)"
                  fontSize="9"
                >
                  t = {cam.timestamp} · Sim {cam.cosineSimilarity.toFixed(4)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--ink-70)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <span>● C2: Initial Localization</span>
          <span>● C3: Mid-Transit Waypoint</span>
          <span>● C1: Destination Gate</span>
        </div>
        <span>Select any node or timeline step to inspect telemetry</span>
      </div>
    </div>
  );
};

