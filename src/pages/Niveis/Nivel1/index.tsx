import React, { useEffect, useState } from 'react';

import { BackIconComponent, GameSpace, InstructionQueue } from '@/components';
import { BlockState, GameSpaceState, ImmobileItems, IntructionQueueState, MobileItems } from '@/types';
import { getInitialInstructionQueueState, getNivelInitialState, updateBlock } from '@/utils';

import {
  NivelContainer,
  IndicativosContainer,
  OperacoesContainer,
  FirstRowContainer
} from '../styles';

const getNivel1InitialState = (): GameSpaceState => {
  let state = getNivelInitialState(4, 4);

  updateBlock(state, 2, 1, {
    isMainCharacter: true
  } as BlockState);
  updateBlock(state, 2, 2, {
    mobileItem: MobileItems.potato
  } as BlockState);
  updateBlock(state, 2, 3, {
    mobileItem: MobileItems.pan,
    immobileItem: ImmobileItems.stove
  } as BlockState);
  updateBlock(state, 2, 4, {
    mobileItem: MobileItems.dish
  } as BlockState);

  return state;
};

const Nivel1 = () => {
  const [gameState, setGameState] = useState<GameSpaceState>(getNivel1InitialState());
  const [instructionState, setInstructionState] = useState<IntructionQueueState>(getInitialInstructionQueueState());

  useEffect(() => {
    setInstructionState((oldValue) => ({ ...oldValue, currentIntructionIndex: 3 }))
    setInstructionState((oldValue) => ({ ...oldValue, intructionQueue: [] }))
  }, [])

  return (
      <>
        <NivelContainer>
          <BackIconComponent backTo="/niveis" />
          <FirstRowContainer>
            <GameSpace state={gameState}></GameSpace>
            <IndicativosContainer></IndicativosContainer>
          </FirstRowContainer>
          <OperacoesContainer>
            <InstructionQueue state={instructionState} />
          </OperacoesContainer>
        </NivelContainer>
      </>
  );
}

export { Nivel1 };
