import styled from 'styled-components';

export const JogoContainer = styled.div`
  position: relative;
  max-width: 455px;
  max-height: 455px;
  border-top-left-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
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
  background-color: ${({colorFase}) => colorFase ? 'var(--surface-2)' : 'var(--surface)'};
  border: 1px solid var(--border);
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
