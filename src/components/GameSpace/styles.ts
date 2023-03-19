import styled from 'styled-components';

export const JogoContainer = styled.div`
  max-width: 85%;
  height: 100%;
  border-right: 3px solid #7f7f7f;
  border-top-left-radius: 15px;
  display: flex;
  flex-wrap: wrap;
`;

interface BlockProps {
  width: number;
  height: number;
  colorFase: boolean;
}

export const BlockContainer = styled.div<BlockProps>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  min-width: ${({width}) => width}px;
  min-height: ${({height}) => height}px;
  background-color: ${({colorFase}) => colorFase ? ' #f5cba7 ' : ' #fae5d3 ' };
`;

interface SVGItemProps {
  size?: number;
}

export const SVGItem = styled.img<SVGItemProps>`
  width: ${({size}) => size ? `${size}px` : 'auto' };
  height: ${({size}) => size ? `${size}px` : 'auto' };
`;


