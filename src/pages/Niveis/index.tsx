import React from 'react';

import { Button, Anchor } from '@/components';
import { Title } from '@/common';

import { NiveisContainer } from './styles';

const NiveisPage = () => {
    return (
        <NiveisContainer>
            <Title>Niveis Disponiveis</Title>
            <Anchor url="/niveis/" >
                <Button text='Niveis' type='menu' />
            </Anchor>
        </NiveisContainer>
    );
}

export { NiveisPage };
