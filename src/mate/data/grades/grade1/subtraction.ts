import type { Topic } from '../../types';

export const subtractionTopic: Topic = {
    id: 'g1-subtraction',
    title: { ru: 'Вычитание', de: 'Subtraktion' },
    icon: '➖',
    description: { ru: 'Учимся вычитать числа', de: 'Zahlen subtrahieren lernen' },
    color: '#f97316',
    levels: [
        {
            id: 'g1-sub-1', 
            title: { ru: 'Вычитание до 5', de: 'Subtraktion bis 5' }, 
            description: { ru: 'Простые примеры', de: 'Einfache Aufgaben' }, 
            difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1s1-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '3 - 1 = ?', options: ['1', '2', '3', '4'], correctIndex: 1 },
                { id: 'g1s1-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '5 - 2 = ?', options: ['2', '3', '4', '5'], correctIndex: 1 },
                { id: 'g1s1-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '4 - 3 = ?', options: ['0', '1', '2', '3'], correctIndex: 1 },
                { id: 'g1s1-04', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '5 - 5 = ?', options: ['0', '1', '2', '5'], correctIndex: 0 },
                { id: 'g1s1-05', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, question: { ru: 'Правда?', de: 'Wahr?' }, statement: '4 - 2 = 2', isTrue: true },
                { 
                    id: 'g1s1-06', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: '5 - ? = 3. Какое число?', de: '5 - ? = 3. Welche Zahl?' }, 
                    options: ['1', '2', '3', '4'], correctIndex: 1 
                },
                { id: 'g1s1-07', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '5 - 4 = ?', options: ['0', '1', '2', '3'], correctIndex: 1 },
            ],
        },
        {
            id: 'g1-sub-2', 
            title: { ru: 'Вычитание до 10', de: 'Subtraktion bis 10' }, 
            description: { ru: 'Вычитаем из чисел до 10', de: 'Zahlen bis 10 subtrahieren' }, 
            difficulty: 'easy', requiredLevel: 'g1-sub-1', starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1s2-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '7 - 3 = ?', options: ['3', '4', '5', '6'], correctIndex: 1 },
                { id: 'g1s2-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: '10 - 4 = ?', options: ['4', '5', '6', '7'], correctIndex: 2 },
                { id: 'g1s2-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '8 - 5 = ?', options: ['2', '3', '4', '5'], correctIndex: 1 },
                { id: 'g1s2-04', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: '9 - 6 = ?', options: ['2', '3', '4', '5'], correctIndex: 1 },
                { 
                    id: 'g1s2-05', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, 
                    question: { ru: '10 - ? = 3. Какое число?', de: '10 - ? = 3. Welche Zahl?' }, 
                    options: ['5', '6', '7', '8'], correctIndex: 2 
                },
                { 
                    id: 'g1s2-06', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда?', de: 'Wahr?' }, 
                    statement: '10 - 6 = 5', isTrue: false, 
                    hint: { ru: '10 - 6 = 4, не 5!', de: '10 - 6 = 4, nicht 5!' } 
                },
                { id: 'g1s2-07', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '6 - 6 = ?', options: ['0', '1', '2', '6'], correctIndex: 0 },
                { 
                    id: 'g1s2-08', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, 
                    question: { ru: '? - 5 = 4. Какое число?', de: '? - 5 = 4. Welche Zahl?' }, 
                    options: ['7', '8', '9', '10'], correctIndex: 2 
                },
            ],
        },
        {
            id: 'g1-sub-3', 
            title: { ru: 'Вычитание до 20', de: 'Subtraktion bis 20' }, 
            description: { ru: 'Вычитаем из двузначных', de: 'Subtraktion von Zweistelligen' }, 
            difficulty: 'medium', requiredLevel: 'g1-sub-2', starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1s3-01', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: '15 - 7 = ?', options: ['6', '7', '8', '9'], correctIndex: 2 },
                { id: 'g1s3-02', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, question: '13 - 5 = ?', options: ['6', '7', '8', '9'], correctIndex: 2 },
                { id: 'g1s3-03', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: '18 - 9 = ?', options: ['7', '8', '9', '10'], correctIndex: 2 },
                { id: 'g1s3-04', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, question: '20 - 7 = ?', options: ['11', '12', '13', '14'], correctIndex: 2 },
                { 
                    id: 'g1s3-05', type: 'multiple-choice', difficulty: 'hard', timeLimit: 40, points: 20, 
                    question: { ru: '16 - ? = 8. Какое число?', de: '16 - ? = 8. Welche Zahl?' }, 
                    options: ['6', '7', '8', '9'], correctIndex: 2 
                },
                { id: 'g1s3-06', type: 'true-false', difficulty: 'medium', timeLimit: 20, points: 10, question: { ru: 'Правда?', de: 'Wahr?' }, statement: '14 - 6 = 8', isTrue: true },
                { 
                    id: 'g1s3-07', type: 'multiple-choice', difficulty: 'hard', timeLimit: 40, points: 20, 
                    question: { ru: 'Было 17 конфет, съели 9. Сколько осталось?', de: 'Es waren 17 Bonbons, 9 wurden gegessen. Wie viele bleiben?' }, 
                    options: ['6', '7', '8', '9'], correctIndex: 2 
                },
            ],
        },
    ],
};
