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

export const CheffDroidContainer = styled.div<CheffDroidProps>`
  position: absolute;
  z-index: 10;
  height: 100px;
  width: 100px;
  left: ${({final}) => final.left}px;
  top: ${({final}) => final.top}px;
  animation-name: ${(props) => animation(props)};
  animation-duration: 2s;
`;

export const SubItemContainer = styled.div`

`;
