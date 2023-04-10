import { getMobileIconState, getNivelInitialState, updateBlock } from "@/utils";
import { BlockState, Coords, Dishs, GameSpaceState, ImmobileItems, MobileItems } from "@/types";

import { NivelBase } from "./NivelBase";

export const Nivel3 = () => {
  const initialCoords = { y: 3, x: 4 } as Coords;
  const dish = Dishs.feijoada;

  const getInitialState = (): GameSpaceState => {
    let state = getNivelInitialState(4, 4, dish, 50);

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