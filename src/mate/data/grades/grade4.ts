import type { GradeConfig } from '../types';

const grade4: GradeConfig = {
    id: 4, 
    label: { ru: '4 класс', de: '4. Klasse' }, 
    emoji: '🚀', 
    description: { ru: 'Многозначные числа, скорость, время, расстояние и логика', de: 'Mehrstellige Zahlen, Geschwindigkeit, Zeit und Logik' },
    topics: [
        {
            id: 'g4-numbers', 
            title: { ru: 'Многозначные числа', de: 'Mehrstellige Zahlen' }, 
            icon: '🔢', 
            description: { ru: 'Сложение и вычитание миллионов', de: 'Addition und Subtraktion von Millionen' }, 
            color: '#3b82f6',
            levels: [
                {
                    id: 'g4-num-1', 
                    title: { ru: 'Классы и разряды', de: 'Klassen und Stellenwerte' }, 
                    description: { ru: 'Тысячи, миллионы и их структура', de: 'Tausender, Millionen und ihre Struktur' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { 
                            id: 'g4n1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                            question: { ru: 'Как записывается число "Двести пять тысяч сорок"?', de: 'Wie schreibt man "Zweihundertfünftausendvierzig"?' }, 
                            options: ['205 040', '250 040', '205 400', '25 040'], correctIndex: 0 
                        },
                        { 
                            id: 'g4n1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 15, 
                            question: { ru: 'Сколько всего тысяч в числе 456 789?', de: 'Wie viele Tausender sind in 456.789?' }, 
                            template: { ru: '___ тысяч', de: '___ Tausend' }, correctAnswer: '456' 
                        },
                        { 
                            id: 'g4n1-3', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, 
                            question: { ru: 'Какое число больше: 1 002 000 или 1 020 000?', de: 'Welche Zahl ist größer: 1.002.000 oder 1.020.000?' }, 
                            options: ['1 002 000', '1 020 000', { ru: 'Они равны', de: 'Gleich' }], correctIndex: 1 
                        },
                        { 
                            id: 'g4n1-4', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 15, 
                            question: { ru: 'Разряд десятков миллионов в числе 123 456 789?', de: 'Welche Ziffer steht an der Zehnmillionen-Stelle in 123.456.789?' }, 
                            template: '___', correctAnswer: '2' 
                        },
                        { 
                            id: 'g4n1-5', type: 'multiple-choice', difficulty: 'hard', timeLimit: 40, points: 20, 
                            question: { ru: 'Округли 4 567 до тысяч', de: 'Runde 4.567 auf Tausender' }, 
                            options: ['4 000', '5 000', '4 500', '4 600'], correctIndex: 1 
                        }
                    ],
                },
                {
                    id: 'g4-num-2', 
                    title: { ru: 'Сравнение и округление', de: 'Vergleichen und Runden' }, 
                    description: { ru: 'Округление до сотен и тысяч', de: 'Runden auf Hunderter und Tausender' }, 
                    difficulty: 'medium', requiredLevel: 'g4-num-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g4n2-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: { ru: 'Округли 12 345 до десятков', de: 'Runde 12.345 auf Zehner' }, options: ['12 300', '12 340', '12 350', '12 000'], correctIndex: 2 },
                        { id: 'g4n2-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 15, question: { ru: 'Наименьшее пятизначное число?', de: 'Die kleinste fünfstellige Zahl?' }, template: '___', correctAnswer: '10000' },
                        { id: 'g4n2-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 40, points: 20, question: { ru: 'Сколько нулей в записи "Пять миллионов"?', de: 'Wie viele Nullen hat "Fünf Millionen"?' }, options: ['4', '5', '6', '7'], correctIndex: 2 }
                    ]
                }
            ],
        },
        {
            id: 'g4-arithmetic', 
            title: { ru: 'Умножение и деление', de: 'Multiplikation und Division' }, 
            icon: '➗', 
            description: { ru: 'Письменные приемы вычислений', de: 'Schriftliches Rechnen' }, 
            color: '#ef4444',
            levels: [
                {
                    id: 'g4-ar-1', 
                    title: { ru: 'Умножение в столбик', de: 'Schriftliche Multiplikation' }, 
                    description: { ru: 'Умножаем на двузначное число', de: 'Multiplikation mit zweistelligen Zahlen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g4a1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 60, points: 20, question: '234 × 5 = ?', template: '___', correctAnswer: '1170' },
                        { id: 'g4a1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 90, points: 30, question: '123 × 12 = ?', template: '___', correctAnswer: '1476' },
                        { id: 'g4a1-3', type: 'multiple-choice', difficulty: 'medium', timeLimit: 45, points: 15, question: '756 ÷ 6 = ?', options: ['126', '136', '116', '124'], correctIndex: 0 },
                        { id: 'g4a1-4', type: 'fill-blank', difficulty: 'medium', timeLimit: 60, points: 20, question: '450 × 20 = ?', template: '___', correctAnswer: '9000' },
                        { id: 'g4a1-5', type: 'multiple-choice', difficulty: 'hard', timeLimit: 80, points: 25, question: '1000 ÷ 8 = ?', options: ['125', '135', '120', '150'], correctIndex: 0 }
                    ],
                },
                {
                    id: 'g4-ar-2', 
                    title: { ru: 'Порядок действий', de: 'Punkt vor Strich' }, 
                    description: { ru: 'Скобки и приоритеты', de: 'Klammern und Prioritäten' }, 
                    difficulty: 'hard', requiredLevel: 'g4-ar-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g4a2-1', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 25, question: '200 - 50 × 3 = ?', template: '___', correctAnswer: '50' },
                        { id: 'g4a2-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 80, points: 30, question: '(150 + 50) ÷ 4 = ?', template: '___', correctAnswer: '50' },
                        { id: 'g4a2-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 25, question: '12 + 8 × (10 - 5) = ?', options: ['52', '100', '60', '48'], correctIndex: 0 }
                    ]
                }
            ],
        },
        {
            id: 'g4-motion', 
            title: { ru: 'Задачи на движение', de: 'Bewegungsaufgaben' }, 
            icon: '🏃', 
            description: { ru: 'Скорость, время, расстояние', de: 'Geschwindigkeit, Zeit, Strecke' }, 
            color: '#10b981',
            levels: [
                {
                    id: 'g4-mot-1', 
                    title: { ru: 'Формула пути', de: 'Wegformel' }, 
                    description: { ru: 'S = V × t', de: 's = v × t' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { 
                            id: 'g4m1-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 45, points: 20, 
                            question: { ru: 'Машина ехала 3 часа со скоростью 60 км/ч. Какой путь она проехала?', de: 'Ein Auto fuhr 3 Stunden mit 60 km/h. Welche Strecke legte es zurück?' }, 
                            options: [{ ru: '20 км', de: '20 km' }, { ru: '120 км', de: '120 km' }, { ru: '180 км', de: '180 km' }, { ru: '240 км', de: '240 km' }], correctIndex: 2 
                        },
                        { 
                            id: 'g4m1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 50, points: 20, 
                            question: { ru: 'Велосипедист проехал 30 км за 2 часа. С какой скоростью он ехал?', de: 'Ein Radfahrer fuhr 30 km in 2 Stunden. Wie schnell war er?' }, 
                            template: { ru: '___ км/ч', de: '___ km/h' }, correctAnswer: '15' 
                        },
                        { 
                            id: 'g4m1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 25, 
                            question: { ru: 'Пешеход идет со скоростью 5 км/ч. За сколько времени он пройдет 20 км?', de: 'Ein Fußgänger geht mit 5 km/h. Wie lange braucht er für 20 km?' }, 
                            options: [{ ru: '3 часа', de: '3 Stunden' }, { ru: '4 часа', de: '4 Stunden' }, { ru: '5 часов', de: '5 Stunden' }, { ru: '2 часа', de: '2 Stunden' }], correctIndex: 1 
                        },
                        { 
                            id: 'g4m1-4', type: 'multiple-choice', difficulty: 'hard', timeLimit: 70, points: 30, 
                            question: { ru: 'Два поезда выехали навстречу друг другу со скоростями 60 км/ч и 40 км/ч. Какова скорость их сближения?', de: 'Zwei Züge fahren mit 60 km/h und 40 km/h aufeinander zu. Wie hoch ist die Annäherungsgeschwindigkeit?' }, 
                            options: [{ ru: '20 км/ч', de: '20 km/h' }, { ru: '100 км/ч', de: '100 km/h' }, { ru: '50 км/ч', de: '50 km/h' }, { ru: '240 км/ч', de: '240 km/h' }], correctIndex: 1 
                        }
                    ],
                },
            ],
        },
        {
            id: 'g4-logic', 
            title: { ru: 'Логика Кенгуру', de: 'Känguru-Logik' }, 
            icon: '🧠', 
            description: { ru: 'Олимпиадные задачи для 4 класса', de: 'Olympiade-Aufgaben 4. Klasse' }, 
            color: '#f59e0b',
            levels: [
                {
                    id: 'g4-log-1', 
                    title: { ru: 'Комбинаторика и логика', de: 'Kombinatorik und Logik' }, 
                    description: { ru: 'Варианты и рассуждения', de: 'Optionen und Schlussfolgerungen' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { 
                            id: 'g4l1-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 60, points: 25, 
                            question: { ru: 'У Ани было 3 юбки и 2 кофты. Сколько разных нарядов она может составить?', de: 'Anna hat 3 Röcke und 2 Oberteile. Wie viele Outfits sind möglich?' }, 
                            options: ['5', '6', '8', '10'], correctIndex: 1 
                        },
                        { 
                            id: 'g4l1-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, 
                            question: { ru: 'Лифт поднимается с 1-го этажа на 3-й за 6 секунд. За сколько секунд он поднимется на 5-й этаж?', de: 'Ein Aufzug braucht von Etage 1 zu 3 sechs Sekunden. Wie lange zu Etage 5?' }, 
                            options: [{ ru: '10 сек', de: '10 Sek.' }, { ru: '12 сек', de: '12 Sek.' }, { ru: '15 сек', de: '15 Sek.' }, { ru: '18 сек', de: '18 Sek.' }], correctIndex: 1, 
                            hint: { ru: 'Посчитай количество промежутков между этажами', de: 'Zähle die Intervalle zwischen den Etagen' } 
                        },
                        { 
                            id: 'g4l1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 75, points: 35, 
                            question: { ru: 'Марина выше Светы, а Света выше Оли. Кто самый низкий?', de: 'Marina ist größer als Seta, Seta ist größer als Olya. Wer ist am kleinsten?' }, 
                            options: [{ ru: 'Марина', de: 'Marina' }, { ru: 'Света', de: 'Seta' }, { ru: 'Оля', de: 'Olya' }, { ru: 'Все одинаковые', de: 'Alle gleich' }], correctIndex: 2 
                        },
                        { 
                            id: 'g4l1-4', type: 'fill-blank', difficulty: 'hard', timeLimit: 80, points: 35, 
                            question: { ru: 'Мама разрезала батон тремя разрезами. Сколько кусков получилось?', de: 'Mama schneidet ein Brot mit drei Schnitten. Wie viele Stücke entstehen?' }, 
                            template: '___', correctAnswer: '4' 
                        }
                    ],
                },
            ],
        },
    ],
};

export default grade4;
