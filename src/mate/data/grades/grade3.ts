import type { GradeConfig } from '../types';

const grade3: GradeConfig = {
    id: 3, 
    label: { ru: '3 класс', de: '3. Klasse' }, 
    emoji: '🎯', 
    description: { ru: 'Умножение, деление до 100, числа до 1000, величины и логика', de: 'Multiplikation, Division bis 100, Zahlen bis 1000 und Logik' },
    topics: [
        {
            id: 'g3-multiply', 
            title: { ru: 'Таблица умножения', de: 'Einmaleins' }, 
            icon: '✖️', 
            description: { ru: 'Учим таблицу умножения и деления наизусть', de: 'Multiplikation und Division auswendig lernen' }, 
            color: '#ff6b9d',
            levels: [
                {
                    id: 'g3-mul-1', 
                    title: { ru: 'Умножение на 2, 3, 4', de: 'Multiplikation mit 2, 3, 4' }, 
                    description: { ru: 'Базовые столбцы таблицы', de: 'Grundlagen des Einmaleins' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g3m1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 15, points: 10, question: '7 × 2 = ?', options: ['12', '14', '16', '18'], correctIndex: 1 },
                        { id: 'g3m1-2', type: 'fill-blank', difficulty: 'easy', timeLimit: 20, points: 10, question: { ru: 'Реши пример', de: 'Löse die Aufgabe' }, template: '6 × 4 = ___', correctAnswer: '24' },
                        { 
                            id: 'g3m1-3', type: 'match-pairs', difficulty: 'medium', timeLimit: 40, points: 20, 
                            question: { ru: 'Соедини пример с ответом', de: 'Verbinde Aufgabe und Antwort' }, 
                            pairs: [{ left: '8 × 3', right: '24' }, { left: '9 × 2', right: '18' }, { left: '7 × 4', right: '28' }] 
                        },
                        { id: 'g3m1-4', type: 'multiple-choice', difficulty: 'medium', timeLimit: 25, points: 15, question: '? × 3 = 27', options: ['7', '8', '9', '10'], correctIndex: 2 },
                    ],
                },
                {
                    id: 'g3-mul-2', 
                    title: { ru: 'Умножение на 5, 6, 7, 8, 9', de: 'Multiplikation mit 5 bis 9' }, 
                    description: { ru: 'Вся таблица умножения', de: 'Das komplette Einmaleins' }, 
                    difficulty: 'medium', requiredLevel: 'g3-mul-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g3m2-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 15, points: 15, question: '8 × 7 = ?', options: ['48', '54', '56', '64'], correctIndex: 2 },
                        { id: 'g3m2-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 25, points: 15, question: { ru: 'Реши', de: 'Löse' }, template: '9 × 6 = ___', correctAnswer: '54' },
                        { id: 'g3m2-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 20, points: 20, question: '9 × 8 = ?', options: ['72', '81', '64', '63'], correctIndex: 0 },
                        { id: 'g3m2-4', type: 'true-false', difficulty: 'medium', timeLimit: 15, points: 10, question: { ru: 'Верно ли?', de: 'Richtig?' }, statement: '7 × 6 = 42', isTrue: true },
                    ],
                },
            ],
        },
        {
            id: 'g3-numbers-1000', 
            title: { ru: 'Числа до 1000', de: 'Zahlen bis 1000' }, 
            icon: '🔢', 
            description: { ru: 'Сотни, десятки, единицы и счет до тысячи', de: 'Hunderter, Zehner und Einer' }, 
            color: '#3b82f6',
            levels: [
                {
                    id: 'g3-num-1', 
                    title: { ru: 'Разряды чисел', de: 'Stellenwerte' }, 
                    description: { ru: 'Понимаем структуру трехзначных чисел', de: 'Dreistellige Zahlen verstehen' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { 
                            id: 'g3n1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                            question: { ru: 'Какое число состоит из 3 сотен, 5 десятков и 2 единиц?', de: 'Welche Zahl hat 3 Hunderter, 5 Zehner und 2 Einer?' }, 
                            options: ['325', '352', '532', '253'], correctIndex: 1 
                        },
                        { 
                            id: 'g3n1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 15, 
                            question: { ru: 'Сколько всего десятков в числе 240?', de: 'Wie viele Zehner sind in 240?' }, 
                            template: { ru: '___ десятков', de: '___ Zehner' }, correctAnswer: '24' 
                        },
                        { 
                            id: 'g3n1-3', type: 'drag-drop', difficulty: 'medium', timeLimit: 45, points: 20, 
                            question: { ru: 'Расположи числа от меньшего к большему', de: 'Sortiere von klein nach groß' }, 
                            items: ['405', '450', '504', '540'], correctOrder: ['405', '450', '504', '540'] 
                        },
                    ],
                },
                {
                    id: 'g3-num-2', 
                    title: { ru: 'Сложение и вычитание в пределах 1000', de: 'Addition und Subtraktion bis 1000' }, 
                    description: { ru: 'Устные и письменные вычисления', de: 'Kopfrechnen und schriftliches Rechnen' }, 
                    difficulty: 'medium', requiredLevel: 'g3-num-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g3n2-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 40, points: 15, question: '350 + 200 = ?', template: '___', correctAnswer: '550' },
                        { id: 'g3n2-2', type: 'multiple-choice', difficulty: 'medium', timeLimit: 40, points: 15, question: '800 - 150 = ?', options: ['600', '650', '700', '750'], correctIndex: 1 },
                        { id: 'g3n2-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 50, points: 20, question: '427 + 153 = ?', options: ['570', '580', '590', '600'], correctIndex: 1 },
                    ],
                },
            ],
        },
        {
            id: 'g3-geometry', 
            title: { ru: 'Геометрия', de: 'Geometrie' }, 
            icon: '📐', 
            description: { ru: 'Периметр, площадь, углы', de: 'Umfang, Fläche, Winkel' }, 
            color: '#10b981',
            levels: [
                {
                    id: 'g3-geo-1', 
                    title: { ru: 'Периметр многоугольника', de: 'Umfang von Vielecken' }, 
                    description: { ru: 'Находим сумму длин сторон', de: 'Die Summe aller Seiten finden' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { 
                            id: 'g3g1-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 40, points: 15, 
                            question: { ru: 'Периметр квадрата со стороной 5 см равен...', de: 'Der Umfang eines Quadrats mit 5 cm Seite ist...' }, 
                            options: [{ ru: '10 см', de: '10 cm' }, { ru: '20 см', de: '20 cm' }, { ru: '25 см', de: '25 cm' }, { ru: '15 см', de: '15 cm' }], correctIndex: 1 
                        },
                        { 
                            id: 'g3g1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 45, points: 20, 
                            question: { ru: 'Периметр прямоугольника со сторонами 6 см и 4 см равен ___ см', de: 'Umfang eines Rechtecks mit 6 cm und 4 cm ist ___ cm' }, 
                            template: '___', correctAnswer: '20' 
                        },
                        { 
                            id: 'g3g1-3', type: 'true-false', difficulty: 'medium', timeLimit: 30, points: 15, 
                            question: { ru: 'Верно ли?', de: 'Richtig?' }, 
                            statement: { ru: 'У треугольника всегда 3 угла', de: 'Ein Dreieck hat immer 3 Winkel' }, isTrue: true 
                        },
                    ],
                },
            ],
        },
        {
            id: 'g3-logic', 
            title: { ru: 'Логические задачи', de: 'Logikrätsel' }, 
            icon: '🧠', 
            description: { ru: 'Задачи на смекалку и олимпиадные темы', de: 'Denksport und Olympiade-Themen' }, 
            color: '#f59e0b',
            levels: [
                {
                    id: 'g3-log-1', 
                    title: { ru: 'Хитрые задачки', de: 'Knifflige Aufgaben' }, 
                    description: { ru: 'Думай нестандартно!', de: 'Denk mal um die Ecke!' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { 
                            id: 'g3l1-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 45, points: 20, 
                            question: { ru: 'Крышка стола имеет 4 угла. Один угол отпилили. Сколько углов стало?', de: 'Ein Tisch hat 4 Ecken. Eine wird abgesägt. Wie viele Ecken bleiben?' }, 
                            options: ['3', '4', '5', '6'], correctIndex: 2, 
                            hint: { ru: 'Попробуй нарисовать!', de: 'Versuch es zu malen!' } 
                        },
                        { 
                            id: 'g3l1-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 50, points: 25, 
                            question: { ru: 'Тройка лошадей пробежала 15 км. Сколько км пробежала каждая лошадь?', de: 'Drei Pferde rannten 15 km weit. Wie viele km rannten jedes Pferd?' }, 
                            options: ['5', '10', '15', '45'], correctIndex: 2 
                        },
                        { 
                            id: 'g3l1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, 
                            question: { ru: 'В корзине 5 яблок. Как разделить их между 5 девочками так, чтобы каждая получила по яблоку, и одно яблоко осталось в корзине?', de: '5 Äpfel im Korb für 5 Kinder. Jeder einen Apfel, aber einer bleibt im Korb - wie?' }, 
                            options: [{ ru: 'Невозможно', de: 'Unmöglich' }, { ru: 'Дать одной яблоко вместе с корзиной', de: 'Eines kriegt den Apfel im Korb' }, { ru: 'Разрезать яблоки', de: 'Äpfel schneiden' }, { ru: 'Раздать 4 яблока', de: 'Nur 4 verteilen' }], correctIndex: 1 
                        },
                    ],
                },
            ],
        },
    ],
};

export default grade3;
