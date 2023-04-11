import styled from 'styled-components';
import { MenuContainer } from '../Home/styles';

export const Container = styled(MenuContainer)`
  color: white;
  width: 70%;
`;

export const NiveisContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const NivelContainer = styled.div`
  display: block;
  color: white;
  max-height: 768px;
  background-color: salmon;
  width: 1024px;
  border-radius: 15px;
`;

export const FirstRowContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  height: 512px;
`;


export const IndicativosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 154px;
  height: 100%;
  background-color: #E9967A;
  justify-content: space-between;
`;

export const RunButtonContainer = styled.div`
  display: flex;
`;

export const OperacoesContainer = styled.div`
  width: 100%;
  height: 256px;
  background-color: #E9967A;
  display: flex;
  align-self: flex-end;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

