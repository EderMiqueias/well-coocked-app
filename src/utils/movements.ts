import { BlockState, Coords, GameSpaceState, Instruction, MovementInstructions } from "@/types";

export const updateBlock = (
  state: GameSpaceState,
  y: number,
  x: number,
  newBlockState: BlockState
): GameSpaceState => {
  return state[y][x] = newBlockState;
};

export const moveCharacter = (
  state: GameSpaceState,
  mainCharacterCoords: Coords,
  instruction: Instruction
): [GameSpaceState, Coords] => {
  const coords = mainCharacterCoords;

  const newState = state;
  let newCoords: Coords = mainCharacterCoords;
  newState[coords.y][coords.x].isMainCharacter = false;

  switch (instruction) {
    case MovementInstructions.bottom:
      newCoords = {
        y: coords.y - 1,
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
        y: coords.y + 1,
        x: coords.x
      };
  }

  newState[newCoords.y][newCoords.x].isMainCharacter = true;
  return [newState, newCoords];
};
