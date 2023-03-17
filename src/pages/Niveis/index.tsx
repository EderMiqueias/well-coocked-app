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
                <CardNivel disabled={true} nivelUrl="/niveis/2" nivelName='Nivel 2' />
                <CardNivel disabled={true} nivelUrl="/niveis/3" nivelName='Nivel 3' />
            </NiveisContainer>
        </Container>
    );
}

export { NiveisPage };
