# Feature Specification: Well Cooked — UI/UX Redesign

**Feature Branch**: `001-ui-ux-redesign`

**Created**: 2026-06-18

**Status**: Draft

**Input**: User description: Full UI/UX redesign of the Well Cooked educational game — new dark "kitchen tech" visual identity, two usability fixes identified in evaluation report, and instruction queue component refactor.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Play the game with the redesigned interface (Priority: P1)

A student opens Well Cooked, navigates from the main menu to a level, builds an instruction queue, runs the Chef Droid, and sees the victory modal — all within the new dark "kitchen tech" visual design.

**Why this priority**: This is the full golden path through the application. If it works end-to-end, the redesign is shippable.

**Independent Test**: Launch the app, navigate to Level 1, add 3–4 instructions, click "Cozinhar!", observe the animation, and confirm the victory modal appears with the correct stats.

**Acceptance Scenarios**:

1. **Given** the app loads, **When** the user views any screen, **Then** all colors, borders, and text use only the defined design token values — no coral/salmon tones remain.
2. **Given** the user is on the gameplay screen, **When** they add instructions to the queue, **Then** each instruction block displays its type-specific color (blue for movement, amber for grab/release, purple for wait) and a step number.
3. **Given** the user reaches the instruction limit for the level, **When** the queue is full, **Then** the command buttons are disabled and the budget meter turns red.
4. **Given** the user completes a level, **When** the victory modal appears, **Then** it shows the success icon, "Receita pronta!", time remaining, and instructions used — all in the new palette.

---

### User Story 2 — Build and edit the instruction queue using the new horizontal track (Priority: P1)

A student adds, views, and removes instructions from the queue using the new horizontally-scrollable timeline component.

**Why this priority**: The instruction queue is the core interaction mechanic of the game and was the most problematic component identified in the evaluation report.

**Independent Test**: Navigate to gameplay, add 10+ instructions of mixed types, scroll the queue, remove the 5th instruction (confirm steps 6+ shift down by one), and click "Limpar" to reset the queue.

**Acceptance Scenarios**:

1. **Given** the gameplay screen is open, **When** the user clicks any command button, **Then** a new step block appears at the end of the horizontal queue track and the track auto-scrolls to reveal it.
2. **Given** the queue has filled steps, **When** the user hovers over a step block, **Then** a remove control (X) becomes visible; clicking it removes that step and all subsequent steps shift their numbers down by one.
3. **Given** the queue has any steps, **When** the user clicks "Limpar", **Then** all steps are removed and the queue shows the empty state (next-slot indicator).
4. **Given** the queue has 2 filled steps and 12 remaining (for a 14-step level), **When** the user views the queue, **Then** they see 2 step blocks, the "next" slot indicator, and a "+12 livres" summary — no empty slot blocks are rendered.
5. **Given** the queue uses 7 of 14 slots (50%), **When** the user views the budget meter, **Then** the meter shows green ("fila enxuta").
6. **Given** the queue uses 12 of 14 slots (≈86%), **When** the user views the budget meter, **Then** the meter shows red ("perto do limite").

---

### User Story 3 — Understand the "Pegar/Soltar" instruction (Priority: P2)

A student clearly recognizes the "Pegar/Soltar" command as a grab/release action and understands that clicking it adds one instruction to the queue — not toggle state.

**Why this priority**: This was the single worst-rated element in the evaluation report due to user confusion.

**Independent Test**: Open gameplay, observe the command button area, click the grab/release command twice, and confirm two amber-colored blocks appear in the queue (not a toggle).

**Acceptance Scenarios**:

1. **Given** the command button panel is visible, **When** the user looks at the grab/release button, **Then** it shows a hand/grab icon with amber (`--brand`) coloring — no label saying "Pegar" or "Soltar".
2. **Given** the user clicks the grab/release button three times, **When** viewing the queue, **Then** three separate amber step blocks appear (step 1, 2, 3) — it is never treated as a toggle.
3. **Given** an amber grab/release block is in the queue, **When** the user views it alongside movement (blue) and wait (purple) blocks, **Then** the three types are visually distinct by color.

---

### User Story 4 — Navigate a level grid with proportionally correct character display (Priority: P2)

A student reads the game grid without being confused by the apparent size mismatch between cells and the Chef Droid sprite.

**Why this priority**: The disproportionate cell size created a false impression that horizontal movement required two steps, which confused players in the evaluation.

