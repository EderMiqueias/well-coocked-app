import React from "react";

import { GameSpaceState } from "@/types";

import { Block } from "./Block";
import { JogoContainer } from "./styles";

type GameSpaceProps = {
  state: GameSpaceState;
  children: React.ReactNode;
};

export const GameSpace: React.FC<GameSpaceProps> = ({
  state,
  children
}) => {
  const getBlockRow = (coordY: number, colorFase: boolean, items: number) => {
    let atualColorFase = colorFase;
    const blockRow: React.ReactNode[] = [];

    for (let i = 1; i <= items; i++) {
      blockRow.push(
        <Block
          coords={{
            y: coordY,
            x: i
          }}
          state={state[coordY][i]}
          colorFase={atualColorFase}
        />
      );
      atualColorFase = !atualColorFase;
    }
    return blockRow;
  };

  const getBlockRows = () => {
    let atualColorFase = true;
    const blockRows: React.ReactNode[] = [];

    for (let i = 1; i <= 4; i++) {
      blockRows.push(getBlockRow(i, atualColorFase, 4));
      atualColorFase = !atualColorFase;
    }
    return blockRows;
  };

  return (
    <JogoContainer>
      {children}
      {getBlockRows()}
    </JogoContainer>
  )
}
