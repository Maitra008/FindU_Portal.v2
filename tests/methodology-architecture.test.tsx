import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Phase P6: Technical Methodology & Architecture Verification', () => {
  describe('Section 04: Technical Methodology Pipeline', () => {
    it('renders Section 04 Methodology heading, lead text, and interactive stepper', () => {
      render(<App />);

      const methodologySection = document.getElementById('methodology');
      expect(methodologySection).toBeInTheDocument();

      expect(
        screen.getByText(/The 8-Stage Detection, Tracking & Verification Pipeline/i)
      ).toBeInTheDocument();

      expect(screen.getByText(/Sequential Pipeline Flowchart/i)).toBeInTheDocument();
      expect(screen.getByText(/STAGE 01 \/\/ ENROLLMENT/i)).toBeInTheDocument();
    });

    it('displays Stage 01 details by default and allows navigating to Stage 05 (FAISS)', () => {
      render(<App />);

      // Stage 01 default active
      expect(
        screen.getByText(/Reference Gallery Enrollment & Centroid Normalization/i)
      ).toBeInTheDocument();

      // Click on Stage 05 in the scrubber
      const stage5Buttons = screen.getAllByRole('button', { name: /STAGE 05/i });
      expect(stage5Buttons.length).toBeGreaterThan(0);
      fireEvent.click(stage5Buttons[0]);

      // Stage 05 title should be displayed in the deep-dive slate
      expect(
        screen.getByText(/FAISS Exact Inner-Product Similarity Search/i)
      ).toBeInTheDocument();

      // Check mathematical formula
      expect(screen.getByText(/θ_frozen = 0\.8900/i)).toBeInTheDocument();

      // Check hard rejection boundary
      expect(
        screen.getAllByText(/Cosine Similarity sim\(u, v_ref\) ≥ 0\.8900/i).length
      ).toBeGreaterThanOrEqual(1);
    });

    it('allows advancing pipeline stages using next and previous controls', () => {
      render(<App />);

      // Click Next stage button
      const nextBtn = screen.getByRole('button', { name: /Next pipeline stage/i });
      fireEvent.click(nextBtn);

      // Should advance to Stage 02
      expect(
        screen.getByText(/Real-Time SCRFD Face Detection & 5-Point Alignment/i)
      ).toBeInTheDocument();

      // Advance again to Stage 03
      fireEvent.click(nextBtn);
      expect(
        screen.getByText(/Laplacian Variance & Extreme Pose Quality Pre-Filter/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Var\(Laplacian\(I_crop\)\) ≥ 0\.65/i)).toBeInTheDocument();

      // Previous button navigates back
      const prevBtn = screen.getByRole('button', { name: /Previous pipeline stage/i });
      fireEvent.click(prevBtn);
      expect(
        screen.getByText(/Real-Time SCRFD Face Detection & 5-Point Alignment/i)
      ).toBeInTheDocument();
    });

    it('renders the pipeline architecture summary matrix table with all 8 stages', () => {
      render(<App />);

      expect(
        screen.getByText(/Pipeline Architecture Summary & Failure Mode Isolation/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/8 Audited Boundary Gates/i)).toBeInTheDocument();
    });
  });

  describe('Section 05: Systems Architecture & Runtime Boundaries', () => {
    it('renders Section 05 Architecture heading and two-tier separation matrix', () => {
      render(<App />);

      const archSection = document.getElementById('architecture');
      expect(archSection).toBeInTheDocument();

      expect(
        screen.getByText(/System Architecture & Runtime Boundaries/i)
      ).toBeInTheDocument();

      expect(screen.getByText(/TIER 01 \/\/ STANDALONE PUBLIC PORTAL/i)).toBeInTheDocument();
      expect(screen.getByText(/TIER 02 \/\/ RECOGNITION CORE/i)).toBeInTheDocument();
      expect(screen.getByText(/FindU-Portal v2\.0 \(Client-Side Static\)/i)).toBeInTheDocument();
      expect(screen.getByText(/FindU Operational Engine \(Python \/ TensorRT\)/i)).toBeInTheDocument();
    });

    it('displays the 4-layer production architecture stack', () => {
      render(<App />);

      expect(screen.getByText(/Production Engine 4-Layer Architecture Stack/i)).toBeInTheDocument();
      expect(screen.getByText(/Ingestion & Optical Pre-Filter Tier/i)).toBeInTheDocument();
      expect(screen.getByText(/Forensic Biometric Feature Tier/i)).toBeInTheDocument();
      expect(screen.getByText(/Vector Index & Spatio-Temporal Reasoning Tier/i)).toBeInTheDocument();
      expect(screen.getByText(/Sworn Operator Gateway & Forensic Audit Tier/i)).toBeInTheDocument();
    });

    it('renders audited operational latency benchmarks', () => {
      render(<App />);

      expect(screen.getByText(/Audited Operational Latency Specifications/i)).toBeInTheDocument();
      expect(screen.getByText(/SCRFD DETECTION OVERHEAD/i)).toBeInTheDocument();
      expect(screen.getAllByText(/< 15 ms/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/ARCFACE 512-D EXTRACTION/i)).toBeInTheDocument();
      expect(screen.getAllByText(/< 28 ms/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/FAISS VECTOR SEARCH/i)).toBeInTheDocument();
      expect(screen.getAllByText(/< 0\.8 ms/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/END-TO-END ALERT CYCLE/i)).toBeInTheDocument();
      expect(screen.getAllByText(/< 85 ms/i).length).toBeGreaterThanOrEqual(1);
    });

    it('displays data privacy architecture and link to upstream repository', () => {
      render(<App />);

      expect(
        screen.getByText(/Data Governance, Privacy & Public Trust Architecture/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Ephemeral Frame Buffering/i)).toBeInTheDocument();
      expect(screen.getByText(/Zero Non-Candidate PII Storage/i)).toBeInTheDocument();
      expect(screen.getByText(/Cryptographic Audit Logging/i)).toBeInTheDocument();

      const sourceLink = screen.getByRole('link', { name: /Inspect Upstream Repository/i });
      expect(sourceLink).toHaveAttribute('href', 'https://github.com/Maitra008/FindU');
    });
  });
});
