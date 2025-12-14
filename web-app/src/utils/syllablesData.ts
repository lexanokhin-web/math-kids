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
    'Mama', 'Papa', 'Oma', 'Opa', 'Kind', 'Mann', 'Frau', 'Tante', 'Onkel', 'Baby',
    'Name', 'Hund', 'Katze', 'Maus', 'Hase', 'Bär', 'Löwe', 'Tiger', 'Affe', 'Ente',
    'Fisch', 'Vogel', 'Igel', 'Pferd', 'Schule', 'Klasse', 'Tisch', 'Stift', 'Buch', 'Heft',
    'Tasche', 'Tafel', 'Haus', 'Auto', 'Bett', 'Ball', 'Sofa', 'Lampe', 'Tür', 'Fenster',
    'Garten', 'Küche', 'Bild', 'Apfel', 'Banane', 'Brot', 'Ei', 'Eis', 'Milch', 'Wasser',
    'Saft', 'Kuchen', 'Suppe', 'Käse', 'Sonne', 'Mond', 'Stern', 'Baum', 'Blume', 'Gras',
    'Wolke', 'See', 'Berg', 'Weg', 'Wald', 'Hand', 'Fuß', 'Nase', 'Auge', 'Ohr',
    'Mund', 'Arm', 'Bein', 'Kopf', 'Rad', 'Zug', 'Schiff', 'Geschenk', 'Geld', 'Kiste',
    'gut', 'groß', 'klein', 'alt', 'neu', 'jung', 'schön', 'lieb', 'nett', 'froh',
    'hell', 'dunkel', 'warm', 'kalt', 'schnell', 'langsam', 'laut', 'leise',
    'rot', 'gelb', 'grün', 'blau', 'weiß', 'schwarz', 'bunt',
    'gehen', 'kommen', 'sehen', 'sagen', 'machen', 'geben', 'nehmen', 'laufen',
    'schlafen', 'essen', 'trinken', 'lesen', 'schreiben', 'malen', 'spielen', 'lachen'
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
