import React from 'react';
import { ArrowUpRight, Camera, Layers } from 'lucide-react';
import { Container } from '../layout/Container';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      style={{
        borderBottom: '1px solid var(--ink-15)',
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-16)',
        backgroundColor: 'var(--paper)',
      }}
    >
      <Container>
        {/* Asymmetrical 2-Column Grid on Desktop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-10)',
            alignItems: 'center',
            marginBottom: 'var(--space-12)',
          }}
          className="hero-grid"
        >
          {/* Column 1: Editorial Headline & Value Narrative */}
          <div style={{ maxWidth: '640px' }}>
            <div className="section-label accent">
              01 // Spatio-Temporal Search Architecture
            </div>

            <h1
              id="hero-title"
              style={{
                fontSize: 'clamp(2.35rem, 5.2vw, var(--text-5xl))',
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tighter)',
                marginBottom: 'var(--space-5)',
              }}
            >
              When someone goes missing, every sighting matters.
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, var(--text-md))',
                lineHeight: 'var(--leading-normal)',
                color: 'var(--ink-90)',
                marginBottom: 'var(--space-8)',
                maxWidth: '58ch',
              }}
            >
              Disconnected surveillance cameras leave fatal blind spots. FindU reconstructs candidate
              trajectories across distributed municipal nodes using high-dimensional vector embeddings,
              temporal consensus, and sworn human verification—ensuring no lead is lost between cameras.
            </p>

            {/* Action Group */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                alignItems: 'center',
              }}
            >
              <a href="#investigation" className="btn btn-accent">
                <Camera size={15} /> Launch Investigation Demo
              </a>
              <a href="#methodology" className="btn btn-secondary">
                <Layers size={15} /> Inspect 8-Stage Pipeline
              </a>
              <a
                href="https://github.com/Maitra008/FindU"
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial"
                style={{ marginLeft: 'var(--space-2)' }}
              >
                Upstream Engine Repo <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Column 2: Architectural Documentary Concourse Photograph */}
          <div>
            <div
              className="media-frame"
              style={{
                border: '1px solid var(--ink)',
                backgroundColor: 'var(--paper-pure)',
                position: 'relative',
              }}
            >
              {/* Image Frame */}
              <div className="ratio-16-9" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/assets/hero-transit-concourse.jpg"
                  alt="High-angle documentary perspective of a modern municipal transit concourse with exposed concrete pillars, steel trusses, and natural overhead daylight across stone flooring."
                  width={1280}
                  height={720}
                  fetchPriority="high"
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Architectural Sensor HUD Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'var(--paper-92)',
                    padding: '3px 8px',
                    border: '1px solid var(--ink-15)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--ink)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span className="tally-dot active" />
                  <span>SENSOR_NODE // C2_CENTRAL_PLAZA</span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(20, 20, 20, 0.88)',
                    padding: '3px 8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--paper)',
                    letterSpacing: 'var(--tracking-wider)',
                  }}
                >
                  SIMULATION
                </div>

                {/* Cross-Camera Trajectory Overlay Indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: 'var(--paper-92)',
                    padding: '3px 8px',
                    border: '1px solid var(--accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                  }}
                >
                  TRANSIT VELOCITY: 1.4 m/s [PLAUSIBLE]
                </div>
              </div>

              {/* Monospace Caption Strip */}
              <div className="frame-caption">
                <span>ASSET-HERO-CONCOURSE // TOPOLOGY ORIGIN</span>
                <span style={{ color: 'var(--accent)' }}>C2 → C3 → C1 PATHWAY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Key Metrics Grid (Audited Evidence from P0) */}
        <div className="grid-cols-4">
          <div className="data-callout">
            <div className="metric-label">Operating Threshold</div>
            <div className="metric-value accent">θ = 0.89</div>
            <div className="metric-detail">Frozen cosine cutoff (Validation rule)</div>
          </div>
          <div className="data-callout">
            <div className="metric-label">Precision Rate</div>
            <div className="metric-value">100%</div>
            <div className="metric-detail">95% Wilson CI: 70.1% – 100.0% (0 FP)</div>
          </div>
          <div className="data-callout">
            <div className="metric-label">Recall Rate</div>
            <div className="metric-value">45.0%</div>
            <div className="metric-detail">95% Wilson CI: 25.8% – 65.8% (9/20)</div>
          </div>
          <div className="data-callout">
            <div className="metric-label">Enforcement Protocol</div>
            <div className="metric-value" style={{ fontSize: '1.35rem' }}>Human Sign-Off</div>
            <div className="metric-detail">AI Match ≠ Automated Identification</div>
          </div>
        </div>
      </Container>
    </section>
  );
};
