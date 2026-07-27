import type { MultiplicationExerciseL2 } from './types';

export const LEVEL2_TEMPLATES: MultiplicationExerciseL2[] = [
  {
    id: 'l2-tpl-1',
    type: 'missing-factor',
    difficulty: 'medium',
    question: { ru: 'Найди неизвестное число', de: 'Finde die unbekannte Zahl' },
    template: '? × 7 = 42',
    options: ['5', '6', '7', '8'],
    correctIndex: 1,
    hint: { ru: '6 × 7 = 42', de: '6 × 7 = 42' }
  },
  {
    id: 'l2-tpl-2',
    type: 'compare',
    difficulty: 'medium',
    question: { ru: 'Сравни выражения', de: 'Vergleiche die Ausdrücke' },
    compareLeft: '4 × 5',
    compareRight: '3 × 7',
    options: ['<', '=', '>'],
    correctIndex: 0,
    hint: { ru: '20 < 21', de: '20 < 21' }
  },
  {
    id: 'l2-tpl-3',
    type: 'fill-blank',
    difficulty: 'easy',
    question: { ru: 'Вычисли: 8 × 9', de: 'Berechne: 8 × 9' },
    template: '8 × 9 = ___',
    correctAnswer: '72'
  }
];
