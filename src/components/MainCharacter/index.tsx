import { useEffect, useState } from "react";

import { CheffDroid } from "@/assets";
import { ImageIcon } from "@/common";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "@/constants";
import { Coords, MainCharacterState } from "@/types";
import { getMobileItemIcon } from "@/utils";

import { CheffDroidContainer, Container, ImageContainer, Position } from "./styles";

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
    if (characterState.coords) {
      setInitialPosition(finalPosition);
      setFinalPosition(getCharacterPosition(characterState.coords));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterState.coords])

  return (
    <Container
      initial={initialPosition}
      final={finalPosition}
    >
      <CheffDroidContainer>
        <ImageContainer>
          <ImageIcon
            height={sizeInPixel}
            width={sizeInPixel}
            src={CheffDroid}
          />
        </ImageContainer>
        <ImageContainer style={{display: 'flex', top: 45}}>
          <ImageIcon
            height="auto"
            width="33px"
            src={getMobileItemIcon(characterState.subItem)}
          />
        </ImageContainer>
      </CheffDroidContainer>
    </Container>
  )
};
