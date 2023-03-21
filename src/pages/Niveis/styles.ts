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
  background-color: #ca3433;
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
  margin-bottom: 8px;
  width: 154px;
  height: 100%;
  background-color: #E9967A;
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

