import { BlockState, Coords, GameSpaceState, GameStates, IntructionQueueState, MainCharacterState, MobileItemState, MobileItems } from "@/types";

export const getVoidBlockState = (): BlockState => ({
  isMainCharacter: false,
  immobileItem: undefined,
  mobileItem: undefined
} as BlockState);

export const getNivelInitialState = (yCount: number, xCount: number, timeLeft?: number): GameSpaceState => {
  let state: GameSpaceState = {
    gameState: GameStates.started,
    timeLeft: timeLeft || 60
  };
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

export const getInitialCharacterState = (coords?: Coords) => ({
  coords: coords || { y: 1, x: 1 },
  subItem: undefined
} as MainCharacterState);

export const getMobileIconState = (
  item: MobileItems,
  subItem?: MobileItems
): MobileItemState => ({
  item,
  subItem
});
