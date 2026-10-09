import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Phase P5: Unified Interactive Investigation Demo Verification', () => {
  it('renders Section 03 Investigation Workspace with synthetic disclaimer and incident context', () => {
    render(<App />);

    const section = document.getElementById('investigation');
    expect(section).toBeInTheDocument();

    expect(
      screen.getByText(/Deterministic Multi-Camera Investigation Workspace/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/SYNTHETIC INVESTIGATION SCENARIO: ALEX MERCER/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Zero Live CCTV \/ 100% Client-Side Sandbox/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/INCIDENT: #FU-2026-084/i)).toBeInTheDocument();
  });

  it('defaults to Node C2 and displays initial telemetry and biometric slate', () => {
    render(<App />);

    // Default Node C2 feed label
    expect(screen.getByText('CAM-02-CENTRAL-PLAZA-MAIN')).toBeInTheDocument();

    // Node C2 similarity score
    expect(screen.getByText('0.9412')).toBeInTheDocument();

    // Initial review status
    expect(screen.getByText(/AWAITING SWORN REVIEW SIGN-OFF/i)).toBeInTheDocument();
  });

  it('synchronizes workspace when switching to Node C3 via toolbar buttons', () => {
    render(<App />);

    // Click Node C3 button
    const c3Buttons = screen.getAllByRole('button', { name: /Node C3/i });
    expect(c3Buttons.length).toBeGreaterThan(0);
    fireEvent.click(c3Buttons[0]);

    // Feed label should update to CAM-03
    expect(screen.getByText('CAM-03-SOUTH-LINK-CORRIDOR')).toBeInTheDocument();

    // Cosine similarity should update to 0.9184
    expect(screen.getByText('0.9184')).toBeInTheDocument();

    // Gait velocity should be shown
    expect(screen.getByText(/1\.4 m\/s \(Pass ≤ 2\.2 m\/s\)/i)).toBeInTheDocument();
  });

  it('synchronizes workspace when clicking Node C1 on the timeline scrubber', () => {
    render(<App />);

    // Click timeline scrubber item for Node C1
    const c1TimelineBtn = screen.getByRole('button', { name: /STEP 03 \/\/ NODE C1/i });
    fireEvent.click(c1TimelineBtn);

    // Feed label should update to CAM-01
    expect(screen.getByText('CAM-01-NORTH-CONCOURSE-GATE-A')).toBeInTheDocument();

    // Cosine similarity should update to 0.8945
    expect(screen.getByText('0.8945')).toBeInTheDocument();
  });

  it('allows sworn human officer to authorize and dismiss leads, updating audit stream', () => {
    render(<App />);

    // Select Node C2
    const c2Btn = screen.getAllByRole('button', { name: /Node C2/i })[0];
    fireEvent.click(c2Btn);

    // Initial status: awaiting
    expect(screen.getByText(/AWAITING SWORN REVIEW SIGN-OFF/i)).toBeInTheDocument();

    // Click Authorize Lead
    const authorizeBtn = screen.getByRole('button', { name: /Authorize Investigative Field Lead/i });
    fireEvent.click(authorizeBtn);

    // Status should update to AUTHORIZED
    expect(screen.getByText(/AUTHORIZED INVESTIGATIVE FIELD LEAD/i)).toBeInTheDocument();
    expect(screen.getByText(/SIGNED: TASK FORCE LEAD #704/i)).toBeInTheDocument();

    // Check audit stream includes authorization
    expect(
      screen.getByText(/Candidate at Node C2 verified and authorized as Sworn Investigative Field Lead/i)
    ).toBeInTheDocument();

    // Reopen review
    const reopenBtn = screen.getByRole('button', { name: /Re-open Node C2 for Review/i });
    fireEvent.click(reopenBtn);

    expect(screen.getByText(/AWAITING SWORN REVIEW SIGN-OFF/i)).toBeInTheDocument();

    // Dismiss lead
    const dismissBtn = screen.getByRole('button', { name: /Dismiss as Non-Lead/i });
    fireEvent.click(dismissBtn);

    expect(screen.getByText(/DISMISSED AS NON-LEAD \(INSUFFICIENT PROBABILITY\)/i)).toBeInTheDocument();
  });

  it('resets the scenario to default state when clicking Reset Scenario', () => {
    render(<App />);

    // Switch to C3 and authorize
    const c3Btn = screen.getAllByRole('button', { name: /Node C3/i })[0];
    fireEvent.click(c3Btn);

    const authorizeBtn = screen.getByRole('button', { name: /Authorize Investigative Field Lead/i });
    fireEvent.click(authorizeBtn);

    expect(screen.getByText(/AUTHORIZED INVESTIGATIVE FIELD LEAD/i)).toBeInTheDocument();

    // Click Reset Scenario
    const resetBtn = screen.getByRole('button', { name: /Reset Scenario/i });
    fireEvent.click(resetBtn);

    // Should return to Node C2
    expect(screen.getByText('CAM-02-CENTRAL-PLAZA-MAIN')).toBeInTheDocument();
    expect(screen.getByText(/AWAITING SWORN REVIEW SIGN-OFF/i)).toBeInTheDocument();

    // Audit log records reset
    expect(
      screen.getByText(/Investigation workspace reset to initial unreviewed state/i)
    ).toBeInTheDocument();
  });
});
