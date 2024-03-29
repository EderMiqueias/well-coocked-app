import React from 'react';
import { Button, Anchor } from '@/components';
import { MenuContainer, MenuTitle, Row } from './styles';
import { ImageIcon } from '@/common';
import { Android1, Android2 } from '@/assets';

const HomePage = () => {
    return (
        <Row>
            <ImageIcon width='500px' height='500px' src={Android1} />
            <MenuContainer>
                <MenuTitle>Well Coocked!</MenuTitle>
                <Anchor url="/niveis" >
                    <Button text='Jogar' type='menu' />
                </Anchor>
                <Anchor url="/tutorial">
                    <Button text='Tutorial' type='menu' />
                </Anchor>
                <Anchor url="/sobre">
                    <Button text='Sobre o jogo' type='menu' />
                </Anchor>
            </MenuContainer>
            <ImageIcon width='500px' height='500px' src={Android2} />
        </Row>
    );
}

export { HomePage };
