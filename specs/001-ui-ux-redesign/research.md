# Research: Well Cooked UI/UX Redesign

**Phase 0 output** | **Date**: 2026-06-18

---

## Decision 1: CSS Token Delivery Mechanism

**Question**: Use a styled-components `ThemeProvider` object or CSS custom properties in a global stylesheet?

**Decision**: CSS custom properties in `src/assets/styles/theme.css`, imported at the app root (`index.css`).

**Rationale**: The project already uses both styled-components (for component-scoped styles) and global CSS files (`index.css`, `App.css`). CSS custom properties (`var(--brand)`) work everywhere — in styled-components template literals, in CSS files, and in inline styles — without needing a `ThemeProvider` context wrapper. A `ThemeProvider` would require every component to import a theme type and call `useTheme()` or accept `theme` as a styled-components prop, adding friction without benefit for a single-palette app. CSS custom properties also survive future migrations away from styled-components.

**Alternatives considered**:
- `ThemeProvider` + typed theme object: More ergonomic when you have multiple themes (dark/light). Rejected — no multi-theme requirement in spec.
- Scattered token constants in a JS file: Doesn't help with CSS-only styled-components; rejected.

---

## Decision 2: Instruction Limit Source

**Question**: Where does the `instructionLimit` value come from, and how is it threaded to InstructionQueue?

**Decision**: Add `instructionLimit: number` prop to `NivelBase`. Each level file (Nivel1.tsx, Nivel2.tsx, Nivel3.tsx) passes the value explicitly. NivelBase passes it down to both `InstructionQueue` and guards `addInstruction`.

**Rationale**: Inspection of NivelBase/index.tsx confirms the instruction limit is currently hardcoded as the literal `14` inside `InstructionQueue` (`getInstructionsRow(14)`). It is NOT sourced from level config. The spec (FR-013) requires the limit to come from level configuration and never be hardcoded in the queue component. The cleanest path: add one typed prop to `NivelBase` (the level orchestrator) and have each level file supply it, which is already the pattern for `getInitialState` and `initialCharacterCoords`. No new state management or data files are needed.

**Guard in NivelBase.addInstruction**:
```typescript
const addInstruction = (instruction: Instructions) => {
  if (instructionState.intructionQueue.length >= instructionLimit) return;
  // ... existing logic
};
```

**Alternatives considered**:
- Level-config object (`getInitialState` returns a richer object with limit): Bigger refactor touching the game-state type system; rejected as out of scope.
- Constant in `src/constants/`: Still hardcoded centrally, not per-level; rejected.

---

## Decision 3: InstructionQueue Props Refactor

**Question**: What is the new props interface for the refactored InstructionQueue?

**Decision**: Replace `state: IntructionQueueState` with three explicit props:

```typescript
type InstructionQueueProps = {
  instructions: IndexedInstruction[];   // the filled steps
  limit: number;                        // from level config via NivelBase
  currentInstructionIndex: number;      // for highlighting executing step
  onRemove: (index: number) => void;    // remove by IndexedInstruction.index
};
```

**Rationale**: The old `state: IntructionQueueState` bundled the queue array and execution cursor into one opaque object. The new component needs `limit` to compute the budget meter and render the free-count summary. Separating concerns makes the component testable and reusable. The `currentInstructionIndex` is kept for highlighting the active step during execution.

**Removal semantics**: `onRemove(index)` passes the `IndexedInstruction.index` identifier (not array position) — same as today. Display step numbers use array position + 1 (e.g., the item at `instructions[0]` is "Step 1"). This means no renumbering logic is needed: the `index` field is just an opaque ID for removal; the visual label is always `arrayPosition + 1`.

**Alternatives considered**:
- Keeping `state: IntructionQueueState` and adding `limit` alongside: Would still couple the queue to NivelBase's internal state shape; rejected.

---

## Decision 4: Grid Cell and Character Sizing

**Question**: What are the correct cell dimensions to make the Chef Droid sprite occupy ~65% of a cell?

**Current state**:
- `BLOCK_WIDTH = 216px`, `BLOCK_HEIGHT = 128px` (in `src/constants/block.ts`)
- The 4×4 grid total: 864px wide × 512px tall — this alone exceeds a 1280×720 viewport when combined with the 154px recipe panel and other UI chrome.
- The Droid sprite dimensions are not in constants; they live in `src/components/MainCharacter/styles.ts`.

