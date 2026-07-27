import type { GradeConfig } from '../types';

const grade2: GradeConfig = {
    id: 2,
    label: { ru: '2 класс', de: '2. Klasse' },
    emoji: '🌟',
    description: { ru: 'Сложение и вычитание до 100, введение в умножение, величины и логика', de: 'Addition und Subtraktion bis 100, Einführung in die Multiplikation' },
    topics: [
        {
            id: 'g2-addition',
            title: { ru: 'Сложение до 100', de: 'Addition bis 100' },
            icon: '➕',
            description: { ru: 'Складываем двузначные числа с переходом и без', de: 'Zweistellige Zahlen addieren' },
            color: '#ff6b9d',
            levels: [
                {
                    id: 'g2-add-1', 
                    title: { ru: 'Десятки и единицы', de: 'Zehner und Einer' }, 
                    description: { ru: 'Разрядный состав чисел', de: 'Stellenwerte der Zahlen' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g2a1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Сколько десятков в числе 47?', de: 'Wie viele Zehner hat die Zahl 47?' }, options: ['3', '4', '5', '7'], correctIndex: 1 },
                        { id: 'g2a1-2', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: '3 десятка и 5 единиц — какое число?', de: '3 Zehner und 5 Einer — welche Zahl?' }, options: ['30', '35', '53', '305'], correctIndex: 1 },
                        { id: 'g2a1-3', type: 'fill-blank', difficulty: 'easy', timeLimit: 25, points: 10, question: { ru: 'Заполни пропуск', de: 'Fülle die Lücke' }, template: '20 + 30 = ___', correctAnswer: '50' },
                        { id: 'g2a1-4', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, question: { ru: '44 + ? = 67. Найди число', de: '44 + ? = 67. Finde die Zahl' }, options: ['21', '22', '23', '24'], correctIndex: 2 },
                        { id: 'g2a1-5', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, question: { ru: 'Правда или ложь?', de: 'Wahr oder Falsch?' }, statement: '50 + 30 = 90', isTrue: false, hint: '50 + 30 = 80' },
                        { id: 'g2a1-6', type: 'match-pairs', difficulty: 'medium', timeLimit: 40, points: 20, question: { ru: 'Соедини пары', de: 'Verbinde die Paare' }, pairs: [{ left: '10+10', right: '20' }, { left: '30+5', right: '35' }, { left: '40+40', right: '80' }] },
                    ],
                },
                {
                    id: 'g2-add-2', 
                    title: { ru: 'Переход через десяток', de: 'Zehnerübergang' }, 
                    description: { ru: 'Примеры вида 38 + 5', de: 'Aufgaben wie 38 + 5' }, 
                    difficulty: 'medium', requiredLevel: 'g2-add-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g2a2-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: '38 + 7 = ?', options: ['44', '45', '46', '43'], correctIndex: 1 },
                        { id: 'g2a2-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 35, points: 15, question: { ru: 'Реши пример', de: 'Löse die Aufgabe' }, template: '49 + 6 = ___', correctAnswer: '55' },
                        { id: 'g2a2-3', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: '57 + 28 = ?', options: ['75', '85', '95', '83'], correctIndex: 1 },
                        { id: 'g2a2-4', type: 'multiple-choice', difficulty: 'hard', timeLimit: 40, points: 20, question: { ru: 'Найди пропущенное число: ? + 47 = 91', de: 'Finde die fehlende Zahl: ? + 47 = 91' }, options: ['42', '43', '44', '45'], correctIndex: 2 },
                    ],
                },
            ],
        },
        {
            id: 'g2-subtraction', 
            title: { ru: 'Вычитание до 100', de: 'Subtraktion bis 100' }, 
            icon: '➖', 
            description: { ru: 'Учимся вычитать двузначные числа', de: 'Zweistellige Zahlen subtrahieren' }, 
            color: '#c084fc',
            levels: [
                {
                    id: 'g2-sub-1', 
                    title: { ru: 'Простое вычитание', de: 'Einfache Subtraktion' }, 
                    description: { ru: 'Вычитаем без перехода', de: 'Subtraktion ohne Übergang' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g2s1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: '68 - 23 = ?', options: ['43', '44', '45', '46'], correctIndex: 2 },
                        { id: 'g2s1-2', type: 'fill-blank', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Реши', de: 'Löse' }, template: '99 - 33 = ___', correctAnswer: '66' },
                        { id: 'g2s1-3', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, question: { ru: 'Верно ли?', de: 'Richtig?' }, statement: '75 - 40 = 35', isTrue: true },
                        { id: 'g2s1-4', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, question: '80 - ? = 37', options: ['41', '42', '43', '44'], correctIndex: 2 },
                    ],
                },
            ],
        },
        {
            id: 'g2-multiply-intro', 
            title: { ru: 'Умножение', de: 'Multiplikation' }, 
            icon: '✖️', 
            description: { ru: 'Смысл умножения и таблица на 2, 3', de: 'Bedeutung der Multiplikation' }, 
            color: '#67e8f9',
            levels: [
                {
                    id: 'g2-mul-1', 
                    title: { ru: 'Суть умножения', de: 'Kern der Multiplikation' }, 
                    description: { ru: 'Замена сложения умножением', de: 'Addition durch Multiplikation ersetzen' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g2m1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: '3 × 2 — это то же самое, что...', de: '3 × 2 ist das Gleiche wie...' }, options: ['3 + 3', '2 + 2', '3 + 2', '2 + 2 + 2'], correctIndex: 0 },
                        { id: 'g2m1-2', type: 'fill-blank', difficulty: 'easy', timeLimit: 30, points: 10, question: '5 + 5 + 5 = ? × 3', template: '5 + 5 + 5 = ___ × 3', correctAnswer: '5' },
                        { id: 'g2m1-3', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: '2 × 8 = ?', options: ['14', '16', '18', '20'], correctIndex: 1 },
                        { id: 'g2m1-4', type: 'match-pairs', difficulty: 'medium', timeLimit: 45, points: 20, question: { ru: 'Найди пары', de: 'Finde die Paare' }, pairs: [{ left: '2 × 5', right: '10' }, { left: '3 × 4', right: '12' }, { left: '2 × 9', right: '18' }] },
                    ],
                },
            ],
        },
        {
            id: 'g2-measurement', 
            title: { ru: 'Величины', de: 'Größen' }, 
            icon: '📏', 
            description: { ru: 'Длина, время и масса', de: 'Länge, Zeit und Gewicht' }, 
            color: '#4ade80',
            levels: [
                {
                    id: 'g2-meas-1', 
                    title: { ru: 'Сантиметры и метры', de: 'Zentimeter und Meter' }, 
                    description: { ru: 'Перевод и сравнение единиц длины', de: 'Längeneinheiten vergleichen' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g2me1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'В 1 метре сколько сантиметров?', de: 'Wie viele Zentimeter sind in 1 Meter?' }, options: ['10', '50', '100', '1000'], correctIndex: 2 },
                        { id: 'g2me1-2', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Что длиннее?', de: 'Was ist länger?' }, options: [{ ru: '50 см', de: '50 cm' }, { ru: '1 м', de: '1 m' }, { ru: '90 см', de: '90 cm' }], correctIndex: 1 },
                        { id: 'g2me1-3', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 15, question: { ru: '2 дм = ? см', de: '2 dm = ? cm' }, template: { ru: '2 дм = ___ см', de: '2 dm = ___ cm' }, correctAnswer: '20' },
                    ],
                },
                {
                    id: 'g2-meas-2', 
                    title: { ru: 'Время (часы и минуты)', de: 'Zeit (Stunden und Minuten)' }, 
                    description: { ru: 'Учимся определять время', de: 'Uhrzeit bestimmen lernen' }, 
                    difficulty: 'medium', requiredLevel: 'g2-meas-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g2me2-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: { ru: 'В 1 часе сколько минут?', de: 'Wie viele Minuten sind in 1 Stunde?' }, options: ['30', '60', '100', '24'], correctIndex: 1 },
                        { id: 'g2me2-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 40, points: 20, question: { ru: 'Мультфильм начался в 14:00 и шел 30 минут. Когда он закончился?', de: 'Ein Film begann um 14:00 und dauerte 30 Minuten. Wann endete er?' }, options: ['14:20', '14:30', '15:00', '14:40'], correctIndex: 1 },
                    ],
                },
            ],
        },
        {
            id: 'g2-logic', 
            title: { ru: 'Логика и Смекалка', de: 'Logik und Köpfchen' }, 
            icon: '🧠', 
            description: { ru: 'Задачи Кенгуру и олимпиадные хитрости', de: 'Olympiade-Aufgaben' }, 
            color: '#facc15',
            levels: [
                {
                    id: 'g2-log-1', 
                    title: { ru: 'Закономерности', de: 'Gesetzmäßigkeiten' }, 
                    description: { ru: 'Продолжи ряд или найди лишнее', de: 'Reihen fortsetzen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g2l1-1', type: 'drag-drop', difficulty: 'medium', timeLimit: 45, points: 20, question: { ru: 'Продолжи ряд чисел: 2, 4, 6...', de: 'Setze die Zahlenreihe fort: 2, 4, 6...' }, items: ['8', '10', '12'], correctOrder: ['8', '10', '12'] },
                        { id: 'g2l1-2', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, question: { ru: 'У паука 8 лапок, а у жука — 6. Сколько лапок у двух пауков?', de: 'Eine Spinne hat 8 Beine, ein Käfer 6. Wie viele Beine haben zwei Spinnen?' }, options: ['12', '14', '16', '18'], correctIndex: 2 },
                        { id: 'g2l1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 45, points: 25, question: { ru: 'В семье 3 брата. У каждого брата по одной сестре. Сколько всего детей в семье?', de: 'Drei Brüder haben jeweils eine Schwester. Wie viele Kinder hat die Familie?' }, options: ['3', '4', '6', '5'], correctIndex: 1, hint: { ru: 'Сестра одна на всех братьев', de: 'Es ist dieselbe Schwester für alle Brüder' } },
                    ],
                },
            ],
        },
    ],
};

export default grade2;
