import styled from 'styled-components';

interface ImageProps {
  height: string;
  width: string;
}

export const Image = styled.img<ImageProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
