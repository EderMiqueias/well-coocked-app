import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  border: 1px solid var(--border);
  padding: 5%;
  min-height: 280px;
  min-width: 320px;
  align-items: center;
  border-radius: 16px;
  color: var(--text);
`;

export const MenuTitle = styled.h1`
  color: var(--text);
  margin-bottom: 24px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--bg);
`;
