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
