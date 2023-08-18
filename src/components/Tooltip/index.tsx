import React, { ReactNode } from 'react';


type TooltipProps = {
  text: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {

  return (
    <div className="tooltip-container">
      <div className="tooltip">
        {children}
        <span className="tooltip-text">{text}</span>
      </div>
    </div>
  );
};

 