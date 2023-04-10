import React, { useState } from 'react';

import { CardNivel, BackIconComponent } from '@/components';
import { Title } from '@/common';
import { NiveisPageName, NiveisState, NivelState } from '@/types';

import { NiveisContainer, Container } from './styles';

const NiveisPage = () => {
  const [niveisState, setNiveisState] = useState<NiveisState>({
    nivel_1: null,
    nivel_2: null,
    nivel_3: null
  } as NiveisState);

  const onFinalizeNivel = (nivelPageName: NiveisPageName, state: NivelState) => {
    setNiveisState((oldState) => ({
      nivel_1: oldState.nivel_1,
      nivel_2: oldState.nivel_2,
      nivel_3: oldState.nivel_3,
      [nivelPageName]: state
    }));
  };

  return (
    <Container>
      <BackIconComponent backTo="/" />
      <Title onClick={() => console.log(niveisState)}>Niveis Disponiveis</Title>
      <NiveisContainer>
        <CardNivel
          disabled={false}
          nivelUrl="/niveis/1"
          nivelName='Nivel 1'
        />
        <CardNivel
          disabled={false}
          nivelUrl="/niveis/2"
          nivelName='Nivel 2'
        />
        <CardNivel
          disabled={false}
          nivelUrl="/niveis/3"
          nivelName='Nivel 3'
        />
      </NiveisContainer>
    </Container>
  );
}

export { NiveisPage };
export { Nivel1 } from './Nivel1';
export { Nivel2 } from './Nivel2';
export { Nivel3 } from './Nivel3';
