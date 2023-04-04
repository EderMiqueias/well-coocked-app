import React from "react";

import {
  ArrowBottom,
  ArrowLeft,
  ArrowRight,
  ArrowTop,
  GrabActionIcon,
  InteractActionIcon,
  WaitActionIcon
} from "@/assets";
import { ImageIcon } from "@/common";
import { Instructions } from "@/types";
import { Button, ButtonText, ButtonTextContainer } from "./styles";



type InstructionButtonProps = {
  instruction: Instructions;
  onPress: () => void;
  text?: string;
};

export const getInstructionIcon = (instruction: Instructions) => {
  const icons = {
    [Instructions.grabRelease]: GrabActionIcon,
    [Instructions.interact]: InteractActionIcon,
    [Instructions.wait]: WaitActionIcon,
    [Instructions.bottom]: ArrowBottom,
    [Instructions.left]: ArrowLeft,
    [Instructions.right]: ArrowRight,
    [Instructions.top]: ArrowTop
  };

  return icons[instruction];
};

export const InstructionButton: React.FC<InstructionButtonProps> = ({
  instruction,
  onPress,
  text
}) => {
  return (
    <ButtonTextContainer>
      <Button onClick={onPress}>
        <ImageIcon
          src={getInstructionIcon(instruction)}
          height="40px"
          width="40px"
        />
      </Button>
      {text && (
        <ButtonText>{text}</ButtonText>
      )}
    </ButtonTextContainer>
  );
};
