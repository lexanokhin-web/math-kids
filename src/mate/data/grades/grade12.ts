import type { GradeConfig } from '../types';

const grade12: GradeConfig = {
    id: 12, 
    label: { ru: '12 класс', de: '12. Klasse' }, 
    emoji: '🌌', 
    description: { ru: 'Комплексные числа, высшая математика и олимпиады', de: 'Komplexe Zahlen und Uni-Level Mathematik' },
    topics: [
        {
            id: 'g12-complex', 
            title: { ru: 'Комплексные числа', de: 'Komplexe Zahlen' }, 
            icon: 'i', 
            description: { ru: 'Мнимая единица и операции над z', de: 'Imaginäre Einheiten' }, 
            color: '#8b5cf6',
            levels: [
                {
                    id: 'g12-cx-1', 
                    title: { ru: 'Алгебраическая форма', de: 'Algebraische Form' }, 
                    description: { ru: 'z = a + bi', de: 'Real- und Imaginärteil' }, 
                    difficulty: 'hard', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g12c1-1', type: 'fill-blank', difficulty: 'easy', timeLimit: 30, points: 20, question: 'i² = ?', template: '___', correctAnswer: '-1' },
                        { id: 'g12c1-2', type: 'fill-blank', difficulty: 'medium', timeLimit: 40, points: 30, question: 'i⁴ = ?', template: '___', correctAnswer: '1' },
                        { id: 'g12c1-3', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 40, question: { ru: 'Модуль числа 3+4i = ?', de: 'Betrag von 3+4i = ?' }, template: '___', correctAnswer: '5' },
                        { id: 'g12c1-4', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 35, question: { ru: 'Сопряженное к 1+2i?', de: 'Konjugiert zu 1+2i?' }, options: ['1-2i', '-1+2i', '1+2i', '2-1i'], correctIndex: 0 }
                    ],
                },
            ],
        },
        {
            id: 'g12-combinatorics', 
            title: { ru: 'Комбинаторика', de: 'Kombinatorik' }, 
            icon: '📦', 
            description: { ru: 'Формулы сочетаний и перестроений', de: 'Binomialkoeffizienten' }, 
            color: '#f59e0b',
            levels: [
                {
                    id: 'g12-cb-1', 
                    title: { ru: 'Сочетания и выборки', de: 'Auswahlen' }, 
                    description: { ru: 'Формула C(n,k)', de: 'Ziehungen' }, 
                    difficulty: 'hard', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g12b1-1', type: 'fill-blank', difficulty: 'hard', timeLimit: 60, points: 30, question: 'C(3,1) = ?', template: '___', correctAnswer: '3' },
                        { id: 'g12b1-2', type: 'fill-blank', difficulty: 'hard', timeLimit: 90, points: 45, question: 'C(4,2) = ?', template: '___', correctAnswer: '6' }
                    ],
                },
            ],
        },
        {
            id: 'g12-olympiad', 
            title: { ru: 'Олимпийский вызов', de: 'Olympiade-Finale' }, 
            icon: '🏆', 
            description: { ru: 'Самые сложные задачи курса', de: 'Höchste Schwierigkeitsgrad' }, 
            color: '#f43f5e',
            levels: [
                {
                    id: 'g12-ol-1', 
                    title: { ru: 'Логика и Доказательство', de: 'Beweisführung' }, 
                    description: { ru: 'Индукция и противоречие', de: 'Logisches Schließen' }, 
                    difficulty: 'olympiad', requiredLevel: null, starThresholds: [50, 75, 95],
                    exercises: [
                        { id: 'g12o1-1', type: 'multiple-choice', difficulty: 'olympiad', timeLimit: 120, points: 50, question: { ru: 'Существует ли наибольшее простое число?', de: 'Gibt es eine größte Primzahl?' }, options: [{ ru: 'Да', de: 'Ja' }, { ru: 'Нет (доказано Евклидом)', de: 'Nein (bewiesen durch Euklid)' }, { ru: 'Неизвестно', de: 'Unbekannt' }], correctIndex: 1 },
                        { id: 'g12o1-2', type: 'multiple-choice', difficulty: 'olympiad', timeLimit: 120, points: 50, question: { ru: 'Сколько делителей у числа 120?', de: 'Anzahl der Teiler von 120?' }, options: ['12', '16', '14', '18'], correctIndex: 1 }
                    ],
                },
            ],
        },
    ],
};

export default grade12;
