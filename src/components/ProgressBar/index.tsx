import React from "react";

import { Bar, BarContainer, Container } from "./styles";
import { ImageIcon } from "@/common";
import { SuccessIcon } from "@/assets";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress
}) => {
  return (
    <Container>
      {progress >= 100
        ? (
          <ImageIcon
            height="28px"
            width="auto"
            src={SuccessIcon}
          />
        ) : (
          <BarContainer>
            <Bar progress={progress} />
          </BarContainer >
        )}
    </Container>
  );
};
