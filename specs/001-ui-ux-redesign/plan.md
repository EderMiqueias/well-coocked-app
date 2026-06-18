# Implementation Plan: Well Cooked — UI/UX Redesign

**Branch**: `001-ui-ux-redesign` | **Date**: 2026-06-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-ui-ux-redesign/spec.md`

## Summary

Modernize the Well Cooked educational game's visual layer from scattered salmon/coral hex values to a centralized dark "kitchen tech" design token system, refactor the instruction queue into a horizontally-scrollable timeline component, fix the character-to-cell proportion disparity on the game grid, and clarify the grab/release command button. Game logic and Sprite JS integration are untouched throughout.

## Technical Context

**Language/Version**: TypeScript 4.9.5 + React 18.2.0 (CRA via CRACO 0.0.3)

**Primary Dependencies**: styled-components 5.3.8, react-router-dom 6.8.1, react-tooltip 5.21.1

**Storage**: None (client-only game; no persistence layer)

**Testing**: Jest + @testing-library/react (tests not required by spec; visual verification in browser is the gate)

**Target Platform**: Desktop browser, Chrome/Firefox/Safari latest; minimum viewport 1280×720

**Project Type**: Educational single-page web game

**Performance Goals**: Standard 60fps UI transitions; instruction queue scroll must be smooth with 50+ steps

**Constraints**: Gameplay screen fits within 1280×720 without page-level scroll or zoom; no changes to game execution timing or Sprite JS loop

**Scale/Scope**: 4 screens (menu, level select, gameplay, victory modal); 1 major component refactor (InstructionQueue); ~15 files touched

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Pre-Design Status | Notes |
|-----------|------------------|-------|
| I. Game Logic Integrity | ✅ PASS | Adding `instructionLimit` prop to NivelBase is a UI guard only — it does not alter queue execution, timing constants, level rules, or Sprite JS. The game loop in NivelBase/index.tsx is untouched. |
| II. Design Token System | ✅ PASS | All colors migrated to CSS custom properties in a new `theme.css` file imported at app root. No hex values remain in component files. styled-components consumes tokens via `var(--token-name)`. |
| III. TypeScript Discipline | ✅ PASS | New InstructionQueue props interface is fully explicit; no `any`. NivelBase gains one typed prop (`instructionLimit: number`). All new components are typed. |
| IV. Accessibility & Responsive | ✅ PASS | All icon-only buttons get `aria-label`. Gameplay screen layout targets 1280×720 fit. |
| V. Simplicity & Scope | ✅ PASS | Only files listed in Project Structure are touched. No new routing, no new state manager, no new runtime dependencies. |

**Pre-design gate: PASSED — no violations.**

## Project Structure

### Documentation (this feature)

```text
specs/001-ui-ux-redesign/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/           ← Phase 1 output
│   ├── instruction-queue-props.md
│   └── nivel-base-props.md
└── tasks.md             ← Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── assets/styles/
│   ├── theme.css              ← NEW: CSS custom properties (:root) — single source of truth for all tokens
│   ├── App.css                ← UPDATE: remove salmon background if present
│   └── index.css              ← UPDATE: import theme.css
│
├── common/
│   └── styles.ts              ← UPDATE: HighlightTitle color → var(--text-muted); no hardcoded #4D4D4D
│
├── components/
│   ├── IntructionQueue/
│   │   ├── index.tsx          ← REFACTOR: new props interface, horizontal track layout, auto-scroll, BudgetMeter
│   │   ├── styles.ts          ← REWRITE: horizontal track, step blocks, connectors, next-slot indicator
│   │   ├── Instruction.tsx    ← REWRITE: step block shows step number + colored icon; hover reveals X
│   │   └── BudgetMeter.tsx    ← NEW: budget meter (used/limit counter + color-coded progress bar)
│   │
│   ├── InstructionsButtons/
│   │   ├── index.tsx          ← UPDATE: accept `disabled` prop; disable all buttons when queue is full
│   │   └── styles.ts          ← UPDATE: replace #6495ED → var(--move); disabled state via token
│   │
│   ├── Modal/
│   │   ├── index.tsx          ← UPDATE: replace hardcoded #55ed6c/#ed6755 → var(--action)/var(--danger)
│   │   └── styles.ts          ← UPDATE: Container bg → var(--surface); Button → token-based hierarchy
│   │
│   ├── GameSpace/
│   │   └── styles.ts          ← UPDATE: reduce JogoContainer block dimensions for correct proportion
│   │
│   ├── MainCharacter/
│   │   └── styles.ts          ← UPDATE: Droid container sized to ~65% of new cell dimensions
│   │
│   └── Button/
│       └── styles.ts          ← UPDATE: run-button → var(--action); other variants → token hierarchy
│
├── pages/
│   ├── Home/
│   │   ├── index.tsx          ← UPDATE: "Jogar" gets primary style; "Tutorial"/"Sobre" get ghost style
│   │   └── styles.ts          ← UPDATE: MenuContainer bg → var(--bg); text → var(--text)
│   │
│   ├── Niveis/
│   │   ├── NivelBase/
│   │   │   └── index.tsx      ← UPDATE: add instructionLimit prop; addInstruction guard; pass limit+disabled to children
│   │   ├── Nivel1.tsx         ← UPDATE: pass instructionLimit={14} to NivelBase
│   │   ├── Nivel2.tsx         ← UPDATE: pass instructionLimit={14} to NivelBase
│   │   ├── Nivel3.tsx         ← UPDATE: pass instructionLimit={14} to NivelBase
│   │   ├── index.tsx          ← UPDATE: card styles → token palette; locked level disabled state
│   │   └── styles.ts          ← UPDATE: all salmon/#E9967A → tokens; NivelContainer bg → var(--surface)
└── ...
```

**Structure Decision**: Single project layout (CRA + CRACO). No new packages, no new directories outside `specs/`. The only new source file is `src/assets/styles/theme.css` (CSS custom properties) and `src/components/IntructionQueue/BudgetMeter.tsx`.

## Complexity Tracking

No constitution violations — this section is not applicable.
