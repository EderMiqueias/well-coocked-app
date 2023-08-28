import React from "react";

import { IntructionQueueState } from "@/types";

import { QueueContainer, Container } from "./styles";
import { InstructionQueueElement } from "./Instruction";
import { HighlightTitle } from "@/common";
import { Tooltip } from "../Tooltip";

type IntructionQueueProps = {
  state: IntructionQueueState;
  removeInstruction: (index: number) => void;
}

const ELEMENT_REMOVE_BUTTON = 'ELEMENT_REMOVE_BUTTON';
const INSTRUCTION_QUEUE_OVERVIEW = 'INSTRUCTION_QUEUE_OVERVIEW';

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
      <HighlightTitle data-tooltip-id={INSTRUCTION_QUEUE_OVERVIEW}>FILA DE INSTRUÇÕES</HighlightTitle>
      <QueueContainer data-tooltip-id={ELEMENT_REMOVE_BUTTON}>
        {getInstructionsRow(14)}
      </QueueContainer>
      <Tooltip id={INSTRUCTION_QUEUE_OVERVIEW}>
        Use os espaços abaixo para criar o algoritmo de preparação do prato solicitado.
      </Tooltip>
      <Tooltip id={ELEMENT_REMOVE_BUTTON}>
        Clique em qualquer instrução para remove-la.
      </Tooltip>
    </Container>
  );
}
