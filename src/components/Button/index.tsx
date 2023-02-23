import React from "react";
import { MenuButton } from "./styles";

type TypeButton = "menu"

type ButtonProps = {
  text: string;
  type: TypeButton;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type
}) => {
  switch (type) {
    case "menu":
      return <MenuButton>{text}</MenuButton>
  }
}
