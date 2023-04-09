import styled from "styled-components";

interface SVGItemProps {
  size?: number;
}

export const SVGItem = styled.img<SVGItemProps>`
  width: ${({size}) => size ? `${size}px` : '64px' };
  height: ${({size}) => size ? `${size}px` : '64px' };
  margin: 6px;
`;

export const MobileItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImmobileItemContainer = styled.div``;

export const SubItemContainer = styled.div`
  background-color: white;
  align-items: center;
  justify-items: center;
  border-radius: 24px;
  padding: 4px;;
`;

export const AbsoluteSubItemContainer = styled.div<{ alinhar: boolean }>`
  position: absolute;
  padding-left: 4px;
  ${({alinhar}) => alinhar ? 'transform: translateY(-42%);' : ''}
`;

export const TempContainer = styled.div<{hidden: boolean}>`
  position: absolute;
  display: flex;
  top: 0px;
  left: 75px;
  opacity: ${({hidden}) => hidden ? '100' : '0'};
  transition: opacity 1s ease-in;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
