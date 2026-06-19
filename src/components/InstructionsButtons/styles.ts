import styled from "styled-components";

type ButtonVariant = 'move' | 'brand' | 'wait';

interface ButtonStyledProps {
  variant?: ButtonVariant;
}

const getButtonColor = (variant?: ButtonVariant): string => {
  switch (variant) {
    case 'brand': return 'var(--brand)';
    case 'wait':  return 'var(--wait)';
    default:      return 'var(--move)';
  }
};

export const Button = styled.button<ButtonStyledProps>`
  width: 50px;
  height: 50px;
  background: ${({ variant }) => getButtonColor(variant)};
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { opacity: 0.85; }
  &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const ButtonsContainer = styled.div`
  min-width: 150px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MovementButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  min-width: 140px;
  margin: 0 12px;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.2;
  color: var(--text-muted);
  margin: 2px 0 0;
  text-align: center;
`;
