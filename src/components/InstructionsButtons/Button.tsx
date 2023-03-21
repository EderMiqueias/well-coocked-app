import { ArrowBottom, ArrowLeft, ArrowRight, ArrowTop, GrabActionIcon, InteractActionIcon, WaitActionIcon } from "@/assets";
import { ImageIcon } from "@/common";
import { ActionInstructions, Instruction, MovementInstructions } from "@/types";
import React from "react";
import { Button } from "./styles";



type InstructionButtonProps = {
  instruction: Instruction;
  onPress: () => void;
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
  onPress
}) => {
  return (
    <Button onClick={onPress}>
      <ImageIcon
        src={getInstructionIcon(instruction)}
        height="40px"
        width="40px"
      />
    </Button>
  )
}
