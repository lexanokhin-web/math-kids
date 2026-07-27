import type { GradeConfig } from '../types';

const grade5: GradeConfig = {
    id: 5, 
    label: { ru: '5 класс', de: '5. Klasse' }, 
    emoji: '🏔️', 
    description: { ru: 'Дроби, десятичные числа и основы геометрии', de: 'Brüche, Dezimalzahlen und Geometrie-Grundlagen' },
    topics: [
        {
            id: 'g5-fractions', 
            title: { ru: 'Обыкновенные дроби', de: 'Brüche' }, 
            icon: '🍰', 
            description: { ru: 'Сложение и вычитание простых дробей', de: 'Einfache Brüche addieren' }, 
            color: '#f43f5e',
            levels: [
                {
                    id: 'g5-fr-1', 
                    title: { ru: 'Понятие дроби', de: 'Bruchbegriff' }, 
                    description: { ru: 'Числитель и знаменатель', de: 'Zähler und Nenner' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g5f1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Какая дробь больше?', de: 'Welcher Bruch ist größer?' }, options: ['1/2', '1/3', '1/4', '1/5'], correctIndex: 0 },
                        { id: 'g5f1-2', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: { ru: 'Какая дробь правильная?', de: 'Welcher Bruch ist echt?' }, options: ['7/5', '5/5', '3/5', '9/2'], correctIndex: 2 },
                        { id: 'g5f1-3', type: 'fill-blank', difficulty: 'medium', timeLimit: 40, points: 20, question: '3/7 + 2/7 = ?', template: '___/7', correctAnswer: '5' },
                        { id: 'g5f1-4', type: 'fill-blank', difficulty: 'hard', timeLimit: 50, points: 25, question: '1 - 3/10 = ?', template: '___/10', correctAnswer: '7' },
                        { id: 'g5f1-5', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, question: { ru: 'Какое из чисел равно 2/4?', de: 'Was entspricht 2/4?' }, options: ['1/2', '1/3', '2/2', '4/2'], correctIndex: 0 }
                    ],
                },
                {
                    id: 'g5-fr-2', 
                    title: { ru: 'Сложение дробей', de: 'Bruchrechnung' }, 
                    description: { ru: 'Дроби с одинаковым знаменателем', de: 'Gleiche Nenner' }, 
                    difficulty: 'medium', requiredLevel: 'g5-fr-1', starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g5f2-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 40, points: 20, question: '4/15 + 7/15 = ?', template: '___/15', correctAnswer: '11' },
                        { id: 'g5f2-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 50, points: 25, question: '11/12 - 5/12 = ?', options: ['6/12', '7/12', '5/12', '4/12'], correctIndex: 0 }
                    ]
                }
            ],
        },
        {
            id: 'g5-decimals', 
            title: { ru: 'Десятичные дроби', de: 'Dezimalbrüche' }, 
            icon: '⚖️', 
            description: { ru: 'Запятые и разряды в десятичных числах', de: 'Komma und Stellenwerte' }, 
            color: '#8b5cf6',
            levels: [
                {
                    id: 'g5-dec-1', 
                    title: { ru: 'Знакомство с десятичными', de: 'Einführung Dezimal' }, 
                    description: { ru: '0.1, 0.01 и их структура', de: '0.1, 0.01 und Struktur' }, 
                    difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g5d1-1', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: '0.5 + 0.3 = ?', options: ['0.8', '8', '0.08', '1.0'], correctIndex: 0 },
                        { id: 'g5d1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 30, points: 15, question: { ru: 'Запиши число: 5 целых 2 сотых', de: 'Schreibe: 5 Ganze und 2 Hundertstel' }, template: '___', correctAnswer: '5,02' },
                        { id: 'g5d1-3', type: 'multiple-choice', difficulty: 'medium', timeLimit: 40, points: 20, question: { ru: 'Что больше: 2.5 или 2.05?', de: 'Was ist größer: 2.5 oder 2.05?' }, options: ['2.5', '2.05', { ru: 'Равны', de: 'Gleich' }], correctIndex: 0 },
                        { id: 'g5d1-4', type: 'fill-blank', difficulty: 'hard', timeLimit: 50, points: 30, question: '1.2 + 2.8 = ?', template: '___', correctAnswer: '4' }
                    ],
                },
            ],
        },
        {
            id: 'g5-geometry', 
            title: { ru: 'Геометрия', de: 'Geometrie' }, 
            icon: '📏', 
            description: { ru: 'Периметр и площадь прямоугольника', de: 'Umfang und Flächeninhalt' }, 
            color: '#10b981',
            levels: [
                {
                    id: 'g5-geo-1', 
                    title: { ru: 'Периметр и Площадь', de: 'Umfang und Fläche' }, 
                    description: { ru: 'Квадрат и прямоугольник', de: 'Quadrat und Rechteck' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g5g1-1', type: 'fill-blank', difficulty: 'medium', timeLimit: 40, points: 20, question: { ru: 'Площадь квадрата со стороной 6 см = ?', de: 'Fläche eines Quadrats mit 6 cm Seite = ?' }, template: '___', correctAnswer: '36' },
                        { id: 'g5g1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 40, points: 20, question: { ru: 'Периметр прямоугольника 4 см и 6 см = ?', de: 'Umfang eines Rechtecks mit 4 cm und 6 cm = ?' }, template: '___', correctAnswer: '20' },
                        { id: 'g5g1-3', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, question: { ru: 'Чему равен объем куба со стороной 2 см?', de: 'Volumen eines Würfel mit 2 cm?' }, options: ['4', '6', '8', '12'], correctIndex: 2 }
                    ],
                },
            ],
        },
        {
            id: 'g5-logic', 
            title: { ru: 'Логика и Смекалка', de: 'Logik' }, 
            icon: '🧠', 
            description: { ru: 'Задачи для юных математиков', de: 'Denksport' }, 
            color: '#f59e0b',
            levels: [
                {
                    id: 'g5-log-1', 
                    title: { ru: 'Хитрые задачки', de: 'Knackige Aufgaben' }, 
                    description: { ru: 'Логические выводы', de: 'Logikrätsel' }, 
                    difficulty: 'medium', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g5l1-1', type: 'multiple-choice', difficulty: 'medium', timeLimit: 60, points: 25, question: { ru: 'В корзине 5 яблок. Как разделить их между 5 девочками так, чтобы одно яблоко осталось в корзине?', de: '5 Äpfel für 5 Mädchen, einer bleibt im Korb - wie?' }, options: [{ ru: 'Никак', de: 'Unmöglich' }, { ru: 'Отдать одно с корзиной', de: 'Einem den Korb geben' }, { ru: 'Разрезать', de: 'Schneiden' }], correctIndex: 1 },
                        { id: 'g5l1-2', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 30, question: { ru: 'Улитка ползет на 10-метровый столб. Днем поднимается на 3 метра, а ночью спускается на 2. За сколько дней она доберется до вершины?', de: 'Schnecke auf 10m Mast: 3m hoch am Tag, 2m runter Nachts. Wie viele Tage?' }, options: ['7', '8', '9', '10'], correctIndex: 1, hint: { ru: 'Подумай, что случится в последний день', de: 'Überlege den letzten Tag' } },
                        { id: 'g5l1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 70, points: 35, question: { ru: 'Кирпич весит 1 кг и еще полкирпича. Сколько весит кирпич?', de: 'Ein Ziegel wiegt 1 kg und einen halben Ziegel. Gewicht?' }, template: { ru: '___ кг', de: '___ kg' }, correctAnswer: '2' }
                    ],
                },
            ],
        },
    ],
};

export default grade5;
