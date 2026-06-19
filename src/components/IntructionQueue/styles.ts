import styled from 'styled-components';

/* ── Queue layout ─────────────────────────────────────────────── */

export const QueueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 6px;
  padding: 8px 12px;
`;

export const QueueHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
`;

export const TrackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  height: 76px;
  padding: 4px 0;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
`;

/* ── Step block ───────────────────────────────────────────────── */

interface StepBlockProps {
  color: string;
  isActive: boolean;
}

export const StepBlock = styled.div<StepBlockProps>`
  position: relative;
  width: 50px;
  min-width: 50px;
  height: 64px;
  border-radius: 8px;
  border: 1px solid ${({ color }) => color};
  background: ${({ color }) => color}22;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 2px;
  flex-shrink: 0;
  ${({ isActive }) => isActive && 'box-shadow: 0 0 0 2px var(--brand);'}
  &:hover > button {
    opacity: 1;
  }
`;

export const StepNumber = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  line-height: 1;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: var(--danger);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 13px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ── Track decorators ─────────────────────────────────────────── */

export const Connector = styled.span`
  color: var(--border);
  font-size: 14px;
  min-width: 10px;
  text-align: center;
  flex-shrink: 0;
`;

export const NextSlotIndicator = styled.div`
  width: 50px;
  min-width: 50px;
  height: 64px;
  border: 2px dashed var(--brand);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand);
  font-size: 22px;
  font-weight: 300;
  flex-shrink: 0;
`;

export const FreeCountLabel = styled.span`
  font-size: 11px;
  color: var(--text-faint);
  white-space: nowrap;
  margin-left: 8px;
  flex-shrink: 0;
`;

/* ── Action buttons ───────────────────────────────────────────── */

export const ClearButton = styled.button`
  margin-left: 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 11px;
  padding: 3px 8px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    border-color: var(--danger);
    color: var(--danger);
  }
  &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
`;

export const NavButton = styled.button`
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 14px;
  padding: 3px 6px;
  cursor: pointer;
  &:hover { border-color: var(--border-strong); }
  &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
`;

/* ── Budget meter ─────────────────────────────────────────────── */

export const BudgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BudgetLabel = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
`;

export const BudgetBarTrack = styled.div`
  width: 100px;
  height: 5px;
  background: var(--surface-2);
  border-radius: 3px;
  overflow: hidden;
`;

interface BudgetBarFillProps {
  pct: number;
}

const getMeterColor = (pct: number): string => {
  if (pct <= 0.5) return 'var(--action)';
  if (pct <= 0.8) return 'var(--brand)';
  return 'var(--danger)';
};

export const BudgetBarFill = styled.div<BudgetBarFillProps>`
  height: 100%;
  width: ${({ pct }) => Math.min(pct * 100, 100)}%;
  background: ${({ pct }) => getMeterColor(pct)};
  border-radius: 3px;
  transition: width 0.2s ease, background 0.3s ease;
`;
