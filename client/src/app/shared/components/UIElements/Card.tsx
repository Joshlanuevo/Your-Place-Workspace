import React, { ReactNode, CSSProperties } from 'react';

interface CardProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, style, children }) => {
  return (
    <div className={`shadow-md rounded-lg overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
