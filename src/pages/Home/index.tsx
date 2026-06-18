import React from 'react';
import { Button, Anchor } from '@/components';
import { MenuContainer, MenuTitle, Row } from './styles';
import { ImageIcon } from '@/common';
import { Android1, Android2 } from '@/assets';

const HomePage = () => {
    return (
        <Row>
            <ImageIcon width='400px' height='400px' src={Android1} />
            <MenuContainer>
                <MenuTitle>Well Coocked!</MenuTitle>
                <Anchor url="/niveis">
                    <Button text='Jogar' type='primary' />
                </Anchor>
                <Anchor url="/tutorial">
                    <Button text='Tutorial' type='menu' />
                </Anchor>
                <Anchor url="/sobre">
                    <Button text='Sobre o jogo' type='menu' />
                </Anchor>
            </MenuContainer>
            <ImageIcon width='400px' height='400px' src={Android2} />
        </Row>
    );
};

export { HomePage };
