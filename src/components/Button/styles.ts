import styled from 'styled-components';
import { ButtonText } from '../InstructionsButtons/styles';

export const MenuButton = styled.button`
  color: tomato;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid tomato;
  border-radius: 3px;
  width: 90%;
  min-width: 200px;
`;

export const RunButton = styled.button`
  width: 70px;
  height: 70px;
  background: #4C943B;
  border: 1px solid #4D4D4D;
  border-radius: 10px;
`;

export const ButtonTextContainer = styled.div`
  flex-direction: column;
`;

export const Text = styled(ButtonText)`
  font-size: 20px;
`;
