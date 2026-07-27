import type { GradeConfig } from '../types';

const grade8: GradeConfig = {
    id: 8, 
    label: { ru: '8 класс', de: '8. Klasse' }, 
    emoji: '💎', 
    description: { ru: 'Корни, квадратные уравнения и геометрия', de: 'Wurzeln, quadratische Gleichungen und Geometrie' },
    topics: [
        {
            id: 'g8-roots', 
            title: { ru: 'Квадратные корни', de: 'Quadratwurzeln' }, 
            icon: '√', 
            description: { ru: 'Понятие корня и его свойства', de: 'Wurzeleigenschaften' }, 
            color: '#00d4ff',
            levels: [
                {
                    id: 'g8-root-1', 
                    title: { ru: 'Вычисление и упрощение', de: 'Berechnung/Vereinfachung' }, 
                    description: { ru: 'Свойства корней', de: 'Wurzelgesetze' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g8r1-1', type: 'fill-blank', difficulty: 'easy', timeLimit: 20, points: 15, question: '√81 = ?', template: '___', correctAnswer: '9' },
                        { id: 'g8r1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 20, question: '√121 = ?', template: '___', correctAnswer: '11' },
                        { id: 'g8r1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 45, points: 30, question: '√(2² × 3²) = ?', template: '___', correctAnswer: '6' },
                        { id: 'g8r1-4', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 20, question: { ru: 'Между какими целыми числами находится √20?', de: 'Zwischen welchen ganzen Zahlen liegt √20?' }, options: [{ ru: '3 и 4', de: '3 und 4' }, { ru: '4 и 5', de: '4 und 5' }, { ru: '5 и 6', de: '5 und 6' }], correctIndex: 1 }
                    ],
                },
                {
                    id: 'g8-root-2', 
                    title: { ru: 'Иррациональные выражения', de: 'Irrationale Zahlen' }, 
                    description: { ru: 'Освобождение от корней', de: 'Wurzeln im Nenner' }, 
                    difficulty: 'hard', requiredLevel: 'g8-root-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g8r2-1', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 30, question: '√2 × √8 = ?', template: '___', correctAnswer: '4' },
                        { id: 'g8r2-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 35, question: { ru: '√(x²) для отрицательного x равно...', de: '√(x²) für negatives x ist...' }, options: ['x', '-x', 'x²', '±x'], correctIndex: 1 }
                    ]
                }
            ],
        },
        {
            id: 'g8-quadratics', 
            title: { ru: 'Квадратные уравнения', de: 'Quadratische Gleichungen' }, 
            icon: 'x²', 
            description: { ru: 'Дискриминант и корни', de: 'Behandlung der Diskriminante' }, 
            color: '#7c3aed',
            levels: [
                {
                    id: 'g8-qu-1', 
                    title: { ru: 'Дискриминант и корни', de: 'Diskriminante' }, 
                    description: { ru: 'Решение через формулу', de: 'Lösung via Formel' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g8q1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 60, points: 25, question: 'x² - 5x + 6 = 0. Сумма корней?', template: '___', correctAnswer: '5' },
                        { id: 'g8q1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 30, question: 'x² - 5x + 6 = 0. Произведение корней?', template: '___', correctAnswer: '6' },
                        { id: 'g8q1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 90, points: 30, question: { ru: 'Дискриминант уравнения x² + 2x - 3 = 0 равен:', de: 'Diskriminante der Gleichung x² + 2x - 3 = 0 ist:' }, options: ['4', '12', '16', '8'], correctIndex: 2 }
                    ],
                },
            ],
        },
        {
            id: 'g8-pythagoras', 
            title: { ru: 'Теорема Пифагора', de: 'Satz des Pythagoras' }, 
            icon: '📐', 
            description: { ru: 'Стороны прямоугольного треугольника', de: 'Seiten des rechtwinkligen Dreiecks' }, 
            color: '#10b981',
            levels: [
                {
                    id: 'g8-pyth-1', 
                    title: { ru: 'Гипотенуза и катеты', de: 'Hypotenuse und Katheten' }, 
                    description: 'a² + b² = c²', 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g8p1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 45, points: 25, question: { ru: 'Катеты 3 и 4. Гипотенуза = ?', de: 'Katheten 3 und 4. Hypotenuse = ?' }, template: '___', correctAnswer: '5' },
                        { id: 'g8p1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 35, question: { ru: 'Катет 5, гипотенуза 13. Второй катет = ?', de: 'Kathete 5, Hypotenuse 13. Zweite Kathete = ?' }, template: '___', correctAnswer: '12' },
                        { id: 'g8p1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 75, points: 40, question: { ru: 'В прямоугольном треугольнике гипотенуза 10, угол 30. Катет против угла 30?', de: 'Hypotenuse 10, Winkel 30. Kathete gegenüber?' }, options: ['5', '8', '10', '12'], correctIndex: 0 }
                    ],
                },
            ],
        },
    ],
};

export default grade8;
