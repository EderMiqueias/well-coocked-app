import React, { useState } from 'react';

import { BackIconComponent } from '@/components';
import { ImageIcon } from '@/common';

import {
  ArrowLeft,
  ArrowRight,
  TutorialPic1,
  TutorialPic2,
  TutorialPic3,
  TutorialPic4,
  TutorialPic5,
  TutorialPic6,
  TutorialPic7,
  TutorialPic8
} from '@/assets';

import { Container, ImagesViewContainer } from './styles';

const TutorialPage = () => {
  const tutorialImages = [
    TutorialPic1,
    TutorialPic2,
    TutorialPic3,
    TutorialPic4,
    TutorialPic5,
    TutorialPic6,
    TutorialPic7,
    TutorialPic8
  ];

  const [picIndex, setPicIndex] = useState(0);
  const goFoward = () => setPicIndex(picIndex + 1);
  const goPrevious = () => setPicIndex(picIndex - 1);

  const showPrevious = picIndex > 0;
  const showFoward = picIndex < tutorialImages.length - 1;

  return (
    <Container>
      <BackIconComponent backTo="/" />
      <ImagesViewContainer>
        <ImageIcon
          onClick={showPrevious ? goPrevious : undefined}
          style={{ opacity: showPrevious ? 100 : 0 }}
          src={ArrowLeft}
          width="75px"
          height="75px"
        />
        <ImageIcon
          height='512px'
          width='512px'
          src={tutorialImages[picIndex]}
        />
        <ImageIcon
          onClick={showFoward ? goFoward : undefined}
          style={{ opacity: showFoward ? 100 : 0 }}
          src={ArrowRight}
          width="75px"
          height="75px"
        />
      </ImagesViewContainer>
    </Container>
  );
}

export { TutorialPage };
