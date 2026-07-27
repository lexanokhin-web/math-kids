export type Level3ExerciseType = 'multiple-choice' | 'fill-blank' | 'word-problem' | 'chain';

export interface MultiplicationExerciseL3 {
  id: string;
  type: Level3ExerciseType;
  difficulty: 'easy' | 'medium' | 'hard';
  question: { ru: string; de: string };
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  template?: string;
  hint?: { ru: string; de: string };
}
