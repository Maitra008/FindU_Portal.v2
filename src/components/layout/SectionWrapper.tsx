import React from 'react';
import { Container } from './Container';

interface SectionWrapperProps {
  id: string;
  sectionIndex: string;
  sectionLabel: string;
  title: string;
  leadText?: string;
  isAccentLabel?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  sectionIndex,
  sectionLabel,
  title,
  leadText,
  isAccentLabel = false,
  children,
  className = '',
  style,
}) => {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`section-wrapper ${className}`.trim()}
      style={style}
    >
      <Container>
        <div className="heading-group">
          <div className={`section-label ${isAccentLabel ? 'accent' : ''}`}>
            {sectionIndex} // {sectionLabel}
          </div>
          <h2 id={headingId}>{title}</h2>
          {leadText && <p className="lead-text">{leadText}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
};

