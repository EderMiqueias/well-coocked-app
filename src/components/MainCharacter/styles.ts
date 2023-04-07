import { CheffDroid } from "@/assets";
import { ANIMATION_TIME_CSS } from "@/constants";
import styled, { keyframes } from "styled-components";

export type Position = {
  left: number;
  top: number;
};

interface CheffDroidProps {
  initial: Position;
  final: Position;
};

const animation = (props: CheffDroidProps) => keyframes`
  from  {left:${props.initial.left}px; top:${props.initial.top}px;}
  to  {left:${props.final.left}px; top:${props.final.top}px;}
`;

export const Container = styled.div<CheffDroidProps>`
  position: absolute;
  z-index: 10;
  height: 100px;
  width: 100px;
  left: ${({final}) => final.left}px;
  top: ${({final}) => final.top}px;
  animation-name: ${(props) => animation(props)};
  animation-duration: ${ANIMATION_TIME_CSS};
`;

export const CheffDroidContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export type CheffDroidSpriteMode = 'normal' | 'sleeping' | 'side';

export interface CheffDroidSpriteProps {
  mode: CheffDroidSpriteMode;
};

const getPositionFromMode = (mode: CheffDroidSpriteMode) => {
  switch (mode) {
    case "normal":
      return '0px';
    case "side":
      return '44px';
    case 'sleeping':
      return '88px';
  }
};

export const CheffDroidSprite = styled.div<CheffDroidSpriteProps>`
  background: url(${CheffDroid});
  height: 72px;
  width: 44px;
  background-position: ${({mode}) => getPositionFromMode(mode)};
`;

export const ImageContainer = styled.div`
  position: absolute;
`;

export const TempContainer = styled(ImageContainer)<{hidden: boolean}>`
  display: flex;
  top: 0px;
  left: 75px;
  opacity: ${({hidden}) => hidden ? '100' : '0'};
  transition: opacity 0.5s linear;
`;

export const SubItemContainer = styled.div`

`;
