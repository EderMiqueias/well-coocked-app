import React from 'react';

import {
  JogoContainer,
  NivelContainer,
  IndicativosContainer,
  OperacoesContainer,
  FirstRowContainer
} from '../styles';

const Nivel1 = () => {
    return (
        <NivelContainer>
          <FirstRowContainer>
            <JogoContainer></JogoContainer>
            <IndicativosContainer></IndicativosContainer>
          </FirstRowContainer>
          <OperacoesContainer></OperacoesContainer>
        </NivelContainer>
    );
}

export { Nivel1 };
