import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Camera, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Container } from './Container';

interface NavItem {
  label: string;
  href: string;
  id: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#hero', id: 'hero', index: '01' },
  { label: 'Problem', href: '#problem', id: 'problem', index: '02' },
  { label: 'Investigation', href: '#investigation', id: 'investigation', index: '03' },
  { label: 'Methodology', href: '#methodology', id: 'methodology', index: '04' },
  { label: 'Architecture', href: '#architecture', id: 'architecture', index: '05' },
  { label: 'Validation', href: '#validation', id: 'validation', index: '06' },
  { label: 'Colophon', href: '#closing', id: 'closing', index: '07' },
];

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Viewport resize listener
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      if (window.innerWidth > 900) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Escape key handler and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Move focus into the drawer close button
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    toggleButtonRef.current?.focus();
  };

  return (
    <>
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        role="banner"
        style={{
          borderBottom: '1px solid var(--ink-15)',
          backgroundColor: 'var(--paper)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 'var(--space-3)',
              paddingBottom: 'var(--space-3)',
              gap: 'var(--space-4)',
            }}
          >
            {/* Brand Mark & Optical Recording Tally */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span className="tally-dot active" title="Active camera recording / portal session" />
              <a
                href="#hero"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  letterSpacing: 'var(--tracking-wide)',
                  color: 'var(--ink)',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                FindU <span style={{ color: 'var(--ink-50)' }}>//</span> Technical Portal
              </a>
            </div>

            {/* Desktop Navigation Landmark */}
            <nav
              aria-label="Main Navigation"
              className="desktop-nav"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="link-editorial"
                    aria-current={isActive ? 'true' : undefined}
                    style={{
                      minHeight: '44px',
                      borderBottomColor: isActive ? 'var(--accent)' : undefined,
                      color: isActive ? 'var(--ink)' : 'var(--ink-90)',
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: isActive ? 'var(--accent)' : 'var(--ink-50)',
                        marginRight: '3px',
                      }}
                    >
                      {item.index}.
                    </span>
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Action Group: CTA, Viewport Tag & Mobile Drawer Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              {/* Primary Header CTA */}
              <a
                href="#investigation"
                className="btn btn-primary"
                style={{
                  minHeight: '36px',
                  padding: '4px 12px',
                  fontSize: 'var(--text-xs)',
                  display: 'inline-flex',
                }}
              >
                <Camera size={13} />
                <span>Demo Workspace</span>
              </a>

              {/* Viewport Diagnostic Badge */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--ink-70)',
                  padding: '4px 8px',
                  border: '1px solid var(--ink-15)',
                  backgroundColor: 'var(--paper-pure)',
                }}
              >
                {viewportWidth}px
              </span>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                aria-pressed={theme === 'dark'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '36px',
                  minWidth: '36px',
                  border: '1px solid var(--ink-15)',
                  backgroundColor: 'var(--paper-pure)',
                  cursor: 'pointer',
                  color: 'var(--ink-70)',
                  transition: 'color var(--transition-fast), background-color var(--transition-fast)',
                }}
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              {/* Mobile Drawer Toggle */}
              <button
                ref={toggleButtonRef}
                type="button"
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Accessible Mobile Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--ink-15)',
              paddingBottom: 'var(--space-3)',
            }}
          >
            <span className="section-label accent" style={{ margin: 0 }}>
              Section Navigation
            </span>
            <button
              ref={closeButtonRef}
              onClick={closeMobileMenu}
              className="btn btn-secondary"
              style={{ minHeight: '36px', padding: '4px 10px', fontSize: '12px' }}
              aria-label="Close navigation drawer"
            >
              Close <X size={14} />
            </button>
          </div>

          <nav aria-label="Mobile Navigation Links" style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
                  aria-current={isActive ? 'true' : undefined}
                  onClick={closeMobileMenu}
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--ink)',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-50)' }}>
                      {item.index}
                    </span>
                    {item.label}
                  </span>
                  <span style={{ color: isActive ? 'var(--accent)' : 'var(--ink-50)' }}>→</span>
                </a>
              );
            })}
            
            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-pressed={theme === 'dark'}
              className="mobile-nav-link"
              style={{ background: 'none', border: 'none', borderBottom: '1px solid var(--ink-15)', cursor: 'pointer', justifyContent: 'space-between', width: '100%', textAlign: 'left' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <span style={{ color: 'var(--ink-50)' }}>→</span>
            </button>
          </nav>

          <div
            style={{
              marginTop: 'auto',
              borderTop: '1px solid var(--ink-15)',
              paddingTop: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            <a
              href="#investigation"
              className="btn btn-accent"
              style={{ width: '100%' }}
              onClick={closeMobileMenu}
            >
              <Camera size={14} /> Launch Investigation Demo
            </a>
            <a
              href="https://github.com/Maitra008/FindU"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={closeMobileMenu}
            >
              Upstream FindU Repo <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
