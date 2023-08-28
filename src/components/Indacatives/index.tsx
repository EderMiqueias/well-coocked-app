import React from "react";

import { HourGlass, FoodIcon, ArrowRightDirection } from "@/assets";
import { ImageIcon } from "@/common";
import { DISHS } from "@/constants";
import { Dishs, MobileItems } from "@/types";

import { Container, DishName, IndicativesRow, Time, TimeContainer } from "./styles";
import { Tooltip } from "../Tooltip";
import { getCookedIcon, getMobileItemIcon } from "@/utils";

type IndicativesProps = {
  dish: Dishs;
  secondsLeft: number;
};

const TIME_INDICATIVE_ID = 'TIME_INDICATIVE_ID';
const WISHED_DISH = 'WISHED_DISH';
const INGREDIENT_LIST = 'INGREDIENT_LIST';

export const Indicatives: React.FC<IndicativesProps> = ({
  dish,
  secondsLeft
}) => {
  const getDishIngredients = (): MobileItems[] => DISHS[dish];
  const getIngredientsIcons = () =>
    getDishIngredients().map(
      (item, index) =>
      <ImageIcon
        key={index}
        height="40px"
        width="40px"
        src={getMobileItemIcon(item)}
        data-tooltip-id={INGREDIENT_LIST}
      />
    );
  
  return (
    <Container>
      <TimeContainer data-tooltip-id={TIME_INDICATIVE_ID}>
        <ImageIcon height="auto" width="40px" src={HourGlass} />
        <Time>{secondsLeft} S</Time>
      </TimeContainer>
      <DishName>{dish}</DishName>
      <ImageIcon
        height="auto"
        width="90px"
        src={FoodIcon}
      />
      <IndicativesRow>
        {getIngredientsIcons()}
        <ImageIcon height="40px" width="40px" src={ArrowRightDirection} />
        <ImageIcon
          data-tooltip-id={WISHED_DISH}
          height="40px"
          width="40px"
          src={getCookedIcon(getDishIngredients()[0])}
        />
      </IndicativesRow>
      <Tooltip id={TIME_INDICATIVE_ID}>
        Tempo máximo em segundos.
      </Tooltip>
      <Tooltip id={WISHED_DISH}>
        Prato a ser preparado.
      </Tooltip>
      <Tooltip id={INGREDIENT_LIST}>
        Ingredientes a serem cozidos e levados ao prato.
      </Tooltip>
    </Container>
  );
};
