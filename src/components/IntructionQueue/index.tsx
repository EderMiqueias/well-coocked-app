import React from "react";

import { IntructionQueueState } from "@/types";

import { QueueContainer, Container } from "./styles";
import { InstructionQueueElement } from "./Instruction";
import { HighlightTitle } from "@/common";

type IntructionQueueProps = {
  state: IntructionQueueState
}

export const InstructionQueue: React.FC<IntructionQueueProps> = ({
  state
}) => {  
  const getInstructionsRow = (countInstructions: number) => {
    const instructionsRow: React.ReactNode[] = [];
  
    for (let i = 0; i < countInstructions; i++) {
      instructionsRow.push(
          <InstructionQueueElement
            index={i}
            instruction={state.intructionQueue[i]}
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
        {getInstructionsRow(12)}
      </QueueContainer>
    </Container>
  );
}
