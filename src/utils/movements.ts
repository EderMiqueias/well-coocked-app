import { BlockState, Coords, GameSpaceState, GameStates, Instruction, MovementInstructions } from "@/types";

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
  instruction: Instruction
): [GameSpaceState, Coords] => {
  const coords = mainCharacterCoords;

  const newState = state;
  let newCoords: Coords = mainCharacterCoords;

  switch (instruction) {
    case MovementInstructions.bottom:
      newCoords = {
        y: coords.y + 1,
        x: coords.x
      };
      break;
    case MovementInstructions.left:
      newCoords = {
        y: coords.y,
        x: coords.x - 1
      };
      break;
    case MovementInstructions.right:
      newCoords = {
        y: coords.y,
        x: coords.x + 1
      };
      break;
    case MovementInstructions.top:
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
