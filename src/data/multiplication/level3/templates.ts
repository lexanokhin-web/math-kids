import type { MultiplicationExerciseL3 } from './types';

export const LEVEL3_TEMPLATES: MultiplicationExerciseL3[] = [
  {
    id: 'l3-tpl-1',
    type: 'word-problem',
    difficulty: 'medium',
    question: {
      ru: 'У Васи 4 коробки по 6 цветных карандашей. Сколько всего карандашей у Васи?',
      de: 'Wassili hat 4 Schachteln mit je 6 Buntstiften. Wie viele Stifte hat er insgesamt?'
    },
    options: ['20', '24', '26', '28'],
    correctIndex: 1,
    hint: { ru: '4 × 6 = 24', de: '4 × 6 = 24' }
  },
  {
    id: 'l3-tpl-2',
    type: 'word-problem',
    difficulty: 'hard',
    question: {
      ru: 'В магазине продают упаковки сока по 12 банок. Купили 3 упаковки. Сколько банок сока купили?',
      de: 'Ein Laden verkauft Saftpackungen zu je 12 Dosen. Es wurden 3 Packungen gekauft. Wie viele Dosen wurden gekauft?'
    },
    options: ['30', '32', '36', '40'],
    correctIndex: 2,
    hint: { ru: '12 × 3 = 36', de: '12 × 3 = 36' }
  },
  {
    id: 'l3-tpl-3',
    type: 'chain',
    difficulty: 'hard',
    question: {
      ru: 'Реши цепочку умножения: 2 × 3 × 4',
      de: 'Löse die Multiplikationskette: 2 × 3 × 4'
    },
    template: '2 × 3 × 4 = ___',
    correctAnswer: '24'
  }
];
