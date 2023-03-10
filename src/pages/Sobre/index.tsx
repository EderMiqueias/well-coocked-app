import React from 'react';
import { BackIconComponent } from '@/components';
import { Content, SobreContainer, Title } from './styles';

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
