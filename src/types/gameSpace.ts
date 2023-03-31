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

export enum GameStates {
  started = 'started', // NIVEL INICIADO OU REINICIADO
  completed = 'completed', // NIVEL CONCLUIDO
  droidHitItsHead = 'droidHitItsHead', // AVANÇOU NUMA PAREDE
  timeOver = 'timeOver', // ACABOU O TEMPO
  fail = 'fail' // ANDOU DEMAIS E NÃO FEZ NADA
};

export type GameSpaceState = {
  gameState: GameStates;
  timeLeft: number;
  [y: number]: {
    [x: number]: BlockState;
  }
}
