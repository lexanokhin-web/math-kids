export interface GapItem {
    sentence: (string | null)[]; // ['Der', null, 'ist', 'grün']
    answer: string;
    options: string[];
    emoji: string;
}

export const gapData: GapItem[] = [
    { sentence: ['Der', null, 'ist', 'rot'], answer: 'Apfel', options: ['Apfel', 'Banane', 'Hund'], emoji: '🍎' },
    { sentence: ['Die', null, 'scheint'], answer: 'Sonne', options: ['Sonne', 'Mond', 'Wolke'], emoji: '☀️' },
    { sentence: ['Das', null, 'ist', 'klein'], answer: 'Baby', options: ['Baby', 'Haus', 'Auto'], emoji: '👶' },
    { sentence: ['Ich', null, 'gerne', 'Eis'], answer: 'esse', options: ['esse', 'trinke', 'laufe'], emoji: '🍦' },
    { sentence: ['Der', 'Vogel', null], answer: 'fliegt', options: ['fliegt', 'schwimmt', 'rennt'], emoji: '🐦' },
    { sentence: ['Meine', null, 'ist', 'lieb'], answer: 'Mama', options: ['Mama', 'Papa', 'Katze'], emoji: '👩' },
    { sentence: ['Ein', null, 'bellt'], answer: 'Hund', options: ['Hund', 'Löwe', 'Zebra'], emoji: '🐶' },
    { sentence: ['Wir', null, 'ein', 'Lied'], answer: 'singen', options: ['singen', 'malen', 'bauen'], emoji: '🎵' },
    { sentence: ['Das', 'Auto', 'ist', null], answer: 'schnell', options: ['schnell', 'langsam', 'laut'], emoji: '🚗' },
    { sentence: ['Der', 'Fisch', null], answer: 'schwimmt', options: ['schwimmt', 'fliegt', 'hüpft'], emoji: '🐟' }
];
