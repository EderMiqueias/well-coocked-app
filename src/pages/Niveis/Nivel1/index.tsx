import React, { useEffect, useState } from 'react';

import {
  BackIconComponent,
  Button,
  Droid,
  GameSpace,
  Indicatives,
  InstructionButtons,
  InstructionQueue,
  Modal
} from '@/components';
import {
  BlockState,
  Coords,
  Dishs,
  GameSpaceState,
  GameStates,
  ImmobileItems,
  Instruction,
  IntructionQueueState,
  MobileItems
} from '@/types';
import {
  getInitialInstructionQueueState,
  getNivelInitialState,
  moveCharacter,
  updateBlock
} from '@/utils';

import {
  NivelContainer,
  IndicativosContainer,
  OperacoesContainer,
  FirstRowContainer,
  RunButtonContainer
} from '../styles';

const getNivel1InitialState = (): GameSpaceState => {
  let state = getNivelInitialState(4, 4, 30);

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
  const [gameState, setGameState] =
    useState<GameSpaceState>(getNivel1InitialState());
  const [instructionState, setInstructionState] =
    useState<IntructionQueueState>(getInitialInstructionQueueState());
  const [characterCoords, setCharacterCoords] =
    useState<Coords>({ y: 2, x: 1 });

  const restartGameSTate = () => {
    setCharacterCoords({ y: 2, x: 1 });
    setGameState(getNivel1InitialState())
  };

  const addInstruction = (instruction: Instruction) => {
    setInstructionState(
      (oldValue) => ({
        ...oldValue,
        intructionQueue: [...oldValue.intructionQueue, instruction]
      })
    );
  };

  const runInstruction = (instruction: Instruction) => {
    const [newState, newCoords] =
      moveCharacter(gameState, characterCoords, instruction);
    setGameState({ ...newState });
    setCharacterCoords({ ...newCoords })
  };

  const run = () => {
    if (instructionState.intructionQueue.length > 0) {
      instructionState.intructionQueue.forEach(runInstruction);
    }
  };

  useEffect(() => {
    // setGameState((oldValue) => ({ ...oldValue, gameState: GameStates.completed }))
    // setInstructionState((oldValue) => ({ ...oldValue, currentIntructionIndex: 3 }))
    // setInstructionState((oldValue) => ({ ...oldValue, intructionQueue: [] }))
  }, [])

  return (
    <NivelContainer>
      <Modal
        gameState={gameState.gameState}
        onClick={restartGameSTate}
        timeLeft={gameState.timeLeft}
      />
      <BackIconComponent backTo="/niveis" />
      <FirstRowContainer>
        <GameSpace state={gameState}>
          <Droid gameStateCoords={characterCoords} size={84} />
        </GameSpace>
        <IndicativosContainer>
          <Indicatives dish={Dishs.pure} secondsLeft={gameState.timeLeft} />
          <RunButtonContainer>
            <Button type="run" onPress={run} />
          </RunButtonContainer>
        </IndicativosContainer>
      </FirstRowContainer>
      <OperacoesContainer>
        <InstructionQueue state={instructionState} />
        <InstructionButtons addInstruction={addInstruction} />
      </OperacoesContainer>
    </NivelContainer>
  );
}

export { Nivel1 };
