import { useEffect, useState } from "react";

import { CheffDroid } from "@/assets";
import { ImageIcon } from "@/common";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "@/constants";
import { Coords, MainCharacterState } from "@/types";

import { CheffDroidContainer, Position } from "./styles";
import { getMobileItemIcon } from "@/utils";

type CheffDroidProps = {
  size: number;
  characterState: MainCharacterState;
};

const getCharacterPosition = (gsCoords: Coords): Position => {
  return {
    top: (gsCoords.y - 1) * BLOCK_HEIGHT,
    left: (gsCoords.x - 1) * BLOCK_WIDTH
  };
};

export const Droid: React.FC<CheffDroidProps> = ({
  size,
  characterState
}) => {
  const [finalPosition, setFinalPosition] =
    useState<Position>(getCharacterPosition(characterState.coords));
  const [initialPosition, setInitialPosition] =
    useState<Position>(finalPosition);
  const sizeInPixel = `${size}px`;

  useEffect(() => {
    if(characterState.coords) {
      setInitialPosition(finalPosition);
      setFinalPosition(getCharacterPosition(characterState.coords));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterState.coords])

  return (
    <CheffDroidContainer
      initial={initialPosition}
      final={finalPosition}
    >
      <ImageIcon height={sizeInPixel} width={sizeInPixel} src={CheffDroid} />
      <ImageIcon height="auto" width="36px" src={getMobileItemIcon(characterState.subItem)} />
    </CheffDroidContainer>
  )
};
