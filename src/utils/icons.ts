import {
  Beans,
  CuttingBoard,
  Dish,
  Lettuce,
  Massa,
  Meat,
  Pan,
  Potato,
  Rice,
  Stove,
  Tomato
} from "@/assets";
import { ImmobileItems, MobileItems } from "@/types"

type ImmobileIcons = Record<ImmobileItems, string>;
type MobileIcons = Record<MobileItems, string>;

export const getImmobileItemIcon = (item?: ImmobileItems) => {
  if (item === undefined) return '';

  const itemsIcons : ImmobileIcons = {
    [ImmobileItems.cuttingBoard]: CuttingBoard,
    [ImmobileItems.stove]: Stove
  }
  return itemsIcons[item]
};

export const getMobileItemIcon = (item?: MobileItems) => {
  if (item === undefined) return '';

  const itemsIcons : MobileIcons = {
    [MobileItems.bean]: Beans,
    [MobileItems.dish]: Dish,
    [MobileItems.lettuce]: Lettuce,
    [MobileItems.massa]: Massa,
    [MobileItems.meat]: Meat,
    [MobileItems.pan]: Pan,
    [MobileItems.potato]: Potato,
    [MobileItems.rice]: Rice,
    [MobileItems.tomato]: Tomato
  }
  return itemsIcons[item]
};
