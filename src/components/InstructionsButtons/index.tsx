import { HighlightTitle } from "@/common"
import { Instructions } from "@/types"

import { InstructionButton } from "./Button"
import {
  ActionButtonsContainer,
  Container,
  ButtonsContainer,
  MovementButtonsContainer,
  Row
} from "./styles"

type InstructionsButtonProps = {
  addInstruction: (instruction: Instructions) => void;
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
            instruction={Instructions.top}
            onPress={() => addInstruction(Instructions.top)}
          />
          <MovementButtonsContainer>
            <InstructionButton
              instruction={Instructions.left}
              onPress={() => addInstruction(Instructions.left)}
            />
            <InstructionButton
              instruction={Instructions.right}
              onPress={() => addInstruction(Instructions.right)}
            />
          </MovementButtonsContainer>
          <InstructionButton
            instruction={Instructions.bottom}
            onPress={() => addInstruction(Instructions.bottom)}
          />
        </ButtonsContainer>

        <ActionButtonsContainer>
          <InstructionButton
            instruction={Instructions.grabRelease}
            onPress={() => addInstruction(Instructions.grabRelease)}
            text="Pegar/Soltar"
          />
          {/* <InstructionButton
            instruction={Instructions.interact}
            onPress={() => addInstruction(Instructions.interact)}
            text="Interagir"
          /> */}
          <InstructionButton
            instruction={Instructions.wait}
            onPress={() => addInstruction(Instructions.wait)}
            text="Aguardar"
          />
        </ActionButtonsContainer>
      </Row>
    </Container>
  )
}