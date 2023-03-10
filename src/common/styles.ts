import styled from 'styled-components';

interface ImageProps {
  height: string;
  width: string;
}

export const Image = styled.img<ImageProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;


export const Title = styled.h1``;

export const Subtitle = styled.h3``;

export const Content = styled.p``;
