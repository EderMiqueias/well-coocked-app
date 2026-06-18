import React from "react";

import { GameStates } from "@/types";
import { CriticalIcon, InterrogationIcon, LateIcon, SuccessIcon } from "@/assets";

import { Button, Container, Img, Text, TipText } from "./styles";
import { NavigateFunction } from "react-router-dom";

type ModalProps = {
  gameState: GameStates;
  onClick: () => void;
  navigate: NavigateFunction;
  timeLeft: number;
};

type content = {
  text: string;
  icon: string;
  buttonText: string;
  buttonColor: string;
  buttonAction: () => void;
  subText?: string;
};

export const Modal: React.FC<ModalProps> = ({
  gameState,
  onClick,
  navigate,
  timeLeft
}) => {
  const backToNiveis = () => navigate('/niveis');
  const allContents: Record<GameStates, content> = {
    completed: {
      text: 'Receita pronta! Cheff Droid fez a receita!',
      icon: SuccessIcon,
      buttonText: 'Continuar',
      buttonColor: 'var(--action)',
      buttonAction: backToNiveis
    },
    droidHitItsHead: {
      text: 'Essa não! Cheff Droid bateu com tudo em uma parede e não consegue continuar!',
      icon: CriticalIcon,
      buttonText: 'Tentar Novamente',
      buttonColor: 'var(--danger)',
      buttonAction: onClick
    },
    caughtPanInUse: {
      text: 'Ops! Cheff Droid removeu um ingrediente que ainda não estava cozido.',
      icon: CriticalIcon,
      buttonText: 'Tentar Novamente',
      buttonColor: 'var(--danger)',
      buttonAction: onClick
    },
    rowFoodOnDish: {
      text: 'Prefere mal passado? Cheff Droid usou um ingrediente que ainda não estava cozido.',
      icon: CriticalIcon,
      buttonText: 'Tentar Novamente',
      buttonColor: 'var(--danger)',
      buttonAction: onClick
    },
    fail: {
      text: 'Hmm... O que estávamos fazendo mesmo???',
      subText: 'Cheff Droid deve colocar os ingredientes cozidos em algum prato.',
      icon: InterrogationIcon,
      buttonText: 'Tentar Novamente',
      buttonColor: 'var(--danger)',
      buttonAction: onClick
    },
    timeOver: {
      text: 'Muito devagar! Precisamos ser mais eficientes.',
      icon: LateIcon,
      buttonText: 'Tentar Novamente',
      buttonColor: 'var(--danger)',
      buttonAction: onClick
    },
    started: {
      text: '',
      icon: '',
      buttonText: '',
      buttonColor: '',
      buttonAction: backToNiveis
    }
  };
  const content = allContents[gameState];
  const mustShowModal = () => gameState !== GameStates.started;

  return (
    <>
      {mustShowModal() && (
        <Container>
          <Img src={content.icon} />
          <Text>{content.text}</Text>
          {content.subText && (
            <TipText>{content.subText}</TipText>
          )}
          {timeLeft > 0 ? (
            <Text>Tempo restante: {timeLeft} Segundos</Text>
          ) : (
            <Text>Tempo Esgotado!</Text>
          )}
          <Button onClick={content.buttonAction} color={content.buttonColor}>
            {content.buttonText}
          </Button>
        </Container>
      )}
    </>
  );
}