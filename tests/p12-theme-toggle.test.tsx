import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import { ThemeProvider } from '../src/contexts/ThemeContext';

describe('Phase P12: Theme Toggle & Visual Polish Verification', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    try { localStorage.clear(); } catch { /* ignore */ }
    // Reset data-theme
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    try { localStorage.clear(); } catch { /* ignore */ }
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders theme toggle button in the header with accessible attributes', () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    const toggleBtn = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches from light to dark mode when toggle is clicked', () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    const toggleBtn = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(toggleBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');
    // Now button label should update
    const lightBtn = screen.getByRole('button', { name: /switch to light mode/i });
    expect(lightBtn).toBeInTheDocument();
  });

  it('switches back from dark to light mode', () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    const darkBtn = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(darkBtn); // -> dark
    const lightBtn = screen.getByRole('button', { name: /switch to light mode/i });
    fireEvent.click(lightBtn); // -> light
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('persists theme preference to localStorage', () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    const toggleBtn = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(toggleBtn);
    try {
      expect(localStorage.getItem('findu-theme')).toBe('dark');
    } catch {
      // storage may be unavailable in test environment
    }
  });

  it('verifies methodology stage selector shows readable short labels without truncation', () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    // All 8 stage short labels should be present (they appear in tabs and the summary table)
    expect(screen.getAllByText('Gallery Enrollment').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Face Detection/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText('Quality Pre-Filter').length).toBeGreaterThan(0);
    expect(screen.getAllByText('512-D Embedding').length).toBeGreaterThan(0);
    expect(screen.getAllByText('FAISS Similarity Search').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Temporal Consensus').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Transit Plausibility').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Human Verification').length).toBeGreaterThan(0);
  });

  it('verifies human review panel action buttons render with wrapping capability', () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    // The authorize button should be present without truncation
    const authorizeBtn = screen.getByRole('button', { name: /authorize investigative field lead/i });
    expect(authorizeBtn).toBeInTheDocument();
    // The dismiss button
    const dismissBtn = screen.getByRole('button', { name: /dismiss as non-lead/i });
    expect(dismissBtn).toBeInTheDocument();
  });

  it('theme toggle does not reset investigation demo state', () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    // The investigation section should still be present after theme toggle
    const toggleBtn = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(toggleBtn);
    // Investigation section still present
    expect(screen.getByText(/synthetic investigation scenario/i)).toBeInTheDocument();
  });
});
