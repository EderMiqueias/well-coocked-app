import React from "react";

import { GameStates } from "@/types";
import { CriticalIcon, InterrogationIcon, LateIcon, SuccessIcon } from "@/assets";

import { Button, Container, Img, Text } from "./styles";

type ModalProps = {
  gameState: GameStates;
  onClick: () => void;
  timeLeft: number;
};

type content = {
  text: string;
  icon: string;
  buttonText: string;
  buttonColor: string;
  buttonAction: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  gameState,
  onClick,
  timeLeft
}) => {
  const backToNiveis = () => window.open('/niveis');
  const allContents: Record<GameStates, content> = {
    completed: {
      text: 'Parabéns! Cheff Droid fez a receita!',
      icon: SuccessIcon,
      buttonText: 'Continuar',
      buttonColor: '#55ed6c',
      buttonAction: backToNiveis
    },
    droidHitItsHead: {
      text: 'Essa não! Cheff Droid bateu com tudo em uma parede e não consegue continuar!',
      icon: CriticalIcon,
      buttonText: 'TentarNovamente',
      buttonColor: '#ed6755',
      buttonAction: onClick
    },
    caughtPanInUse: {
      text: 'Ops! Cheff Droid removeu um ingrediente que ainda não estava cozido.',
      icon: CriticalIcon,
      buttonText: 'TentarNovamente',
      buttonColor: '#ed6755',
      buttonAction: onClick
    },
    fail: {
      text: 'Hmm... O que estavamos fazendo mesmo???',
      icon: InterrogationIcon,
      buttonText: 'TentarNovamente',
      buttonColor: '#ed6755',
      buttonAction: onClick
    },
    timeOver: {
      text: 'Muito devagar! Precisamos ser mais eficientes.',
      icon: LateIcon,
      buttonText: 'TentarNovamente',
      buttonColor: '#ed6755',
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
          {timeLeft > 0 ? (
            <Text>Tempo restante: {timeLeft} Segundos</Text>
          ) : (
            <Text>Tempo Esgotado!</Text>
          )}
          <Button onClick={onClick} color={content.buttonColor}>
            {content.buttonText}
          </Button>
        </Container>
      )}
    </>
  );
}