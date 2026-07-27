import type { GradeConfig } from '../types';

const grade11: GradeConfig = {
    id: 11, 
    label: { ru: '11 класс', de: '11. Klasse' }, 
    emoji: '🔭', 
    description: { ru: 'Производные, интегралы и подготовка к экзаменам', de: 'Analysis, Integrale und Prüfungsvorbereitung' },
    topics: [
        {
            id: 'g11-analysis', 
            title: { ru: 'Математический анализ', de: 'Analysis' }, 
            icon: '∫', 
            description: { ru: 'Производные и пределы функций', de: 'Differentials und Integralrechnung' }, 
            color: '#ef4444',
            levels: [
                {
                    id: 'g11-an-1', 
                    title: { ru: 'Производная функции', de: 'Ableitungen' }, 
                    description: { ru: 'Нахождение производных', de: 'Funktionen ableiten' }, 
                    difficulty: 'hard', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g11a1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 25, question: '(x²)′ = ?', template: '___x', correctAnswer: '2' },
                        { id: 'g11a1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 25, question: '(x³)′ = ?', template: '___x²', correctAnswer: '3' },
                        { id: 'g11a1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, question: '(sin x)′ = ?', options: ['cos x', '-cos x', 'sin x', '0'], correctIndex: 0 },
                        { id: 'g11a1-4', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 35, question: '(cos x)′ = ?', options: ['sin x', '-sin x', 'cos x', '1'], correctIndex: 1 }
                    ],
                },
                {
                    id: 'g11-an-2', 
                    title: { ru: 'Интегралы', de: 'Integrale' }, 
                    description: { ru: 'Первообразные и площади', de: 'Stammfunktionen' }, 
                    difficulty: 'hard', requiredLevel: 'g11-an-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g11a2-1', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, question: '∫ x dx = ?', options: ['x²/2 + C', 'x²/2', '1', '2x'], correctIndex: 0 },
                        { id: 'g11a2-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 90, points: 40, question: '∫₀¹ x dx = ?', template: '1/___', correctAnswer: '2' }
                    ]
                }
            ],
        },
        {
            id: 'g11-probability', 
            title: { ru: 'Теория вероятностей', de: 'Stochastik' }, 
            icon: '🎲', 
            description: { ru: 'Ожидание и дисперсия', de: 'Wahrscheinlichkeitstheorie' }, 
            color: '#10b981',
            levels: [
                {
                    id: 'g11-pb-1', 
                    title: { ru: 'Сложная вероятность', de: 'Erwartungswert' }, 
                    description: { ru: 'Задачи на выборку', de: 'Zufallsvariablen' }, 
                    difficulty: 'hard', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g11p1-1', type: 'multiple-choice', difficulty: 'hard', timeLimit: 70, points: 35, question: { ru: 'Сколько способов выбрать 2 из 3?', de: 'Wie viele Kombinationen 2 aus 3?' }, options: ['3', '6', '1', '9'], correctIndex: 0 },
                        { id: 'g11p1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 90, points: 40, question: '5! / 4! = ?', template: '___', correctAnswer: '5' }
                    ],
                },
            ],
        },
    ],
};

export default grade11;
