import type { Topic } from '../../types';

export const shapesToopic: Topic = {
    id: 'g1-shapes',
    title: { ru: 'Фигуры и формы', de: 'Figuren und Formen' },
    icon: '🔷',
    description: { ru: 'Распознаём геометрические фигуры', de: 'Geometrische Figuren erkennen' },
    color: '#c084fc',
    levels: [
        {
            id: 'g1-shp-1', 
            title: { ru: 'Основные фигуры', de: 'Grundformen' }, 
            description: { ru: 'Круг, квадрат, треугольник', de: 'Kreis, Quadrat, Dreieck' }, 
            difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
            exercises: [
                { 
                    id: 'g1sh1-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Какая фигура имеет 3 стороны?', de: 'Welche Figur hat 3 Seiten?' }, 
                    options: [{ ru: '⭕ Круг', de: '⭕ Kreis' }, { ru: '⬜ Квадрат', de: '⬜ Quadrat' }, { ru: '🔺 Треугольник', de: '🔺 Dreieck' }, { ru: '▬ Прямоугольник', de: '▬ Rechteck' }], correctIndex: 2 
                },
                { 
                    id: 'g1sh1-02', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда?', de: 'Wahr?' }, 
                    statement: { ru: 'У круга ⭕ есть углы', de: 'Ein Kreis ⭕ hat Ecken' }, isTrue: false, 
                    hint: { ru: 'Круг — гладкая кривая, без углов!', de: 'Ein Kreis ist rund und hat keine Ecken!' } 
                },
                { 
                    id: 'g1sh1-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Сколько сторон у квадрата ⬜?', de: 'Wie viele Seiten hat ein Quadrat ⬜?' }, 
                    options: ['3', '4', '5', '6'], correctIndex: 1 
                },
                { 
                    id: 'g1sh1-04', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, 
                    question: { ru: 'Правда?', de: 'Wahr?' }, 
                    statement: { ru: 'У квадрата ⬜ все стороны равные', de: 'Ein Quadrat ⬜ hat vier gleich lange Seiten' }, isTrue: true 
                },
                { 
                    id: 'g1sh1-05', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Какая фигура круглая без углов?', de: 'Welche Figur ist rund und ohne Ecken?' }, 
                    options: [{ ru: '⬜ Квадрат', de: '⬜ Quadrat' }, { ru: '🔺 Треугольник', de: '🔺 Dreieck' }, { ru: '⭕ Круг', de: '⭕ Kreis' }, { ru: '▬ Прямоугольник', de: '▬ Rechteck' }], correctIndex: 2 
                },
                { 
                    id: 'g1sh1-06', type: 'match-pairs', difficulty: 'easy', timeLimit: 45, points: 20, 
                    question: { ru: 'Соедини фигуру с количеством сторон', de: 'Verbinde Figur und Seitenanzahl' }, 
                    pairs: [{ left: { ru: '🔺 Треугольник', de: '🔺 Dreieck' }, right: { ru: '3 стороны', de: '3 Seiten' } }, { left: { ru: '⬜ Квадрат', de: '⬜ Quadrat' }, right: { ru: '4 стороны', de: '4 Seiten' } }, { left: { ru: '⬠ Пятиугольник', de: '⬠ Fünfeck' }, right: { ru: '5 сторон', de: '5 Seiten' } }] 
                },
                { 
                    id: 'g1sh1-07', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, 
                    question: { ru: 'Чем ⬜ квадрат отличается от ▬ прямоугольника?', de: 'Was unterscheidet ein ⬜ Quadrat von einem ▬ Rechteck?' }, 
                    options: [{ ru: 'У ⬜ все стороны равные', de: 'Beim ⬜ sind alle Seiten gleich lang' }, { ru: 'У ⬜ пять сторон', de: 'Das ⬜ hat fünf Seiten' }, { ru: 'Ничем', de: 'Kein Unterschied' }, { ru: 'У ⬜ нет углов', de: 'Das ⬜ hat keine Ecken' }], correctIndex: 0 
                },
            ],
        },
        {
            id: 'g1-shp-2', 
            title: { ru: 'Фигуры вокруг нас', de: 'Formen um uns herum' }, 
            description: { ru: 'Находим фигуры в предметах', de: 'Formen in Alltagsgegenständen finden' }, 
            difficulty: 'easy', requiredLevel: 'g1-shp-1', starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1sh2-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Колесо 🛞 — это какая фигура?', de: 'Ein Rad 🛞 hat welche Form?' }, options: [{ ru: '⬜ Квадрат', de: '⬜ Quadrat' }, { ru: '🔺 Треугольник', de: '🔺 Dreieck' }, { ru: '⭕ Круг', de: '⭕ Kreis' }, { ru: '🥚 Овал', de: '🥚 Oval' }], correctIndex: 2 },
                { id: 'g1sh2-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Окно 🪟 обычно какой формы?', de: 'Welche Form hat ein Fenster 🪟 meistens?' }, options: [{ ru: '⭕ Круглое', de: '⭕ Kreis' }, { ru: '🔺 Треугольное', de: '🔺 Dreieck' }, { ru: '▬ Прямоугольное', de: '▬ Rechteck' }, { ru: '🥚 Овальное', de: '🥚 Oval' }], correctIndex: 2 },
                { id: 'g1sh2-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 30, points: 10, question: { ru: 'Крыша дома 🏠 похожа на...', de: 'Ein Hausdach 🏠 sieht aus wie ein...' }, options: [{ ru: '⭕ Круг', de: '⭕ Kreis' }, { ru: '⬜ Квадрат', de: '⬜ Quadrat' }, { ru: '🔺 Треугольник', de: '🔺 Dreieck' }, { ru: '🥚 Овал', de: '🥚 Oval' }], correctIndex: 2 },
                { 
                    id: 'g1sh2-04', type: 'match-pairs', difficulty: 'easy', timeLimit: 45, points: 20, 
                    question: { ru: 'Какой предмет похож на фигуру?', de: 'Welcher Gegenstand passt zur Form?' }, 
                    pairs: [{ left: { ru: '⚽ Мяч', de: '⚽ Ball' }, right: { ru: '⭕ Круг', de: '⭕ Kreis' } }, { left: { ru: '📕 Книга', de: '📕 Buch' }, right: { ru: '▬ Прямоугольник', de: '▬ Rechteck' } }, { left: { ru: '🔺 Пирамидка', de: '🔺 Pyramide' }, right: { ru: '🔺 Треугольник', de: '🔺 Dreieck' } }] 
                },
                { id: 'g1sh2-05', type: 'true-false', difficulty: 'easy', timeLimit: 20, points: 10, question: { ru: 'Правда?', de: 'Wahr?' }, statement: { ru: 'Солнце ☀️ похоже на круг ⭕', de: 'Die Sonne ☀️ sieht aus wie ein Kreis ⭕' }, isTrue: true },
                { id: 'g1sh2-06', type: 'multiple-choice', difficulty: 'medium', timeLimit: 35, points: 15, question: { ru: 'Сколько углов вместе: 🔺 + ⬜?', de: 'Wie viele Ecken zusammen: 🔺 + ⬜?' }, options: ['5', '6', '7', '8'], correctIndex: 2, hint: { ru: '3 + 4 = 7 углов', de: '3 + 4 = 7 Ecken' } },
            ],
        },
        {
            id: 'g1-shp-3', 
            title: { ru: 'Симметрия', de: 'Symmetrie' }, 
            description: { ru: 'Что такое симметрия?', de: 'Was ist Symmetrie?' }, 
            difficulty: 'medium', requiredLevel: 'g1-shp-2', starThresholds: [50, 75, 95],
            exercises: [
                { id: 'g1sh3-01', type: 'true-false', difficulty: 'easy', timeLimit: 25, points: 10, question: { ru: 'Правда?', de: 'Wahr?' }, statement: { ru: 'Если разрезать ⭕ круг пополам, обе части будут одинаковые', de: 'Wenn man einen Kreis ⭕ halbiert, sind beide Teile gleich' }, isTrue: true },
                { id: 'g1sh3-02', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: { ru: 'Какая буква симметричная?', de: 'Welcher Buchstabe ist symmetrisch?' }, options: ['B', 'G', 'A', 'R'], correctIndex: 2, hint: { ru: 'Если сложить букву А пополам, обе части совпадут!', de: 'Wenn man das A faltet, passen beide Hälften zusammen!' } },
                { id: 'g1sh3-03', type: 'true-false', difficulty: 'medium', timeLimit: 25, points: 10, question: { ru: 'Правда?', de: 'Wahr?' }, statement: { ru: '⬜ Квадрат — симметричная фигура', de: 'Ein ⬜ Quadrat ist symmetrisch' }, isTrue: true },
                { id: 'g1sh3-04', type: 'multiple-choice', difficulty: 'medium', timeLimit: 30, points: 15, question: { ru: 'Сколько линий симметрии у ⬜ квадрата?', de: 'Wie viele Symmetrieachsen hat ein ⬜ Quadrat?' }, options: ['1', '2', '4', '8'], correctIndex: 2 },
            ],
        },
    ],
};
