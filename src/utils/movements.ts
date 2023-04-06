import { WAITING_TIMEOUT_MS } from "@/constants";
import {
  BlockState,
  GameSpaceState,
  GameStates,
  Instructions,
  MainCharacterState
} from "@/types";

export const updateBlock = (
  state: GameSpaceState,
  y: number,
  x: number,
  newBlockState: BlockState
): GameSpaceState => {
  state[y][x] = newBlockState;
  return state;
};

export const getNewStateRunInstruction = (
  state: GameSpaceState,
  characterState: MainCharacterState,
  instruction: Instructions
): [GameSpaceState, MainCharacterState] => {
  const newGameState = state;
  const newCharacterState = characterState;
  
  const { coords } = characterState;
  switch (instruction) {
    case Instructions.bottom:
      newCharacterState.coords = {
        y: coords.y + 1,
        x: coords.x
      };
      break;
    case Instructions.left:
      newCharacterState.coords = {
        y: coords.y,
        x: coords.x - 1
      };
      break;
    case Instructions.right:
      newCharacterState.coords = {
        y: coords.y,
        x: coords.x + 1
      };
      break;
    case Instructions.top:
      newCharacterState.coords = {
        y: coords.y - 1,
        x: coords.x
      };
      break;
    case Instructions.grabRelease:
      break;
    case Instructions.wait:
      newCharacterState.isWaiting = true;
      newGameState.timeLeft = state.timeLeft - WAITING_TIMEOUT_MS;
      return [newGameState, newCharacterState];
    case Instructions.interact:
      // NOT IMPLEMENTED #YET#
      break;
  }
  try {
    newGameState[newCharacterState.coords.y][newCharacterState.coords.x]
      .isMainCharacter = true;
    newGameState[coords.y][coords.x].isMainCharacter = false;
    newGameState.timeLeft = state.timeLeft - 2;
    newCharacterState.isWaiting = false;
  } catch {
    newGameState.gameState = GameStates.droidHitItsHead;
    newCharacterState.coords = coords;
  }
  return [newGameState, newCharacterState];
};
