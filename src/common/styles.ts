import styled from 'styled-components';

interface ImageProps {
  height: string;
  width: string;
}

export const ImageIcon = styled.img<ImageProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;


export const Title = styled.h1``;

export const Subtitle = styled.h3``;

export const Content = styled.p``;

export const HighlightTitle = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  color: #4D4D4D;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
