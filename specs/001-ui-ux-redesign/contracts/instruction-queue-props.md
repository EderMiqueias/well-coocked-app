# Contract: InstructionQueue Component Props

**File**: `src/components/IntructionQueue/index.tsx`
**Type**: UI component public interface

---

## Props Interface

```typescript
type InstructionQueueProps = {
  instructions: IndexedInstruction[];
  limit: number;
  currentInstructionIndex: number;
  onRemove: (index: number) => void;
};
```

## Prop Descriptions

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `instructions` | `IndexedInstruction[]` | ✅ | Ordered array of filled queue steps. Empty array = queue is empty. |
| `limit` | `number` | ✅ | Maximum allowed instructions for this level. Comes from level config via NivelBase. Never hardcoded. |
| `currentInstructionIndex` | `number` | ✅ | Array index of the currently executing step. Used for visual highlight during run. Pass `-1` or `0` when not executing. |
| `onRemove` | `(index: number) => void` | ✅ | Callback called with `IndexedInstruction.index` (not array position) when user removes a step. |

## Behavioral Invariants

1. The component renders a horizontal scrollable track. Height is constant regardless of `instructions.length`.
2. The component renders zero empty slot blocks. Only filled steps, the next-slot indicator (when `!isFull`), and the free-count label are rendered.
3. When `instructions.length >= limit`, the next-slot indicator is hidden and the budget meter shows at-limit state.
4. Step display numbers are `arrayPosition + 1` (1-indexed from left). They are NOT the `IndexedInstruction.index` field.
5. When a new item is added (detected via `instructions.length` change), the track scrolls to show the rightmost step.
6. The "Limpar" (clear all) button calls `onRemove` for each step in reverse order, or the parent may expose a separate `onClear` callback if preferred during implementation.

## Visual Output Contract

```
┌────────────────────────────────────────────────────────────────────┐
│  7 de 14 instruções  [████████░░░░░░░░] amber           [Limpar]  │
│                                                                     │
│  [1 ↑] → [2 ↑] → [3 →] → [4 🤚] → [5 ⏸] → [+]  +8 livres      │
└────────────────────────────────────────────────────────────────────┘
```

- Each step block: step number (top), instruction icon (center), colored border/background by type.
- `→` connectors between blocks.
- `[+]` next-slot indicator: amber border, `+` symbol.
- `+N livres` free-count label after next-slot indicator (hidden when N = 0).
- Budget meter: inverted color scale (green → amber → red as fill increases).

## Changed From Previous Interface

| Before | After |
|--------|-------|
| `state: IntructionQueueState` | `instructions: IndexedInstruction[]` + `currentInstructionIndex: number` |
| No `limit` prop (hardcoded 14) | `limit: number` (from level config) |
| `removeInstruction(index)` | `onRemove(index)` (same semantics, renamed) |
