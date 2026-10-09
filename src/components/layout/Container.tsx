import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '', style }) => {
  return (
    <div className={`container ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};

