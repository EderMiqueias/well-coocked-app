import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 24px;
  width: 510px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const QueueContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-items: center;
`;

interface InstructionContainerProps {
  highlight?: boolean;
}

export const InstructionContainer = styled.div<InstructionContainerProps>`
  width: 50px;
  height: 50px;
  border: 1px solid #4D4D4D;
  border-radius: 10px;
  margin-bottom: 16px;
  ${({highlight}) => highlight
    && 'box-shadow: rgba(255, 0, 0, 1) 0px 0px 25px;'}
`;

export const VoidInstruction = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(100, 149, 237, 0.5);
`;

export const SVGItem = styled.img`
  width: 30px;
  height: 30px;
  margin: 4px;
`;
