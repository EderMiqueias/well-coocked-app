import {
  Beans,
  BeansCoocked,
  CuttingBoard,
  Dish,
  Lettuce,
  LettuceCooked,
  Massa,
  MassaCooked,
  Meat,
  MeatCooked,
  Pan,
  Potato,
  PotatoCooked,
  Rice,
  RiceCooked,
  Stove,
  Tomato,
  TomatoCooked
} from "@/assets";
import { ImmobileItems, MobileItems } from "@/types";

type ImmobileIcons = Record<ImmobileItems, string>;
type MobileIcons = Record<MobileItems, string>;
type CookedIcons = Record<Exclude<
  MobileItems,
  MobileItems.dish |
  MobileItems.pan
>, string>;

export const getImmobileItemIcon = (item?: ImmobileItems) => {
  if (item === undefined) return '';

  const itemsIcons: ImmobileIcons = {
    [ImmobileItems.cuttingBoard]: CuttingBoard,
    [ImmobileItems.stove]: Stove
  };
  return itemsIcons[item];
};

export const getMobileItemIcon = (item?: MobileItems) => {
  if (item === undefined) return '';

  const itemsIcons: MobileIcons = {
    [MobileItems.bean]: Beans,
    [MobileItems.dish]: Dish,
    [MobileItems.lettuce]: Lettuce,
    [MobileItems.massa]: Massa,
    [MobileItems.meat]: Meat,
    [MobileItems.pan]: Pan,
    [MobileItems.potato]: Potato,
    [MobileItems.rice]: Rice,
    [MobileItems.tomato]: Tomato
  };
  return itemsIcons[item];
};

export const getCookedIcon = (item?: MobileItems) => {
  if (item === undefined) return '';

  const itemsIcons: CookedIcons = {
    [MobileItems.bean]: BeansCoocked,
    [MobileItems.lettuce]: LettuceCooked,
    [MobileItems.massa]: MassaCooked,
    [MobileItems.meat]: MeatCooked,
    [MobileItems.potato]: PotatoCooked,
    [MobileItems.rice]: RiceCooked,
    [MobileItems.tomato]: TomatoCooked
  };
  return itemsIcons[item];
};
