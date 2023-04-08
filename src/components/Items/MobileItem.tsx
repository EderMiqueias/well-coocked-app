import React from "react";

import { MobileItems } from "@/types";
import { getMobileItemIcon } from "@/utils";

import { MobileItemContainer, SubItemContainer, SVGItem } from "./styles";

type MobileItemProps = {
  item: MobileItems;
  subItem?: MobileItems;
  size?: number;
};

export const MobileItem: React.FC<MobileItemProps> = ({
  item,
  subItem,
  size
}) => {
  const isPanOrDish = [MobileItems.pan, MobileItems.dish].includes(item);
  const itemSize = isPanOrDish ? 64 : 48;
  return (
    <MobileItemContainer>
      {(subItem && isPanOrDish) && (
        <SubItemContainer>
          <SVGItem size={24} src={getMobileItemIcon(subItem)} />
        </SubItemContainer>
      )}
      <SVGItem size={size || itemSize} src={getMobileItemIcon(item)} />
    </MobileItemContainer>
  )
}
