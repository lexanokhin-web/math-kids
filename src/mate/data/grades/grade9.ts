import type { GradeConfig } from '../types';

const grade9: GradeConfig = {
    id: 9, 
    label: { ru: '9 класс', de: '9. Klasse' }, 
    emoji: '🎓', 
    description: { ru: 'Прогрессии, векторы и основы тригонометрии', de: 'Folgen, Vektoren und Trigonometrie' },
    topics: [
        {
            id: 'g9-progression', 
            title: { ru: 'Прогрессии', de: 'Folgen und Reihen' }, 
            icon: '🔢', 
            description: { ru: 'Арифметическая и геометрическая прогрессии', de: 'Arithmetische und geometrische Folgen' }, 
            color: '#f43f5e',
            levels: [
                {
                    id: 'g9-pr-1', 
                    title: { ru: 'Арифметическая прогрессия', de: 'Arithmetische Folge' }, 
                    description: { ru: 'n-ый член прогрессии', de: 'n-tes Glied berechnen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g9p1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 20, question: 'a1=3, d=2. a5 = ?', template: '___', correctAnswer: '11' },
                        { id: 'g9p1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 30, question: 'a1=5, a2=8. d = ?', template: '___', correctAnswer: '3' },
                        { id: 'g9p1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 90, points: 40, question: 'a1=1, d=2. Sum 3 = ?', template: '___', correctAnswer: '9' }
                    ],
                },
                {
                    id: 'g9-pr-2', 
                    title: { ru: 'Геометрическая прогрессия', de: 'Geometrische Folge' }, 
                    description: { ru: 'Знаменатель и n-ый член', de: 'Quotient und Glieder' }, 
                    difficulty: 'hard', requiredLevel: 'g9-pr-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g9p2-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 25, question: 'b1=2, q=3. b3 = ?', template: '___', correctAnswer: '18' },
                        { id: 'g9p2-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 30, question: 'b1=5, b2=10. q = ?', template: '___', correctAnswer: '2' }
                    ]
                }
            ],
        },
        {
            id: 'g9-trigo', 
            title: { ru: 'Тригонометрия', de: 'Trigonometrie' }, 
            icon: '📐', 
            description: { ru: 'Синус, косинус и тангенс угла', de: 'Sinus, Kosinus und Tangens' }, 
            color: '#8b5cf6',
            levels: [
                {
                    id: 'g9-tr-1', 
                    title: { ru: 'Основы тригонометрии', de: 'Grundlagen' }, 
                    description: { ru: 'Значения углов 30, 45, 60', de: 'Werte für Standardwinkel' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g9t1-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 20, question: 'sin 30° = ?', options: ['1/2', '√2/2', '√3/2', '1'], correctIndex: 0 },
                        { id: 'g9t1-2', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 20, question: 'cos 60° = ?', options: ['1/2', '√2/2', '√3/2', '0'], correctIndex: 0 },
                        { id: 'g9t1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 45, points: 30, question: 'sin 90° = ?', options: ['0', '1/2', '1', '-1'], correctIndex: 2 }
                    ],
                },
            ],
        },
        {
            id: 'g9-vectors', 
            title: { ru: 'Векторы', de: 'Vektoren' }, 
            icon: '↗️', 
            description: { ru: 'Координаты вектора и его длина', de: 'Koordinaten und Betrag' }, 
            color: '#10b981',
            levels: [
                {
                    id: 'g9-vec-1', 
                    title: { ru: 'Операции над векторами', de: 'Rechnen mit Vektoren' }, 
                    description: { ru: 'Сложение и вычитание', de: 'Addition und Subtraktion' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g9v1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 25, question: 'V1(2;3) + V2(4;1) = V(?;4)', template: '___', correctAnswer: '6' },
                        { id: 'g9v1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 35, question: 'V(3;4). Length = ?', template: '___', correctAnswer: '5' }
                    ],
                },
            ],
        },
    ],
};

export default grade9;
