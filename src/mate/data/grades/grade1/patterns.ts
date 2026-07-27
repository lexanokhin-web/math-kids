import type { Topic } from '../../types';

export const patternsTopic: Topic = {
    id: 'g1-patterns',
    title: { ru: 'Логические паттерны', de: 'Logische Muster' },
    icon: '🧩',
    description: { ru: 'Находим закономерности', de: 'Regelmäßigkeiten finden' },
    color: '#67e8f9',
    levels: [
        {
            id: 'g1-pat-1', 
            title: { ru: 'Продолжи ряд', de: 'Reihen fortsetzen' }, 
            description: { ru: 'Найди следующий элемент', de: 'Finde das nächste Element' }, 
            difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
            exercises: [
                { 
                    id: 'g1p1-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Что дальше? 🔴🔵🔴🔵🔴❓', de: 'Was kommt als Nächstes? 🔴🔵🔴🔵🔴❓' }, 
                    options: ['🔴', '🔵', '🟢', '🟡'], correctIndex: 1, 
                    hint: { ru: 'Цвета чередуются!', de: 'Die Farben wechseln sich ab!' } 
                },
                { 
                    id: 'g1p1-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Продолжи: 2, 4, 6, 8, ?', de: 'Setze fort: 2, 4, 6, 8, ?' }, 
                    options: ['9', '10', '11', '12'], correctIndex: 1, 
                    hint: { ru: 'Каждое число на 2 больше', de: 'Jede Zahl ist um 2 größer' } 
                },
                { 
                    id: 'g1p1-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Что дальше? 🔺🔺🔵🔺🔺🔵🔺🔺❓', de: 'Was kommt als Nächstes? 🔺🔺🔵🔺🔺🔵🔺🔺❓' }, 
                    options: ['🔺', '🔵', '🟡', '🔶'], correctIndex: 1 
                },
                { 
                    id: 'g1p1-04', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Продолжи: 1, 3, 5, 7, ?', de: 'Setze fort: 1, 3, 5, 7, ?' }, 
                    options: ['8', '9', '10', '11'], correctIndex: 1, 
                    hint: { ru: 'Прибавляем 2 каждый раз', de: 'Immer +2 addieren' } 
                },
                { 
                    id: 'g1p1-05', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Что дальше? ⬆️➡️⬇️⬅️⬆️➡️⬇️❓', de: 'Was kommt als Nächstes? ⬆️➡️⬇️⬅️⬆️➡️⬇️❓' }, 
                    options: ['⬆️', '➡️', '⬅️', '⬇️'], correctIndex: 2 
                },
                { 
                    id: 'g1p1-06', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Продолжи: 10, 20, 30, ?', de: 'Setze fort: 10, 20, 30, ?' }, 
                    options: ['35', '40', '45', '50'], correctIndex: 1, 
                    hint: { ru: 'Прибавляем 10', de: 'Immer +10 addieren' } 
                },
                { 
                    id: 'g1p1-07', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Что лишнее? 2, 4, 6, 9, 8, 10', de: 'Was passt nicht? 2, 4, 6, 9, 8, 10' }, 
                    options: ['2', '4', '9', '10'], correctIndex: 2, 
                    hint: { ru: 'Все числа чётные, кроме одного!', de: 'Alle Zahlen sind gerade, außer einer!' } 
                },
            ],
        },
        {
            id: 'g1-pat-2', 
            title: { ru: 'Сложные паттерны', de: 'Schwere Muster' }, 
            description: { ru: 'Задания посложнее', de: 'Schwierigere Aufgaben' }, 
            difficulty: 'medium', requiredLevel: 'g1-pat-1', starThresholds: [40, 65, 90],
            exercises: [
                { 
                    id: 'g1p2-01', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, 
                    question: { ru: 'Что дальше? 1, 1, 2, 1, 1, 2, 1, 1, ?', de: 'Was kommt als Nächstes? 1, 1, 2, 1, 1, 2, 1, 1, ?' }, 
                    options: ['1', '2', '3', '0'], correctIndex: 1, 
                    hint: { ru: 'Группа повторяется: 1,1,2 — 1,1,2 — ...', de: 'Die Gruppe wiederholt sich: 1,1,2 — 1,1,2 — ...' } 
                },
                { 
                    id: 'g1p2-02', type: 'multiple-choice', difficulty: 'medium', timeLimit: 40, points: 15, 
                    question: { ru: 'Продолжи: 1, 2, 4, 7, 11, ?', de: 'Setze fort: 1, 2, 4, 7, 11, ?' }, 
                    options: ['14', '15', '16', '17'], correctIndex: 2, 
                    hint: { ru: 'Разница растёт: +1, +2, +3, +4, +5', de: 'Der Unterschied wächst: +1, +2, +3, +4, +5' } 
                },
                { 
                    id: 'g1p2-03', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, 
                    question: { ru: 'Какой фигуры не хватает: 🔴🔵🟢, 🔴🔵🟢, 🔴❓🟢', de: 'Welche Figur fehlt: 🔴🔵🟢, 🔴🔵🟢, 🔴❓🟢' }, 
                    options: ['🔴', '🔵', '🟢', '🟡'], correctIndex: 1 
                },
                { 
                    id: 'g1p2-04', type: 'multiple-choice', difficulty: 'medium', timeLimit: 40, points: 15, 
                    question: { ru: 'Продолжи: 20, 18, 16, 14, ?', de: 'Setze fort: 20, 18, 16, 14, ?' }, 
                    options: ['10', '11', '12', '13'], correctIndex: 2, 
                    hint: { ru: 'Вычитаем 2', de: 'Immer -2 abziehen' } 
                },
                { 
                    id: 'g1p2-05', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, 
                    question: { ru: 'Что лишнее? Кошка, собака, стул, попугай', de: 'Was passt nicht? Katze, Hund, Stuhl, Papagei' }, 
                    options: [{ ru: 'Кошка', de: 'Katze' }, { ru: 'Собака', de: 'Hund' }, { ru: 'Стул', de: 'Stuhl' }, { ru: 'Попугай', de: 'Papagei' }], correctIndex: 2, 
                    hint: { ru: 'Стул — не животное!', de: 'Ein Stuhl ist kein Tier!' } 
                },
                { 
                    id: 'g1p2-06', type: 'multiple-choice', difficulty: 'hard', timeLimit: 45, points: 25, 
                    question: { ru: 'Найди закономерность: 1, 4, 9, 16, ?', de: 'Finde das Muster: 1, 4, 9, 16, ?' }, 
                    options: ['20', '24', '25', '30'], correctIndex: 2, 
                    hint: { ru: '1=1×1, 4=2×2, 9=3×3, 16=4×4, ?=5×5', de: '1=1×1, 4=2×2, 9=3×3, 16=4×4, ?=5×5' } 
                },
            ],
        },
    ],
};
