export interface WordPair {
    word1: string;
    word2: string;
    level: 1 | 2 | 3;
}

/**
 * Antonyms (Gegenteile) – Grundwortschatz Klasse 2
 *
 * Level 1 – Einfach: самые базовые прилагательные и наречия (3-5 букв)
 * Level 2 – Mittel: длиннее, + глаголы и существительные
 * Level 3 – Schwer: составные, un- формы, менее очевидные пары
 */
export const antonymsData: WordPair[] = [
    // ═══════════════════════════════════════════════════
    // Level 1 – Einfach (Adjektive & kurze Wörter)
    // ═══════════════════════════════════════════════════
    { word1: "groß",    word2: "klein",    level: 1 },
    { word1: "gut",     word2: "schlecht", level: 1 },
    { word1: "hell",    word2: "dunkel",   level: 1 },
    { word1: "kalt",    word2: "warm",     level: 1 },
    { word1: "laut",    word2: "leise",    level: 1 },
    { word1: "neu",     word2: "alt",      level: 1 },
    { word1: "lang",    word2: "kurz",     level: 1 },
    { word1: "dick",    word2: "dünn",     level: 1 },
    { word1: "voll",    word2: "leer",     level: 1 },
    { word1: "süß",     word2: "sauer",    level: 1 },
    { word1: "hart",    word2: "weich",    level: 1 },
    { word1: "nah",     word2: "fern",     level: 1 },
    { word1: "hoch",    word2: "tief",     level: 1 },
    { word1: "weiß",    word2: "schwarz",  level: 1 },
    { word1: "nass",    word2: "trocken",  level: 1 },
    { word1: "rund",    word2: "eckig",    level: 1 },
    { word1: "oben",    word2: "unten",    level: 1 },
    { word1: "auf",     word2: "zu",       level: 1 },
    { word1: "ja",      word2: "nein",     level: 1 },
    { word1: "Tag",     word2: "Nacht",    level: 1 },
    { word1: "heiß",    word2: "kalt",     level: 1 },
    { word1: "jung",    word2: "alt",      level: 1 },
    { word1: "arm",     word2: "reich",    level: 1 },
    { word1: "glatt",   word2: "rau",      level: 1 },
    { word1: "links",   word2: "rechts",   level: 1 },
    { word1: "an",      word2: "aus",      level: 1 },
    { word1: "ein",     word2: "aus",      level: 1 },
    { word1: "vorn",    word2: "hinten",   level: 1 },
    { word1: "hin",     word2: "her",      level: 1 },
    { word1: "rein",    word2: "raus",     level: 1 },
    { word1: "hier",    word2: "dort",     level: 1 },
    { word1: "Frau",    word2: "Mann",     level: 1 },
    { word1: "leer",    word2: "voll",     level: 1 },
    { word1: "wild",    word2: "zahm",     level: 1 },
    { word1: "dünn",    word2: "breit",    level: 1 },
    { word1: "eng",     word2: "weit",     level: 1 },

    // ═══════════════════════════════════════════════════
    // Level 2 – Mittel (Adjektive + Verben + Nomen)
    // ═══════════════════════════════════════════════════

    // Adjektive
    { word1: "schnell",   word2: "langsam",   level: 2 },
    { word1: "schwer",    word2: "leicht",    level: 2 },
    { word1: "stark",     word2: "schwach",   level: 2 },
    { word1: "schön",     word2: "hässlich",  level: 2 },
    { word1: "lustig",    word2: "traurig",   level: 2 },
    { word1: "breit",     word2: "schmal",    level: 2 },
    { word1: "sauber",    word2: "schmutzig", level: 2 },
    { word1: "teuer",     word2: "billig",    level: 2 },
    { word1: "richtig",   word2: "falsch",    level: 2 },
    { word1: "gesund",    word2: "krank",     level: 2 },
    { word1: "müde",      word2: "wach",      level: 2 },
    { word1: "hungrig",   word2: "satt",      level: 2 },
    { word1: "früh",      word2: "spät",      level: 2 },
    { word1: "klug",      word2: "dumm",      level: 2 },
    { word1: "fleißig",   word2: "faul",      level: 2 },
    { word1: "mutig",     word2: "feige",     level: 2 },
    { word1: "drinnen",   word2: "draußen",   level: 2 },
    { word1: "fröhlich",  word2: "traurig",   level: 2 },
    { word1: "schlank",   word2: "dick",      level: 2 },
    { word1: "leer",      word2: "besetzt",   level: 2 },
    { word1: "wütend",    word2: "ruhig",     level: 2 },
    { word1: "langsam",   word2: "rasch",     level: 2 },
    { word1: "frisch",    word2: "faul",      level: 2 },
    { word1: "brav",      word2: "frech",     level: 2 },
    { word1: "spitz",     word2: "stumpf",    level: 2 },
    { word1: "sanft",     word2: "grob",      level: 2 },
    { word1: "steil",     word2: "flach",     level: 2 },
    { word1: "scharf",    word2: "mild",      level: 2 },
    { word1: "fest",      word2: "locker",    level: 2 },
    { word1: "gerade",    word2: "krumm",     level: 2 },

    // Verben
    { word1: "lachen",    word2: "weinen",    level: 2 },
    { word1: "kaufen",    word2: "verkaufen", level: 2 },
    { word1: "fragen",    word2: "antworten", level: 2 },
    { word1: "kommen",    word2: "gehen",     level: 2 },
    { word1: "geben",     word2: "nehmen",    level: 2 },
    { word1: "finden",    word2: "verlieren", level: 2 },
    { word1: "lieben",    word2: "hassen",    level: 2 },
    { word1: "öffnen",    word2: "schließen", level: 2 },
    { word1: "starten",   word2: "stoppen",   level: 2 },
    { word1: "rufen",     word2: "flüstern",  level: 2 },
    { word1: "steigen",   word2: "fallen",    level: 2 },
    { word1: "bauen",     word2: "abreißen",  level: 2 },
    { word1: "ziehen",    word2: "drücken",   level: 2 },
    { word1: "gewinnen",  word2: "verlieren", level: 2 },

    // Nomen
    { word1: "Sommer",    word2: "Winter",    level: 2 },
    { word1: "Morgen",    word2: "Abend",     level: 2 },
    { word1: "Anfang",    word2: "Ende",      level: 2 },
    { word1: "Freund",    word2: "Feind",     level: 2 },
    { word1: "Junge",     word2: "Mädchen",   level: 2 },
    { word1: "Glück",     word2: "Pech",      level: 2 },
    { word1: "Sonne",     word2: "Mond",      level: 2 },
    { word1: "Himmel",    word2: "Erde",      level: 2 },
    { word1: "Frage",     word2: "Antwort",   level: 2 },
    { word1: "Liebe",     word2: "Hass",      level: 2 },
    { word1: "Krieg",     word2: "Frieden",   level: 2 },
    { word1: "Licht",     word2: "Schatten",  level: 2 },

    // ═══════════════════════════════════════════════════
    // Level 3 – Schwer (un- Formen, zusammengesetzte, Verben)
    // ═══════════════════════════════════════════════════

    // Adjektive mit un-
    { word1: "freundlich",  word2: "unfreundlich", level: 3 },
    { word1: "glücklich",   word2: "unglücklich",  level: 3 },
    { word1: "geduldig",    word2: "ungeduldig",   level: 3 },
    { word1: "wichtig",     word2: "unwichtig",    level: 3 },
    { word1: "ruhig",       word2: "unruhig",      level: 3 },
    { word1: "ehrlich",     word2: "unehrlich",    level: 3 },
    { word1: "höflich",     word2: "unhöflich",    level: 3 },
    { word1: "ordentlich",  word2: "unordentlich", level: 3 },
    { word1: "bekannt",     word2: "unbekannt",    level: 3 },
    { word1: "gerecht",     word2: "ungerecht",    level: 3 },
    { word1: "möglich",     word2: "unmöglich",    level: 3 },
    { word1: "sichtbar",    word2: "unsichtbar",   level: 3 },
    { word1: "zufrieden",   word2: "unzufrieden",  level: 3 },
    { word1: "schuldig",    word2: "unschuldig",   level: 3 },

    // Längere Adjektive
    { word1: "interessant", word2: "langweilig",   level: 3 },
    { word1: "liebevoll",   word2: "herzlos",      level: 3 },
    { word1: "sicher",      word2: "gefährlich",   level: 3 },
    { word1: "erlaubt",     word2: "verboten",     level: 3 },
    { word1: "einfach",     word2: "schwierig",    level: 3 },
    { word1: "vorsichtig",  word2: "leichtsinnig", level: 3 },
    { word1: "wahr",        word2: "gelogen",      level: 3 },
    { word1: "aufmerksam",  word2: "zerstreut",    level: 3 },
    { word1: "sparsam",     word2: "verschwenderisch", level: 3 },
    { word1: "absichtlich", word2: "zufällig",     level: 3 },
    { word1: "natürlich",   word2: "künstlich",    level: 3 },

    // Verben (trennbar & zusammengesetzt)
    { word1: "aufstehen",   word2: "hinsetzen",    level: 3 },
    { word1: "aufmachen",   word2: "zumachen",     level: 3 },
    { word1: "einschlafen", word2: "aufwachen",    level: 3 },
    { word1: "anfangen",    word2: "aufhören",     level: 3 },
    { word1: "vergessen",   word2: "erinnern",     level: 3 },
    { word1: "zusammen",    word2: "getrennt",     level: 3 },
    { word1: "einsteigen",  word2: "aussteigen",   level: 3 },
    { word1: "anziehen",    word2: "ausziehen",    level: 3 },
    { word1: "aufräumen",   word2: "verwüsten",    level: 3 },
    { word1: "einpacken",   word2: "auspacken",    level: 3 },
    { word1: "herkommen",   word2: "weggehen",     level: 3 },
    { word1: "hinlegen",    word2: "aufheben",     level: 3 },

    // Nomen (schwerer)
    { word1: "Wahrheit",    word2: "Lüge",         level: 3 },
    { word1: "Ordnung",     word2: "Chaos",        level: 3 },
    { word1: "Stärke",      word2: "Schwäche",     level: 3 },
    { word1: "Freude",      word2: "Ärger",        level: 3 },
    { word1: "Eingang",     word2: "Ausgang",      level: 3 },
    { word1: "Erfolg",      word2: "Misserfolg",   level: 3 },
    { word1: "Gewinner",    word2: "Verlierer",    level: 3 },
    { word1: "Höhe",        word2: "Tiefe",        level: 3 },
    { word1: "Wärme",       word2: "Kälte",        level: 3 },
    { word1: "Belohnung",   word2: "Strafe",       level: 3 },
];
