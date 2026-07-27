import type { GradeConfig } from '../types';

const grade10: GradeConfig = {
    id: 10, 
    label: { ru: '10 класс', de: '10. Klasse' }, 
    emoji: '🧪', 
    description: { ru: 'Логарифмы, функции и стереометрия', de: 'Logarithmen, Funktionen und Stereometrie' },
    topics: [
        {
            id: 'g10-logarithms', 
            title: { ru: 'Логарифмы', de: 'Logarithmen' }, 
            icon: 'logₓ', 
            description: { ru: 'Определение и свойства логарифмов', de: 'Definition und Eigenschaften von Logarithmen' }, 
            color: '#7c3aed',
            levels: [
                {
                    id: 'g10-log-1', 
                    title: { ru: 'Основы логарифмов', de: 'Grundbegriffe' }, 
                    description: { ru: 'Вычисление простых значений', de: 'Werte berechnen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g10l1-1', type: 'fill-blank', difficulty: 'easy', timeLimit: 30, points: 20, question: 'log₂ 8 = ?', template: '___', correctAnswer: '3' },
                        { id: 'g10l1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 20, question: 'log₃ 81 = ?', template: '___', correctAnswer: '4' },
                        { id: 'g10l1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 45, points: 30, question: 'log₅ 1 = ?', template: '___', correctAnswer: '0' },
                        { id: 'g10l1-4', type: 'multiple-choice', difficulty: 'hard', timeLimit: 50, points: 30, question: 'log₂ (1/4) = ?', options: ['-2', '2', '1/2', '0'], correctIndex: 0 }
                    ],
                },
                {
                    id: 'g10-log-2', 
                    title: { ru: 'Свойства логарифмов', de: 'Logarithmengesetze' }, 
                    description: { ru: 'Сложение и вычитание', de: 'Addition und Subtraktion' }, 
                    difficulty: 'hard', requiredLevel: 'g10-log-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g10l2-1', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 30, question: 'log₂ 4 + log₂ 2 = log₂ ?', template: '___', correctAnswer: '8' },
                        { id: 'g10l2-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 35, question: 'log₃ 27 - log₃ 9 = ?', template: '___', correctAnswer: '1' }
                    ]
                }
            ],
        },
        {
            id: 'g10-stereometry', 
            title: { ru: 'Стереометрия', de: 'Stereometrie' }, 
            icon: '🧊', 
            description: { ru: 'Объем и площадь поверхностей тел', de: 'Volumen und Oberfläche' }, 
            color: '#0ea5e9',
            levels: [
                {
                    id: 'g10-st-1', 
                    title: { ru: 'Область фигур вращения', de: 'Rotationskörper' }, 
                    description: { ru: 'Цилиндр и конус', de: 'Zylinder und Kegel' }, 
                    difficulty: 'hard', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g10s1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 60, points: 25, question: { ru: 'Количество граней у октаэдра?', de: 'Wie viele Flächen hat ein Oktaeder?' }, template: '___', correctAnswer: '8' },
                        { id: 'g10s1-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 90, points: 40, question: { ru: 'Объем шара через радиус R равен...', de: 'Volumen einer Kugel mit Radius R...' }, options: ['4/3 πR³', 'πR²', '2πR', '1/3 πR³'], correctIndex: 0 }
                    ],
                },
            ],
        },
        {
            id: 'g10-probability', 
            title: { ru: 'Вероятность', de: 'Stochastik' }, 
            icon: '🎲', 
            description: { ru: 'Сложные события и сочетания', de: 'Zusammengesetzte Ereignisse' }, 
            color: '#f59e0b',
            levels: [
                {
                    id: 'g10-pb-1', 
                    title: { ru: 'Комбинаторика', de: 'Kombinatorik' }, 
                    description: { ru: 'Перестановки и сочетания', de: 'Permutationen und Variationen' }, 
                    difficulty: 'hard', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g10p1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 60, points: 25, question: '3! (3 факториал) = ?', template: '___', correctAnswer: '6' },
                        { id: 'g10p1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 80, points: 40, question: '4! = ?', template: '___', correctAnswer: '24' }
                    ],
                },
            ],
        },
    ],
};

export default grade10;
