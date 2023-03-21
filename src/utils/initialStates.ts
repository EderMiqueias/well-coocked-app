import { BlockState, GameSpaceState, IntructionQueueState } from "@/types";

export const getVoidBlockState = (): BlockState => ({
  isMainCharacter: false,
  immobileItem: undefined,
  mobileItem: undefined
} as BlockState);

export const getNivelInitialState = (yCount: number, xCount: number): GameSpaceState => {
  let state: GameSpaceState = {};
  for (let y = 1; y <= yCount; y++) {
    state[y] = {};
    for (let x = 1; x <= xCount; x++) {
      state[y][x] = getVoidBlockState();
    }
  }
  return state;
};

export const getInitialInstructionQueueState = () => ({
  currentIntructionIndex: 0,
  intructionQueue: []
} as IntructionQueueState);
