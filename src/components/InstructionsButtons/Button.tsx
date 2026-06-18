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

type ButtonVariant = 'move' | 'brand' | 'wait';

const getButtonVariant = (instruction: Instructions): ButtonVariant => {
  switch (instruction) {
    case Instructions.grabRelease:
    case Instructions.interact:
      return 'brand';
    case Instructions.wait:
      return 'wait';
    default:
      return 'move';
  }
};

type InstructionButtonProps = {
  instruction: Instructions;
  onPress: () => void;
  text?: string;
  tooltipId?: string;
  disabled?: boolean;
};

export const getInstructionIcon = (instruction: Instructions) => {
  const icons = {
    [Instructions.grabRelease]: GrabActionIcon,
    [Instructions.interact]:    InteractActionIcon,
    [Instructions.wait]:        WaitActionIcon,
    [Instructions.bottom]:      ArrowBottom,
    [Instructions.left]:        ArrowLeft,
    [Instructions.right]:       ArrowRight,
    [Instructions.top]:         ArrowTop
  };
  return icons[instruction];
};

export const InstructionButton: React.FC<InstructionButtonProps> = ({
  instruction,
  onPress,
  text,
  tooltipId,
  disabled,
}) => {
  return (
    <ButtonTextContainer>
      <Button
        data-tooltip-id={tooltipId}
        onClick={onPress}
        variant={getButtonVariant(instruction)}
        disabled={disabled}
        aria-label={text ?? instruction}
      >
        <ImageIcon
          src={getInstructionIcon(instruction)}
          height="30px"
          width="30px"
        />
      </Button>
      {text && (
        <ButtonText>{text}</ButtonText>
      )}
    </ButtonTextContainer>
  );
};
