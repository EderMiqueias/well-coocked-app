import React from "react";
import { ImmobileItemState, MobileItemState, MobileItems } from "@/types";

import { AbsoluteSubItemContainer, ImmobileItemContainer, SVGItem } from "./styles";
import { getImmobileItemIcon } from "@/utils";
import { MobileItem } from "./MobileItem";
import { ProgressBar } from "../ProgressBar";

type ImmobileItemProps = {
  state: ImmobileItemState;
  subItem?: MobileItemState;
};

export const ImmobileItem: React.FC<ImmobileItemProps> = ({
  state,
  subItem
}) => {
  const isPan = subItem?.item === MobileItems.pan;
  const isCooking = !!(state.inUse || state.secsLeftToBeDone !== undefined);

  const getProgress = () => 100 - (state.secsLeftToBeDone! * 12.5);
  return (
    <ImmobileItemContainer>
      {isPan && (
        <AbsoluteSubItemContainer alinhar={!!subItem.subItem}>
          <MobileItem
            item={subItem.item}
            subItem={subItem.subItem}
            size={56}
            isSubItemCooked
          />
        </AbsoluteSubItemContainer>
      )}
      <SVGItem size={64} src={getImmobileItemIcon(state.item)} />
      {isCooking && (
        <ProgressBar progress={getProgress()} />
      )}
    </ImmobileItemContainer>
  );
};
