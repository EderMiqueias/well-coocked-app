import React from 'react';
import '@/assets/styles/App.css';
import { Button, Anchor } from '@/components';
import { MenuContainer, MenuTitle } from './styles';

const HomePage = () => {
    return (
        <MenuContainer>
            <MenuTitle>Menu Principal</MenuTitle>
            <Anchor url="/sobre" >
                <Button text='Niveis' type='menu' />
            </Anchor>
            <Anchor url="/sobre">
                <Button text='Sobre o jogo' type='menu' />
            </Anchor>
        </MenuContainer>
    );
}

export { HomePage };
