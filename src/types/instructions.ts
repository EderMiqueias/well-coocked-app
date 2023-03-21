export enum MovementInstructions {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left'
};

export enum ActionInstructions {
  grabRelease = 'grabRelease',
  interact = 'interact',
  wait = 'wait'
};

export type MovementIntructionGroup = {
  instruction: MovementInstructions;
  steps: number;
};

export type ActionInstructionGroup = {
  instruction: ActionInstructions;
  postInstruction: ActionInstructions;
};

export type IntructionQueueState = {
  intructionQueue: (ActionInstructions & MovementInstructions)[];
  currentIntructionIndex: number;
};
