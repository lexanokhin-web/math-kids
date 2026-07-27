import { generateLevel1Exercise, generateLevel1Exercises } from './level1';
import { generateLevel2Exercise, generateLevel2Exercises } from './level2';
import { generateLevel3Exercise, generateLevel3Exercises } from './level3';

export type UnifiedMultiplicationExercise = {
  id: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: { ru: string; de: string };
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  template?: string;
  compareLeft?: string;
  compareRight?: string;
  statement?: string;
  isTrue?: boolean;
  visual?: {
    groups: number;
    itemsPerGroup: number;
    emoji: string;
  };
  hint?: { ru: string; de: string };
};

export function getRandomMultiplicationExercise(levelId: number): UnifiedMultiplicationExercise {
  const randIdx = Math.floor(Math.random() * 1000);
  switch (levelId) {
    case 1:
      return generateLevel1Exercise(randIdx) as UnifiedMultiplicationExercise;
    case 2:
      return generateLevel2Exercise(randIdx) as UnifiedMultiplicationExercise;
    case 3:
      return generateLevel3Exercise(randIdx) as UnifiedMultiplicationExercise;
    default:
      return generateLevel1Exercise(randIdx) as UnifiedMultiplicationExercise;
  }
}

export function getMultiplicationExercises(levelId: number, count: number = 10): UnifiedMultiplicationExercise[] {
  switch (levelId) {
    case 1:
      return generateLevel1Exercises(count) as UnifiedMultiplicationExercise[];
    case 2:
      return generateLevel2Exercises(count) as UnifiedMultiplicationExercise[];
    case 3:
      return generateLevel3Exercises(count) as UnifiedMultiplicationExercise[];
    default:
      return generateLevel1Exercises(count) as UnifiedMultiplicationExercise[];
  }
}

export * as Level1 from './level1';
export * as Level2 from './level2';
export * as Level3 from './level3';
