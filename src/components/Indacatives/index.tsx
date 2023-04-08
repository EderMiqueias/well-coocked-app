import React from "react";

import { HourGlass, FoodIcon } from "@/assets";
import { ImageIcon } from "@/common";
import { DISHS } from "@/constants";
import { Dishs, MobileItems } from "@/types";

import { Container, DishName, IndicativesRow, Time, TimeContainer } from "./styles";
import { MobileItem } from "../Items";

type IndicativesProps = {
  dish: Dishs;
  secondsLeft: number;
};

export const Indicatives: React.FC<IndicativesProps> = ({
  dish,
  secondsLeft
}) => {
  const getDishIngredients = (): MobileItems[] => DISHS[dish];
  const getIngredientsIcons = () =>
    getDishIngredients().map(
      (item, index) =>
        <MobileItem key={index} item={item} isItemCooked />
    );
  
  return (
    <Container>
      <TimeContainer>
        <ImageIcon height="auto" width="40px" src={HourGlass} />
        <Time>{secondsLeft} S</Time>
      </TimeContainer>
      <DishName>{dish}</DishName>
      <ImageIcon height="auto" width="90px" src={FoodIcon} />
      <IndicativesRow>
        {getIngredientsIcons()}
      </IndicativesRow>
    </Container>
  );
};
