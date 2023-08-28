import { Tooltip as LibTooltip } from 'react-tooltip';

type TooltipProps = {
  id: string;
  children: string;
  delayHide?: number;
  delayShow?: number;
};

export const Tooltip: React.FC<TooltipProps> = ({
  id,
  children,
  delayHide = 500,
  delayShow = 1500
}) => 
  <LibTooltip  id={id} delayHide={delayHide} delayShow={delayShow}>
    {children}
  </LibTooltip>;
