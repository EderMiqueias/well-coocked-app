import { Dishs, MobileItems } from "@/types";

export const DISHS: Record<Dishs, MobileItems[]> = {
  [Dishs.achadinho]: [MobileItems.meat, MobileItems.potato, MobileItems.rice],
  [Dishs.baiao]: [MobileItems.rice, MobileItems.bean],
  [Dishs.bolonhesa]: [MobileItems.massa, MobileItems.tomato],
  [Dishs.escondidinho]: [MobileItems.meat, MobileItems.potato],
  [Dishs.executivo]: [MobileItems.meat, MobileItems.rice, MobileItems.bean],
  [Dishs.macarronada]: [MobileItems.meat, MobileItems.massa, MobileItems.tomato],
  [Dishs.pure]: [MobileItems.potato],
  [Dishs.salada]: [MobileItems.tomato, MobileItems.lettuce],
  [Dishs.strogonoff]: [MobileItems.meat, MobileItems.rice]
};
