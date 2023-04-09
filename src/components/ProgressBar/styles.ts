import styled from "styled-components";

import { ANIMATION_TIME_CSS } from "@/constants";

// Merits of https://css-tricks.com/css3-progress-bars/

export const Container = styled.div`
  width: 64px;
  margin-top: -8px;
  margin-left: 4px;
  position: absolute;
  z-index: 1;
`;

export const BarContainer = styled.div`
  height: 8px;
  background-color: #fff;
  border-radius: 2px;
  padding: 4px;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
`;

export const Bar = styled.span<{ progress: number }>`
  width: ${({progress}) => progress}%;
  display: block;
  height: 100%;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  background-color: rgb(43,194,83);
  background-image: linear-gradient(
    center bottom,
    rgb(43,194,83) 37%,
    rgb(84,240,84) 69%
  );
  box-shadow: 
    inset 0 2px 9px  rgba(255,255,255,0.3),
    inset 0 -2px 6px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
  transition: width ${ANIMATION_TIME_CSS} linear;
`;
