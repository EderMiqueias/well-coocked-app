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
import { Tooltip } from "../Tooltip";

type InstructionsButtonProps = {
  addInstruction: (instruction: Instructions) => void;
};

const INTRUCTIONS_OVERVIEW = 'INTRUCTIONS_OVERVIEW';
const TOP_BUTTON = 'TOP_BUTTON';
const BOTTOM_BUTTON = 'BOTTOM_BUTTON';
const LEFT_BUTTON = 'LEFT_BUTTON';
const RIGHT_BUTTON = 'RIGHT_BUTTON';
const GRAB_RELEASE_BUTTON = 'GRAB_RELEASE_BUTTON';
const WAIT_BUTTON = 'WAIT_BUTTON';

export const InstructionButtons: React.FC<InstructionsButtonProps> = ({
  addInstruction
}) => {
  return (
    <Container>
      <HighlightTitle data-tooltip-id={INTRUCTIONS_OVERVIEW}>SELECIONAR INSTRUÇÕES</HighlightTitle>
      <Row>
        <ButtonsContainer>
          <InstructionButton
            tooltipId={TOP_BUTTON}
            instruction={Instructions.top}
            onPress={() => addInstruction(Instructions.top)}
          />
          <MovementButtonsContainer>
            <InstructionButton
              tooltipId={LEFT_BUTTON}
              instruction={Instructions.left}
              onPress={() => addInstruction(Instructions.left)}
            />
            <InstructionButton
              tooltipId={RIGHT_BUTTON}
              instruction={Instructions.right}
              onPress={() => addInstruction(Instructions.right)}
            />
          </MovementButtonsContainer>
          <InstructionButton
            tooltipId={BOTTOM_BUTTON}
            instruction={Instructions.bottom}
            onPress={() => addInstruction(Instructions.bottom)}
          />
        </ButtonsContainer>

        <ActionButtonsContainer>
          <InstructionButton
            tooltipId={GRAB_RELEASE_BUTTON}
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
            tooltipId={WAIT_BUTTON}
            instruction={Instructions.wait}
            onPress={() => addInstruction(Instructions.wait)}
            text="Aguardar"
          />
        </ActionButtonsContainer>
      </Row>
      <Tooltip id={INTRUCTIONS_OVERVIEW}>
        Clique em qualquer botão abaixo para adicionar uma instrução a fila.
      </Tooltip>
      <Tooltip id={TOP_BUTTON}>
        Cheff Droid anda um bloco para cima.
      </Tooltip>
      <Tooltip id={BOTTOM_BUTTON}>
        Cheff Droid anda um bloco para baixo.
      </Tooltip>
      <Tooltip id={LEFT_BUTTON}>
        Cheff Droid anda um bloco para esquerda.
      </Tooltip>
      <Tooltip id={RIGHT_BUTTON}>
        Cheff Droid anda um bloco para direita.
      </Tooltip>
      <Tooltip
        id={GRAB_RELEASE_BUTTON}
        children={"Caso Cheff Droid não esteja segurando nada, ele pega o objeto móvel no mesmo bloco.\n Caso Cheff Droid esteja segurando algo, ele solta o objeto móvel no mesmo bloco.\n Caso Cheff Droid esteja segurando algo, e haja algum objeto no mesmo bloco ele troca o objeto de suas mãos pelo do bloco.\n"}
      />
      <Tooltip id={WAIT_BUTTON}>
        Cheff droid aguardará por 8 segundos no mesmo local.
      </Tooltip>
    </Container>
  )
}