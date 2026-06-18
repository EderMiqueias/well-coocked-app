import React from "react";

import { BackIcon } from "@/assets";
import { ImageIcon } from "@/common";

import { Anchor } from "../Anchor";
import { Container } from "./styles";

type ButtonProps = {
  backTo: string;
}

export const BackIconComponent: React.FC<ButtonProps> = ({
  backTo
}) => {
  return (
    <Container>
      <Anchor
        url={backTo}
        aria-label="Voltar"
      >
        <ImageIcon
          src={BackIcon}
          width="40px"
          height="40px"
        />
      </Anchor>
    </Container>
  );
}
