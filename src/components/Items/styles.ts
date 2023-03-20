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
  padding: 4px;
  /* margin-bottom: -6px; */
`;

export const AbsoluteSubItemContainer = styled.div`
  position: absolute;
  padding-left: 4px;
`;
