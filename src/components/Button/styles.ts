import styled from 'styled-components';
import { ButtonText } from '../InstructionsButtons/styles';

export const PrimaryButton = styled.button`
  background-color: var(--brand);
  color: #1a1207;
  font-size: 1em;
  font-weight: 700;
  margin: 0.5em 0;
  padding: 0.6em 1.5em;
  border: none;
  border-radius: 10px;
  width: 90%;
  min-width: 200px;
  cursor: pointer;
  &:hover { background-color: var(--brand-hover); }
  &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
`;

export const SecondaryButton = styled.button`
  background-color: var(--surface-2);
  color: var(--text);
  font-size: 1em;
  margin: 0.5em 0;
  padding: 0.6em 1.5em;
  border: 1px solid var(--border);
  border-radius: 10px;
  width: 90%;
  min-width: 200px;
  cursor: pointer;
  &:hover { border-color: var(--border-strong); }
  &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
`;

export const RunButton = styled.button`
  width: 70px;
  height: 70px;
  background: var(--action);
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
  &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
`;

export const ButtonTextContainer = styled.div`
  flex-direction: column;
`;

export const Text = styled(ButtonText)`
  font-size: 20px;
  color: var(--text);
`;
