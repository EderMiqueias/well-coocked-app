import React, { useRef, useEffect } from 'react';

import { IndexedInstruction } from '@/types';
import { HighlightTitle } from '@/common';
import { Tooltip } from '../Tooltip';

import { BudgetMeter } from './BudgetMeter';
import { InstructionStep } from './Instruction';
import {
  QueueWrapper,
  QueueHeader,
  TrackContainer,
  Connector,
  NextSlotIndicator,
  FreeCountLabel,
  ClearButton,
  NavButton,
} from './styles';

type InstructionQueueProps = {
  instructions: IndexedInstruction[];
  limit: number;
  currentInstructionIndex: number;
  onRemove: (index: number) => void;
  onClear: () => void;
};

const QUEUE_OVERVIEW = 'QUEUE_OVERVIEW';

export const InstructionQueue: React.FC<InstructionQueueProps> = ({
  instructions,
  limit,
  currentInstructionIndex,
  onRemove,
  onClear,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isFull = instructions.length >= limit;
  const free = limit - instructions.length;

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = trackRef.current.scrollWidth;
    }
  }, [instructions.length]);

  return (
    <QueueWrapper>
      <QueueHeader>
        <HighlightTitle data-tooltip-id={QUEUE_OVERVIEW}>FILA DE INSTRUÇÕES</HighlightTitle>
        <BudgetMeter used={instructions.length} limit={limit} />
        {instructions.length > 0 && (
          <ClearButton onClick={onClear} aria-label="Limpar fila de instruções">
            Limpar
          </ClearButton>
        )}
        {limit > 50 && (
          <>
            <NavButton
              onClick={() => { if (trackRef.current) trackRef.current.scrollLeft = 0; }}
              aria-label="Ir ao início da fila"
            >
              ⏮
            </NavButton>
            <NavButton
              onClick={() => { if (trackRef.current) trackRef.current.scrollLeft = trackRef.current.scrollWidth; }}
              aria-label="Ir ao fim da fila"
            >
              ⏭
            </NavButton>
          </>
        )}
      </QueueHeader>

      <TrackContainer ref={trackRef}>
        {instructions.map((item, i) => (
          <React.Fragment key={item.index}>
            {i > 0 && <Connector>→</Connector>}
            <InstructionStep
              stepNumber={i + 1}
              instruction={item.instruction}
              isActive={currentInstructionIndex === i}
              onRemove={() => onRemove(item.index)}
            />
          </React.Fragment>
        ))}
        {!isFull && (
          <>
            {instructions.length > 0 && <Connector>→</Connector>}
            <NextSlotIndicator aria-label="Próximo slot de instrução">+</NextSlotIndicator>
            {free > 1 && (
              <FreeCountLabel>+{free - 1} livres</FreeCountLabel>
            )}
          </>
        )}
      </TrackContainer>

      <Tooltip id={QUEUE_OVERVIEW}>
        Use os espaços abaixo para criar o algoritmo de preparação do prato solicitado. Passe o mouse sobre uma instrução para remover.
      </Tooltip>
    </QueueWrapper>
  );
};
