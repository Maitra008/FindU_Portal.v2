import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Phase P9: Content, Responsive & Accessibility Audit Verification', () => {
  it('renders all 7 page sections in correct architectural order', () => {
    const { container } = render(<App />);

    const sections = container.querySelectorAll('section');
    const sectionIds = Array.from(sections).map((s) => s.id);

    expect(sectionIds).toEqual([
      'hero',
      'problem',
      'investigation',
      'methodology',
      'architecture',
      'validation',
      'closing',
    ]);
  });

  it('verifies consistent threshold citations (θ = 0.89) across all core sections', () => {
    render(<App />);

    // Hero section
    expect(screen.getAllByText(/θ = 0\.89/i).length).toBeGreaterThanOrEqual(1);

    // Methodology stage 05
    const stage5Buttons = screen.getAllByRole('button', { name: /STAGE 05/i });
    fireEvent.click(stage5Buttons[0]);
    expect(screen.getByText(/θ_frozen = 0\.8900/i)).toBeInTheDocument();

    // Validation section
    expect(screen.getByText(/Frozen Cutoff θ = 0\.8900/i)).toBeInTheDocument();
  });

  it('ensures synthetic and simulation disclaimers are prominent on forensic demonstrations', () => {
    render(<App />);

    // Hero overlay
    expect(screen.getByText('SIMULATION')).toBeInTheDocument();

    // Investigation section banner
    expect(screen.getByText(/SYNTHETIC INVESTIGATION SCENARIO: ALEX MERCER/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero Live CCTV \/ 100% Client-Side Sandbox/i)).toBeInTheDocument();

    // Human review gate disclaimer
    expect(screen.getByText(/EU AI Act Art\. 14 Oversight Principle/i)).toBeInTheDocument();
  });

  it('verifies that no autonomous enforcement claims exist and human gate is mandated', () => {
    render(<App />);

    // Problem narrative Act III
    const act3Btn = screen.getByRole('button', { name: /Act III \/\/ AI Match ≠ Identification/i });
    fireEvent.click(act3Btn);

    expect(
      screen.getByText(/Autonomous dispatch, watchlist addition, or law enforcement action without human sign-off is blocked/i)
    ).toBeInTheDocument();

    // Investigation gate
    expect(
      screen.getByText(/The FindU core protocol prohibits autonomous dispatch or surveillance watchlist escalation without sworn human review/i)
    ).toBeInTheDocument();
  });

  it('verifies mobile navigation drawer open, close, and accessible attribute states', () => {
    render(<App />);

    const toggleBtn = screen.getByRole('button', { name: /Open Navigation Menu/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Open drawer
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Close on Escape
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('verifies all outbound repository links point to official upstream source repository', () => {
    render(<App />);

    const outboundLinks = screen.getAllByRole('link', { name: /Upstream Engine Repo|Open GitHub Repository|Inspect Upstream Repository|Review Source Audit/i });
    expect(outboundLinks.length).toBeGreaterThanOrEqual(3);

    outboundLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://github.com/Maitra008/FindU');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });
  });
});
