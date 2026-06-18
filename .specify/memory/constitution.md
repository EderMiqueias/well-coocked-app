<!--
SYNC IMPACT REPORT
==================
Version change: [TEMPLATE/UNVERSIONED] → 1.0.0
Version bump rationale: MINOR — first concrete instantiation of all principles from blank template.

Modified principles:
  - All sections: placeholder tokens → concrete rules (initial authoring)

Added sections:
  - Core Principles (5 principles)
  - Technology Stack Constraints
  - Development Workflow
  - Governance

Removed sections:
  - None (no prior concrete sections)

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — "Constitution Check" gates align with the 5 principles below
  ✅ .specify/templates/spec-template.md — no new mandatory sections required; existing structure compatible
  ✅ .specify/templates/tasks-template.md — task categories (UI, tokens, accessibility, game logic) match principles
  ✅ CLAUDE.md — references and instructions remain the authoritative runtime guidance

Deferred items:
  - None. All placeholders resolved.
-->

# Well Cooked Constitution

## Core Principles

### I. Game Logic Integrity (NON-NEGOTIABLE)

The queue-based execution model, Chef Droid behavior, level definitions, and Sprite JS integration are
the irreducible core of the game. These MUST NOT be modified when making UI/UX, styling, or
refactoring changes.

- The instruction queue MUST operate as a sequential list of commands executed in order — no real-time control.
- Level configuration (instruction limit, grid layout, objectives) MUST be sourced from level data files; values MUST NOT be hardcoded in components.
- Sprite JS game loop and animation timing MUST remain untouched by any frontend design work.
- Any PR touching game execution, level rules, or Sprite JS integration requires explicit justification and approval.

### II. Design Token System

All visual constants — colors, spacing, border radii, typography sizes — MUST be defined as CSS
custom properties in a single centralized location (e.g., `:root` in a theme file or a theme object
in a styled-components `ThemeProvider`). Scattered magic values are prohibited.

- CSS custom properties MUST use the canonical "kitchen tech" dark palette defined in the project design spec (`--bg`, `--surface`, `--brand`, `--action`, `--move`, `--wait`, `--danger`, etc.).
- Components MUST consume tokens by name, never by raw hex or pixel values.
- The green (`--action`) token is RESERVED for confirmation actions only (e.g., "Cozinhar!", "Continuar"). It MUST NOT be used for neutral or decorative elements.

### III. TypeScript Discipline & Component Reuse

All components MUST be written in TypeScript with fully explicit prop types. `any` is prohibited.

- Props interfaces MUST be declared; implicit inference from implementation is not sufficient.
- Existing components MUST be reused or extended before creating new ones with overlapping scope.
- No duplicate component implementations for the same UI pattern.
- Inline styles are prohibited; all styling MUST go through styled-components or CSS modules consuming design tokens.

### IV. Accessibility & Responsive Layout

The game MUST be playable without assistive barriers and MUST fit on standard monitors without zoom.

- Every button that contains only an icon MUST have an `aria-label` describing its action.
- All interactive elements MUST have a visible focus indicator.
- Text contrast MUST meet WCAG AA (4.5:1 for normal text, 3:1 for large text) against their backgrounds.
- The gameplay screen (grid + recipe panel + instruction queue) MUST fit within a 1280×720 viewport without requiring the user to zoom out.

### V. Simplicity & Scope Discipline

Features are implemented to exactly what is required — no more. Premature abstractions, speculative
generalizations, and unnecessary complexity are prohibited.

- Each implementation task MUST be scoped to the requirements in the active spec. Additions require an explicit change to the spec.
- Three similar lines of code are preferable to a premature abstraction.
- No feature flags, backwards-compatibility shims, or "future-proofing" code unless explicitly specified.
- Error handling and validation MUST only be added at real system boundaries (user input, external APIs); internal invariants MUST NOT be defensively re-validated.

## Technology Stack Constraints

These constraints govern all technical decisions in the project.

- **Framework**: React 18 with TypeScript (CRA via CRACO). Ejecting is prohibited unless explicitly approved.
- **Styling**: styled-components v5. No Tailwind, no CSS-in-JS alternatives, no global CSS rewrites outside the theme file.
- **Routing**: react-router-dom v6. Route structure follows the current page hierarchy (Menu → Level Select → Gameplay).
- **Animations**: Sprite JS handles game sprite animations. React-managed CSS transitions/animations handle UI-level motion only (e.g., queue slot entries, modal reveals).
- **State management**: Component state and prop drilling are the default. No external state manager (Redux, Zustand, etc.) unless explicitly approved via a spec amendment.
- **Testing**: `@testing-library/react` + Jest. Tests are optional unless a spec explicitly requires them.
- **Node/package manager**: Yarn. `npm` MUST NOT be used to install packages.

## Development Workflow

All feature work MUST follow the speckit workflow.

- A `spec.md` MUST exist before implementation begins.
- A `plan.md` MUST pass the Constitution Check (all 5 principles) before any coding task starts.
- Tasks in `tasks.md` MUST be organized by user story and marked complete as each is done.
- Commits MUST reference the feature branch (e.g., `feat/001-instruction-queue-redesign`).
- UI changes MUST be visually verified in the browser on the golden path and key edge cases before marking a task complete.
- Type checking (`tsc --noEmit`) MUST pass before a feature branch is merged.

## Governance

This constitution supersedes all other development guidance for the Well Cooked project. In case of
conflict between this document and CLAUDE.md, the CLAUDE.md (checked into the repo) governs runtime
agent behavior; this constitution governs architectural and quality decisions.

**Amendment procedure**:
1. Propose the amendment in a `constitution-amendment.md` file under the active spec directory.
2. Bump the version per semantic versioning rules (MAJOR / MINOR / PATCH) and update the Sync Impact Report.
3. Propagate changes to all dependent templates and update this file.
4. Commit with message: `docs: amend constitution to vX.Y.Z (<summary>)`.

**Compliance review**: Every `plan.md` MUST include a "Constitution Check" section that verifies
all five principles before Phase 0 research begins and again after Phase 1 design.

**Version policy**:
- MAJOR: Backward incompatible — removing or redefining a principle, changing a non-negotiable rule.
- MINOR: Additive — new principle, new section, material expansion of guidance.
- PATCH: Non-semantic — clarifications, wording improvements, typo fixes.

**Version**: 1.0.0 | **Ratified**: 2026-06-18 | **Last Amended**: 2026-06-18
