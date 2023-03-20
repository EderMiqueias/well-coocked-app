import React from "react";

import { CheffDroid } from "@/assets";
import { BlockState, Coords, MobileItems } from "@/types";

import { BlockContainer, CharacterContainer, ItemsContainer } from "./styles";
import { SVGItem } from "../Items/styles";
import { MobileItem, ImmobileItem } from "../Items";

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
  width = 216,
  height = 128,
  colorFase = false
}) => {
  const isPan = state.mobileItem === MobileItems.pan;
  return (
    <BlockContainer colorFase={colorFase} width={width} height={height}>
      {state.isMainCharacter && (
        <CharacterContainer>
          <SVGItem size={84} src={CheffDroid} />
        </CharacterContainer>
      )}
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
