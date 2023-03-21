import { HighlightTitle } from "@/common"
import { ActionInstructions, Instruction, MovementInstructions } from "@/types"

import { InstructionButton } from "./Button"
import {
  ActionButtonsContainer,
  Container,
  ButtonsContainer,
  MovementButtonsContainer,
  Row
} from "./styles"

type InstructionsButtonProps = {
  addInstruction: (instruction: Instruction) => void;
};

export const InstructionButtons: React.FC<InstructionsButtonProps> = ({
  addInstruction
}) => {
  return (
    <Container>
      <HighlightTitle>SELECIONAR INSTRUÇÕES</HighlightTitle>
      <Row>
        <ButtonsContainer>
          <InstructionButton
            instruction={MovementInstructions.top}
            onPress={() => addInstruction(MovementInstructions.top)}
          />
          <MovementButtonsContainer>
            <InstructionButton
              instruction={MovementInstructions.left}
              onPress={() => addInstruction(MovementInstructions.left)}
            />
            <InstructionButton
              instruction={MovementInstructions.right}
              onPress={() => addInstruction(MovementInstructions.right)}
            />
          </MovementButtonsContainer>
          <InstructionButton
            instruction={MovementInstructions.bottom}
            onPress={() => addInstruction(MovementInstructions.bottom)}
          />
        </ButtonsContainer>

        <ActionButtonsContainer>
          <InstructionButton
            instruction={ActionInstructions.grabRelease}
            onPress={() => addInstruction(ActionInstructions.grabRelease)}
            text="Pegar/Soltar"
          />
          <InstructionButton
            instruction={ActionInstructions.interact}
            onPress={() => addInstruction(ActionInstructions.interact)}
            text="Interagir"
          />
          <InstructionButton
            instruction={ActionInstructions.wait}
            onPress={() => addInstruction(ActionInstructions.wait)}
            text="Aguardar"
          />
        </ActionButtonsContainer>
      </Row>
    </Container>
  )
}