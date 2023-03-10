import React from "react";

import { BackIcon } from "@/assets";
import { Image } from "@/common";

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
      >
        <Image
          src={BackIcon}
          width="50px"
          height="50px"
        />
      </Anchor>
    </Container>
  );
}
