import styled from "styled-components";

export const Container = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  text-align: center;
  border-radius: 16px;
  padding: 30px 30px 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  z-index: 12;
`;

export const Button = styled.button<{ color: string }>`
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 8px;
  width: 200px;
  padding: 14px;
  font-size: 16px;
  font-weight: 700;
  color: #0a1a12;
  cursor: pointer;
  margin-top: 28px;
  &:hover { opacity: 0.9; }
  &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
`;

export const Text = styled.p`
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
`;

export const TipText = styled.p`
  font-weight: 700;
  color: var(--text-muted);
  font-size: 16px;
`;

export const Img = styled.img`
  width: 72px;
  margin-bottom: 15px;
`;
