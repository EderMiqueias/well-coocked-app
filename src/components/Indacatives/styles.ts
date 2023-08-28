import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 12px;
  color: rgb(39, 39, 39);
`;

export const IndicativesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-items: center;
`;

export const DishName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-transform: uppercase;
`;

export const TimeContainer = styled(IndicativesRow)`
  width: 100%;
  border-bottom: 1px solid;
  border-bottom-color: rgba(39, 39, 39, 0.5);
  justify-content: center;
`;

export const Time = styled.p`
  margin-left: 8px;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
`;
