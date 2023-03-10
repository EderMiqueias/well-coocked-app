import React from 'react';
import { BackIconComponent } from '@/components';
import { SobreContainer } from './styles';
import { Content, Title } from '@/common';

const SobrePage = () => {
  return (
  <SobreContainer>
    <BackIconComponent backTo="/" />
    <Title>Well Coocked!</Title>
    <Content>
      Well Coocked é um jogo de temática culinária com dinamica baseada
      na contrução de um algoritmo para preparação de um prato solicitado.
    </Content>
    <Content>
      Ajude o Cheff Droid a conquistar seu lugar como o chefe mais eficiente
      que uma cozinha de restaurante pode ter.
    </Content>
  </SobreContainer>);
};

export { SobrePage };