**Decision**: Reduce cell size to `BLOCK_WIDTH = 128px`, `BLOCK_HEIGHT = 128px` (square cells). Grid becomes 512×512px, which comfortably fits within the 1280×720 budget alongside the recipe panel (~256px) and instruction queue footer (~160px).

**Character sizing target**: Droid container should be ~80–85px (≈65% of 128px), centered within the cell using absolute positioning. Exact pixel values confirmed during implementation by inspecting the actual sprite dimensions in `MainCharacter/styles.ts`.

**Why square cells**: The current asymmetric cells (216×128) reinforce the two-steps-per-horizontal-move illusion identified in the evaluation report. Square cells make the 1:1 step-to-cell relationship visually obvious.

**Alternatives considered**:
- Keep 216×128 asymmetric cells and only resize character: Would still mislead players about horizontal movement cost; rejected.
- 96×96px cells: Grid = 384×384px; character would be ~62px — too small for a game aimed at children. Rejected.

---

## Decision 5: Instruction Queue Layout — Horizontal Scrollable Track

**Question**: How should the horizontal track behave with the "next slot" indicator and free-count summary?

**Decision**:
- Render only filled `IndexedInstruction` steps plus one "next" slot indicator.
- Free-count summary appears as text after the next indicator: `+{limit - instructions.length - 1} livres` (hidden when queue is full or 1 step away from full).
- Between steps, render short connector elements (`→`) to reinforce sequence.
- The track wrapper uses `overflow-x: auto; white-space: nowrap` with a fixed height (~80px visible area).
- On each instruction add, `scrollLeft` of the track ref is set to `scrollWidth` (auto-scroll to end).
- The "Limpar" button lives in the queue header row alongside the budget meter.
- Navigation buttons (⏮ ⏭) appear only when `limit > 50`.

**Alternatives considered**:
- Render all empty slots (current behavior): Creates visual noise and the "wall of empty boxes" problem; rejected.
- Virtualized list (react-window): Overkill for ≤100 steps; rejected.

---

## Decision 6: Grab/Release Button Presentation

**Question**: What icon communicates the grab/release action without the "toggle" confusion?

**Decision**: Use a hand/grab SVG icon (Unicode "🤚" or an existing SVG from the project's assets). Color: `--brand` (amber). No text label. The button's `aria-label` reads `"Pegar ou soltar"`. In the queue, grab/release step blocks are amber (`--brand`), distinct from blue (`--move`) movement blocks and purple (`--wait`) wait blocks.

**Rationale**: The evaluation report identified this as the worst-rated element. The confusion was between "is this button toggling state?" vs. "is this adding an instruction?" Amber color + hand icon signals it as a distinct command without implying a toggle. The aria-label covers screen-reader users.

**Alternatives considered**:
- Label "Ação": Too generic; rejected.
- Two separate "Pegar" and "Soltar" buttons: Violates the spec's instruction model (it is one instruction); rejected.

---

## Decision 7: Button Hierarchy

**Question**: How to implement the primary/secondary button distinction across all screens?

**Decision**:
- **Primary** (e.g., "Jogar", "Cozinhar!"): `background: var(--brand)` or `var(--action)`, text `#1a1207` (dark), border-radius 8px.
- **Secondary / ghost** (e.g., "Tutorial", "Sobre", "Limpar"): `background: var(--surface-2)`, border `1px solid var(--border)`, text `var(--text)`.
- **Danger** (clear/remove): `color: var(--danger)`, ghost style.
- The existing `Button` component in `src/components/Button/` should gain a `variant` prop (`'primary' | 'secondary' | 'ghost' | 'danger'`) to avoid separate styled-components for each variant.

**Alternatives considered**:
- Separate styled-component per variant: No shared logic, harder to maintain; rejected.
- Keep current Button, add new ones: Duplication; rejected per Constitution Principle III.

---

## Resolved Unknowns Summary

| Unknown | Resolution |
|---------|-----------|
| Token delivery mechanism | CSS custom properties in `theme.css` |
| Instruction limit source | `instructionLimit` prop on NivelBase; each level passes value |
| InstructionQueue new interface | `instructions`, `limit`, `currentInstructionIndex`, `onRemove` |
| Cell dimensions | 128×128px square cells (was 216×128) |
| Character sizing | ~80–85px container, confirmed in implementation |
| Grab/release icon | Hand SVG, amber (`--brand`), aria-label "Pegar ou soltar" |
| Button hierarchy | `variant` prop: primary/secondary/ghost/danger |
