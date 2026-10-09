import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Phase P1: Design System & Visual Constitution Verification', () => {
  it('renders the portal masthead and brand identity', () => {
    render(<App />);
    expect(screen.getAllByText(/FindU/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Technical Portal/i).length).toBeGreaterThan(0);
  });

  it('verifies the strict 3-variable interface palette is documented in colophon', () => {
    render(<App />);
    expect(screen.getByText(/DESIGN CONSTITUTION: #FAF8F5 \/ #141414 \/ #C84B31/i)).toBeInTheDocument();
  });

  it('renders verified P0 quantitative metrics without alterations', () => {
    render(<App />);
    // Precision 100%
    expect(screen.getAllByText(/100%/i).length).toBeGreaterThan(0);
    // Recall 45.0%
    expect(screen.getAllByText(/45.0%/i).length).toBeGreaterThan(0);
    // FPR 0.0%
    expect(screen.getAllByText(/0\.0%/i).length).toBeGreaterThan(0);
    // Operating Threshold 0.89
    expect(screen.getAllByText(/0\.89/i).length).toBeGreaterThan(0);
  });

  it('renders foundational button components with accessible roles', () => {
    render(<App />);
    const primaryBtn = screen.getByRole('link', { name: /Demo Workspace/i });
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toHaveClass('btn-primary');

    const secondaryBtn = screen.getByRole('link', { name: /Inspect 8-Stage Pipeline/i });
    expect(secondaryBtn).toBeInTheDocument();
    expect(secondaryBtn).toHaveClass('btn-secondary');

    const accentBtn = screen.getByRole('button', { name: /Authorize Investigative Field Lead/i });
    expect(accentBtn).toBeInTheDocument();
    expect(accentBtn).toHaveClass('btn-accent');
  });

  it('verifies human verification gateway button interaction', () => {
    render(<App />);
    const accentBtn = screen.getByRole('button', { name: /Authorize Investigative Field Lead/i });
    expect(accentBtn).toBeEnabled();
  });
});
