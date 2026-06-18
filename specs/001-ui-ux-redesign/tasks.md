# Tasks: Well Cooked — UI/UX Redesign

**Input**: Design documents from `specs/001-ui-ux-redesign/`

**Prerequisites**: [plan.md](./plan.md) · [spec.md](./spec.md) · [research.md](./research.md) · [data-model.md](./data-model.md) · [contracts/](./contracts/)

**Tests**: Not required per spec — visual browser verification is the gate (see [quickstart.md](./quickstart.md)).

**Organization**: Tasks grouped by user story for independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other [P] tasks in the same phase
- **[Story]**: Maps to user story in spec.md (US1–US5)

---

## Phase 1: Setup (Design Token System)

**Purpose**: Create the single source of truth for all visual constants. **MUST complete before any component styling work begins.**

- [x] T001 Create `src/assets/styles/theme.css` — define all CSS custom properties in `:root`: `--bg`, `--surface`, `--surface-2`, `--border`, `--border-strong`, `--text`, `--text-muted`, `--text-faint`, `--brand`, `--brand-hover`, `--action`, `--move`, `--wait`, `--danger` with exact hex values from research.md Decision 1
- [x] T002 Update `src/assets/styles/index.css` — add `@import './theme.css';` as the first line so tokens are available globally

**Checkpoint**: All CSS custom properties are available app-wide. Run `yarn start` and confirm the app still loads without errors.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared component infrastructure that every user story depends on. **No user story work can begin until this phase is complete.**

- [x] T003 Update `src/components/Button/` — add `variant` prop (`'primary' | 'action' | 'secondary' | 'ghost' | 'danger'`) to the Button component and its styled-components; map each variant to the correct tokens per data-model.md Entity 7 (primary→`--brand`, action→`--action`, secondary→surface-2+border, ghost→transparent+border, danger→`--danger`); update `type="run"` button to use `action` variant
- [x] T004 Update `src/common/styles.ts` — replace hardcoded `#4D4D4D` in `HighlightTitle` with `var(--text-muted)`; replace any remaining hex color values with token references

**Checkpoint**: Button variants render correctly; `tsc --noEmit` passes.

---

## Phase 3: User Story 2 — Instruction Queue Horizontal Track (Priority: P1) 🎯 MVP

**Goal**: Replace the fixed 14-slot wrap layout with a horizontally-scrollable timeline that scales cleanly from 0 to 100+ steps.

**Independent Test**: Open Level 1. Add 10 mixed instructions — verify: horizontal track with numbered colored blocks, auto-scroll on add, hover X to remove (steps renumber), Limpar clears all, budget meter shows green/amber/red at correct thresholds. Command buttons disable at 14/14.

### Implementation for User Story 2

