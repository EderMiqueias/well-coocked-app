import React from 'react';

import { ImageIcon } from '@/common';
import { Instructions } from '@/types';
import { getInstructionIcon } from '../InstructionsButtons/Button';
import { StepBlock, StepNumber, RemoveButton } from './styles';

const INSTRUCTION_COLOR: Record<Instructions, string> = {
  [Instructions.top]:         'var(--move)',
  [Instructions.bottom]:      'var(--move)',
  [Instructions.left]:        'var(--move)',
  [Instructions.right]:       'var(--move)',
  [Instructions.grabRelease]: 'var(--brand)',
  [Instructions.interact]:    'var(--brand)',
  [Instructions.wait]:        'var(--wait)',
};

interface InstructionStepProps {
  stepNumber: number;
  instruction: Instructions;
  isActive: boolean;
  onRemove: () => void;
}

export const InstructionStep: React.FC<InstructionStepProps> = ({
  stepNumber,
  instruction,
  isActive,
  onRemove,
}) => {
  const color = INSTRUCTION_COLOR[instruction];
  return (
    <StepBlock color={color} isActive={isActive}>
      <StepNumber>{stepNumber}</StepNumber>
      <ImageIcon src={getInstructionIcon(instruction)} width="22px" height="22px" />
      <RemoveButton
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        aria-label={`Remover instrução ${stepNumber}`}
      >
        ×
      </RemoveButton>
    </StepBlock>
  );
};
