import { useEffect, useState } from "react";

import { ImageIcon } from "@/common";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "@/constants";
import { Coords, MainCharacterState } from "@/types";
import { getMobileItemIcon } from "@/utils";

import {
  CheffDroidContainer,
  Container,
  CheffDroidSprite,
  ImageContainer,
  Position,
  CheffDroidSpriteMode
} from "./styles";

type CheffDroidProps = {
  characterState: MainCharacterState;
};

const getCharacterPosition = (gsCoords: Coords): Position => {
  return {
    top: (gsCoords.y - 1) * BLOCK_HEIGHT,
    left: (gsCoords.x - 1) * BLOCK_WIDTH
  };
};

export const Droid: React.FC<CheffDroidProps> = ({
  characterState
}) => {
  const [finalPosition, setFinalPosition] =
    useState<Position>(getCharacterPosition(characterState.coords));
  const [initialPosition, setInitialPosition] =
    useState<Position>(finalPosition);
  const [mode, setMode] = useState<CheffDroidSpriteMode>('normal');

  useEffect(() => {
    if (characterState.coords) {
      setInitialPosition(finalPosition);
      setFinalPosition(getCharacterPosition(characterState.coords));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterState.coords])

  useEffect(() => {
    if (characterState.isWaiting) {
      setMode('sleeping');
    } else {
      setMode('normal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterState.isWaiting])

  return (
    <Container
      initial={initialPosition}
      final={finalPosition}
    >
      <CheffDroidContainer>
        <ImageContainer>
          <CheffDroidSprite mode={mode} />
        </ImageContainer>
        <ImageContainer style={{display: 'flex', top: 45}}>
          <ImageIcon
            height="auto"
            width="25px"
            src={getMobileItemIcon(characterState.subItem)}
          />
        </ImageContainer>
      </CheffDroidContainer>
    </Container>
  )
};
