import { useEffect, useState } from "react";

import { CheffDroid } from "@/assets";
import { ImageIcon } from "@/common";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "@/constants";
import { Coords } from "@/types";

import { CheffDroidContainer, Position } from "./styles";
import './animation.css';

type CheffDroidProps = {
  size: number;
  gameStateCoords: Coords;
};

const getCharacterPosition = (gsCoords: Coords): Position => {
  return {
    top: (gsCoords.y - 1) * BLOCK_HEIGHT,
    left: (gsCoords.x - 1) * BLOCK_WIDTH
  };
};

export const Droid: React.FC<CheffDroidProps> = ({
  size,
  gameStateCoords
}) => {
  const [finalPosition, setFinalPosition] =
    useState<Position>(getCharacterPosition(gameStateCoords));
  const [initialPosition, setInitialPosition] = useState<Position>(finalPosition);
  const sizeInPixel = `${size}px`;

  useEffect(() => {
    if(gameStateCoords) {
      setInitialPosition(finalPosition);
      setFinalPosition(getCharacterPosition(gameStateCoords));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStateCoords])

  return (
    <CheffDroidContainer
      initial={initialPosition}
      final={finalPosition}
    >
      <ImageIcon height={sizeInPixel} width={sizeInPixel} src={CheffDroid} />
    </CheffDroidContainer>
  )
};
