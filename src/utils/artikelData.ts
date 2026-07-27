export type Gender = 'der' | 'die' | 'das';

export interface NounItem {
    word: string;
    gender: Gender;
    emoji: string;
}

export const artikelData: NounItem[] = [
    { word: 'Hund', gender: 'der', emoji: '🐶' },
    { word: 'Katze', gender: 'die', emoji: '🐱' },
    { word: 'Haus', gender: 'das', emoji: '🏠' },
    { word: 'Baum', gender: 'der', emoji: '🌳' },
    { word: 'Blume', gender: 'die', emoji: '🌻' },
    { word: 'Kind', gender: 'das', emoji: '👶' },
    { word: 'Apfel', gender: 'der', emoji: '🍎' },
    { word: 'Banane', gender: 'die', emoji: '🍌' },
    { word: 'Brot', gender: 'das', emoji: '🍞' },
    { word: 'Vogel', gender: 'der', emoji: '🐦' },
    { word: 'Sonne', gender: 'die', emoji: '☀️' },
    { word: 'Auto', gender: 'das', emoji: '🚗' },
    { word: 'Tisch', gender: 'der', emoji: '🪑' },
    { word: 'Tasche', gender: 'die', emoji: '👜' },
    { word: 'Buch', gender: 'das', emoji: '📖' },
    { word: 'Löffel', gender: 'der', emoji: '🥄' },
    { word: 'Gabel', gender: 'die', emoji: '🍴' },
    { word: 'Messer', gender: 'das', emoji: '🔪' },
    { word: 'Stuhl', gender: 'der', emoji: '🪑' },
    { word: 'Tür', gender: 'die', emoji: '🚪' },
    { word: 'Fenster', gender: 'das', emoji: '🪟' },
    { word: 'Bleistift', gender: 'der', emoji: '✏️' },
    { word: 'Schere', gender: 'die', emoji: '✂️' },
    { word: 'Heft', gender: 'das', emoji: '📒' },
    { word: 'Löwe', gender: 'der', emoji: '🦁' },
    { word: 'Maus', gender: 'die', emoji: '🐭' },
    { word: 'Pferd', gender: 'das', emoji: '🐴' },
    { word: 'Mutter', gender: 'die', emoji: '👩' },
    { word: 'Vater', gender: 'der', emoji: '👨' },
    { word: 'Baby', gender: 'das', emoji: '👶' }
];
