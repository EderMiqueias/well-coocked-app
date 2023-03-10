import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  url: string;
  justify?: string;
  children: React.ReactNode
}

export const Anchor: React.FC<ButtonProps> = ({
  url,
  children,
  justify = 'flex-start'
}) => {
  return (
    <Link to={url} style={{ width: '100%', display: 'flex', justifyContent: justify }}>
      {children}
    </Link>
  );
}
