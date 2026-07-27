// German syllables data
export const generateSyllables = (): string[] => {
    const syllables: string[] = [];
    const consonants = ['b', 'd', 'c', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'];
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    for (const c of consonants) {
        for (const v of vowels) {
            syllables.push(c + v);
        }
    }

    return syllables;
};

// German two-syllable words
export const twoSyllableWords: string[] = [
    'acht', 'Affe', 'alle', 'als', 'alt', 'Amelie', 'Ameise', 'Ampel', 'an', 'Apfel', 'Arm',
    'Ast', 'Aufgabe', 'Auge', 'Auto', 'Baby', 'Ball', 'Banane', 'Baum', 'Bär', 'Berg',
    'Bett', 'Bein', 'Bild', 'bis', 'blau', 'bleiben', 'Blume', 'brot', 'Buch', 'bunt',
    'da', 'das', 'dich', 'doch', 'dunkel', 'durch', 'Ei', 'Eis', 'elf', 'Ende', 'Ente',
    'er', 'Esel', 'es', 'essen', 'Euro', 'Fenster', 'finden', 'Fisch', 'Frau', 'Freund',
    'froh', 'Fuß', 'Gabel', 'Garten', 'Gast', 'geben', 'gehen', 'Geld', 'gelb', 'Geschenk',
    'Glas', 'Gras', 'groß', 'grün', 'gut', 'Hab', 'haben', 'Hai', 'Hand', 'Hase',
    'Haus', 'Heft', 'hell', 'heute', 'hinter', 'holen', 'Hose', 'Hund', 'ich', 'Igel',
    'in', 'ist', 'Jung', 'Kaffee', 'kalt', 'Katze', 'Käse', 'Kind', 'Kino', 'Kiste',
    'Klasse', 'klein', 'Kleid', 'kommen', 'Kopf', 'Küche', 'Kuchen', 'Kugel', 'Lampe',
    'langsam', 'lachen', 'laufen', 'laut', 'leben', 'legen', 'leicht', 'leise', 'lesen',
    'lieb', 'lila', 'Liste', 'los', 'Löwe', 'machen', 'malen', 'Mama', 'Mann', 'Maus',
    'Milch', 'mit', 'Mond', 'Mund', 'nach', 'Nagel', 'Name', 'nase', 'Nebel', 'nehmen',
    'nein', 'neu', 'neun', 'nett', 'nicht', 'nun', 'Nudel', 'Ohr', 'Oma', 'Onkel',
    'Opa', 'oft', 'Papa', 'Paket', 'Pferd', 'Pinsel', 'Puppe', 'Rad', 'Regal', 'rot',
    'Saft', 'Salat', 'Salami', 'sagen', 'Salami', 'Schere', 'Schiff', 'schlafen',
    'schön', 'Schreiben', 'Schuh', 'Schule', 'schwarz', 'See', 'sehen', 'Seife',
    'schnell', 'Sessel', 'sind', 'Sofa', 'so', 'soll', 'Sonne', 'sparen', 'spielen',
    'Sport', 'sprechen', 'stehen', 'Stein', 'Stern', 'Stift', 'Stunde', 'Suppe',
    'Tafel', 'Tal', 'Tante', 'Tasche', 'Taste', 'Telefon', 'Tiger', 'Tisch', 'trinken',
    'tun', 'Tunnel', 'Tür', 'Uhr', 'um', 'und', 'Vogel', 'Wald', 'Warm', 'warum',
    'was', 'Wasser', 'Weg', 'weil', 'weiter', 'weiß', 'wer', 'wir', 'wo', 'Wolke',
    'Zug'
];

// German phrases (2-3 words) for Grade 1-2
export const germanPhrases: string[] = [
    // Ich + Verb
    'ich bin', 'ich habe', 'ich gehe', 'ich komme', 'ich sehe', 'ich höre', 'ich mache',
    'ich spiele', 'ich lerne', 'ich lese', 'ich schreibe', 'ich male', 'ich esse',
    'ich trinke', 'ich schlafe', 'ich lache', 'ich weine', 'ich renne', 'ich sitze', 'ich stehe',

    // Familie
    'meine Mama', 'mein Papa', 'meine Oma', 'mein Opa', 'meine Schwester', 'mein Bruder',
    'meine Familie', 'mein Freund', 'meine Freundin', 'mein Baby',

    // Schule
    'in der Schule', 'ich lerne', 'ich schreibe', 'ich lese', 'mein Heft', 'mein Buch',
    'mein Lehrer', 'meine Lehrerin', 'mein Tisch', 'mein Stuhl', 'mein Platz',

    // Haus
    'zu Hause', 'ich bin da', 'komm her', 'geh weg', 'setz dich', 'steh auf',
    'mach auf', 'mach zu', 'komm rein', 'geh raus',

    // Вещи
    'mein Ball', 'mein Buch', 'mein Heft', 'mein Spiel', 'mein Auto', 'mein Haus',
    'mein Bett', 'mein Tisch', 'mein Stuhl', 'meine Tasche',

    // Еда
    'ich esse', 'ich trinke', 'ein Brot', 'ein Apfel', 'eine Banane', 'ein Wasser',
    'ein Saft', 'ich mag', 'ich will', 'mehr bitte',

    // Животные
    'ein Hund', 'eine Katze', 'ein Vogel', 'ein Fisch', 'ein Pferd', 'eine Kuh',
    'ein Hase', 'ein Bär',

    // Действия / команды
    'spiel mit', 'komm mit', 'mach mit', 'hör zu', 'sieh mal', 'pass auf',
    'lauf schnell', 'geh langsam', 'bleib hier', 'warte kurz',

    // Вежливость
    'ja klar', 'nein danke', 'bitte schön', 'danke schön', 'vielen Dank', 'gern geschehen',

    // Простые конструкции
    'das ist', 'hier ist', 'da ist', 'wer ist', 'wo ist', 'was ist', 'ich kann',
    'ich will', 'ich mag', 'ich muss',

    // Вопросы
    'wie heißt du', 'wer bist du', 'wo bist du', 'was machst du', 'kommst du mit',
    'hast du das', 'willst du das', 'kannst du das',

    // Игра / движение
    'ich spiele', 'wir spielen', 'komm spielen', 'spiel Ball', 'fang mich',
    'lauf mit', 'komm schnell',

    // Описания
    'das ist gut', 'das ist schön', 'das ist groß', 'das ist klein', 'das ist neu',
    'das ist alt', 'das ist rot', 'das ist blau',

    // Время
    'heute ist', 'morgen ist', 'jetzt ist', 'es ist spät', 'es ist früh',

    // Эмоции
    'ich bin froh', 'ich bin müde', 'ich bin krank', 'ich bin traurig',
    'ich bin glücklich', 'ich habe Angst'
];

import { lolaSentences, lolaSentencesLvl2, lolaStoriesLvl3, lolaStoriesLvl4, extendedSentences } from './sentencesData';
import { elsaAnnaSentences } from './elsaAnnaData';

export { lolaSentences, lolaSentencesLvl2, lolaStoriesLvl3, lolaStoriesLvl4, extendedSentences, elsaAnnaSentences };

// Shuffle array utility
export const shuffleArray = <T>(array: T[]): T[] => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

// Text-to-speech for German
export const speakGerman = (text: string): Promise<void> => {
    return new Promise((resolve) => {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported');
            resolve();
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.7;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        window.speechSynthesis.speak(utterance);
    });
};
