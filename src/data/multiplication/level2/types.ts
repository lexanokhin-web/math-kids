export type Level2ExerciseType = 'multiple-choice' | 'fill-blank' | 'missing-factor' | 'compare';

export interface MultiplicationExerciseL2 {
  id: string;
  type: Level2ExerciseType;
  difficulty: 'easy' | 'medium' | 'hard';
  question: { ru: string; de: string };
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  template?: string;
  compareLeft?: string;
  compareRight?: string;
  hint?: { ru: string; de: string };
}
