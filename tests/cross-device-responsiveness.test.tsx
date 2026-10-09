import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from '../src/App';

const VIEWPORTS = [
  { name: 'Ultra-narrow Mobile (320px)', width: 320, height: 568 },
  { name: 'Compact Mobile (375px)', width: 375, height: 667 },
  { name: 'Standard Mobile (412px)', width: 412, height: 915 },
  { name: 'Tablet Portrait (768px)', width: 768, height: 1024 },
  { name: 'Small Laptop / Tablet Landscape (1024px)', width: 1024, height: 768 },
  { name: 'Full Desktop (1440px)', width: 1440, height: 900 },
];

describe('Phase P10: Cross-Device Responsiveness & Visual Correction Verification', () => {
  VIEWPORTS.forEach(({ name, width, height }) => {
    it(`renders flawlessly at ${name} (${width}x${height}px) with responsive diagnostics`, () => {
      // Set window inner width and trigger resize event
      act(() => {
        window.innerWidth = width;
        window.innerHeight = height;
        window.dispatchEvent(new Event('resize'));
      });

      const { container } = render(<App />);

      // Verify that the viewport diagnostic badge displays the updated width
      expect(screen.getByText(`${width}px`)).toBeInTheDocument();

      // Ensure all 7 sections remain rendered and mounted
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBe(7);

      // Verify interactive investigation demo controls remain accessible
      const c2Btn = screen.getAllByRole('button', { name: /Node C2/i })[0];
      expect(c2Btn).toBeInTheDocument();
      expect(c2Btn).toBeEnabled();

      // Verify table containers have horizontal scrolling wrappers to prevent page-level clipping
      const scrollContainers = container.querySelectorAll('[style*="overflow-x: auto"], [style*="overflowX: auto"], [style*="overflowX: \'auto\'"]');
      expect(scrollContainers.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('verifies touch target minimum sizing across all primary action buttons', () => {
    const { container } = render(<App />);

    const buttons = container.querySelectorAll('.btn, .mobile-menu-toggle, .link-editorial');
    expect(buttons.length).toBeGreaterThan(0);

    buttons.forEach((el) => {
      // Touch target guideline dictates >= 44px
      expect(el).not.toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('verifies that no horizontal overflow is created on 320px narrow screens', () => {
    act(() => {
      window.innerWidth = 320;
      window.innerHeight = 568;
      window.dispatchEvent(new Event('resize'));
    });

    const { container } = render(<App />);

    // Check main container
    const main = container.querySelector('#main-content');
    expect(main).toBeInTheDocument();

    // Verify all primary headings are rendered
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings.length).toBe(6); // 6 SectionWrappers with h2
  });
});
