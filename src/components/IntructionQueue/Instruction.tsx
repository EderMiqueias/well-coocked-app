import React from "react";

import { Instruction } from "@/types";
import { InstructionContainer, SVGItem, VoidInstruction } from "./styles";
import { ArrowRightDirection } from "@/assets";
import { InstructionButton } from "../InstructionsButtons/Button";

type InstructionProps = {
  index: number;
  instruction?: Instruction;
  isCurrentInstruction?: boolean;
  showRightArrow?: boolean;
}

export const InstructionQueueElement: React.FC<InstructionProps> = ({
  index,
  instruction,
  isCurrentInstruction,
  showRightArrow
}) => {
  return (
    <>
      <InstructionContainer highlight={isCurrentInstruction}>
        {instruction ? (
          <InstructionButton instruction={instruction} onPress={() => {}} />
        ) : (
          <VoidInstruction key={index} />
        )}
      </InstructionContainer>
      {showRightArrow && (
        <SVGItem src={ArrowRightDirection} />
      )}
    </>
  );
}
