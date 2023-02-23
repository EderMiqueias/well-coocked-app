import React from 'react';
import '@/assets/styles/App.css';
import { Button } from '@/components';
import { MenuContainer, MenuTitle } from './styles';

const HomePage = () => {
    return (
        <MenuContainer>
            <MenuTitle>Menu Principal</MenuTitle>
            <Button text='Niveis' type='menu' />
            <Button text='Sobre o jogo' type='menu' />
        </MenuContainer>
    );
}

export { HomePage };
