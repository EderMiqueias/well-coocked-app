import { ArrowBottom, ArrowLeft, ArrowRight, ArrowTop, GrabActionIcon, InteractActionIcon, WaitActionIcon } from "@/assets";
import { ImageIcon } from "@/common";
import { ActionInstructions, Instruction, MovementInstructions } from "@/types";
import React from "react";
import { Button, ButtonText, ButtonTextContainer } from "./styles";



type InstructionButtonProps = {
  instruction: Instruction;
  onPress: () => void;
  text?: string;
}

export const getInstructionIcon = (instruction: Instruction) => {
  const icons = {
    [ActionInstructions.grabRelease]: GrabActionIcon,
    [ActionInstructions.interact]: InteractActionIcon,
    [ActionInstructions.wait]: WaitActionIcon,
    [MovementInstructions.bottom]: ArrowBottom,
    [MovementInstructions.left]: ArrowLeft,
    [MovementInstructions.right]: ArrowRight,
    [MovementInstructions.top]: ArrowTop
  }

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
  )
}
