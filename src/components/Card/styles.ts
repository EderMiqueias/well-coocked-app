import styled from 'styled-components';

export const CardBase = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 15px;
`;

export const NivelCard = styled(CardBase)`
  box-shadow:
    rgba(222, 49, 99, 0.4) 5px 5px,
    rgba(222, 49, 99, 0.3) 10px 10px,
    rgba(222, 49, 99, 0.2) 15px 15px,
    rgba(222, 49, 99, 0.1) 20px 20px,
    rgba(222, 49, 99, 0.05) 25px 25px;
  background-color: #c82c59;
  border: 3px solid rgba(200, 44, 89, 0.4);
  width: 200px;
  height: 150px;
`;

export const TextNivelName = styled.h2`
  color: white;
  font-size: 24px;
`;

export const NivelButton = styled.button`
  color: rgb(200, 44, 89);
  font-size: 24px;
  padding: 12px;
  width: 150px;
`;
