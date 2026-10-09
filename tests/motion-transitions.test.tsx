import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase P8: Motion, Transitions & Micro-interactions Verification', () => {
  it('defines refined transition tokens in tokens.css', () => {
    const tokensCss = fs.readFileSync(path.resolve(__dirname, '../src/styles/tokens.css'), 'utf-8');

    expect(tokensCss).toContain('--transition-fast:');
    expect(tokensCss).toContain('--transition-normal:');
    expect(tokensCss).toContain('--transition-slow:');
    expect(tokensCss).toContain('cubic-bezier(0.16, 1, 0.3, 1)');
  });

  it('implements keyframe animations for aperture tally, modal drawer, and entry transitions', () => {
    const componentsCss = fs.readFileSync(path.resolve(__dirname, '../src/styles/components.css'), 'utf-8');

    expect(componentsCss).toContain('@keyframes pulse-tally');
    expect(componentsCss).toContain('@keyframes fadeIn');
    expect(componentsCss).toContain('@keyframes slideDown');
    expect(componentsCss).toContain('.fade-enter');
    expect(componentsCss).toContain('.interactive-card');
  });

  it('enforces strict prefers-reduced-motion accessibility overrides', () => {
    const componentsCss = fs.readFileSync(path.resolve(__dirname, '../src/styles/components.css'), 'utf-8');
    const tokensCss = fs.readFileSync(path.resolve(__dirname, '../src/styles/tokens.css'), 'utf-8');
    const baseCss = fs.readFileSync(path.resolve(__dirname, '../src/styles/base.css'), 'utf-8');

    expect(componentsCss).toContain('@media (prefers-reduced-motion: reduce)');
    expect(tokensCss).toContain('@media (prefers-reduced-motion: reduce)');
    expect(baseCss).toContain('@media (prefers-reduced-motion: reduce)');
    expect(baseCss).toContain('scroll-behavior: auto');
  });
});

