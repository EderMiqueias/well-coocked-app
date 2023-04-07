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
  Dishs,
  GameSpaceState,
  GameStates,
  ImmobileItems,
  IndexedInstruction,
  Instructions,
  IntructionQueueState,
  MainCharacterState,
  MobileItems
} from '@/types';
import {
  getInitialCharacterState,
  getInitialInstructionQueueState,
  getNivelInitialState,
  getNewStateRunInstruction,
  updateBlock,
  getMobileIconState
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
    mobileItem: getMobileIconState(MobileItems.potato)
  } as BlockState);
  updateBlock(state, 2, 3, {
    mobileItem: getMobileIconState(MobileItems.pan),
    immobileItem: ImmobileItems.stove
  } as BlockState);
  updateBlock(state, 2, 4, {
    mobileItem: getMobileIconState(MobileItems.dish)
  } as BlockState);

  return state;
};

const Nivel1 = () => {
  const [gameState, setGameState] =
    useState<GameSpaceState>(getNivel1InitialState());
  const [instructionState, setInstructionState] =
    useState<IntructionQueueState>(getInitialInstructionQueueState());
  const [characterState, setCharacterState] =
    useState<MainCharacterState>(getInitialCharacterState({ y: 2, x: 1 }));

  const [mustRunNextInstruction, setMustRunNextInstruction] = useState(false);

  const restartGameSTate = () => {
    setCharacterState({
      subItem: undefined,
      coords: { y: 2, x: 1 }
    });
    setGameState(getNivel1InitialState());
    setInstructionState(
      (oldValue) => ({
        ...oldValue,
        currentIntructionIndex: 0
      })
    );
  };

  const addInstruction = (instruction: Instructions) => {
    const indexedInstruction = {
      index: instructionState.intructionQueue.length,
      instruction
    } as IndexedInstruction;
    setInstructionState(
      (oldValue) => ({
        ...oldValue,
        intructionQueue: [...oldValue.intructionQueue, indexedInstruction]
      })
    );
  };

  const removeInstruction = (index: number) =>
    setInstructionState(
      (oldValue) => ({
        ...oldValue,
        intructionQueue: oldValue.intructionQueue.filter((item) => item.index !== index)
      })
    );

  const isLastInstruction = () =>
    instructionState.intructionQueue.length === instructionState.currentIntructionIndex + 1

  const runInstruction =
    (instruction?: IndexedInstruction): [number, boolean] => {
      if (instruction) {
        setMustRunNextInstruction(false);
        const [newGameState, newCharacterState] = getNewStateRunInstruction(
          gameState,
          characterState,
          instruction.instruction
        );
        setCharacterState({ ...newCharacterState });
        setGameState({ ...newGameState });

        const shouldContinue = newGameState.gameState === GameStates.started;

        if (newCharacterState.isWaiting) return [3400, shouldContinue];
        if (instruction.instruction === Instructions.grabRelease)
          return [400, shouldContinue];
        return [1700, shouldContinue];
      }
      return [1700, false];
    };

  const run = () => {
    if (instructionState.intructionQueue.length > 0) {
      setMustRunNextInstruction(true);
    }
  };

  useEffect(() => {
    if (mustRunNextInstruction) {
      const [timeoutMs, shouldContinue] = runInstruction(
        instructionState.intructionQueue[instructionState.currentIntructionIndex]
      );
      if (!isLastInstruction() && shouldContinue) {
        setTimeout(() => {
          setInstructionState((oldState) => ({
            ...oldState,
            currentIntructionIndex: oldState.currentIntructionIndex + 1
          }));
          setMustRunNextInstruction(true);
        }, timeoutMs);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mustRunNextInstruction])

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
          <Droid characterState={characterState} />
        </GameSpace>
        <IndicativosContainer>
          <Indicatives dish={Dishs.pure} secondsLeft={gameState.timeLeft} />
          <RunButtonContainer>
            <Button type="run" onPress={run} />
          </RunButtonContainer>
        </IndicativosContainer>
      </FirstRowContainer>
      <OperacoesContainer>
        <InstructionQueue
          removeInstruction={removeInstruction}
          state={instructionState}
        />
        <InstructionButtons addInstruction={addInstruction} />
      </OperacoesContainer>
    </NivelContainer>
  );
}

export { Nivel1 };
