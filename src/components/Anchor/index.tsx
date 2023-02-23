import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  url: string;
  children: React.ReactNode
}

export const Anchor: React.FC<ButtonProps> = ({
  url,
  children
}) => {
  return (
    <Link to={url} style={{ width: '100%' }}>
      {children}
    </Link>
  );
}
