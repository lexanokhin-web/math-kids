import type { GradeConfig } from '../types';

const grade7: GradeConfig = {
    id: 7, 
    label: { ru: '7 класс', de: '7. Klasse' }, 
    emoji: '📈', 
    description: { ru: 'Степени, формулы сокращенного умножения и углы', de: 'Potenzen, binomische Formeln und Winkel' },
    topics: [
        {
            id: 'g7-algebra', 
            title: { ru: 'Алгебра', de: 'Algebra' }, 
            icon: '📐', 
            description: { ru: 'Степени и выражения', de: 'Potenzen und Thermentwicklung' }, 
            color: '#3b82f6',
            levels: [
                {
                    id: 'g7-alg-1', 
                    title: { ru: 'Свойства степеней', de: 'Potenzgesetze' }, 
                    description: { ru: 'Умножение и деление степеней', de: 'Multiplikation von Potenzen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g7a1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 20, question: 'x² × x³ = ?', template: 'x^___', correctAnswer: '5' },
                        { id: 'g7a1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 20, question: 'x⁸ ÷ x² = ?', template: 'x^___', correctAnswer: '6' },
                        { id: 'g7a1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 40, points: 25, question: '(x²)³ = ?', template: 'x^___', correctAnswer: '6' },
                        { id: 'g7a1-4', type: 'multiple-choice', difficulty: 'hard', timeLimit: 50, points: 30, question: '(-3)² = ?', options: ['9', '-9', '6', '-6'], correctIndex: 0 }
                    ],
                },
                {
                    id: 'g7-alg-2', 
                    title: { ru: 'Формулы умножения', de: 'Binomische Formeln' }, 
                    description: { ru: '(a + b)²', de: 'Quadratische Ergänzung' }, 
                    difficulty: 'hard', requiredLevel: 'g7-alg-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g7a2-1', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, question: '(a+b)² = ?', options: ['a²+b²', 'a²+2ab+b²', 'a²+ab+b²', 'a-b'], correctIndex: 1 },
                        { id: 'g7a2-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, question: '(a-b)(a+b) = ?', options: ['a²-b²', 'a²+b²', 'a²-2ab+b²', 'a²+2ab+b²'], correctIndex: 0 },
                        { id: 'g7a2-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 75, points: 35, question: { ru: 'Раскрой: (x+2)²', de: 'Berechne: (x+2)²' }, template: 'x² + ___x + 4', correctAnswer: '4' }
                    ]
                }
            ],
        },
        {
            id: 'g7-geometry', 
            title: { ru: 'Геометрия', de: 'Geometrie' }, 
            icon: '📐', 
            description: { ru: 'Углы и треугольники', de: 'Winkel und Dreiecke' }, 
            color: '#10b981',
            levels: [
                {
                    id: 'g7-geo-1', 
                    title: { ru: 'Сумма углов', de: 'Winkelsumme' }, 
                    description: { ru: 'Треугольники и четырехугольники', de: 'Dreiecke und Vierecke' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g7g1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 20, question: { ru: 'Сумма углов в треугольнике равна... градусов', de: 'Winkelsumme im Dreieck beträgt...' }, template: '___', correctAnswer: '180' },
                        { id: 'g7g1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 25, question: { ru: 'В треугольнике углы 40 и 60. Третий угол = ?', de: 'Winkel im Dreieck 40 und 60. Dritter = ?' }, template: '___', correctAnswer: '80' },
                        { id: 'g7g1-3', type: 'multiple-choice', difficulty: 'medium', timeLimit: 60, points: 25, question: { ru: 'Чему равна сумма смежных углов?', de: 'Summe der Nebenwinkel?' }, options: ['90', '180', '270', '360'], correctIndex: 1 }
                    ],
                },
            ],
        },
        {
            id: 'g7-stats', 
            title: { ru: 'Статистика', de: 'Statistik' }, 
            icon: '📊', 
            description: { ru: 'Среднее арифметическое и медиана', de: 'Mittelwert und Median' }, 
            color: '#f59e0b',
            levels: [
                {
                    id: 'g7-st-1', 
                    title: { ru: 'Среднее значение', de: 'Mittelwert' }, 
                    description: { ru: 'Анализ данных', de: 'Datenanalyse' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g7s1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 20, question: { ru: 'Среднее чисел 2, 4, 6 = ?', de: 'Mittelwert von 2, 4, 6 = ?' }, template: '___', correctAnswer: '4' },
                        { id: 'g7s1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 30, question: { ru: 'Сумма 5 чисел равна 100. Чему равно среднее?', de: 'Summe von 5 Zahlen ist 100. Mittelwert?' }, template: '___', correctAnswer: '20' }
                    ],
                },
            ],
        },
    ],
};

export default grade7;
