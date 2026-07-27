# Multiplication Exercises Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Create 3 levels of multiplication exercises in separate folders with procedural task generators and full UI integration.

**Architecture:** 3 sub-directories under `src/data/multiplication/` (`level1/`, `level2/`, `level3/`), wrapped by a central provider in `src/data/multiplication/index.ts`. UI consists of `MultiplicationLevelSelect.tsx` and `MultiplicationGameView.tsx` integrated into `MainMenu.tsx` and `App.tsx`.

**Tech Stack:** React 19, TypeScript, React Router 7, Framer Motion, Canvas Confetti.

---

### Task 1: Level 1 Data & Generator

**Files:**
- Create: `src/data/multiplication/level1/types.ts`
- Create: `src/data/multiplication/level1/templates.ts`
- Create: `src/data/multiplication/level1/generator.ts`
- Create: `src/data/multiplication/level1/index.ts`

**Details:**
- `types.ts`: Define exercise interface (id, type: 'multiple-choice' | 'fill-blank' | 'repeated-addition', question, options, correctAnswer, visualHint).
- `templates.ts`: Pre-defined visual questions for multiplication 1-5 (e.g. 3 groups of 2 apples).
- `generator.ts`: Procedural generation for multiplication tables 1..5 and converting addition to multiplication.
- `index.ts`: Function `generateLevel1Exercises(count: number)` returning shuffled exercises.

---

### Task 2: Level 2 Data & Generator

**Files:**
- Create: `src/data/multiplication/level2/types.ts`
- Create: `src/data/multiplication/level2/templates.ts`
- Create: `src/data/multiplication/level2/generator.ts`
- Create: `src/data/multiplication/level2/index.ts`

**Details:**
- `types.ts`: Exercise interfaces for level 2.
- `generator.ts`: Generate full 1-10 table questions, missing factor questions (`? × 7 = 42`), and comparison exercises (`4 × 5 [>] 3 × 6`).
- `index.ts`: Function `generateLevel2Exercises(count: number)`.

---

### Task 3: Level 3 Data & Generator

**Files:**
- Create: `src/data/multiplication/level3/types.ts`
- Create: `src/data/multiplication/level3/templates.ts`
- Create: `src/data/multiplication/level3/generator.ts`
- Create: `src/data/multiplication/level3/index.ts`

**Details:**
- `types.ts`: Exercise interfaces for level 3.
- `templates.ts`: Story/word problems in Russian/German ("У Коли 4 коробки по 6 карандашей...").
- `generator.ts`: Procedural generation for tens multiplication (`15 × 4`, `20 × 5`) and 3-factor chains (`2 × 3 × 4`).
- `index.ts`: Function `generateLevel3Exercises(count: number)`.

---

### Task 4: Unified Multiplication Provider

**Files:**
- Create: `src/data/multiplication/index.ts`

**Details:**
- Export unified `getMultiplicationExercises(levelId: 1 | 2 | 3, count?: number)`.

---

### Task 5: Level Selection Component

**Files:**
- Create: `src/components/MultiplicationLevelSelect.tsx`

**Details:**
- UI card component displaying 3 levels with badges, icons, and descriptions.
- Allows navigating to `/game/multiplication/level/:levelId`.

---

### Task 6: Multiplication Game View Component

**Files:**
- Create: `src/components/MultiplicationGameView.tsx`

**Details:**
- Interactive game loop handling options, input field, score, streak, XP rewards, sound/confetti feedback, and level completion summary.

---

### Task 7: Routing and Main Menu Integration

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/MainMenu.tsx`

**Details:**
- Add routes `/game/multiplication` and `/game/multiplication/level/:levelId` in `App.tsx`.
- Add "Malrechnen" card under Mathematik section in `MainMenu.tsx`.
