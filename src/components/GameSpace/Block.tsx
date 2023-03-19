import React from "react";

import { Beans, CheffDroid, CuttingBoard, Dish, Lettuce, Massa, Meat, Pan, Potato, Rice, Stove, Tomato } from "@/assets";
import { BlockState, Coords, ImmobileItems, MobileItems } from "@/types";

import { BlockContainer, SVGItem } from "./styles";

type BlockProps = {
  coords: Coords;
  state: BlockState;
  width?: number;
  height?: number;
  colorFase?: boolean;
};

type ImmobileIcons = Record<ImmobileItems, JSX.Element>;
type MobileIcons = Record<MobileItems, JSX.Element>;

const getImmobileItemIcon = (item?: ImmobileItems) => {
  if (item === undefined) return <></>;

  const itemsIcons : ImmobileIcons = {
    [ImmobileItems.cuttingBoard]: <SVGItem src={CuttingBoard} />,
    [ImmobileItems.stove]: <SVGItem src={Stove} />
  }
  return itemsIcons[item]
};

const getMobileItemIcon = (item?: MobileItems) => {
  if (item === undefined) return <></>;

  const itemsIcons : MobileIcons = {
    [MobileItems.bean]: <SVGItem src={Beans} />,
    [MobileItems.dish]: <SVGItem src={Dish} />,
    [MobileItems.lettuce]: <SVGItem src={Lettuce} />,
    [MobileItems.massa]: <SVGItem src={Massa} />,
    [MobileItems.meat]: <SVGItem src={Meat} />,
    [MobileItems.pan]: <SVGItem src={Pan} />,
    [MobileItems.potato]: <SVGItem src={Potato} />,
    [MobileItems.rice]: <SVGItem src={Rice} />,
    [MobileItems.tomato]: <SVGItem src={Tomato} />
  }
  return itemsIcons[item]
};

export const Block: React.FC<BlockProps> = ({
  coords,
  state,
  width = 216,
  height = 128,
  colorFase = false
}) => {
  return (
    <BlockContainer colorFase={colorFase} width={width} height={height}>
      {state.isMainCharacter && <SVGItem src={CheffDroid} />}
      {getImmobileItemIcon(state.immobileItem)}
      {getMobileItemIcon(state.mobileItem)}
    </BlockContainer>
  )
}
