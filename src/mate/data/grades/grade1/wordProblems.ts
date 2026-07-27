import type { Topic } from '../../types';

export const wordProblemsTopic: Topic = {
    id: 'g1-word-problems',
    title: { ru: 'Задачки', de: 'Textaufgaben' },
    icon: '📝',
    description: { ru: 'Решаем задачи из жизни', de: 'Alltagsaufgaben lösen' },
    color: '#06b6d4',
    levels: [
        {
            id: 'g1-wp-1', 
            title: { ru: 'Простые задачи', de: 'Einfache Aufgaben' }, 
            description: { ru: 'Задачи в одно действие', de: 'Aufgaben mit einem Rechenschritt' }, 
            difficulty: 'easy', requiredLevel: null, starThresholds: [50, 75, 95],
            exercises: [
                { 
                    id: 'g1w1-01', type: 'multiple-choice', difficulty: 'easy', timeLimit: 35, points: 10, 
                    question: { ru: 'У Кати 3 куклы, ей подарили ещё 2. Сколько стало?', de: 'Katja hat 3 Puppen, sie bekommt 2 dazu. Wie viele hat sie jetzt?' }, 
                    options: ['3', '4', '5', '6'], correctIndex: 2 
                },
                { 
                    id: 'g1w1-02', type: 'multiple-choice', difficulty: 'easy', timeLimit: 35, points: 10, 
                    question: { ru: 'Во дворе 7 детей, 3 ушли домой. Сколько осталось?', de: 'Auf dem Hof sind 7 Kinder, 3 gehen nach Hause. Wie viele bleiben?' }, 
                    options: ['3', '4', '5', '6'], correctIndex: 1 
                },
                { 
                    id: 'g1w1-03', type: 'multiple-choice', difficulty: 'easy', timeLimit: 40, points: 10, 
                    question: { ru: 'В корзине 4 яблока и 3 груши. Сколько всего фруктов?', de: 'Im Korb sind 4 Äpfel und 3 Birnen. Wie viele Früchte insgesamt?' }, 
                    options: ['5', '6', '7', '8'], correctIndex: 2 
                },
                { 
                    id: 'g1w1-04', type: 'multiple-choice', difficulty: 'easy', timeLimit: 35, points: 10, 
                    question: { ru: 'У Пети 10 карандашей, он дал другу 4. Сколько осталось?', de: 'Peter hat 10 Stifte, er gibt dem Freund 4. Wie viele bleiben?' }, 
                    options: ['4', '5', '6', '7'], correctIndex: 2 
                },
                { 
                    id: 'g1w1-05', type: 'multiple-choice', difficulty: 'easy', timeLimit: 40, points: 10, 
                    question: { ru: 'Маша прочитала 5 страниц утром и 3 вечером. Сколько всего?', de: 'Mascha liest 5 Seiten morgens und 3 abends. Wie viele insgesamt?' }, 
                    options: ['6', '7', '8', '9'], correctIndex: 2 
                },
                { 
                    id: 'g1w1-06', type: 'multiple-choice', difficulty: 'easy', timeLimit: 35, points: 10, 
                    question: { ru: 'В автобусе ехали 8 человек. На остановке вышли 2. Сколько осталось?', de: '8 Personen fahren im Bus. 2 steigen aus. Wie viele bleiben?' }, 
                    options: ['4', '5', '6', '7'], correctIndex: 2 
                },
            ],
        },
        {
            id: 'g1-wp-2', 
            title: { ru: 'Задачи посложнее', de: 'Schwerere Aufgaben' }, 
            description: { ru: 'Задачи в два действия', de: 'Aufgaben mit zwei Schritten' }, 
            difficulty: 'medium', requiredLevel: 'g1-wp-1', starThresholds: [40, 65, 90],
            exercises: [
                { 
                    id: 'g1w2-01', type: 'multiple-choice', difficulty: 'medium', timeLimit: 50, points: 20, 
                    question: { ru: 'У Вани 5 машинок. Ему подарили 3 и он отдал другу 2. Сколько стало?', de: 'Wanja hat 5 Autos. Er bekommt 3 geschenkt und gibt dem Freund 2. Wie viele jetzt?' }, 
                    options: ['4', '5', '6', '7'], correctIndex: 2, 
                    hint: { ru: '5 + 3 = 8, потом 8 - 2 = 6', de: '5 + 3 = 8, dann 8 - 2 = 6' } 
                },
                { 
                    id: 'g1w2-02', type: 'multiple-choice', difficulty: 'medium', timeLimit: 50, points: 20, 
                    question: { ru: 'В классе 10 мальчиков и 8 девочек. Сколько всего детей?', de: 'In der Klasse sind 10 Jungen und 8 Mädchen. Wie viele Kinder insgesamt?' }, 
                    options: ['16', '17', '18', '19'], correctIndex: 2 
                },
                { 
                    id: 'g1w2-03', type: 'multiple-choice', difficulty: 'medium', timeLimit: 60, points: 20, 
                    question: { ru: 'У Ани 6 ягод. У Тани на 3 больше. Сколько у Тани?', de: 'Anna hat 6 Beeren. Tanja hat 3 mehr. Wie viele hat Tanja?' }, 
                    options: ['3', '6', '9', '12'], correctIndex: 2 
                },
                { 
                    id: 'g1w2-04', type: 'multiple-choice', difficulty: 'medium', timeLimit: 50, points: 20, 
                    question: { ru: 'На ветке 12 птиц. 5 улетели, потом прилетели 3. Сколько стало?', de: '12 Vögel auf dem Ast. 5 fliegen weg, 3 kommen dazu. Wie viele jetzt?' }, 
                    options: ['8', '9', '10', '11'], correctIndex: 2, 
                    hint: { ru: '12 - 5 = 7, потом 7 + 3 = 10', de: '12 - 5 = 7, dann 7 + 3 = 10' } 
                },
                { 
                    id: 'g1w2-05', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 25, 
                    question: { ru: 'У Коли 8 конфет. Он съел 3, а потом мама дала ему столько, сколько он съел. Сколько стало?', de: 'Koli hat 8 Bonbons. Er isst 3, und Mama gibt ihm so viele wie er aß. Wie viele jetzt?' }, 
                    options: ['5', '6', '8', '11'], correctIndex: 2, 
                    hint: { ru: '8 - 3 = 5, потом 5 + 3 = 8', de: '8 - 3 = 5, dann 5 + 3 = 8' } 
                },
                { 
                    id: 'g1w2-06', type: 'multiple-choice', difficulty: 'hard', timeLimit: 60, points: 25, 
                    question: { ru: 'У двух братьев вместе 14 книг. У старшего на 2 больше. Сколько у старшего?', de: 'Zwei Brüder haben zusammen 14 Bücher. Der Ältere hat 2 mehr. Wie viele hat er?' }, 
                    options: ['6', '7', '8', '9'], correctIndex: 2, 
                    hint: { ru: 'Если одинаково — по 7. У старшего +1 = 8', de: 'Wenn gleich — je 7. Der Ältere +1 = 8' } 
                },
            ],
        },
    ],
};
