import React from 'react';
import { BudgetWrapper, BudgetLabel, BudgetBarTrack, BudgetBarFill } from './styles';

interface BudgetMeterProps {
  used: number;
  limit: number;
}

export const BudgetMeter: React.FC<BudgetMeterProps> = ({ used, limit }) => {
  const pct = limit > 0 ? used / limit : 0;
  return (
    <BudgetWrapper>
      <BudgetLabel>{used} de {limit} instruções</BudgetLabel>
      <BudgetBarTrack>
        <BudgetBarFill pct={pct} />
      </BudgetBarTrack>
    </BudgetWrapper>
  );
};
