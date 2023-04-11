import { getMobileIconState, getNivelInitialState, updateBlock } from "@/utils";
import { BlockState, Coords, Dishs, GameSpaceState, ImmobileItems, MobileItems } from "@/types";

import { NivelBase } from "./NivelBase";

export const Nivel3 = () => {
  const initialCoords = { y: 1, x: 3 } as Coords;
  const dish = Dishs.feijoada;

  const getInitialState = (): GameSpaceState => {
    let state = getNivelInitialState(4, 4, dish, 30);

    updateBlock(state, initialCoords.y, initialCoords.x, {
      isMainCharacter: true
    } as BlockState);
    updateBlock(state, 2, 3, {
      mobileItem: getMobileIconState(MobileItems.bean)
    } as BlockState);
    updateBlock(state, 3, 2, {
      mobileItem: getMobileIconState(MobileItems.pan),
      immobileItem: {
        item: ImmobileItems.stove
      }
    } as BlockState);
    updateBlock(state, 2, 4, {
      mobileItem: getMobileIconState(MobileItems.dish)
    } as BlockState);
    updateBlock(state, 3, 1, {
      mobileItem: getMobileIconState(MobileItems.dish)
    } as BlockState);
    updateBlock(state, 3, 4, {
      mobileItem: getMobileIconState(MobileItems.pan)
    } as BlockState);
    updateBlock(state, 4, 3, {
      mobileItem: getMobileIconState(MobileItems.dish)
    } as BlockState);
    updateBlock(state, 4, 4, {
      immobileItem: {
        item: ImmobileItems.stove
      }
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