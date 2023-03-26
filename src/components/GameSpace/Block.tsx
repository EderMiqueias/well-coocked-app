import React from "react";

import { BlockState, Coords, MobileItems } from "@/types";

import { BlockContainer, ItemsContainer } from "./styles";
import { MobileItem, ImmobileItem } from "../Items";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "@/constants";

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
  const isPan = state.mobileItem === MobileItems.pan;
  return (
    <BlockContainer colorFase={colorFase} width={width} height={height}>
      <ItemsContainer>
        {(!isPan && state.mobileItem) && (
          <MobileItem item={state.mobileItem} />
        )}
        {state.immobileItem && (
          <ImmobileItem
            item={state.immobileItem}
            subItem={isPan ? state.mobileItem : undefined}
          />
        )}
      </ItemsContainer>
    </BlockContainer>
  )
}
