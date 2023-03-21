import styled from 'styled-components';

export const JogoContainer = styled.div`
  max-width: 85%;
  height: 100%;
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
  max-width: ${({width}) => width}px;
  max-height: ${({height}) => height}px;
  background-color: ${({colorFase}) => colorFase ? ' #f5cba7 ' : ' #fae5d3 ' };
`;

export const ItemsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
`;

export const CharacterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
