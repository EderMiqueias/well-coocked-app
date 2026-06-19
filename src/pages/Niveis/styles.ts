import styled from 'styled-components';
import { MenuContainer } from '../Home/styles';

export const Container = styled(MenuContainer)`
  color: var(--text);
  width: 70%;
`;

export const NiveisContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const NivelContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--text);
  background-color: var(--surface);
  width: 100%;
  max-width: 900px;
  border-radius: 15px;
`;

export const FirstRowContainer = styled.div`
  flex-direction: row;
  display: flex;
  /* width: 100%; */
  height: 448px;
  justify-content: space-between;
`;

export const IndicativosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  /* height: 100%; */
  background-color: var(--surface-2);
  border-top-right-radius: 15px;
  justify-content: space-between;
  padding: 0 0 12px;
`;

export const RunButtonContainer = styled.div`
  display: flex;
`;

export const OperacoesContainer = styled.div`
  width: 100%;
  min-height: 180px;
  background-color: var(--surface-2);
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top: 1px solid var(--border);
`;
