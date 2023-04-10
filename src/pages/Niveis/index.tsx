import React from 'react';

import { CardNivel, BackIconComponent } from '@/components';
import { Title } from '@/common';

import { NiveisContainer, Container } from './styles';

const NiveisPage = () => {
    return (
        <Container>
            <BackIconComponent backTo="/" />
            <Title>Niveis Disponiveis</Title>
            <NiveisContainer>
                <CardNivel disabled={false} nivelUrl="/niveis/1" nivelName='Nivel 1' />
                <CardNivel disabled={false} nivelUrl="/niveis/2" nivelName='Nivel 2' />
                <CardNivel disabled={false} nivelUrl="/niveis/3" nivelName='Nivel 3' />
            </NiveisContainer>
        </Container>
    );
}

export { NiveisPage };
export { Nivel1 } from './Nivel1';
export { Nivel2 } from './Nivel2';
export { Nivel3 } from './Nivel3';
