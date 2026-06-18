import styled from 'styled-components';

export const CardBase = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 1em;
  border-radius: 12px;
`;

export const NivelCard = styled(CardBase)`
  background-color: var(--surface-2);
  border: 1px solid var(--border);
  width: 180px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.15s ease;
  &:hover {
    border-color: var(--border-strong);
  }
`;

export const TextNivelName = styled.h2`
  color: var(--text);
  font-size: 20px;
  margin: 0;
`;

export const NivelButton = styled.button`
  background-color: var(--brand);
  color: #1a1207;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 0;
  width: 140px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:disabled {
    background-color: var(--surface);
    color: var(--text-faint);
    border: 1px solid var(--border);
    cursor: not-allowed;
  }
  &:hover:not(:disabled) { background-color: var(--brand-hover); }
  &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
`;
