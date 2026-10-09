import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../src/App';

describe('Phase P2: Responsive Architecture & Page Framework Verification', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    vi.restoreAllMocks();
  });

  it('renders all 7 planned semantic sections with matching anchor IDs', () => {
    render(<App />);

    expect(document.getElementById('hero')).toBeInTheDocument();
    expect(document.getElementById('problem')).toBeInTheDocument();
    expect(document.getElementById('investigation')).toBeInTheDocument();
    expect(document.getElementById('methodology')).toBeInTheDocument();
    expect(document.getElementById('architecture')).toBeInTheDocument();
    expect(document.getElementById('validation')).toBeInTheDocument();
    expect(document.getElementById('closing')).toBeInTheDocument();
  });

  it('provides accessible semantic landmarks and skip link', () => {
    render(<App />);

    // Header landmark
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Main landmark with id="main-content"
    const main = document.getElementById('main-content');
    expect(main).toBeInTheDocument();
    expect(main?.tagName.toLowerCase()).toBe('main');

    // Footer landmark and bottom colophon verification
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Copyright © 2026 Partho Maitra.');
    expect(footer).toHaveTextContent('MIT LICENSE');
    expect(footer).toHaveTextContent('FROZEN THRESHOLD θ = 0.8900');

    // Skip link
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders accessible navigation links for all sections', () => {
    render(<App />);

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    const expectedHrefs = [
      '#hero',
      '#problem',
      '#investigation',
      '#methodology',
      '#architecture',
      '#validation',
      '#closing',
    ];

    expectedHrefs.forEach((href) => {
      const link = nav.querySelector(`a[href="${href}"]`);
      expect(link).not.toBeNull();
    });
  });

  it('renders mobile menu toggle button with appropriate accessibility attributes', () => {
    render(<App />);

    const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    expect(toggleBtn).toHaveAttribute('aria-controls', 'mobile-navigation');
  });

  it('opens and closes the mobile navigation drawer when toggled', () => {
    render(<App />);

    const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggleBtn);

    // Mobile drawer should now be visible
    const mobileDrawer = document.getElementById('mobile-navigation');
    expect(mobileDrawer).toBeInTheDocument();

    // Close button inside drawer
    const closeBtn = screen.getByRole('button', { name: /close navigation drawer/i });
    fireEvent.click(closeBtn);

    expect(document.getElementById('mobile-navigation')).not.toBeInTheDocument();
  });

  it('verifies responsive viewport width updates dynamically on window resize', () => {
    render(<App />);

    // Simulate mobile viewport 375px
    act(() => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText(/375px/i)).toBeInTheDocument();

    // Simulate tablet viewport 768px
    act(() => {
      window.innerWidth = 768;
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText(/768px/i)).toBeInTheDocument();

    // Simulate desktop viewport 1440px
    act(() => {
      window.innerWidth = 1440;
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText(/1440px/i)).toBeInTheDocument();
  });

  it('verifies H1 display heading exists in hero and section H2s exist', () => {
    render(<App />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/When someone goes missing, every sighting matters/i);

    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThanOrEqual(6);
  });

  it('renders verified quantitative test metrics from P0 audit accurately', () => {
    render(<App />);

    expect(screen.getAllByText(/100%/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/45.0%/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/0\.0%/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/0\.89/i).length).toBeGreaterThan(0);
  });
});
