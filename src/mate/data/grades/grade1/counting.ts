import type { Topic } from '../../types';

export const countingTopic: Topic = {
    id: 'g1-counting',
    title: { ru: 'Счёт до 20', de: 'Zählen bis 20' },
    icon: '🔢',
    description: { ru: 'Считаем предметы, учимся складывать и вычитать', de: 'Gegenstände zählen, Addition und Subtraktion lernen' },
    color: '#ff6b9d',
    levels: [
        {
            id: 'g1-cnt-1', 
            title: { ru: 'Считаем до 5', de: 'Zählen bis 5' }, 
            description: { ru: 'Посчитай предметы', de: 'Zähle die Gegenstände' }, 
            difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1c1-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Сколько яблок? 🍎🍎🍎', de: 'Wie viele Äpfel? 🍎🍎🍎' }, options: ['2', '3', '4', '5'], correctIndex: 1, hint: { ru: 'Считай каждое яблоко!', de: 'Zähle jeden Apfel!' } },
                { id: 'g1c1-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Сколько звёзд? ⭐⭐⭐⭐⭐', de: 'Wie viele Sterne? ⭐⭐⭐⭐⭐' }, options: ['3', '4', '5', '6'], correctIndex: 2 },
                { id: 'g1c1-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Сколько мячей? ⚽⚽', de: 'Wie viele Bälle? ⚽⚽' }, options: ['1', '2', '3', '4'], correctIndex: 1 },
                { id: 'g1c1-04', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Сколько котиков? 🐱🐱🐱🐱', de: 'Wie viele Katzen? 🐱🐱🐱🐱' }, options: ['2', '3', '4', '5'], correctIndex: 2 },
                { 
                    id: 'g1c1-05', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда или ложь?', de: 'Wahr oder Falsch?' }, 
                    statement: { ru: 'На картинке 1 солнце ☀️', de: 'Auf dem Bild ist 1 Sonne ☀️' }, isTrue: true 
                },
                { id: 'g1c1-06', type: 'multiple-choice', difficulty: 'easy', timeLimit: 25, points: 10, question: { ru: 'Сколько бабочек? 🦋🦋🦋', de: 'Wie viele Schmetterlinge? 🦋🦋🦋' }, options: ['2', '3', '4', '5'], correctIndex: 1 },
                { 
                    id: 'g1c1-07', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Покажи число 4', de: 'Zeige die Zahl 4' }, 
                    options: ['🍎🍎🍎', '🍎🍎🍎🍎', '🍎🍎🍎🍎🍎', '🍎🍎'], correctIndex: 1 
                },
            ],
        },
        {
            id: 'g1-cnt-2', 
            title: { ru: 'Считаем до 10', de: 'Zählen bis 10' }, 
            description: { ru: 'Числа от 6 до 10', de: 'Zahlen von 6 bis 10' }, 
            difficulty: 'easy', requiredLevel: 'g1-cnt-1', starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1c2-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Сколько цветков? 🌸🌸🌸🌸🌸🌸🌸', de: 'Wie viele Blumen? 🌸🌸🌸🌸🌸🌸🌸' }, options: ['5', '6', '7', '8'], correctIndex: 2 },
                { id: 'g1c2-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Продолжи счёт: 5, 6, 7, ?, 9', de: 'Zähle weiter: 5, 6, 7, ?, 9' }, options: ['6', '7', '8', '9'], correctIndex: 2 },
                { id: 'g1c2-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Какое число идёт после 7?', de: 'Welche Zahl kommt nach 7?' }, options: ['6', '7', '8', '9'], correctIndex: 2 },
                { id: 'g1c2-04', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Какое число стоит перед 10?', de: 'Welche Zahl steht vor 10?' }, options: ['7', '8', '9', '11'], correctIndex: 2 },
                { 
                    id: 'g1c2-05', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда или ложь?', de: 'Wahr oder Falsch?' }, 
                    statement: { ru: '8 стоит между 7 и 9', de: '8 steht zwischen 7 und 9' }, isTrue: true 
                },
                { id: 'g1c2-06', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Сколько рыбок? 🐟🐟🐟🐟🐟🐟🐟🐟🐟', de: 'Wie viele Fische? 🐟🐟🐟🐟🐟🐟🐟🐟🐟' }, options: ['7', '8', '9', '10'], correctIndex: 2 },
                { id: 'g1c2-07', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Сколько пальцев на двух руках?', de: 'Wie viele Finger sind an zwei Händen?' }, options: ['5', '8', '10', '12'], correctIndex: 2 },
            ],
        },
        {
            id: 'g1-cnt-3', 
            title: { ru: 'Считаем до 20', de: 'Zählen bis 20' }, 
            description: { ru: 'Числа от 10 до 20', de: 'Zahlen von 10 bis 20' }, 
            difficulty: 'medium', requiredLevel: 'g1-cnt-2', starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1c3-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Продолжи: 10, 11, 12, ?, 14', de: 'Weiterzählen: 10, 11, 12, ?, 14' }, options: ['11', '12', '13', '15'], correctIndex: 2 },
                { id: 'g1c3-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Какое число идёт после 15?', de: 'Welche Zahl kommt nach 15?' }, options: ['14', '15', '16', '17'], correctIndex: 2 },
                { 
                    id: 'g1c3-03', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, 
                    question: { ru: 'Какое число пропущено: 17, 18, ?, 20', de: 'Welche Zahl fehlt: 17, 18, ?, 20' }, 
                    options: ['16', '17', '19', '20'], correctIndex: 2 
                },
                { 
                    id: 'g1c3-04', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда?', de: 'Wahr?' }, 
                    statement: { ru: '20 — это самое большое двузначное число до 20', de: '20 ist die größte zweistellige Zahl bis 20' }, isTrue: true 
                },
                { 
                    id: 'g1c3-05', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, 
                    question: { ru: 'Какое число больше: 14 или 17?', de: 'Welche Zahl ist größer: 14 oder 17?' }, 
                    options: ['14', '17', { ru: 'Одинаковые', de: 'Gleich' }], correctIndex: 1 
                },
                { 
                    id: 'g1c3-06', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, 
                    question: { ru: 'Счёт в обратном порядке: 20, 19, 18, ?, 16', de: 'Rückwärts zählen: 20, 19, 18, ?, 16' }, 
                    options: ['15', '16', '17', '19'], correctIndex: 2 
                },
                { 
                    id: 'g1c3-07', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, 
                    question: { ru: 'Между какими числами стоит 13?', de: 'Zwischen welchen Zahlen steht 13?' }, 
                    options: [{ ru: '11 и 14', de: '11 und 14' }, { ru: '12 и 14', de: '12 und 14' }, { ru: '12 и 15', de: '12 und 15' }, { ru: '10 и 15', de: '10 und 15' }], correctIndex: 1 
                },
            ],
        },
    ],
};
