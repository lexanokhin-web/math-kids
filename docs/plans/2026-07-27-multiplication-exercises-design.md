# Multiplication Exercises Design Document

**Date:** 2026-07-27
**Goal:** Add comprehensive multiplication exercises with 3 distinct levels in separate folders, providing a large variety of task options.

## Architecture & Data Structure

The multiplication system is divided into 3 levels, each stored in its dedicated directory under `src/data/multiplication/`:

1. `src/data/multiplication/level1/`
   - **Level 1 (Basic Multiplication & Visuals):**
     - Multiplication tables 1 to 5.
     - Converting repeated addition to multiplication (`3 + 3 + 3 = 3 × 3`).
     - Visual item group counting.
   - Files: `types.ts`, `generator.ts`, `templates.ts`, `index.ts`.

2. `src/data/multiplication/level2/`
   - **Level 2 (Full Multiplication Table & Missing Factors):**
     - Multiplication tables 1 to 10.
     - Missing factor problems (`? × 7 = 42`, `6 × ? = 36`).
     - Comparing multiplication products (`4 × 5 [>] 3 × 6`).
   - Files: `types.ts`, `generator.ts`, `templates.ts`, `index.ts`.

3. `src/data/multiplication/level3/`
   - **Level 3 (Advanced Multiplication & Story Problems):**
     - Tens multiplication (`20 × 4`, `15 × 3`).
     - Word/Story problems in Russian & German.
     - Multi-factor chains (`2 × 3 × 4`).
   - Files: `types.ts`, `generator.ts`, `templates.ts`, `index.ts`.

4. `src/data/multiplication/index.ts`
   - Central exports and unified exercise provider.

## UI Components & Routing

1. **MainMenu (`src/components/MainMenu.tsx`)**:
   - Add "Malrechnen" (Multiplication) card under the Mathematik section.
2. **Level Selection View (`src/components/MultiplicationLevelSelect.tsx`)**:
   - Renders 3 level cards (Level 1, Level 2, Level 3) with descriptions, difficulty badges, and progress indicators.
3. **Game View (`src/components/MultiplicationGameView.tsx`)**:
   - Interactive game loop displaying questions, multiple-choice options, text entry, hints, timer, XP rewards, and confetti on completion.
4. **App Routing (`src/App.tsx`)**:
   - `/game/multiplication` -> Level selector
   - `/game/multiplication/level/:levelId` -> Game View
