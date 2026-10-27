export interface WordPair {
    word1: string;
    word2: string;
    level: 1 | 2 | 3;
}

/**
 * Antonyms – Grundwortschatz Klasse 2
 *
 * Level 1 – Einfach: короткие, самые базовые пары (3-5 букв)
 * Level 2 – Mittel: чуть длиннее, но всё ещё из повседневного лексикона 2-го класса
 * Level 3 – Schwer: длинные / менее очевидные, но в рамках Grundwortschatz 2
 */
export const antonymsData: WordPair[] = [
    // ─── Level 1 – Einfach ────────────────────────
    { word1: "groß",   word2: "klein",   level: 1 },
    { word1: "gut",    word2: "schlecht", level: 1 },
    { word1: "hell",   word2: "dunkel",  level: 1 },
    { word1: "kalt",   word2: "warm",    level: 1 },
    { word1: "laut",   word2: "leise",   level: 1 },
    { word1: "neu",    word2: "alt",     level: 1 },
    { word1: "lang",   word2: "kurz",    level: 1 },
    { word1: "dick",   word2: "dünn",    level: 1 },
    { word1: "voll",   word2: "leer",    level: 1 },
    { word1: "süß",    word2: "sauer",   level: 1 },
    { word1: "nah",    word2: "fern",    level: 1 },
    { word1: "hart",   word2: "weich",   level: 1 },
    { word1: "oben",   word2: "unten",   level: 1 },
    { word1: "ja",     word2: "nein",    level: 1 },
    { word1: "Tag",    word2: "Nacht",   level: 1 },
    { word1: "hoch",   word2: "tief",    level: 1 },
    { word1: "weiß",   word2: "schwarz", level: 1 },
    { word1: "nass",   word2: "trocken", level: 1 },
    { word1: "rund",   word2: "eckig",   level: 1 },
    { word1: "auf",    word2: "zu",      level: 1 },

    // ─── Level 2 – Mittel ─────────────────────────
    { word1: "schnell",  word2: "langsam",  level: 2 },
    { word1: "schwer",   word2: "leicht",   level: 2 },
    { word1: "stark",    word2: "schwach",  level: 2 },
    { word1: "schön",    word2: "hässlich", level: 2 },
    { word1: "lustig",   word2: "traurig",  level: 2 },
    { word1: "breit",    word2: "schmal",   level: 2 },
    { word1: "sauber",   word2: "dreckig",  level: 2 },
    { word1: "teuer",    word2: "billig",   level: 2 },
    { word1: "richtig",  word2: "falsch",   level: 2 },
    { word1: "gesund",   word2: "krank",    level: 2 },
    { word1: "müde",     word2: "wach",     level: 2 },
    { word1: "hungrig",  word2: "satt",     level: 2 },
    { word1: "früh",     word2: "spät",     level: 2 },
    { word1: "vorn",     word2: "hinten",   level: 2 },
    { word1: "glatt",    word2: "rau",      level: 2 },
    { word1: "reich",    word2: "arm",      level: 2 },
    { word1: "klug",     word2: "dumm",     level: 2 },
    { word1: "fleißig",  word2: "faul",     level: 2 },
    { word1: "mutig",    word2: "feige",    level: 2 },
    { word1: "drinnen",  word2: "draußen",  level: 2 },
    { word1: "Sommer",   word2: "Winter",   level: 2 },
    { word1: "Morgen",   word2: "Abend",    level: 2 },
    { word1: "Anfang",   word2: "Ende",     level: 2 },

    // ─── Level 3 – Schwer ─────────────────────────
    { word1: "freundlich",  word2: "unfreundlich", level: 3 },
    { word1: "glücklich",   word2: "unglücklich",  level: 3 },
    { word1: "geduldig",    word2: "ungeduldig",   level: 3 },
    { word1: "interessant", word2: "langweilig",   level: 3 },
    { word1: "liebevoll",   word2: "böse",         level: 3 },
    { word1: "sicher",      word2: "gefährlich",   level: 3 },
    { word1: "erlaubt",     word2: "verboten",     level: 3 },
    { word1: "wichtig",     word2: "unwichtig",    level: 3 },
    { word1: "ruhig",       word2: "unruhig",      level: 3 },
    { word1: "einfach",     word2: "schwierig",    level: 3 },
    { word1: "ehrlich",     word2: "unehrlich",    level: 3 },
    { word1: "höflich",     word2: "unhöflich",    level: 3 },
    { word1: "ordentlich",  word2: "unordentlich", level: 3 },
    { word1: "vorsichtig",  word2: "leichtsinnig", level: 3 },
    { word1: "wahr",        word2: "gelogen",      level: 3 },
    { word1: "gerecht",     word2: "ungerecht",    level: 3 },
    { word1: "bekannt",     word2: "unbekannt",    level: 3 },
    { word1: "zusammen",    word2: "getrennt",     level: 3 },
    { word1: "vergessen",   word2: "erinnern",     level: 3 },
    { word1: "aufstehen",   word2: "hinsetzen",    level: 3 },
];
