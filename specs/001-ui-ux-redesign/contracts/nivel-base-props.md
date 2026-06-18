# Contract: NivelBase Component Props

**File**: `src/pages/Niveis/NivelBase/index.tsx`
**Type**: Level orchestrator component interface

---

## Updated Props Interface

```typescript
type NivelBaseProps = {
  getInitialState: () => GameSpaceState;   // UNCHANGED
  initialCharacterCoords: Coords;          // UNCHANGED
  instructionLimit: number;                // NEW
};
```

## New Prop: `instructionLimit`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `instructionLimit` | `number` | ✅ | Maximum number of instructions this level allows. Set by each level file (Nivel1, Nivel2, Nivel3). |

## Usage Within NivelBase

`instructionLimit` flows to two places:

1. **`addInstruction` guard** — prevents adding beyond limit:
   ```typescript
   const addInstruction = (instruction: Instructions) => {
     if (instructionState.intructionQueue.length >= instructionLimit) return;
     // ... existing append logic unchanged
   };
   ```

2. **`InstructionQueue` props** — the queue component receives the limit:
   ```typescript
   <InstructionQueue
     instructions={instructionState.intructionQueue}
     limit={instructionLimit}
     currentInstructionIndex={instructionState.currentIntructionIndex}
     onRemove={removeInstruction}
   />
   ```

3. **`InstructionButtons` disabled state** — buttons disabled when full:
   ```typescript
   <InstructionButtons
     addInstruction={addInstruction}
     disabled={instructionState.intructionQueue.length >= instructionLimit}
   />
   ```

## Call Sites (each level file)

```typescript
// Nivel1.tsx
<NivelBase
  getInitialState={...}
  initialCharacterCoords={{ y: 2, x: 1 }}
  instructionLimit={14}
/>

// Nivel2.tsx
<NivelBase
  getInitialState={...}
  initialCharacterCoords={{ y: 3, x: 2 }}
  instructionLimit={14}
/>

// Nivel3.tsx
<NivelBase
  getInitialState={...}
  initialCharacterCoords={{ y: 1, x: 3 }}
  instructionLimit={14}
/>
```

## Invariants

- The `instructionLimit` value MUST come from the level file — it MUST NOT be a default prop or constant inside NivelBase.
- The game execution loop (`useEffect` on `mustRunNextInstruction`) is UNCHANGED — this prop only affects the `addInstruction` guard and child component props.
- TypeScript will enforce that all three level files pass `instructionLimit` once the type is updated.
