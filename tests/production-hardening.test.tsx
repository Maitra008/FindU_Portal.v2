import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import App from '../src/App';

describe('Phase P11: Performance, Security & Production Hardening Verification', () => {
  it('verifies hero image preload and CLS prevention attributes', () => {
    // Check index.html preload link
    const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    expect(indexHtml).toContain('<link rel="preload" as="image" href="/assets/hero-transit-concourse.jpg" fetchpriority="high" />');

    // Render App and check hero image attributes
    render(<App />);
    const heroImg = screen.getByAltText(/documentary perspective of a modern municipal transit concourse/i);
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('src', '/assets/hero-transit-concourse.jpg');
    expect(heroImg).toHaveAttribute('width', '1280');
    expect(heroImg).toHaveAttribute('height', '720');
    expect(heroImg).toHaveAttribute('fetchpriority', 'high');
  });

  it('verifies public/_headers defines strict CSP, clickjacking, and mime-sniffing protections', () => {
    const headersPath = path.resolve(__dirname, '../public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);

    const headersContent = fs.readFileSync(headersPath, 'utf8');
    expect(headersContent).toContain("Content-Security-Policy: default-src 'self'");
    expect(headersContent).toContain("script-src 'self'");
    expect(headersContent).toContain("frame-ancestors 'none'");
    expect(headersContent).toContain('X-Content-Type-Options: nosniff');
    expect(headersContent).toContain('X-Frame-Options: DENY');
    expect(headersContent).toContain('Referrer-Policy: strict-origin-when-cross-origin');
    expect(headersContent).toContain('Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()');
    expect(headersContent).toContain('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
    expect(headersContent).toContain('Cache-Control: public, max-age=31536000, immutable');
  });

  it('verifies vercel.json defines security headers and SPA rewrites', () => {
    const vercelPath = path.resolve(__dirname, '../vercel.json');
    expect(fs.existsSync(vercelPath)).toBe(true);

    const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    expect(vercelConfig.rewrites).toEqual([
      { source: '/(.*)', destination: '/index.html' }
    ]);

    const globalHeaders = vercelConfig.headers.find((h: any) => h.source === '/(.*)');
    expect(globalHeaders).toBeDefined();

    const headerKeys = globalHeaders.headers.map((h: any) => h.key);
    expect(headerKeys).toContain('Content-Security-Policy');
    expect(headerKeys).toContain('X-Content-Type-Options');
    expect(headerKeys).toContain('X-Frame-Options');
    expect(headerKeys).toContain('Referrer-Policy');
    expect(headerKeys).toContain('Permissions-Policy');
    expect(headerKeys).toContain('Cross-Origin-Opener-Policy');
    expect(headerKeys).toContain('Strict-Transport-Security');
  });

  it('verifies public/_redirects defines SPA 200 fallback rewrite for static hosting', () => {
    const redirectsPath = path.resolve(__dirname, '../public/_redirects');
    expect(fs.existsSync(redirectsPath)).toBe(true);

    const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
    expect(redirectsContent.trim()).toBe('/*    /index.html   200');
  });

  it('verifies vite.config.ts configures vendor and icon chunk splitting', () => {
    const viteConfig = fs.readFileSync(path.resolve(__dirname, '../vite.config.ts'), 'utf8');
    expect(viteConfig).toContain('manualChunks');
    expect(viteConfig).toContain("vendor: ['react', 'react-dom']");
    expect(viteConfig).toContain("icons: ['lucide-react']");
  });

  it('verifies zero dynamic runtime network calls and zero dangerous DOM injections in src', () => {
    const srcDir = path.resolve(__dirname, '../src');
    
    function scanDir(dir: string): string[] {
      let results: string[] = [];
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          results.push(...scanDir(fullPath));
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
          results.push(fullPath);
        }
      }
      return results;
    }

    const sourceFiles = scanDir(srcDir);
    expect(sourceFiles.length).toBeGreaterThan(15);

    sourceFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      // No dangerouslySetInnerHTML
      expect(content).not.toContain('dangerouslySetInnerHTML');
      // No eval() calls
      expect(content).not.toMatch(/\beval\s*\(/);
      // No fetch calls
      expect(content).not.toMatch(/\bfetch\s*\(/);
      // No axios calls
      expect(content).not.toMatch(/\baxios\b/);
      // No WebSocket constructors
      expect(content).not.toMatch(/\bnew\s+WebSocket\s*\(/);
      // No XMLHttpRequest
      expect(content).not.toMatch(/\bXMLHttpRequest\b/);
    });
  });

  it('verifies all external links use rel="noopener noreferrer" and target="_blank"', () => {
    render(<App />);
    const outboundLinks = screen.getAllByRole('link', {
      name: /Upstream Engine Repo|Open GitHub Repository|Inspect Upstream Repository|Review Source Audit/i
    });
    expect(outboundLinks.length).toBeGreaterThanOrEqual(3);

    outboundLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('href', 'https://github.com/Maitra008/FindU');
    });
  });
});