- [x] T005 [P] [US2] Create `src/components/IntructionQueue/BudgetMeter.tsx` — new component accepting `used: number` and `limit: number` props; renders `"{used} de {limit} instruções"` label and a color-coded bar: green (`var(--action)`) at ≤50%, amber (`var(--brand)`) at 51–80%, red (`var(--danger)`) at >80%; no external state
- [x] T006 [P] [US2] Rewrite `src/components/IntructionQueue/Instruction.tsx` — step block shows: step number (top, `var(--text-muted)`), instruction icon centered (colored by type using `INSTRUCTION_COLOR` constant per data-model.md Entity 5), 1px border matching type color; hover state reveals a red X remove button (`var(--danger)`); accepts `stepNumber: number`, `instruction: Instructions`, `isActive: boolean`, `onRemove: () => void`
- [x] T007 [P] [US2] Rewrite `src/components/IntructionQueue/styles.ts` — `TrackContainer`: `display: flex; flex-direction: row; overflow-x: auto; white-space: nowrap; height: 80px; align-items: center`; `Connector`: short right-arrow span in `var(--border)`; `NextSlotIndicator`: dashed amber border, `+` symbol, `var(--brand)` color; `FreeCountLabel`: `var(--text-faint)` text; `QueueHeader`: flex row with budget meter + Limpar button
- [x] T008 [US2] Refactor `src/components/IntructionQueue/index.tsx` — adopt new props interface from contracts/instruction-queue-props.md (`instructions`, `limit`, `currentInstructionIndex`, `onRemove`, `onClear`); render `QueueHeader` (BudgetMeter + Limpar button), then `TrackContainer` with: filled steps from `instructions` array (step number = array index + 1), `Connector` between each step, `NextSlotIndicator` when `!isFull`, `FreeCountLabel` with `+{free - 1} livres` when `free > 1`; attach `ref` to track for auto-scroll; show nav buttons (⏮ ⏭) when `limit > 50`; `useEffect` on `instructions.length` to `trackRef.current.scrollLeft = trackRef.current.scrollWidth`
- [x] T009 [P] [US2] Update `src/components/InstructionsButtons/index.tsx` — add `disabled: boolean` prop; when `disabled`, set `disabled` attribute on all six command buttons and apply visual disabled state
- [x] T010 [P] [US2] Update `src/components/InstructionsButtons/styles.ts` — replace hardcoded `#6495ED` with `var(--move)` for movement buttons; add `disabled` styling (`opacity: 0.4; cursor: not-allowed; pointer-events: none`)
- [x] T011 [US2] Update `src/pages/Niveis/NivelBase/index.tsx` — (a) add `instructionLimit: number` to `NivelBaseProps`; (b) add guard in `addInstruction`: `if (instructionState.intructionQueue.length >= instructionLimit) return;`; (c) add `clearQueue` function: resets `intructionQueue` to `[]`; (d) update `<InstructionQueue>` call to new props (`instructions`, `limit`, `currentInstructionIndex`, `onRemove`, `onClear`); (e) pass `disabled={instructionState.intructionQueue.length >= instructionLimit}` to `<InstructionButtons>`; (f) do NOT modify the `useEffect` game loop or any execution logic
- [x] T012 [P] [US2] Update `src/pages/Niveis/Nivel1.tsx` — pass `instructionLimit={14}` to `<NivelBase>`
- [x] T013 [P] [US2] Update `src/pages/Niveis/Nivel2.tsx` — pass `instructionLimit={14}` to `<NivelBase>`
- [x] T014 [P] [US2] Update `src/pages/Niveis/Nivel3.tsx` — pass `instructionLimit={14}` to `<NivelBase>`

**Checkpoint**: Open Level 1. Add 14 instructions (command buttons disable). Add mixed types (movement=blue, wait=purple). Remove step 5 (steps 6–14 renumber to 5–13). Click Limpar (queue empties). Budget meter changes green→amber→red as fill increases. `tsc --noEmit` passes.

---

## Phase 4: User Story 1 — Dark Palette on All Screens (Priority: P1)

**Goal**: Every screen uses the dark "kitchen tech" palette; zero coral/salmon hex values remain.

**Independent Test**: Load each screen (menu, level select, Level 1 gameplay, victory modal). Open DevTools Elements panel and search for `#E9967A`, `salmon`, `coral` — zero matches. All surfaces are dark; text is light; only confirmation actions are green.

### Implementation for User Story 1

