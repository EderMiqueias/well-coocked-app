import React from "react";

import { MobileItems } from "@/types";
import { getMobileItemIcon } from "@/utils";

import { MobileItemContainer, SubItemContainer, SVGItem } from "./styles";

type MobileItemProps = {
  item: MobileItems;
  subItem?: MobileItems;
};

export const MobileItem: React.FC<MobileItemProps> = ({
  item,
  subItem
}) => {
  const isPanOrDish = [MobileItems.pan, MobileItems.dish].includes(item);
  return (
    <MobileItemContainer>
      {(subItem && isPanOrDish) && (
        <SubItemContainer>
          <SVGItem size={24} src={getMobileItemIcon(subItem)} />
        </SubItemContainer>
      )}
      <SVGItem size={isPanOrDish ? 64 : 48} src={getMobileItemIcon(item)} />
    </MobileItemContainer>
  )
}
