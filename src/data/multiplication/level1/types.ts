export type ExerciseType = 'multiple-choice' | 'fill-blank' | 'repeated-addition' | 'true-false';

export interface MultiplicationExercise {
  id: string;
  type: ExerciseType;
  difficulty: 'easy' | 'medium' | 'hard';
  question: { ru: string; de: string };
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  template?: string;
  statement?: string;
  isTrue?: boolean;
  visual?: {
    groups: number;
    itemsPerGroup: number;
    emoji: string;
  };
  hint?: { ru: string; de: string };
}
