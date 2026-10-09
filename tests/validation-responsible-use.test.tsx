import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Phase P7: Validation, Metrics & Responsible Use Verification', () => {
  it('renders Section 06 Validation heading, lead text, and cohort methodology disclosure', () => {
    render(<App />);

    const validationSection = document.getElementById('validation');
    expect(validationSection).toBeInTheDocument();

    expect(
      screen.getByText(/Controlled Evaluation Benchmarks & Responsible Use/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Offline Test Split \/\/ n = 110 Comparison Pairs/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/20 genuine missing-person probe photos/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/90 negative impostor comparison pairs/i)
    ).toBeInTheDocument();
  });

  it('renders all empirical metrics with their 95% Wilson Score confidence intervals', () => {
    render(<App />);

    // Precision
    expect(screen.getAllByText(/100\.0%/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/70\.1% – 100\.0%/i).length).toBeGreaterThanOrEqual(1);

    // Recall Rate
    expect(screen.getAllByText(/45\.0%/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/25\.8% – 65\.8%/i).length).toBeGreaterThanOrEqual(1);

    // False Positive Rate
    expect(screen.getByText(/False Positive Rate \(FPR\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/0\.0% – 4\.1%/i).length).toBeGreaterThanOrEqual(1);

    // F1-Score
    expect(screen.getByText(/62\.1%/i)).toBeInTheDocument();

    // AUROC
    expect(screen.getAllByText(/1\.0000/i).length).toBeGreaterThanOrEqual(1);
  });

  it('provides plain-language definitions and honest interpretations for every metric', () => {
    render(<App />);

    expect(
      screen.getByText(/When the system raised an alert, was it actually the missing person\?/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Out of all actual sightings of the missing person, how many did the system catch\?/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/How often was an innocent non-missing citizen incorrectly flagged\?/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/How well can the embedding space rank true matches higher than impostors across all cutoffs\?/i)
    ).toBeInTheDocument();
  });

  it('transparently discloses the dataset mirroring anomaly from VALIDATION_AUDIT.md', () => {
    render(<App />);

    expect(
      screen.getByText(/Full Evidentiary Disclosure \/\/ Dataset Mirroring Anomaly \(VALIDATION_AUDIT\.md\)/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/horizontally mirrored transformations of enrolled subjects/i)
    ).toBeInTheDocument();

    const auditLink = screen.getByRole('link', { name: /Review Source Audit/i });
    expect(auditLink).toHaveAttribute('href', 'https://github.com/Maitra008/FindU');
  });

  it('renders the prominent technical limitations block with critical boundaries', () => {
    render(<App />);

    expect(
      screen.getByText(/Known Technical Limitations & Boundary Constraints/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Curated Datasets vs\. Real-World CCTV/i)).toBeInTheDocument();
    expect(screen.getByText(/Conservative Recall Trade-Off \(45%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Demographic Fairness Unmeasured/i)).toBeInTheDocument();
    expect(screen.getByText(/Candidate Match ≠ Confirmed Identity/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Size & Statistical Uncertainty/i)).toBeInTheDocument();
    expect(screen.getByText(/Prototype Status ≠ Certified Police System/i)).toBeInTheDocument();
  });

  it('renders the 8 core responsible-use principles and distinguishes implementation statuses', () => {
    render(<App />);

    expect(
      screen.getByText(/Responsible-Use & Public Trust Governance Framework/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/1\. Mandatory Human Verification Gate/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. Strict Purpose Limitation/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. Ephemeral In-Memory Processing & Data Minimization/i)).toBeInTheDocument();
    expect(screen.getByText(/4\. Role-Based Access Control & Case Scoping/i)).toBeInTheDocument();
    expect(screen.getByText(/5\. Tamper-Evident Auditability & Provenance/i)).toBeInTheDocument();
    expect(screen.getByText(/6\. Operational Transparency & Error Disclosure/i)).toBeInTheDocument();
    expect(screen.getByText(/7\. Resilient Failure Mode Handling/i)).toBeInTheDocument();
    expect(screen.getByText(/8\. Proportionality & Non-Conviction Safeguard/i)).toBeInTheDocument();

    // Check implementation status badges
    expect(screen.getAllByText(/Implemented in Architecture/i).length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText(/Operational Policy Requirement/i).length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByText(/Demonstrated in Sandbox/i).length).toBeGreaterThanOrEqual(1);
  });
});