- [x] T015 [P] [US1] Update `src/pages/Niveis/styles.ts` — replace all `#E9967A` and `salmon` values: `NivelContainer` bg → `var(--bg)`, `IndicativosContainer` bg → `var(--surface)`, `OperacoesContainer` bg → `var(--surface-2)`; set `color: var(--text)` on containers; update `NivelContainer` width/max-height to be responsive (remove hardcoded 1024×768 if it breaks 1280×720 fit)
- [x] T016 [P] [US1] Update `src/components/Modal/styles.ts` — `Container` bg → `var(--surface)`, border → `1px solid var(--border)`, text → `var(--text)`; remove hardcoded `#55ed6c` and `#ed6755`; `Button` → delegate to Button component variant system (T003)
- [x] T017 [US1] Update `src/components/Modal/index.tsx` — wire `Button` `variant` prop per game state: `completed` → `action` variant ("Continuar"), failure states (`droidHitItsHead`, `caughtPanInUse`, `rowFoodOnDish`, `fail`, `timeOver`) → `danger` variant; verify all modal icon colors reference tokens not hardcoded values
- [x] T018 [P] [US1] Update `src/components/GameSpace/styles.ts` — replace `#f5cba7`/`#fae5d3` checkerboard colors with token-compatible dark alternatives: primary cell → `var(--surface-2)`, secondary cell → `var(--surface)` (subtle contrast preserved); verify `JogoContainer` grid layout accommodates the new 128×128 block size from Phase 6
- [x] T019 [P] [US1] Update `src/assets/styles/App.css` — set `body { background-color: var(--bg); color: var(--text); }`; remove any salmon/coral background rules; remove unused `.App-logo` spin animation if not used

**Checkpoint**: No `#E9967A`, `salmon`, or `coral` found anywhere in source. Victory modal shows with dark background. `tsc --noEmit` passes.

---

## Phase 5: User Story 3 — Grab/Release Button Clarity (Priority: P2)

**Goal**: The grab/release command button uses a hand/grab icon with amber color; clicking it always adds one instruction (never toggles); queue blocks for grab/release are visually amber, distinct from blue movement and purple wait blocks.

**Independent Test**: Open Level 1. Find the amber hand-icon button in the command panel. Click it 3 times — confirm 3 separate amber blocks appear in the queue (numbered 1, 2, 3). Inspect `aria-label` attribute — confirm it describes the action. No text label "Pegar" or "Soltar" appears.

### Implementation for User Story 3

- [x] T020 [US3] Update `src/components/InstructionsButtons/` — locate the grab/release `InstructionButton` entry in `index.tsx`; replace its icon with a hand/grab SVG (add SVG asset to `src/assets/svg/` if not present, or use an appropriate existing icon); update its button styling to use `var(--brand)` background (amber) distinct from movement buttons `var(--move)`; add `aria-label="Pegar ou soltar"` to the grab/release button element; verify wait button gets `var(--wait)` purple background distinct from both
- [x] T021 [P] [US3] Verify `src/components/IntructionQueue/Instruction.tsx` `INSTRUCTION_COLOR` constant (created in T006) — confirm `Instructions.grabRelease` maps to `var(--brand)` and `Instructions.interact` also maps to `var(--brand)`; no changes needed if T006 was done correctly; if T006 used a wrong color, fix it here

**Checkpoint**: Three amber blocks appear after three grab/release clicks. Movement blocks are blue. Wait blocks are purple. Button has no label — only the amber icon. aria-label present. `tsc --noEmit` passes.

---

## Phase 6: User Story 4 — Grid Proportion Fix (Priority: P2)

**Goal**: Chef Droid sprite occupies ~65% of a single grid cell; square cells eliminate the two-steps-per-column illusion.

**Independent Test**: Open Level 1. In DevTools, inspect the Droid container and its parent cell: Droid width / cell width ≈ 0.60–0.70. Move the Droid one step right — it lands squarely in the next cell. Grid is 512×512px total (4 cells × 128px).

### Implementation for User Story 4