**Independent Test**: Open any level, observe the Chef Droid on the grid; the sprite should visibly occupy approximately 60–70% of a single cell, centered, with clear cell boundaries visible around it.

**Acceptance Scenarios**:

1. **Given** a level is open, **When** the user views the game grid, **Then** the Chef Droid sprite occupies approximately 60–70% of its current cell's width and height, centered within the cell.
2. **Given** the Chef Droid moves one step right, **When** the animation completes, **Then** the sprite is centered in the adjacent cell — visually confirming a 1:1 step-to-cell relationship.

---

### User Story 5 — Access the game from the main menu (Priority: P3)

A student opens the app, reads the main menu, and navigates to the level select screen using the redesigned menu layout.

**Why this priority**: The menu is the entry point, but its logic is unchanged — the redesign here is purely visual.

**Independent Test**: Load the app, verify the menu shows the title, a primary "Jogar" button, and secondary "Tutorial" and "Sobre" buttons; click "Jogar" to confirm navigation to level select.

**Acceptance Scenarios**:

1. **Given** the main menu loads, **When** the user views the screen, **Then** "Jogar" is visually distinct as the primary action (amber fill, dark text) and "Tutorial"/"Sobre" appear as secondary ghost buttons.
2. **Given** the level select screen is open, **When** the user views locked levels, **Then** locked level cards show a visually muted/disabled state distinct from available levels.

---

### Edge Cases

- What happens when the instruction queue reaches exactly the level limit? → Command buttons disable immediately when `used === limit`; the budget meter turns red and shows at-limit state.
- What happens if a user removes a step from the middle of a queue near the limit? → One slot frees; the command buttons re-enable; steps after the removed one shift indices by -1.
- What happens on screens narrower than 1280px wide? → Layout adjusts (responsive) so no element overflows and zoom is not required.
- What happens when the queue has 0 instructions? → The track shows only the "next" slot indicator with "+" and the full remaining count; the budget meter is empty/green.
- What if a level has more than 50 instructions in the limit? → Navigation buttons ("ir ao início / ir ao fim") appear on the queue track to aid scrolling.

## Requirements *(mandatory)*

### Functional Requirements

**Design Token System**

- **FR-001**: All color values used across the app MUST be defined as named design tokens in a single centralized location; no raw hex values may appear in component stylesheets.
- **FR-002**: The following semantic token roles MUST be defined: background, surface, surface-2, border, border-strong, text, text-muted, text-faint, brand, brand-hover, action, move, wait, danger.
- **FR-003**: The green (`action`) token MUST be reserved exclusively for confirmation actions ("Cozinhar!", "Continuar"); it MUST NOT appear on neutral or decorative elements.

**Visual Identity**

- **FR-004**: All screens MUST use the dark "kitchen tech" palette; no coral/salmon tones may remain in the application.
- **FR-005**: Button hierarchy MUST be enforced: primary actions use a filled amber (`brand`) background with dark text; secondary actions use ghost style (surface-2 background, border, light text).
- **FR-006**: All surfaces MUST be flat — no gradients or decorative shadows; borders are 1px; corner radius is 8–16px.

**Instruction Queue Component**

- **FR-007**: The instruction queue MUST render as a single horizontal scrollable track with constant height, regardless of the number of instructions.
- **FR-008**: Each filled step MUST display its sequential number and an icon colored by instruction type: movement = blue (`move`), grab/release = amber (`brand`), wait = purple (`wait`).
- **FR-009**: The queue MUST NOT render empty slot blocks; only filled steps, the next-slot indicator, and a free-count summary may appear.
- **FR-010**: When a new instruction is added, the queue track MUST automatically scroll to make the new step visible.
- **FR-011**: Hovering over a filled step MUST reveal a remove control; activating it MUST remove that step and decrement the step numbers of all subsequent steps.
- **FR-012**: A "Limpar" button MUST be present and MUST clear the entire queue in one action.
- **FR-013**: The instruction limit MUST be read from the level configuration — never hardcoded in the queue component.
- **FR-014**: When `instructions.length === limit`, all command buttons that add instructions MUST be disabled.
- **FR-015**: Short connectors MUST be displayed between consecutive step blocks to reinforce the sequential timeline metaphor.
- **FR-016**: If the level instruction limit exceeds 50, navigation shortcuts to jump to the start and end of the queue track MUST appear.

**Budget Meter**

