import React, { useState } from 'react';

import { BackIconComponent, GameSpace } from '@/components';
import { BlockState, GameSpaceState, ImmobileItems, MobileItems } from '@/types';
import { getNivelInitialState, updateBlock } from '@/utils';

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

  return (
      <>
        <NivelContainer>
          <BackIconComponent backTo="/niveis" />
          <FirstRowContainer>
            <GameSpace state={gameState}></GameSpace>
            <IndicativosContainer></IndicativosContainer>
          </FirstRowContainer>
          <OperacoesContainer></OperacoesContainer>
        </NivelContainer>
      </>
  );
}

export { Nivel1 };
