import React from "react";

import { Instructions } from "@/types";
import { InstructionContainer, SVGItem, VoidInstruction } from "./styles";
import { ArrowRightDirection } from "@/assets";
import { InstructionButton } from "../InstructionsButtons/Button";

type InstructionProps = {
  index: number;
  onClick: () => void;
  instruction?: Instructions;
  isCurrentInstruction?: boolean;
  showRightArrow?: boolean;
}

export const InstructionQueueElement: React.FC<InstructionProps> = ({
  index,
  onClick,
  instruction,
  isCurrentInstruction,
  showRightArrow
}) => {
  return (
    <>
      <InstructionContainer onClick={onClick} highlight={isCurrentInstruction}>
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
