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

export enum GameStates {
  started = 'started', // NIVEL INICIADO OU REINICIADO
  completed = 'completed', // NIVEL CONCLUIDO
  droidHitItsHead = 'droidHitItsHead', // AVANÇOU NUMA PAREDE
  timeOver = 'timeOver', // ACABOU O TEMPO
  fail = 'fail' // ANDOU DEMAIS E NÃO FEZ NADA
};

export type Coords = {
  y: number;
  x: number;
};

export type MobileItemState = {
  item: MobileItems;
  subItem?: MobileItems;
};

export type ImmobileItemState = {
  item: ImmobileItems;
  subItem?: MobileItemState;
  inUse?: boolean;
  secsLeftToBeDone?: number;
};

export type BlockState = {
  isMainCharacter?: boolean;
  immobileItem?: ImmobileItemState;
  mobileItem?: MobileItemState;
};

export type GameSpaceState = {
  gameState: GameStates;
  timeLeft: number;
  immobileItemsInUse: Coords[];
  [y: number]: {
    [x: number]: BlockState;
  }
};

export type MainCharacterState = {
  coords: Coords;
  isWaiting?: boolean;
  subItem?: MobileItemState;
};
