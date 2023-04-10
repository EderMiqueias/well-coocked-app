import { Dishs } from "./dish";
import { IntructionQueueState } from "./instructions";

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
  fail = 'fail', // ANDOU DEMAIS E NÃO FEZ NADA
  caughtPanInUse = 'caughtPanInUse', // TENTOU REMOVER UMA PANELA QUE AINDA NAO ESTAVA PRONTA
  rowFoodOnDish = 'rowFoodOnDish' // TENTOU COLOCAR COMIDA CRUA NO PRATO
};

export enum NiveisPageName {
  nivel1 = 'nivel_1',
  nivel2 = 'nivel_2',
  nivel3 = 'nivel_3'
}

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
  dish: Dishs;
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

export type NivelState = {
  gameState: GameSpaceState;
  characterState: MainCharacterState;
  queueState: IntructionQueueState;
};

export type NiveisState = {
  [nivelName in NiveisPageName]: NivelState | null;
};
