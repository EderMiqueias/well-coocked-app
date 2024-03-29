import React from "react";

import { Play } from "@/assets";
import { ImageIcon } from "@/common";

import { Text, ButtonTextContainer, MenuButton, RunButton } from "./styles";

type TypeButton = "menu" | "run";

type ButtonProps = {
  type: TypeButton;
  text?: string;
  onPress?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  type,
  onPress
}) => {
  switch (type) {
    case "menu":
      return <MenuButton>{text}</MenuButton>;
    case "run":
      return (
        <ButtonTextContainer>
          <RunButton onClick={onPress}>
            <ImageIcon width="40px" height="40px" src={Play} />
          </RunButton>
          <Text>Cozinhar!</Text>
        </ButtonTextContainer>
      );
  }
};
