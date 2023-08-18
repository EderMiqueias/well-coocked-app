import React from "react";

import { Play } from "@/assets";
import { ImageIcon } from "@/common";
import { TooltipContainer, TooltipContent, TooltipText } from "../Tooltip/index"


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

          <TooltipContainer>
          <RunButton onClick={onPress}>
            
          <TooltipContent>
          <TooltipText>Cozinhar!</TooltipText>
         </TooltipContent>

            <ImageIcon width="40px" height="40px" src={Play} />
          </RunButton>
          </TooltipContainer>
          <Text> Cozinhar!</Text>
        </ButtonTextContainer>
      );
  }
};
