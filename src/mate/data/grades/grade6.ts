import type { GradeConfig } from '../types';

const grade6: GradeConfig = {
    id: 6, 
    label: { ru: '6 класс', de: '6. Klasse' }, 
    emoji: '🎢', 
    description: { ru: 'Отрицательные числа, пропорции и основы алгебры', de: 'Negative Zahlen, Proportionen und Algebra-Anfänge' },
    topics: [
        {
            id: 'g6-negatives', 
            title: { ru: 'Отрицательные числа', de: 'Negative Zahlen' }, 
            icon: '↔️', 
            description: { ru: 'Работа с термометром и числовой прямой', de: 'Zahlengerade und Beträge' }, 
            color: '#0ea5e9',
            levels: [
                {
                    id: 'g6-neg-1', 
                    title: { ru: 'Сложение и вычитание', de: 'Plus und Minus' }, 
                    description: { ru: 'Складываем -3 и -5', de: 'Umgang mit Vorzeichen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g6n1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 15, question: '-5 + (-3) = ?', template: '___', correctAnswer: '-8' },
                        { id: 'g6n1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 15, question: '4 - (-2) = ?', template: '___', correctAnswer: '6' },
                        { id: 'g6n1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 40, points: 20, question: '-10 + 15 = ?', template: '___', correctAnswer: '5' },
                        { id: 'g6n1-4', type: 'multiple-choice', difficulty: 'hard', timeLimit: 45, points: 25, question: { ru: 'Что больше: -10 или -20?', de: 'Was ist größer: -10 oder -20?' }, options: ['-10', '-20', { ru: 'Равны', de: 'Gleich' }], correctIndex: 0 },
                        { id: 'g6n1-5', type: 'fill-blank', difficulty: 'hard', timeLimit: 50, points: 30, question: '-100 + 200 = ?', template: '___', correctAnswer: '100' }
                    ],
                },
                {
                    id: 'g6-neg-2', 
                    title: { ru: 'Умножение и деление', de: 'Mal und Geteilt' }, 
                    description: { ru: 'Правила знаков', de: 'Vorzeichenregeln' }, 
                    difficulty: 'medium', requiredLevel: 'g6-neg-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g6n2-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 20, question: '-4 × 3 = ?', template: '___', correctAnswer: '-12' },
                        { id: 'g6n2-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 20, question: '-2 × (-5) = ?', template: '___', correctAnswer: '10' },
                        { id: 'g6n2-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 40, points: 25, question: '-12 ÷ (-4) = ?', template: '___', correctAnswer: '3' }
                    ]
                }
            ],
        },
        {
            id: 'g6-proportions', 
            title: { ru: 'Пропорции и масштаб', de: 'Proportionen und Maßstab' }, 
            icon: '🗺️', 
            description: { ru: 'Решение задач на отношения', de: 'Verhältnisse und deren Anwendung' }, 
            color: '#f43f5e',
            levels: [
                {
                    id: 'g6-prop-1', 
                    title: { ru: 'Основное свойство пропорции', de: 'Hauptregel der Proportion' }, 
                    description: { ru: 'Находим x в пропорциях', de: 'x berechnen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g6p1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 20, question: 'x/5 = 4/10. x = ?', template: '___', correctAnswer: '2' },
                        { id: 'g6p1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 25, question: 'x/12 = 3/4. x = ?', template: '___', correctAnswer: '9' },
                        { id: 'g6p1-3', type: 'multiple-choice', difficulty: 'medium', timeLimit: 50, points: 20, question: { ru: 'Масштаб 1:100. Это значит, что 1 см равен...', de: 'Maßstab 1:100. 1 cm bedeutet...' }, options: ['1 м', '10 м', '100 м', '10 см'], correctIndex: 0 }
                    ],
                },
            ],
        },
        {
            id: 'g6-equations', 
            title: { ru: 'Уравнения', de: 'Gleichungen' }, 
            icon: '🟰', 
            description: { ru: 'Линейные уравнения с одним неизвестным', de: 'Lineare Gleichungen lösen' }, 
            color: '#8b5cf6',
            levels: [
                {
                    id: 'g6-eq-1', 
                    title: { ru: 'Решение простых уравнений', de: 'Einfache Gleichungen' }, 
                    description: { ru: 'Перенос слагаемых', de: 'Therme umformen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g6e1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 20, question: '2x + 5 = 15. x = ?', template: '___', correctAnswer: '5' },
                        { id: 'g6e1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 25, question: '3x - 10 = x + 4. x = ?', template: '___', correctAnswer: '7' },
                        { id: 'g6e1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 70, points: 30, question: '4(x - 2) = 8. x = ?', template: '___', correctAnswer: '4' }
                    ],
                },
            ],
        },
        {
            id: 'g6-logic', 
            title: { ru: 'Комбинаторика и Логика', de: 'Kombinatorik' }, 
            icon: '🎲', 
            description: { ru: 'Задачи Кенгуру и вероятность', de: 'Känguru-Mathe' }, 
            color: '#f59e0b',
            levels: [
                {
                    id: 'g6-log-1', 
                    title: { ru: 'Вероятность и графы', de: 'Wahrscheinlichkeit & Graphen' }, 
                    description: { ru: 'В мире случайностей', de: 'Zufallsexperimente' }, 
                    difficulty: 'hard', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g6l1-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 60, points: 25, question: { ru: 'Какова вероятность выпадения "орла" при броске монетки?', de: 'Wie hoch ist die Wahrscheinlichkeit für "Kopf"?' }, options: ['1/2', '1/3', '1/4', '1'], correctIndex: 0 },
                        { id: 'g6l1-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 75, points: 35, question: { ru: 'В ящике 3 красных и 7 синих шаров. Какова вероятность достать красный?', de: '3 rote und 7 blaue Kugeln. Wahrscheinlichkeit für Rot?' }, options: ['0.3', '0.7', '1', '3/7'], correctIndex: 0 },
                        { id: 'g6l1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 80, points: 40, question: { ru: 'Сколько граней у куба?', de: 'Wie viele Flächen hat ein Würfel?' }, template: '___', correctAnswer: '6' }
                    ],
                },
            ],
        },
    ],
};

export default grade6;
