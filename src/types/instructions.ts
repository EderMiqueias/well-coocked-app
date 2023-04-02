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

export type Instruction = ActionInstructions | MovementInstructions;

export type MovementIntructionGroup = {
  instruction: MovementInstructions;
  steps: number;
};

export type ActionInstructionGroup = {
  instruction: ActionInstructions;
  postInstruction: ActionInstructions;
};

export type IndexedInstruction = {
  index: number;
  instruction: Instruction;
};

export type IntructionQueueState = {
  intructionQueue: IndexedInstruction[];
  currentIntructionIndex: number;
};
