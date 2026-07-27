import type { Topic } from '../../types';

export const additionTopic: Topic = {
    id: 'g1-addition',
    title: { ru: 'Сложение', de: 'Addition' },
    icon: '➕',
    description: { ru: 'Учимся складывать числа', de: 'Zahlen addieren lernen' },
    color: '#4ade80',
    levels: [
        {
            id: 'g1-add-1', 
            title: { ru: 'Сложение до 5', de: 'Addition bis 5' }, 
            description: { ru: 'Самые простые примеры', de: 'Einfachste Aufgaben' }, 
            difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1a1-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '1 + 1 = ?', options: ['1', '2', '3', '4'], correctIndex: 1 },
                { id: 'g1a1-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '2 + 1 = ?', options: ['2', '3', '4', '5'], correctIndex: 1 },
                { id: 'g1a1-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '1 + 2 = ?', options: ['2', '3', '4', '5'], correctIndex: 1 },
                { id: 'g1a1-04', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '2 + 2 = ?', options: ['3', '4', '5', '6'], correctIndex: 1 },
                { id: 'g1a1-05', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '3 + 2 = ?', options: ['4', '5', '6', '7'], correctIndex: 1 },
                { id: 'g1a1-06', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, question: { ru: 'Правда?', de: 'Wahr?' }, statement: '2 + 3 = 5', isTrue: true },
                { 
                    id: 'g1a1-07', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Какое число прибавили? ___ + 1 = 4', de: 'Welche Zahl wurde addiert? ___ + 1 = 4' }, 
                    options: ['2', '3', '4', '5'], correctIndex: 1, 
                    hint: { ru: 'Какое число + 1 = 4?', de: 'Welche Zahl + 1 = 4?' } 
                },
            ],
        },
        {
            id: 'g1-add-2', 
            title: { ru: 'Сложение до 10', de: 'Addition bis 10' }, 
            description: { ru: 'Складываем числа побольше', de: 'Größere Zahlen addieren' }, 
            difficulty: 'easy', requiredLevel: 'g1-add-1', starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1a2-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '3 + 4 = ?', options: ['5', '6', '7', '8'], correctIndex: 2 },
                { id: 'g1a2-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: '5 + 3 = ?', options: ['6', '7', '8', '9'], correctIndex: 2 },
                { id: 'g1a2-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '4 + 6 = ?', options: ['8', '9', '10', '11'], correctIndex: 2 },
                { id: 'g1a2-04', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: '2 + 7 = ?', options: ['7', '8', '9', '10'], correctIndex: 2 },
                { id: 'g1a2-05', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: '6 + 4 = ?', options: ['8', '9', '10', '11'], correctIndex: 2 },
                { 
                    id: 'g1a2-06', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, 
                    question: { ru: '4 + ? = 9. Найди пропуск', de: '4 + ? = 9. Was fehlt?' }, 
                    options: ['3', '4', '5', '6'], correctIndex: 2 
                },
                { id: 'g1a2-07', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, question: { ru: 'Правда?', de: 'Wahr?' }, statement: '3 + 7 = 10', isTrue: true },
                { 
                    id: 'g1a2-08', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, 
                    question: { ru: '? + 6 = 10. Найди число', de: '? + 6 = 10. Finde die Zahl' }, 
                    options: ['3', '4', '5', '6'], correctIndex: 1 
                },
            ],
        },
        {
            id: 'g1-add-3', 
            title: { ru: 'Сложение до 20', de: 'Addition bis 20' }, 
            description: { ru: 'Переходим через десяток', de: 'Zehnerübergang' }, 
            difficulty: 'medium', requiredLevel: 'g1-add-2', starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1a3-01', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: '8 + 5 = ?', options: ['11', '12', '13', '14'], correctIndex: 2 },
                { id: 'g1a3-02', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, question: '9 + 4 = ?', options: ['11', '12', '13', '14'], correctIndex: 2 },
                { id: 'g1a3-03', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: '7 + 6 = ?', options: ['11', '12', '13', '14'], correctIndex: 2 },
                { id: 'g1a3-04', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, question: '10 + 8 = ?', options: ['16', '17', '18', '19'], correctIndex: 2 },
                { 
                    id: 'g1a3-05', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, 
                    question: { ru: '? + 7 = 15. Найди число', de: '? + 7 = 15. Finde die Zahl' }, 
                    options: ['6', '7', '8', '9'], correctIndex: 2 
                },
                { id: 'g1a3-06', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: '9 + 9 = ?', options: ['16', '17', '18', '19'], correctIndex: 2 },
                { id: 'g1a3-07', type: 'true-false', difficulty: 'medium', timeLimit: 20, points: 10, question: { ru: 'Правда?', de: 'Wahr?' }, statement: '8 + 8 = 16', isTrue: true },
                { 
                    id: 'g1a3-08', type: 'multiple-choice', difficulty: 'hard', timeLimit: 40, points: 20, 
                    question: { ru: 'У Маши 7 конфет, у Пети 6. Сколько всего?', de: 'Masha hat 7 Bonbons, Peter hat 6. Wie viele insgesamt?' }, 
                    options: ['11', '12', '13', '14'], correctIndex: 2 
                },
            ],
        },
    ],
};
