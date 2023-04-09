import { WAITING_TIMEOUT_SECONDS } from "@/constants";
import {
  BlockState,
  GameSpaceState,
  GameStates,
  Instructions,
  MainCharacterState,
  MobileItems
} from "@/types";

export const updateBlock = (
  state: GameSpaceState,
  y: number,
  x: number,
  newBlockState: BlockState
): GameSpaceState => {
  state[y][x] = newBlockState;
  return state;
};

export const isFood = (item?: MobileItems) => item && ![
  MobileItems.dish,
  MobileItems.pan
].includes(item);

const _getNewStateRunInstruction = (
  gameState: GameSpaceState,
  characterState: MainCharacterState,
  instruction: Instructions
): [GameSpaceState, MainCharacterState] => {
  const newGameState = { ...gameState };
  const newCharacterState = { ...characterState };

  newCharacterState.isWaiting = false;

  const { coords } = characterState;
  switch (instruction) {
    case Instructions.bottom:
      newCharacterState.coords = {
        y: coords.y + 1,
        x: coords.x
      };
      break;
    case Instructions.left:
      newCharacterState.coords = {
        y: coords.y,
        x: coords.x - 1
      };
      break;
    case Instructions.right:
      newCharacterState.coords = {
        y: coords.y,
        x: coords.x + 1
      };
      break;
    case Instructions.top:
      newCharacterState.coords = {
        y: coords.y - 1,
        x: coords.x
      };
      break;
    case Instructions.grabRelease:
      const immobileBlockItem = gameState[coords.y][coords.x].immobileItem;
      const blockItem = gameState[coords.y][coords.x].mobileItem;
      const blockItemIsFood = isFood(blockItem?.item);

      const chaItem = characterState.subItem;
      const chaItemIsFood = isFood(chaItem?.item)

      if ((blockItem === undefined || chaItem === undefined)
        || (chaItemIsFood && blockItemIsFood)) {
        // BLOCO OU PERSONAGEM NAO POSSUEM ITEM
        // OU AMBOS POSSUEM UM INGREDIENTE
        newCharacterState.subItem = blockItem;
        newGameState[coords.y][coords.x].mobileItem = chaItem;
      } else if (!blockItemIsFood && chaItemIsFood) {
        // BLOCO POSSUI PANELA OU PRATO
        // E PERSONAGEM POSSUI INGREDIENTE
        newCharacterState.subItem = undefined;
        newGameState[coords.y][coords.x].mobileItem = {
          item: blockItem!.item,
          subItem: chaItem?.item
        };
        newGameState[coords.y][coords.x].immobileItem = {
          item: immobileBlockItem!.item,
          inUse: true,
          secsLeftToBeDone: 9
        };
        newGameState.immobileItemsInUse.push({
          y: coords.y,
          x: coords.x
        })
      } else if (!chaItemIsFood && blockItemIsFood) {
        // BLOCO POSSUI INGREDIENTE
        // E PERSONAGEM POSSUI PANELA OU PRATO
        newGameState[coords.y][coords.x].mobileItem = undefined;
        newCharacterState.subItem = {
          item: chaItem!.item,
          subItem: blockItem?.item
        };
      } else {
        // BLOCO E PISO POSSUEM PRATO OU PANELA
        newCharacterState.subItem = {
          item: chaItem.item,
          subItem: undefined
        };
        newGameState[coords.y][coords.x].mobileItem = {
          item: blockItem.item,
          subItem: chaItem.subItem
        };
      }

      newGameState.timeLeft -= 1;
      return [newGameState, newCharacterState];
    case Instructions.wait:
      newCharacterState.isWaiting = true;
      newGameState.timeLeft -= WAITING_TIMEOUT_SECONDS;
      return [newGameState, newCharacterState];
    case Instructions.interact:
      // NOT IMPLEMENTED #YET#
      break;
  }
  try {
    newGameState[newCharacterState.coords.y][newCharacterState.coords.x]
      .isMainCharacter = true;
    newGameState[coords.y][coords.x].isMainCharacter = false;
    newGameState.timeLeft -= 2;
  } catch {
    newGameState.gameState = GameStates.droidHitItsHead;
    newCharacterState.coords = coords;
  }
  return [newGameState, newCharacterState];
};

// MIDLAWARE
export const getNewStateRunInstruction = (
  gameState: GameSpaceState,
  characterState: MainCharacterState,
  instruction: Instructions
): [GameSpaceState, MainCharacterState] => {
  const [newGameState, newCharacterState] = _getNewStateRunInstruction(
    gameState,
    characterState,
    instruction
  );
  // SUBTRAI TEMPO RESTANTE PARA ITEMS EM USO
  const timeDiff = gameState.timeLeft - newGameState.timeLeft;
  gameState.immobileItemsInUse.forEach((itemCoords) => {
    const item = newGameState[itemCoords.y][itemCoords.x].immobileItem;

    if (item && item.secsLeftToBeDone) {
      const secsLeft = item.secsLeftToBeDone - timeDiff;
      newGameState[itemCoords.y][itemCoords.x].immobileItem = {
        ...item,
        secsLeftToBeDone: secsLeft,
        inUse: secsLeft > 0
      };
    }
  });

  return [newGameState, newCharacterState];
};
