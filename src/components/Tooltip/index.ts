import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;


export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipContent = styled.div`

 position: absolute;
  display: none;
  background-color: #1a1a1a; /* Cor de fundo escura */
  color: #00ff00; /* Cor do texto verde */
  border-radius: 8px; /* Borda arredondada */
  padding: 10px;
  font-size: 16px;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Sombra suave */
  transform: translateY(10px); /* Elevação */
  animation: ${pulseAnimation} 1.5s infinite;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #1a1a1a transparent; /* Triângulo na parte superior */
  }

  ${TooltipContainer}:hover & {
    display: block;
  }
`;

export const TooltipText = styled.span`
  display: block;
`;