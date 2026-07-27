import type { MultiplicationExercise } from './types';

export const LEVEL1_TEMPLATES: MultiplicationExercise[] = [
  {
    id: 'l1-tpl-1',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: { ru: 'Сколько яблок в 3 корзинах, если в каждой по 2 яблока?', de: 'Wie viele Äpfel in 3 Körben, wenn 2 in jedem sind?' },
    visual: { groups: 3, itemsPerGroup: 2, emoji: '🍎' },
    options: ['4', '5', '6', '8'],
    correctIndex: 2,
    hint: { ru: '2 + 2 + 2 = 6', de: '2 + 2 + 2 = 6' }
  },
  {
    id: 'l1-tpl-2',
    type: 'repeated-addition',
    difficulty: 'easy',
    question: { ru: 'Замени сложение умножением: 4 + 4 + 4', de: 'Ersetze die Addition durch Multiplikation: 4 + 4 + 4' },
    options: ['4 × 3', '4 × 4', '3 × 3', '4 + 3'],
    correctIndex: 0
  },
  {
    id: 'l1-tpl-3',
    type: 'fill-blank',
    difficulty: 'easy',
    question: { ru: 'Реши пример: 2 × 5', de: 'Löse die Aufgabe: 2 × 5' },
    template: '2 × 5 = ___',
    correctAnswer: '10'
  },
  {
    id: 'l1-tpl-4',
    type: 'true-false',
    difficulty: 'easy',
    question: { ru: 'Верно ли выражение?', de: 'Ist dieser Ausdruck richtig?' },
    statement: '3 × 4 = 12',
    isTrue: true
  },
  {
    id: 'l1-tpl-5',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: { ru: '5 кошек имеют по 4 лапы. Сколько всего лап?', de: '5 Katzen haben je 4 Pfoten. Wie viele Pfoten insgesamt?' },
    visual: { groups: 5, itemsPerGroup: 4, emoji: '🐾' },
    options: ['15', '18', '20', '25'],
    correctIndex: 2
  }
];