- [x] T022 [US4] Update `src/constants/block.ts` — change `BLOCK_WIDTH` from `216` to `128` and `BLOCK_HEIGHT` from `128` to `128` (width was already 128 for height, now both are 128 for square cells); this constant is used by `MainCharacter` for positioning — verify import sites compile after change
- [x] T023 [US4] Update `src/components/MainCharacter/styles.ts` — read the file first to find the `CheffDroidContainer` / `Container` dimensions; resize the Droid container to approximately 83px × 83px (65% of 128px); ensure `Container` (the positioning wrapper) is sized exactly `BLOCK_WIDTH × BLOCK_HEIGHT` (128×128px) so the CSS animation `top`/`left` offsets remain correct; center `CheffDroidContainer` inside `Container` using `display: flex; align-items: center; justify-content: center`
- [x] T024 [US4] Update `src/components/GameSpace/styles.ts` — verify `JogoContainer` uses grid or flex that accommodates 4×4 cells each 128×128px (total 512×512px); remove any hardcoded 216px references; confirm children (Droid + Block components) position correctly within the updated grid

**Checkpoint**: Grid is 512×512px. Droid occupies ~65% of a cell. One-step movement = visually one cell. `tsc --noEmit` passes.

---

## Phase 7: User Story 5 — Main Menu Hierarchy (Priority: P3)

**Goal**: Main menu uses dark palette; "Jogar" is visually primary (amber fill); "Tutorial" and "Sobre" are secondary (ghost style); level cards show locked/unlocked states in the new palette.

**Independent Test**: Load http://localhost:3000/. "Jogar" has amber background and dark text. "Tutorial" and "Sobre" have ghost/outline style. Navigate to level select — cards use dark palette; the visual distinction between available and locked levels is clear.

### Implementation for User Story 5

- [x] T025 [P] [US5] Update `src/pages/Home/styles.ts` — `MenuContainer` background → `var(--bg)`; `MenuTitle` color → `var(--text)`; remove hardcoded `#E9967A`; set min-height/width responsive (remove hardcoded 400×300px or convert to viewport-relative values)
- [x] T026 [US5] Update `src/pages/Home/index.tsx` — wire "Jogar" `<Anchor>` or `<Button>` to use `primary` variant (amber fill, dark text per T003); wire "Tutorial" and "Sobre o jogo" to use `secondary` or `ghost` variant (surface-2 background, border, light text)
- [x] T027 [P] [US5] Update `src/pages/Niveis/index.tsx` and associated card component — level cards background → `var(--surface)`; border → `var(--border)`; text → `var(--text)`; locked level state: `opacity: 0.4` + `cursor: not-allowed` or a muted `var(--text-faint)` overlay to visually communicate unavailability

**Checkpoint**: Main menu has no salmon. "Jogar" is amber-filled. "Tutorial"/"Sobre" are ghost buttons. Level cards are dark. `tsc --noEmit` passes.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsive layout, and final validation across all user stories.

- [x] T028 [P] Add `aria-label` to all remaining icon-only buttons — `BackIconComponent` (`src/components/BackIcon/`): `aria-label="Voltar"`; queue remove X button (in T006's `Instruction.tsx`): `aria-label="Remover instrução {stepNumber}"`; queue nav buttons ⏮/⏭ (in T008): `aria-label="Ir ao início da fila"` / `aria-label="Ir ao fim da fila"`; verify each with browser DevTools accessibility inspector
- [x] T029 [P] Add visible focus ring to all interactive elements — in `src/assets/styles/theme.css` (or a dedicated `focus.css` imported from `index.css`): `*:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }` removing any `outline: none` overrides; verify keyboard Tab navigation shows ring on every button, link, and interactive queue step
- [ ] T030 Validate 1280×720 layout fit — open Level 1 in browser; set DevTools viewport to 1280×720 at 100% zoom; confirm no element overflows and no page-level scrollbar appears; if the grid (512px) + recipe panel + padding exceeds available width, reduce padding or panel sizes in `src/pages/Niveis/styles.ts` until it fits
- [ ] T031 Run all 11 quickstart.md validation scenarios — execute each scenario in [quickstart.md](./quickstart.md) and confirm expected outcomes; note any failures and fix them before marking complete
- [x] T032 TypeScript final check — run `yarn tsc --noEmit` from project root; fix all type errors before marking this task complete

**Checkpoint**: All 11 quickstart scenarios pass. Zero TypeScript errors. All interactive elements have visible focus rings and aria-labels where needed.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Tokens)
  └── Phase 2 (Button system)        ← blocks all screens
        ├── Phase 3 (Queue refactor) [P1, biggest work]
        ├── Phase 4 (Dark palette)   [P1, can run ∥ Phase 3]
        ├── Phase 5 (Grab/release)   [P2, depends on Phase 3 for T021]
        ├── Phase 6 (Grid size)      [P2, independent]
        └── Phase 7 (Menu)           [P3, can run ∥ Phase 3]
              └── Phase 8 (Polish)   ← depends on all above
