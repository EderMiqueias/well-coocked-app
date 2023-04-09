import React from "react";

import { MobileItems } from "@/types";
import { getCookedIcon, getMobileItemIcon } from "@/utils";

import { MobileItemContainer, SubItemContainer, SVGItem } from "./styles";

type MobileItemProps = {
  item: MobileItems;
  subItem?: MobileItems;
  size?: number;
  isItemCooked?: boolean;
  isSubItemCooked?: boolean;
};

export const MobileItem: React.FC<MobileItemProps> = ({
  item,
  subItem,
  size,
  isItemCooked,
  isSubItemCooked
}) => {
  const isPanOrDish = [MobileItems.pan, MobileItems.dish].includes(item);
  const itemSize = 48;

  const itemIcon = isItemCooked
    ? getCookedIcon(item)
    : getMobileItemIcon(item);
  const subItemIcon = (isSubItemCooked || isPanOrDish)
    ? getCookedIcon(subItem)
    : getMobileItemIcon(subItem);

  return (
    <MobileItemContainer>
      {(subItem && isPanOrDish) && (
        <SubItemContainer>
          <SVGItem size={24} src={subItemIcon} />
        </SubItemContainer>
      )}
      <SVGItem size={size || itemSize} src={itemIcon} />
    </MobileItemContainer>
  )
}
