import React from "react";

import { ActionInstructionGroup, MovementIntructionGroup } from "@/types";
import { InstructionContainer, SVGItem, VoidInstruction } from "./styles";
import { ArrowRightDirection } from "@/assets";

type InstructionProps = {
  index: number;
  instruction?: MovementIntructionGroup | ActionInstructionGroup;
  isCurrentInstruction?: boolean;
  showRightArrow?: boolean;
}

export const Instruction: React.FC<InstructionProps> = ({
  index,
  instruction,
  isCurrentInstruction,
  showRightArrow
}) => {
  return (
    <>
      <InstructionContainer highlight={isCurrentInstruction}>
        {!instruction && (
          <VoidInstruction key={index} />
        )}
      </InstructionContainer>
      {showRightArrow && (
        <SVGItem src={ArrowRightDirection} />
      )}
    </>
  );
}
