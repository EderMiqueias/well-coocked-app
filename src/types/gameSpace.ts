export type Coords = {
  y: number;
  x: number;
};

export enum MobileItems {
  meat = 'meat',
  potato = 'potato',
  massa = 'massa',
  tomato = 'tomato',
  lettuce = 'lettuce',
  rice = 'rice',
  bean = 'bean',
  pan = 'pan',
  dish = 'dish'
};

export enum ImmobileItems {
  stove = 'stove',
  cuttingBoard = 'cutting_board'
};

export type BlockState = {
  isMainCharacter?: boolean;
  immobileItem?: ImmobileItems;
  mobileItem?: MobileItems;
};

export type GameSpaceState = {
  [y: number]: {
    [x: number]: BlockState;
  }
}
