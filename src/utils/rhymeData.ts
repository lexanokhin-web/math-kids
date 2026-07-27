export interface RhymePair {
    word: string;
    rhymes: string[];
    distractors: string[];
}

export const rhymeData: RhymePair[] = [
    { word: 'Haus', rhymes: ['Maus', 'Klaus', 'Raus'], distractors: ['Tisch', 'Baum', 'Hund'] },
    { word: 'Baum', rhymes: ['Traum', 'Raum', 'Saum'], distractors: ['Blume', 'Sonne', 'Kind'] },
    { word: 'Hund', rhymes: ['Rund', 'Mund', 'Bunt'], distractors: ['Katze', 'Maus', 'Vogel'] },
    { word: 'Sonne', rhymes: ['Wonne', 'Tonne', 'Konne'], distractors: ['Mond', 'Stern', 'Wolke'] },
    { word: 'Tisch', rhymes: ['Fisch', 'Frisch', 'Zisch'], distractors: ['Stuhl', 'Schrank', 'Bett'] },
    { word: 'Hand', rhymes: ['Wand', 'Sand', 'Land'], distractors: ['Fuß', 'Auge', 'Ohr'] },
    { word: 'Eis', rhymes: ['Heiß', 'Weiß', 'Reis'], distractors: ['Kalt', 'Süß', 'Sauer'] },
    { word: 'Schule', rhymes: ['Suhle', 'Pfuhle'], distractors: ['Kind', 'Lehrer', 'Buch'] },
    { word: 'Geld', rhymes: ['Held', 'Welt', 'Zelt'], distractors: ['Kaufen', 'Reich', 'Arm'] },
    { word: 'Herz', rhymes: ['Schmerz', 'Kerz', 'Scherz'], distractors: ['Liebe', 'Rot', 'Blut'] }
];
