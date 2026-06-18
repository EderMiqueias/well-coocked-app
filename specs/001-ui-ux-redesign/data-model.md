# Data Model: Well Cooked UI/UX Redesign

**Phase 1 output** | **Date**: 2026-06-18

---

## Entity 1: DesignToken

Represents a single named visual constant defined as a CSS custom property.

| Field | Type | Description |
|-------|------|-------------|
| name | string | CSS custom property name (e.g., `--brand`) |
| value | string | CSS color value (hex or named) |
| role | semantic role | background / surface / surface-2 / border / border-strong / text / text-muted / text-faint / brand / brand-hover / action / move / wait / danger |

**Validation rules**:
- Every token name used in a component file MUST exist in `theme.css`.
- Raw hex or color keyword values MUST NOT appear in styled-components outside `theme.css`.

**Full token set** (canonical values for `theme.css`):
```css
:root {
  --bg:            #0f1419;
  --surface:       #1a212b;
  --surface-2:     #232c38;
  --border:        #2a3441;
  --border-strong: #2f3a48;

  --text:          #f1f5f9;
  --text-muted:    #8b97a6;
  --text-faint:    #64748b;

  --brand:         #f59e0b;
  --brand-hover:   #fbbf24;
  --action:        #10b981;
  --move:          #93c5fd;
  --wait:          #a78bfa;
  --danger:        #ef4444;
}
```

---

## Entity 2: IndexedInstruction *(existing — no change)*

The unit of data in the instruction queue array. Existing type preserved as-is.

```typescript
// src/types/instructions.ts — UNCHANGED
type IndexedInstruction = {
  index: number;       // insertion-order identifier; used as removal key
  instruction: Instructions;
};
```

**Usage in new InstructionQueue**:
- `index` is the opaque removal key passed to `onRemove(index)`.
- Display step number = array position + 1 (NOT the `index` field).

---

## Entity 3: InstructionQueueProps *(new interface)*

The public contract of the refactored `InstructionQueue` component.

```typescript
type InstructionQueueProps = {
  instructions: IndexedInstruction[];   // filled steps only
  limit: number;                        // from level config; never hardcoded
  currentInstructionIndex: number;      // highlights executing step during run
  onRemove: (index: number) => void;    // remove by IndexedInstruction.index
};
```

**Derived values** (computed inside the component, not in props):
- `used = instructions.length`
- `free = limit - used`
- `budgetPct = used / limit`
- `isFull = used >= limit`
- `showNavButtons = limit > 50`

---

## Entity 4: BudgetMeterState *(derived, not stored)*

The visual state of the budget meter. Computed from `used` and `limit`.

| Condition | Color Token | Label |
|-----------|------------|-------|
| `budgetPct <= 0.50` | `--action` (green) | "fila enxuta — ótima pontuação" |
| `0.50 < budgetPct <= 0.80` | `--brand` (amber) | "dá pra otimizar" |
| `budgetPct > 0.80` | `--danger` (red) | "perto do limite" |

No new state — this is a pure derived display from `used / limit`.

---

## Entity 5: InstructionStepColor *(mapping)*

Maps each `Instructions` enum value to its display color token.

| Instruction value | Color token | Color name |
|-------------------|------------|------------|
| `top`, `bottom`, `left`, `right` | `--move` | blue |
| `grabRelease` | `--brand` | amber |
| `wait` | `--wait` | purple |
| `interact` | `--brand` | amber (same as grab/release) |

This mapping is a constant object in the refactored `Instruction.tsx`:
```typescript
const INSTRUCTION_COLOR: Record<Instructions, string> = {
  [Instructions.top]:         'var(--move)',
  [Instructions.bottom]:      'var(--move)',
  [Instructions.left]:        'var(--move)',
  [Instructions.right]:       'var(--move)',
  [Instructions.grabRelease]: 'var(--brand)',
  [Instructions.interact]:    'var(--brand)',
  [Instructions.wait]:        'var(--wait)',
};
```

---

## Entity 6: NivelBaseProps *(updated — one new field)*

The existing `NivelBase` props with one addition.

```typescript
// src/pages/Niveis/NivelBase/index.tsx
type NivelBaseProps = {
  getInitialState: () => GameSpaceState;    // UNCHANGED
  initialCharacterCoords: Coords;           // UNCHANGED
  instructionLimit: number;                 // NEW: sourced from each level file
};
```

**State transition**: `addInstruction` gains a guard:
```
if (instructionState.intructionQueue.length >= instructionLimit) return;
```

---

## Entity 7: ButtonVariant *(new union type)*

Controls the visual style of the `Button` component.

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
```

| Variant | Background | Border | Text color | Use cases |
|---------|-----------|--------|-----------|-----------|
| `primary` | `var(--brand)` | none | `#1a1207` | "Jogar" |
| `action` | `var(--action)` | none | `#0a1a12` | "Cozinhar!", "Continuar" |
| `secondary` | `var(--surface-2)` | `var(--border)` | `var(--text)` | "Tutorial", "Sobre", back buttons |
| `ghost` | transparent | `var(--border)` | `var(--text-muted)` | "Limpar" |
| `danger` | transparent | `var(--danger)` | `var(--danger)` | icon-only delete |

---

## State Transitions

The only state change introduced by this redesign is the `addInstruction` guard in `NivelBase`. All other game state transitions (GameStates enum, character state, item state) are unchanged.

```
addInstruction(instruction) called
  └─ if instructions.length >= instructionLimit → NOOP (no state change)
  └─ else → append IndexedInstruction to intructionQueue (existing behavior)
```

The `isFull` boolean (derived from `instructions.length >= limit`) drives `disabled` prop on `InstructionButtons`.
