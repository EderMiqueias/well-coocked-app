import { MobileItems } from "@/types";
import React from "react";

import { MobileItemContainer, SubItemContainer, SVGItem } from "./styles";
import { getMobileItemIcon } from "./utils";

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
