import React from "react";
import { ImmobileItems, MobileItemState, MobileItems } from "@/types";

import { AbsoluteSubItemContainer, ImmobileItemContainer, SVGItem } from "./styles";
import { getImmobileItemIcon } from "@/utils";
import { MobileItem } from "./MobileItem";

type ImmobileItemProps = {
  item: ImmobileItems;
  subItem?: MobileItemState;
};

export const ImmobileItem: React.FC<ImmobileItemProps> = ({
  item,
  subItem
}) => {
  const isPan = subItem?.item === MobileItems.pan;
  return (
    <ImmobileItemContainer>
      {isPan && (
        <AbsoluteSubItemContainer alinhar={!!subItem.subItem}>
          <MobileItem
            item={subItem.item}
            subItem={subItem.subItem}
            size={56}
          />
        </AbsoluteSubItemContainer>
      )}
      <SVGItem size={64} src={getImmobileItemIcon(item)} />
    </ImmobileItemContainer>
  )
}
