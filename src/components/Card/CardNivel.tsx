import React from "react";
import { Anchor } from "../Anchor";
import { NivelButton, NivelCard, TextNivelName } from "./styles";

type ButtonProps = {
  nivelName: string;
  nivelUrl: string;
  disabled: boolean;
}

export const CardNivel: React.FC<ButtonProps> = ({
  nivelName,
  nivelUrl,
  disabled
}) => {
  return (
    <NivelCard>
      <TextNivelName>{nivelName}</TextNivelName>
      <Anchor url={nivelUrl} justify="center">
        <NivelButton disabled={disabled}>
          {disabled ? 'Bloqueado' : 'Iniciar'}
        </NivelButton>
      </Anchor>
    </NivelCard>
  )
}
