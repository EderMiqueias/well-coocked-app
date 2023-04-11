import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  Coords,
  GameSpaceState,
  GameStates,
  IndexedInstruction,
  Instructions,
  IntructionQueueState,
  MainCharacterState
} from '@/types';
import {
  getInitialCharacterState,
  getInitialInstructionQueueState,
  getNewStateRunInstruction
} from '@/utils';

import {
  NivelContainer,
  IndicativosContainer,
  OperacoesContainer,
  FirstRowContainer,
  RunButtonContainer
} from '../styles';
import { LONG_TIMEOUT_MS, SHORT_TIMEOUT_MS, TIMEOUT_MS } from '@/constants';

type NivelBaseProps = {
  getInitialState: () => GameSpaceState;
  initialCharacterCoords: Coords
};

const NivelBase = ({
  getInitialState,
  initialCharacterCoords
}: NivelBaseProps) => {
  const navigate = useNavigate();
  const [gameState, setGameState] =
    useState<GameSpaceState>(getInitialState());
  const [instructionState, setInstructionState] =
    useState<IntructionQueueState>(getInitialInstructionQueueState());
  const [characterState, setCharacterState] =
    useState<MainCharacterState>(getInitialCharacterState(initialCharacterCoords));

  const [mustRunNextInstruction, setMustRunNextInstruction] = useState(false);

  const restartGameSTate = () => {
    setCharacterState({
      subItem: undefined,
      coords: initialCharacterCoords
    });
    setGameState(getInitialState());
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

        if (newCharacterState.isWaiting)
          return [LONG_TIMEOUT_MS, shouldContinue];
        if (instruction.instruction === Instructions.grabRelease)
          return [SHORT_TIMEOUT_MS, shouldContinue];
        return [TIMEOUT_MS, shouldContinue];
      }
      return [TIMEOUT_MS, false];
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
      if (shouldContinue) {
        if (!isLastInstruction()) {
          setTimeout(() => {
            setInstructionState((oldState) => ({
              ...oldState,
              currentIntructionIndex: oldState.currentIntructionIndex + 1
            }));
            setMustRunNextInstruction(true);
          }, timeoutMs);
        } else {
          setGameState((oldState) => ({
            ...oldState,
            gameState: GameStates.fail
          }));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mustRunNextInstruction])

  return (
    <NivelContainer>
      <Modal
        gameState={gameState.gameState}
        onClick={restartGameSTate}
        navigate={navigate}
        timeLeft={gameState.timeLeft}
      />
      <BackIconComponent backTo="/niveis" />
      <FirstRowContainer>
        <GameSpace state={gameState}>
          <Droid characterState={characterState} />
        </GameSpace>
        <IndicativosContainer>
          <Indicatives dish={gameState.dish} secondsLeft={gameState.timeLeft} />
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

export { NivelBase };