```

### User Story Dependencies

| Story | Depends on | Can start after |
|-------|-----------|----------------|
| US2 (Queue) | Phase 2 complete | T003, T004 done |
| US1 (Palette) | Phase 2 complete | T003, T004 done — can run ∥ US2 |
| US3 (Grab/Release) | T006 done (queue step colors) | After US2 Phase 3 |
| US4 (Grid proportion) | Phase 2 complete | T003 done — independent of US2/US1 |
| US5 (Menu) | Phase 2 complete | T003 done — can run ∥ US2/US1 |

### Parallel Opportunities Within Phase 3 (US2)

```bash
# Run in parallel:
Task T005: Create BudgetMeter.tsx
Task T006: Rewrite Instruction.tsx
Task T007: Rewrite IntructionQueue/styles.ts
Task T009: Update InstructionsButtons/index.tsx (disabled prop)
Task T010: Update InstructionsButtons/styles.ts (tokens)

# Then sequentially:
Task T008: Refactor IntructionQueue/index.tsx  (needs T005, T006, T007)
Task T011: Update NivelBase/index.tsx           (needs T008, T009, T010)
Tasks T012, T013, T014: Update Nivel1/2/3.tsx  (all need T011, can run ∥ each other)
```

### Parallel Opportunities Within Phase 4 (US1)

```bash
# Run in parallel:
Task T015: Update Niveis/styles.ts
Task T016: Update Modal/styles.ts
Task T018: Update GameSpace/styles.ts
Task T019: Update App.css

# Then:
Task T017: Update Modal/index.tsx  (needs T016 and T003)
```

---

## Implementation Strategy

### MVP First (US2 + US1 only — Phases 1–4)

1. Complete Phase 1: Design tokens (T001–T002) — ~30 min
2. Complete Phase 2: Button system (T003–T004) — ~45 min
3. Complete Phase 3: Instruction queue refactor (T005–T014) — main effort ~4–6 hrs
4. Complete Phase 4: Dark palette on all screens (T015–T019) — ~2 hrs
5. **STOP and VALIDATE**: Run quickstart.md Scenarios 1–5, 8, 9, 11
6. Game is fully playable with the new design at this point

### Incremental Delivery

1. Phases 1–2 → foundation (tokens + buttons)
2. Phase 3 → playable with new queue (US2 satisfied)
3. Phase 4 → full dark palette (US1 satisfied) — demo-ready
4. Phase 5 → grab/release clarity (US3 satisfied)
5. Phase 6 → grid proportion fix (US4 satisfied)
6. Phase 7 → menu hierarchy (US5 satisfied)
7. Phase 8 → accessibility + final validation

---

## Notes

- No tests are generated — visual browser verification per quickstart.md is the gate
- `tsc --noEmit` is the only automated check required after each phase checkpoint
- `[P]` tasks within a phase touch different files — safe to implement in parallel
- Game execution logic in `NivelBase/index.tsx` `useEffect` is **never modified** (Constitution Principle I)
- All hex color values in source files become TypeScript compile errors after Phase 1 is done if they weren't migrated — use `tsc --noEmit` to catch stragglers
- If `MainCharacter/styles.ts` uses hardcoded pixel values for the Droid sprite size, read the file first before T023 to determine the exact values to change
