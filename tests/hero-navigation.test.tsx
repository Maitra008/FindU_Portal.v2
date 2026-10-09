import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Phase P3: Navigation & Hero Experience Verification', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    document.body.style.overflow = '';
    vi.restoreAllMocks();
  });

  it('renders the refined P3 Hero headline and narrative', () => {
    render(<App />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/When someone goes missing, every sighting matters/i);

    expect(
      screen.getByText(/Disconnected surveillance cameras leave fatal blind spots/i)
    ).toBeInTheDocument();
  });

  it('renders the architectural concourse hero photograph with meaningful alt text', () => {
    render(<App />);

    const heroImg = screen.getByAltText(/High-angle documentary perspective of a modern municipal transit concourse/i);
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('src', '/assets/hero-transit-concourse.jpg');
  });

  it('verifies primary hero call to action buttons and anchors', () => {
    render(<App />);

    const launchBtn = screen.getByRole('link', { name: /Launch Investigation Demo/i });
    expect(launchBtn).toBeInTheDocument();
    expect(launchBtn).toHaveAttribute('href', '#investigation');
    expect(launchBtn).toHaveClass('btn-accent');

    const pipelineBtn = screen.getByRole('link', { name: /Inspect 8-Stage Pipeline/i });
    expect(pipelineBtn).toBeInTheDocument();
    expect(pipelineBtn).toHaveAttribute('href', '#methodology');
    expect(pipelineBtn).toHaveClass('btn-secondary');
  });

  it('verifies header primary CTA links to the investigation demo', () => {
    render(<App />);

    const headerCta = screen.getByRole('link', { name: /Demo Workspace/i });
    expect(headerCta).toBeInTheDocument();
    expect(headerCta).toHaveAttribute('href', '#investigation');
    expect(headerCta).toHaveClass('btn-primary');
  });

  it('handles Escape key to close mobile navigation drawer and manage body scroll lock', () => {
    render(<App />);

    const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggleBtn);

    // Body scroll locked
    expect(document.body.style.overflow).toBe('hidden');

    const drawer = document.getElementById('mobile-navigation');
    expect(drawer).toBeInTheDocument();

    // Fire Escape key
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    // Drawer should close and body scroll restored
    expect(document.getElementById('mobile-navigation')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('closes mobile drawer and restores scroll when a section link is clicked', () => {
    render(<App />);

    const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggleBtn);

    expect(document.getElementById('mobile-navigation')).toBeInTheDocument();

    // Click on Investigation link in mobile drawer
    const drawerLinks = screen.getAllByRole('link', { name: /Investigation/i });
    // The mobile drawer link is one of them
    const mobileLink = drawerLinks.find((l) => l.classList.contains('mobile-nav-link'));
    expect(mobileLink).toBeDefined();

    if (mobileLink) {
      fireEvent.click(mobileLink);
      expect(document.getElementById('mobile-navigation')).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe('');
    }
  });

  it('renders sensor HUD overlays and synthetic demo disclaimer badges', () => {
    render(<App />);

    expect(screen.getByText(/SENSOR_NODE \/\/ C2_CENTRAL_PLAZA/i)).toBeInTheDocument();
    expect(screen.getByText(/TRANSIT VELOCITY: 1\.4 m\/s \[PLAUSIBLE\]/i)).toBeInTheDocument();
    expect(screen.getAllByText(/SIMULATION/i).length).toBeGreaterThan(0);
  });
});

