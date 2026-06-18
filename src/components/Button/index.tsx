import React from "react";

import { Play } from "@/assets";
import { ImageIcon } from "@/common";

import { Text, ButtonTextContainer, PrimaryButton, SecondaryButton, RunButton } from "./styles";

type TypeButton = "menu" | "run" | "primary";

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
    case "primary":
      return <PrimaryButton onClick={onPress}>{text}</PrimaryButton>;
    case "menu":
      return <SecondaryButton onClick={onPress}>{text}</SecondaryButton>;
    case "run":
      return (
        <ButtonTextContainer>
          <RunButton onClick={onPress} aria-label="Cozinhar — executar instruções">
            <ImageIcon width="40px" height="40px" src={Play} />
          </RunButton>
          <Text>Cozinhar!</Text>
        </ButtonTextContainer>
      );
  }
};
