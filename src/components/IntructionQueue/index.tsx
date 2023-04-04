import React from "react";

import { IntructionQueueState } from "@/types";

import { QueueContainer, Container } from "./styles";
import { InstructionQueueElement } from "./Instruction";
import { HighlightTitle } from "@/common";

type IntructionQueueProps = {
  state: IntructionQueueState;
  removeInstruction: (index: number) => void;
}

export const InstructionQueue: React.FC<IntructionQueueProps> = ({
  state,
  removeInstruction
}) => {
  const getInstructionsRow = (countInstructions: number) => {
    const instructionsRow: React.ReactNode[] = [];

    for (let i = 0; i < countInstructions; i++) {
      instructionsRow.push(
        <InstructionQueueElement
          key={i}
          onClick={() => removeInstruction(state.intructionQueue[i]?.index)}
          index={state.intructionQueue[i]?.index}
          instruction={state.intructionQueue[i]?.instruction}
          isCurrentInstruction={state.currentIntructionIndex === i}
          showRightArrow={!(i + 1 === countInstructions ||
            i + 1 === countInstructions / 2)}
        />
      );
    }
    return instructionsRow;
  };

  return (
    <Container>
      <HighlightTitle>FILA DE INSTRUÇÕES</HighlightTitle>
      <QueueContainer>
        {getInstructionsRow(14)}
      </QueueContainer>
    </Container>
  );
}
