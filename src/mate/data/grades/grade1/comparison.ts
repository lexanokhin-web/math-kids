import type { Topic } from '../../types';

export const comparisonTopic: Topic = {
    id: 'g1-comparison',
    title: { ru: 'Сравнение чисел', de: 'Zahlenvergleich' },
    icon: '⚖️',
    description: { ru: 'Больше, меньше или равно?', de: 'Größer, kleiner oder gleich?' },
    color: '#fbbf24',
    levels: [
        {
            id: 'g1-cmp-1', 
            title: { ru: 'Больше или меньше?', de: 'Größer oder kleiner?' }, 
            description: { ru: 'Сравниваем числа до 10', de: 'Zahlen bis 10 vergleichen' }, 
            difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
            exercises: [
                { 
                    id: 'g1cm1-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Что больше: 3 или 5?', de: 'Was ist größer: 3 oder 5?' }, 
                    options: ['3', '5', { ru: 'Равны', de: 'Gleich' }], correctIndex: 1 
                },
                { 
                    id: 'g1cm1-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Что меньше: 7 или 4?', de: 'Was ist kleiner: 7 oder 4?' }, 
                    options: ['7', '4', { ru: 'Равны', de: 'Gleich' }], correctIndex: 1 
                },
                { 
                    id: 'g1cm1-03', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда?', de: 'Wahr?' }, 
                    statement: { ru: '6 больше, чем 8', de: '6 ist größer als 8' }, isTrue: false, 
                    hint: { ru: '6 меньше 8!', de: '6 ist kleiner als 8!' } 
                },
                { 
                    id: 'g1cm1-04', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда?', de: 'Wahr?' }, 
                    statement: { ru: '9 больше, чем 2', de: '9 ist größer als 2' }, isTrue: true 
                },
                { 
                    id: 'g1cm1-05', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, 
                    question: { ru: 'Выбери правильный знак: 4 ☐ 7', de: 'Wähle das richtige Zeichen: 4 ☐ 7' }, 
                    options: ['>', '<', '='], correctIndex: 1 
                },
                { 
                    id: 'g1cm1-06', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, 
                    question: { ru: 'Выбери правильный знак: 5 ☐ 5', de: 'Wähle das richtige Zeichen: 5 ☐ 5' }, 
                    options: ['>', '<', '='], correctIndex: 2 
                },
                { 
                    id: 'g1cm1-07', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, 
                    question: { ru: 'Выбери правильный знак: 10 ☐ 3', de: 'Wähle das richtige Zeichen: 10 ☐ 3' }, 
                    options: ['>', '<', '='], correctIndex: 0 
                },
                { 
                    id: 'g1cm1-08', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, 
                    question: { ru: 'Какое число самое маленькое: 8, 3, 6, 1?', de: 'Welche Zahl ist am kleinsten: 8, 3, 6, 1?' }, 
                    options: ['8', '3', '6', '1'], correctIndex: 3 
                },
            ],
        },
        {
            id: 'g1-cmp-2', 
            title: { ru: 'Сравниваем до 20', de: 'Vergleichen bis 20' }, 
            description: { ru: 'Работаем с числами побольше', de: 'Mit größeren Zahlen arbeiten' }, 
            difficulty: 'medium', requiredLevel: 'g1-cmp-1', starThresholds: [50, 75, 95],
            exercises: [
                { 
                    id: 'g1cm2-01', type: 'multiple-choice', difficulty: 'medium', timeLimit: 25, points: 15, 
                    question: { ru: 'Что больше: 14 или 12?', de: 'Was ist größer: 14 oder 12?' }, 
                    options: ['14', '12', { ru: 'Равны', de: 'Gleich' }], correctIndex: 0 
                },
                { 
                    id: 'g1cm2-02', type: 'multiple-choice', difficulty: 'medium', timeLimit: 25, points: 15, 
                    question: { ru: 'Выбери правильный знак: 11 ☐ 18', de: 'Wähle das richtige Zeichen: 11 ☐ 18' }, 
                    options: ['>', '<', '='], correctIndex: 1 
                },
                { 
                    id: 'g1cm2-03', type: 'true-false', difficulty: 'medium', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда?', de: 'Wahr?' }, 
                    statement: { ru: '15 меньше, чем 13', de: '15 ist kleiner als 13' }, isTrue: false 
                },
                { 
                    id: 'g1cm2-04', type: 'multiple-choice', difficulty: 'medium', timeLimit: 25, points: 15, 
                    question: { ru: 'Расставь по порядку: 17, 12, 19, 14. Какое первое?', de: 'Sortiere: 17, 12, 19, 14. Welche ist die erste?' }, 
                    options: ['17', '12', '19', '14'], correctIndex: 1, 
                    hint: { ru: 'Самое маленькое число ставим первым!', de: 'Die kleinste Zahl kommt zuerst!' } 
                },
                { 
                    id: 'g1cm2-05', type: 'multiple-choice', difficulty: 'medium', timeLimit: 25, points: 15, 
                    question: { ru: 'Какое число самое большое: 11, 20, 16, 9?', de: 'Welche Zahl ist am größten: 11, 20, 16, 9?' }, 
                    options: ['11', '20', '16', '9'], correctIndex: 1 
                },
                { 
                    id: 'g1cm2-06', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, 
                    question: { ru: 'Число больше 14 но меньше 16. Какое?', de: 'Welche Zahl ist größer als 14, aber kleiner als 16?' }, 
                    options: ['13', '14', '15', '16'], correctIndex: 2 
                },
                { 
                    id: 'g1cm2-07', type: 'true-false', difficulty: 'medium', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда?', de: 'Wahr?' }, 
                    statement: { ru: '19 — самое большое число до 20', de: '19 ist die größte Zahl bis 20' }, isTrue: true 
                },
            ],
        },
    ],
};
