import styled from "styled-components";

export const Button = styled.button`
  width: 50px;
  height: 50px;
  background: #6495ED;
  border: 1px solid #4D4D4D;
  border-radius: 10px;
`;

export const ButtonsContainer = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MovementButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between
`;

export const Container = styled.div`
  flex-direction: column;
  margin-left: 24px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  width: 180px;
  height: 100%;
  margin-left: 50px;
  align-content: center;
  justify-content: space-between;
`;
