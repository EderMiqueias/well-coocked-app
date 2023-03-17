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
  background-color: #F5F5F5;
  color: white;
  height: 768px;
  width: 1024px;
  border-radius: 15px;
`;

export const FirstRowContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  height: 67%;
`;

export const JogoContainer = styled.div`
  width: 85%;
  height: 100%;
  border-right: 3px solid #7f7f7f;
  border-top-left-radius: 15px;
`;

export const IndicativosContainer = styled.div`
  width: 15%;
  height: 100%;
  border-top-right-radius: 15px;
`;

export const OperacoesContainer = styled.footer`
  width: 100%;
  height: 33%;
  background-color: #E9967A;
  align-self: flex-end;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

