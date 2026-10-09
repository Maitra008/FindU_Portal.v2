import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Phase P4: Problem Narrative & Solution Story Verification', () => {
  it('renders Section 02 Problem narrative heading and lead text', () => {
    render(<App />);

    const problemSection = document.getElementById('problem');
    expect(problemSection).toBeInTheDocument();

    expect(
      screen.getByText(/Why Finding a Missing Person Shouldn't Stop at One Camera/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Traditional municipal search is bottlenecked by disconnected video recorders/i)
    ).toBeInTheDocument();
  });

  it('renders Act I three core roadblocks by default', () => {
    render(<App />);

    expect(screen.getByText(/A Sighting Without Direction/i)).toBeInTheDocument();
    expect(screen.getByText(/Disconnected Timelines/i)).toBeInTheDocument();
    expect(screen.getByText(/The Risk of Blind Automation/i)).toBeInTheDocument();
  });

  it('switches to Act II (The Connected Workflow) and allows navigating workflow stages', () => {
    render(<App />);

    const act2Btn = screen.getByRole('button', { name: /Act II \/\/ The Connected Workflow/i });
    fireEvent.click(act2Btn);

    // Act II title should now be in the document
    expect(screen.getByText(/How FindU Connects Sightings Across Space & Time/i)).toBeInTheDocument();

    // Verify initial stage 01 is active
    expect(screen.getByText(/RAW PROBE LOCALIZED/i)).toBeInTheDocument();

    // Click on Stage 03 button
    const stage3Btn = screen.getByRole('button', { name: /Hyperspherical Vector Similarity/i });
    fireEvent.click(stage3Btn);

    expect(screen.getByText(/CANDIDATE SIGHTING FLAGGED/i)).toBeInTheDocument();
    expect(
      screen.getByText(/sim\(u, v\) = u · v ≥ 0\.8900/i)
    ).toBeInTheDocument();

    // Click Next Stage button
    const nextBtn = screen.getByRole('button', { name: /Next Stage →/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText(/SPATIO-TEMPORAL CONTINUITY/i)).toBeInTheDocument();
  });

  it('switches to Act III (AI Match ≠ Identification) and displays the split authority matrix', () => {
    render(<App />);

    const act3Btn = screen.getByRole('button', { name: /Act III \/\/ AI Match ≠ Identification/i });
    fireEvent.click(act3Btn);

    expect(
      screen.getByText(/The Decision Boundary: AI Match ≠ Identification/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/AUTOMATED SYSTEM AUTHORITY \(ALGORITHMIC SCOPE\)/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/SWORN HUMAN AUTHORITY \(MANDATORY GATEWAY\)/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Autonomous dispatch, watchlist addition, or law enforcement action without human sign-off is blocked/i)
    ).toBeInTheDocument();
  });

  it('verifies transit velocity physical plausibility gate is clearly communicated', () => {
    render(<App />);

    const act2Btn = screen.getByRole('button', { name: /Act II \/\/ The Connected Workflow/i });
    fireEvent.click(act2Btn);

    const stage5Btn = screen.getByRole('button', { name: /Physical Transit Plausibility Gate/i });
    fireEvent.click(stage5Btn);

    expect(screen.getByText(/TRANSIT GATE PLAUSIBLE/i)).toBeInTheDocument();
    expect(screen.getByText(/Transit Velocity v = distance \/ Δt ≤ 2\.2 m\/s/i)).toBeInTheDocument();
  });
});

