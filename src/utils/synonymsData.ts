export interface WordPair {
    word1: string;
    word2: string;
    level: 1 | 2 | 3;
}

/**
 * Synonyms – Grundwortschatz Klasse 2
 *
 * Level 1 – Einfach: базовые глаголы / прилагательные
 * Level 2 – Mittel: более широкий лексикон
 * Level 3 – Schwer: менее очевидные пары
 */
export const synonymsData: WordPair[] = [
    // ─── Level 1 – Einfach ────────────────────────
    { word1: "rennen",   word2: "laufen",    level: 1 },
    { word1: "gucken",   word2: "sehen",     level: 1 },
    { word1: "machen",   word2: "tun",       level: 1 },
    { word1: "hüpfen",   word2: "springen",  level: 1 },
    { word1: "weinen",   word2: "heulen",    level: 1 },
    { word1: "lachen",   word2: "kichern",   level: 1 },
    { word1: "sagen",    word2: "sprechen",  level: 1 },
    { word1: "essen",    word2: "speisen",   level: 1 },
    { word1: "hauen",    word2: "schlagen",  level: 1 },
    { word1: "malen",    word2: "zeichnen",  level: 1 },
    { word1: "holen",    word2: "bringen",   level: 1 },
    { word1: "werfen",   word2: "schleudern", level: 1 },
    { word1: "putzen",   word2: "reinigen",  level: 1 },
    { word1: "kaputt",   word2: "defekt",    level: 1 },
    { word1: "froh",     word2: "fröhlich",  level: 1 },

    // ─── Level 2 – Mittel ─────────────────────────
    { word1: "klettern",  word2: "steigen",      level: 2 },
    { word1: "rutschen",  word2: "gleiten",      level: 2 },
    { word1: "helfen",    word2: "unterstützen",  level: 2 },
    { word1: "singen",    word2: "trällern",     level: 2 },
    { word1: "kaufen",    word2: "erwerben",     level: 2 },
    { word1: "schenken",  word2: "geben",        level: 2 },
    { word1: "kochen",    word2: "zubereiten",   level: 2 },
    { word1: "schlafen",  word2: "ruhen",        level: 2 },
    { word1: "bauen",     word2: "errichten",    level: 2 },
    { word1: "teilen",    word2: "abgeben",      level: 2 },
    { word1: "waschen",   word2: "säubern",      level: 2 },
    { word1: "lernen",    word2: "üben",         level: 2 },
    { word1: "freuen",    word2: "jubeln",       level: 2 },
    { word1: "schreiben", word2: "notieren",     level: 2 },
    { word1: "lesen",     word2: "schmökern",    level: 2 },
    { word1: "leise",     word2: "still",        level: 2 },
    { word1: "schnell",   word2: "fix",          level: 2 },
    { word1: "mutig",     word2: "tapfer",       level: 2 },
    { word1: "winzig",    word2: "klein",        level: 2 },
    { word1: "riesig",    word2: "groß",         level: 2 },

    // ─── Level 3 – Schwer ─────────────────────────
    { word1: "flüstern",   word2: "tuscheln",     level: 3 },
    { word1: "fürchten",   word2: "ängstigen",    level: 3 },
    { word1: "träumen",    word2: "phantasieren", level: 3 },
    { word1: "denken",     word2: "grübeln",      level: 3 },
    { word1: "verstecken", word2: "verbergen",    level: 3 },
    { word1: "gewinnen",   word2: "siegen",       level: 3 },
    { word1: "ärgern",     word2: "nerven",       level: 3 },
    { word1: "fragen",     word2: "erkundigen",   level: 3 },
    { word1: "antworten",  word2: "erwidern",     level: 3 },
    { word1: "anziehen",   word2: "bekleiden",    level: 3 },
    { word1: "rechnen",    word2: "zählen",       level: 3 },
    { word1: "fangen",     word2: "haschen",      level: 3 },
    { word1: "klug",       word2: "schlau",       level: 3 },
    { word1: "eifrig",     word2: "fleißig",      level: 3 },
    { word1: "aufmerksam", word2: "wachsam",      level: 3 },
    { word1: "gemütlich",  word2: "behaglich",    level: 3 },
    { word1: "staunen",    word2: "wundern",      level: 3 },
    { word1: "erklären",   word2: "erläutern",    level: 3 },
    { word1: "beginnen",   word2: "anfangen",     level: 3 },
    { word1: "beenden",    word2: "aufhören",     level: 3 },
];
