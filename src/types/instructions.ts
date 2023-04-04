export enum Instructions {
  grabRelease = 'grabRelease',
  interact = 'interact',
  wait = 'wait',
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left'
};

export type MovementIntructionGroup = {
  instruction: Instructions;
  steps: number;
};

export type ActionInstructionGroup = {
  instruction: Instructions;
  postInstruction: Instructions;
};

export type IndexedInstruction = {
  index: number;
  instruction: Instructions;
};

export type IntructionQueueState = {
  intructionQueue: IndexedInstruction[];
  currentIntructionIndex: number;
};
