import { getMobileIconState, getNivelInitialState, updateBlock } from "@/utils";
import { BlockState, Coords, GameSpaceState, ImmobileItems, MobileItems } from "@/types";

import { NivelBase } from "./NivelBase";

export const Nivel1 = () => {
  const initialCoords = { y: 2, x: 1 } as Coords;
  const getInitialState = (): GameSpaceState => {
    let state = getNivelInitialState(4, 4, 30);
  
    updateBlock(state, initialCoords.y, initialCoords.x, {
      isMainCharacter: true
    } as BlockState);
    updateBlock(state, 2, 2, {
      mobileItem: getMobileIconState(MobileItems.potato)
    } as BlockState);
    updateBlock(state, 2, 3, {
      mobileItem: getMobileIconState(MobileItems.pan),
      immobileItem: {
        item: ImmobileItems.stove
      }
    } as BlockState);
    updateBlock(state, 2, 4, {
      mobileItem: getMobileIconState(MobileItems.dish)
    } as BlockState);
  
    return state;
  };

  return (
    <NivelBase
      getInitialState={getInitialState}
      initialCharacterCoords={initialCoords}
    />
  );
}