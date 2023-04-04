import { BlockState, Coords, GameSpaceState, GameStates, Instructions } from "@/types";

export const updateBlock = (
  state: GameSpaceState,
  y: number,
  x: number,
  newBlockState: BlockState
): GameSpaceState => {
  state[y][x] = newBlockState;
  return state;
};

export const moveCharacter = (
  state: GameSpaceState,
  mainCharacterCoords: Coords,
  instruction: Instructions
): [GameSpaceState, Coords] => {
  const coords = mainCharacterCoords;

  const newState = state;
  let newCoords: Coords = mainCharacterCoords;

  switch (instruction) {
    case Instructions.bottom:
      newCoords = {
        y: coords.y + 1,
        x: coords.x
      };
      break;
    case Instructions.left:
      newCoords = {
        y: coords.y,
        x: coords.x - 1
      };
      break;
    case Instructions.right:
      newCoords = {
        y: coords.y,
        x: coords.x + 1
      };
      break;
    case Instructions.top:
      newCoords = {
        y: coords.y - 1,
        x: coords.x
      };
  }
  try {
    newState[newCoords.y][newCoords.x].isMainCharacter = true;
    newState[coords.y][coords.x].isMainCharacter = false;
    newState.timeLeft = state.timeLeft - 2;
  } catch {
    newState.gameState = GameStates.droidHitItsHead;
    newCoords = coords;
  }
  return [newState, newCoords];
};
