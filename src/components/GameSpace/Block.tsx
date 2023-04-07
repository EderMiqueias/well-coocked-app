import React from "react";

import { BLOCK_HEIGHT, BLOCK_WIDTH } from "@/constants";
import { BlockState, Coords, MobileItems } from "@/types";

import { MobileItem, ImmobileItem } from "../Items";
import { BlockContainer, ItemsContainer } from "./styles";

type BlockProps = {
  coords: Coords;
  state: BlockState;
  width?: number;
  height?: number;
  colorFase?: boolean;
};

export const Block: React.FC<BlockProps> = ({
  coords,
  state,
  width = BLOCK_WIDTH,
  height = BLOCK_HEIGHT,
  colorFase = false
}) => {
  const isPan = state.mobileItem?.item === MobileItems.pan;
  return (
    <BlockContainer colorFase={colorFase} width={width} height={height}>
      <ItemsContainer>
        {(!(isPan && state.immobileItem) && state.mobileItem) && (
          <MobileItem
            item={state.mobileItem.item}
            subItem={state.mobileItem.subItem}
          />
        )}
        {state.immobileItem && (
          <ImmobileItem
            item={state.immobileItem}
            subItem={isPan ? state.mobileItem?.item : undefined}
          />
        )}
      </ItemsContainer>
    </BlockContainer>
  )
}
