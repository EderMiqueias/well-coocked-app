import React from "react";
import { ImmobileItems, MobileItems } from "@/types";

import { AbsoluteSubItemContainer, ImmobileItemContainer, SVGItem } from "./styles";
import { getImmobileItemIcon, getMobileItemIcon } from "@/utils";

type ImmobileItemProps = {
  item: ImmobileItems;
  subItem?: MobileItems;
};

export const ImmobileItem: React.FC<ImmobileItemProps> = ({
  item,
  subItem
}) => {
  const isPan = subItem === MobileItems.pan;
  return (
    <ImmobileItemContainer>
      {isPan && (
        <AbsoluteSubItemContainer>
          <SVGItem size={56} src={getMobileItemIcon(subItem)} />
        </AbsoluteSubItemContainer>
      )}
      <SVGItem size={64} src={getImmobileItemIcon(item)} />
    </ImmobileItemContainer>
  )
}