- **FR-017**: A budget meter MUST show the count of used instructions out of the level limit (e.g., "7 de 14 instruções").
- **FR-018**: The meter MUST use an inverted color scale: green when ≤50% of the limit is used, amber when 51–80% is used, red when >80% or at the limit.

**"Pegar/Soltar" Button**

- **FR-019**: The grab/release command button MUST use an amber (`brand`) color and a hand/grab icon; it MUST NOT be labeled "Pegar" or "Soltar".
- **FR-020**: Clicking the grab/release button MUST add one instruction block to the queue — identical behavior to movement buttons; it MUST NOT function as a toggle.

**Grid Character Proportion**

- **FR-021**: The Chef Droid sprite MUST be sized so it occupies approximately 60–70% of a single grid cell's dimensions, centered within the cell.

**Screens**

- **FR-022**: The main menu MUST display the title, a primary "Jogar" button, and secondary "Tutorial" and "Sobre" buttons with the defined button hierarchy.
- **FR-023**: The level select screen MUST show level cards using the new palette; locked levels MUST appear in a visually muted/disabled state.
- **FR-024**: The gameplay screen MUST include: a header (back navigation, level name, timer); the game grid on the left; the recipe panel and "Cozinhar!" button on the right; and the instruction queue with command buttons in the footer.
- **FR-025**: The victory modal MUST display a success icon, "Receita pronta!", time remaining, instructions used, and a "Continuar" button.

**Accessibility & Responsive Layout**

- **FR-026**: Every icon-only button MUST have an `aria-label` describing its action.
- **FR-027**: All interactive elements MUST have a visible focus indicator.
- **FR-028**: The gameplay screen MUST fit within a 1280×720 viewport without requiring the user to zoom out.

### Key Entities

- **Design Token**: A named CSS custom property that maps a semantic role (e.g., `--brand`, `--action`) to a color value; used consistently across all components.
- **InstructionQueue**: The UI component that displays the ordered list of instructions the player has added; owns layout, auto-scroll, remove interaction, and budget meter display.
- **InstructionStep**: An individual block within the queue representing one queued command; carries a type (movement/grab-release/wait), a step number, and a color determined by type.
- **BudgetMeter**: The visual indicator showing how many instructions have been used relative to the level limit; changes color based on fill percentage thresholds.
- **Level Configuration**: The data structure (sourced from level data files) that provides the instruction limit and grid definition for a given level.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of screens pass visual inspection with no coral/salmon colors remaining; all colors trace back to defined design tokens.
- **SC-002**: The instruction queue renders correctly and scrolls smoothly for queues of 1 instruction, 14 instructions, and 50+ instructions without layout breakage.
- **SC-003**: The "Pegar/Soltar" grab/release button receives no "unclear" or "toggle" interpretations in a quick usability check — the icon and amber color communicate its purpose without a label.
- **SC-004**: The Chef Droid sprite visually occupies 60–70% of a single grid cell as measured in-browser at default zoom, eliminating the two-steps-per-cell illusion.
- **SC-005**: The full gameplay screen (grid + recipe panel + instruction queue + footer) fits entirely within a 1280×720 viewport at 100% browser zoom with no overflow or scroll required on the page level.
- **SC-006**: All icon-only buttons have descriptive `aria-label` attributes; all interactive elements show a visible focus ring when navigated via keyboard.
- **SC-007**: The budget meter correctly displays green at ≤50%, amber at 51–80%, and red at >80% of the instruction limit in all tested cases.
- **SC-008**: Removing a step from the middle of a queue of 10 results in 9 steps with correctly renumbered sequential indices (no gaps).

## Assumptions

- The game logic, Chef Droid execution model, Sprite JS integration, and level data structures are not modified by this feature — only the visual layer is changed.
- The level configuration already exposes an instruction limit value that components can read; no changes to level data files are required.
- "Tutorial" and "Sobre" screens exist and are navigable from the menu; their internal content is not redesigned in this scope (only the menu buttons pointing to them).
- Mascot images on the main menu are existing assets and remain in place — only their surrounding layout/palette changes.
- The game is played on desktop browsers (Chrome, Firefox, Safari latest). Mobile viewport support is a nice-to-have but not a hard requirement for this redesign.
- styled-components v5 is the styling mechanism; no changes to the styling library are needed.
- Yarn is used as the package manager; no new runtime dependencies are expected, only existing packages already in the project.
