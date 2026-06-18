# Quickstart Validation Guide: Well Cooked UI/UX Redesign

**Phase 1 output** | **Date**: 2026-06-18

---

## Prerequisites

- Node.js ≥ 18 and Yarn installed
- Clone at `well-coocked-app/`
- Run `yarn install` once

## Launch

```bash
yarn start
# Opens http://localhost:3000
```

---

## Scenario 1 — Design Tokens: No Salmon Remains

**Goal**: Verify SC-001 — all screens use the new dark palette; no coral/salmon remains.

**Steps**:
1. Open the app in a browser with DevTools.
2. On every screen (menu, level select, gameplay), open the Elements panel.
3. Search for `#E9967A`, `salmon`, `coral` in computed styles.

**Expected outcome**: Zero matches. All backgrounds trace to `var(--bg)`, `var(--surface)`, or `var(--surface-2)`. Text is `var(--text)` or `var(--text-muted)`.

---

## Scenario 2 — Instruction Queue: Horizontal Track Renders Correctly

**Goal**: Verify SC-002 — queue renders correctly at 1, 14, and 50+ instructions.

**Steps**:

*Case A — Empty queue:*
1. Open Level 1.
2. Before adding any instruction, observe the queue footer.
3. **Expected**: One `[+]` indicator visible; `+14 livres` label shown; budget meter is empty and green.

*Case B — 5 instructions:*
1. Click any command button 5 times (mixed types).
2. **Expected**: 5 step blocks with numbers 1–5, colored by type; one `[+]` indicator; `+9 livres` label; arrows between steps; budget meter is green (≤50%).

*Case C — 14 instructions (full):*
1. Add 9 more instructions.
2. **Expected**: 14 step blocks; no `[+]` indicator; no free-count label; budget meter is red (>80%); all command buttons are disabled.

*Case D — Auto-scroll:*
1. Add instructions until step 8+ is off-screen.
2. Add one more instruction.
3. **Expected**: Track scrolls right so the new step is visible without manual scroll.

---

## Scenario 3 — Remove a Step and Renumber

**Goal**: Verify SC-008 — removing from the middle renumbers correctly.

**Steps**:
1. Add 10 instructions.
2. Hover over step 5 to reveal the X control.
3. Click X to remove step 5.
4. **Expected**: 9 steps remain, numbered 1–9 (no gap at 5). Steps that were 6–10 are now 5–9.

---

## Scenario 4 — Budget Meter Color Thresholds

**Goal**: Verify SC-007 — correct colors at 50%, 80%, and 100%.

**Steps**:
1. At 0 instructions: budget meter should be green.
2. Add 7 instructions (7/14 = 50%): budget meter should be green.
3. Add 1 more (8/14 = 57%): budget meter should turn amber.
4. Add 4 more (12/14 = 86%): budget meter should turn red.
5. Add 2 more (14/14 = 100%): budget meter should stay red; command buttons should be disabled.

---

## Scenario 5 — "Limpar" Clears the Queue

**Goal**: Verify queue reset works.

**Steps**:
1. Add 5 instructions.
2. Click the "Limpar" button.
3. **Expected**: Queue returns to empty state (Scenario 2 Case A). Budget meter goes back to green.

---

## Scenario 6 — Grab/Release Button

**Goal**: Verify SC-003 — amber icon, no toggle behavior.

**Steps**:
1. Open Level 1.
2. Locate the grab/release command button (hand icon, amber).
3. Click it 3 times.
4. **Expected**: 3 separate amber step blocks appear in the queue, numbered 1, 2, 3. No toggle state change on the button itself.
5. In DevTools, inspect the button's `aria-label`.
6. **Expected**: `aria-label="Pegar ou soltar"` (or equivalent Portuguese description).

---

## Scenario 7 — Grid Proportion (Chef Droid vs Cell)

**Goal**: Verify SC-004 — Chef Droid occupies ~65% of a cell.

**Steps**:
1. Open any level.
2. Use DevTools to inspect the Droid container element and its parent cell block.
3. Measure: Droid container width / cell width.
4. **Expected**: Ratio is 0.60–0.70 (60–70%). Droid is centered horizontally and vertically in the cell.
5. Run the first instruction (move right).
6. **Expected**: Droid moves cleanly to the adjacent cell — visually one step, one cell, no ambiguity.

---

## Scenario 8 — Gameplay Screen Fits 1280×720

**Goal**: Verify SC-005 — no overflow at minimum viewport.

**Steps**:
1. Open DevTools → Device Toolbar.
2. Set viewport to 1280×720 at 100% zoom.
3. Navigate to Level 1.
4. **Expected**: All UI elements (grid, recipe panel, instruction queue footer, command buttons) are fully visible. No horizontal or vertical page-level scrollbar. No element is clipped.

---

## Scenario 9 — Button Hierarchy on Main Menu

**Goal**: Verify "Jogar" is primary (amber fill) and "Tutorial"/"Sobre" are secondary (ghost).

**Steps**:
1. Navigate to the main menu (http://localhost:3000/).
2. Inspect the three menu buttons.
3. **Expected**:
   - "Jogar" — amber/brand background, dark text.
   - "Tutorial" and "Sobre" — surface-2 background, border, light text.

---

## Scenario 10 — Keyboard Navigation and Focus

**Goal**: Verify FR-026/FR-027 — aria-labels on icon buttons; visible focus ring.

**Steps**:
1. On the gameplay screen, press Tab repeatedly to cycle through interactive elements.
2. **Expected**: Every focusable element shows a visible focus ring (not the default browser outline, but a styled ring using `--brand` or `--border-strong`).
3. Inspect icon-only buttons (back arrow, queue remove X) in DevTools.
4. **Expected**: Each has an `aria-label` attribute.

---

## Scenario 11 — Full Golden Path (End-to-End)

**Goal**: Verify the complete player journey works with the new design.

**Steps**:
1. Load the app → main menu appears in dark palette.
2. Click "Jogar" → level select opens with level cards.
3. Click Level 1 → gameplay screen opens.
4. Add 3 movement instructions and 1 grab/release instruction.
5. Click "Cozinhar!" (green button).
6. Watch Chef Droid execute.
7. If objectives met: victory modal appears with "Receita pronta!", time left, instructions used, and "Continuar" button.
8. **Expected at each step**: correct colors, correct button states, queue scrolls, no layout overflow.

---

## Verification Gate

A feature is ready to merge when all 11 scenarios pass with no regressions observed on the golden path.
