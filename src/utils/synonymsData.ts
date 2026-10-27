export interface WordPair {
    word1: string;
    word2: string;
    level: 1 | 2 | 3;
}

/**
 * Synonyms (Sinnverwandte Wörter / Wortfelder) – Grundwortschatz Klasse 2
 *
 * Level 1 – Einfach: базовые глаголы движения, чувств и простые прилагательные
 * Level 2 – Mittel: расширенная школьная лексика (Wortfelder: sagen, gehen, Gefühle)
 * Level 3 – Schwer: богатый словарный запас, более точные и описательные синонимы
 */
export const synonymsData: WordPair[] = [
    // ═══════════════════════════════════════════════════
    // Level 1 – Einfach (Alltägliche Verben & Adjektive)
    // ═══════════════════════════════════════════════════

    // Verben (Bewegung & Alltag)
    { word1: "rennen",     word2: "laufen",     level: 1 },
    { word1: "gucken",     word2: "sehen",      level: 1 },
    { word1: "schauen",    word2: "sehen",      level: 1 },
    { word1: "machen",     word2: "tun",        level: 1 },
    { word1: "hüpfen",     word2: "springen",   level: 1 },
    { word1: "weinen",     word2: "heulen",     level: 1 },
    { word1: "lachen",     word2: "kichern",    level: 1 },
    { word1: "sagen",      word2: "sprechen",   level: 1 },
    { word1: "essen",      word2: "speisen",    level: 1 },
    { word1: "hauen",      word2: "schlagen",   level: 1 },
    { word1: "malen",      word2: "zeichnen",   level: 1 },
    { word1: "holen",      word2: "bringen",    level: 1 },
    { word1: "werfen",     word2: "schleudern", level: 1 },
    { word1: "putzen",     word2: "saubermachen", level: 1 },
    { word1: "gehen",      word2: "laufen",     level: 1 },
    { word1: "rufen",      word2: "schreien",   level: 1 },
    { word1: "bauen",      word2: "basteln",    level: 1 },
    { word1: "packen",     word2: "greifen",    level: 1 },
    { word1: "zeigen",     word2: "weisen",     level: 1 },
    { word1: "suchen",     word2: "stöbern",    level: 1 },

    // Adjektive (Einfach)
    { word1: "froh",       word2: "fröhlich",   level: 1 },
    { word1: "traurig",    word2: "betrübt",    level: 1 },
    { word1: "schnell",    word2: "flink",      level: 1 },
    { word1: "kaputt",     word2: "defekt",     level: 1 },
    { word1: "toll",       word2: "super",      level: 1 },
    { word1: "leise",      word2: "still",      level: 1 },
    { word1: "warm",       word2: "heiß",       level: 1 },
    { word1: "kühl",       word2: "kalt",       level: 1 },
    { word1: "dick",       word2: "rundlich",   level: 1 },
    { word1: "schön",      word2: "hübsch",     level: 1 },
    { word1: "dumm",       word2: "doof",       level: 1 },
    { word1: "böse",       word2: "fies",       level: 1 },
    { word1: "lieb",       word2: "nett",       level: 1 },
    { word1: "müde",       word2: "schläfrig",  level: 1 },
    { word1: "fein",       word2: "zart",       level: 1 },

    // Nomen (Einfach)
    { word1: "Haus",       word2: "Gebäude",    level: 1 },
    { word1: "Wagen",      word2: "Auto",       level: 1 },
    { word1: "Papa",       word2: "Vater",      level: 1 },
    { word1: "Mama",       word2: "Mutter",     level: 1 },
    { word1: "Kind",       word2: "Sprössling", level: 1 },

    // ═══════════════════════════════════════════════════
    // Level 2 – Mittel (Wortschatz-Treppen & Differenzierung)
    // ═══════════════════════════════════════════════════

    // Verben
    { word1: "klettern",   word2: "steigen",      level: 2 },
    { word1: "rutschen",   word2: "gleiten",      level: 2 },
    { word1: "helfen",     word2: "unterstützen", level: 2 },
    { word1: "singen",     word2: "trällern",     level: 2 },
    { word1: "kaufen",     word2: "besorgen",     level: 2 },
    { word1: "schenken",   word2: "geben",        level: 2 },
    { word1: "kochen",     word2: "zubereiten",   level: 2 },
    { word1: "schlafen",   word2: "ruhen",        level: 2 },
    { word1: "teilen",     word2: "abgeben",      level: 2 },
    { word1: "waschen",    word2: "reinigen",     level: 2 },
    { word1: "lernen",     word2: "üben",         level: 2 },
    { word1: "freuen",     word2: "jubeln",       level: 2 },
    { word1: "schreiben",  word2: "notieren",     level: 2 },
    { word1: "lesen",      word2: "schmökern",    level: 2 },
    { word1: "flitzen",    word2: "sausen",       level: 2 },
    { word1: "spazieren",  word2: "wandern",      level: 2 },
    { word1: "brüllen",    word2: "schreien",     level: 2 },
    { word1: "erzählen",   word2: "berichten",    level: 2 },
    { word1: "blicken",    word2: "schauen",      level: 2 },
    { word1: "hoffen",     word2: "wünschen",     level: 2 },
    { word1: "beginnen",   word2: "starten",      level: 2 },
    { word1: "enden",      word2: "aufhören",     level: 2 },
    { word1: "öffnen",     word2: "aufmachen",    level: 2 },
    { word1: "schließen",  word2: "zumachen",     level: 2 },
    { word1: "tragen",     word2: "schleppen",    level: 2 },

    // Adjektive
    { word1: "winzig",     word2: "klein",        level: 2 },
    { word1: "riesig",     word2: "groß",         level: 2 },
    { word1: "mutig",      word2: "tapfer",       level: 2 },
    { word1: "klug",       word2: "schlau",       level: 2 },
    { word1: "gemütlich",  word2: "bequem",       level: 2 },
    { word1: "einfach",    word2: "leicht",       level: 2 },
    { word1: "schwierig",  word2: "schwer",       level: 2 },
    { word1: "wütend",     word2: "zornig",       level: 2 },
    { word1: "munter",     word2: "wach",         level: 2 },
    { word1: "exakt",      word2: "genau",        level: 2 },
    { word1: "rasch",      word2: "geschwind",    level: 2 },
    { word1: "ängstlich",  word2: "bange",        level: 2 },
    { word1: "kräftig",    word2: "stark",        level: 2 },
    { word1: "sauber",     word2: "rein",         level: 2 },
    { word1: "dreckig",    word2: "schmutzig",    level: 2 },
    { word1: "schlau",     word2: "clever",       level: 2 },
    { word1: "munter",     word2: "lebhaft",      level: 2 },
    { word1: "hungrig",    word2: "ausgehungert", level: 2 },

    // Nomen
    { word1: "Freude",     word2: "Glück",        level: 2 },
    { word1: "Kumpel",     word2: "Freund",       level: 2 },
    { word1: "Weg",        word2: "Pfad",         level: 2 },
    { word1: "Wald",       word2: "Forst",        level: 2 },
    { word1: "Straße",     word2: "Gasse",        level: 2 },
    { word1: "Paket",      word2: "Päckchen",     level: 2 },

    // ═══════════════════════════════════════════════════
    // Level 3 – Schwer (Ausdrucksstarke Sprache / Texte)
    // ═══════════════════════════════════════════════════

    // Verben
    { word1: "flüstern",   word2: "tuscheln",     level: 3 },
    { word1: "fürchten",   word2: "ängstigen",    level: 3 },
    { word1: "träumen",    word2: "fantasieren",  level: 3 },
    { word1: "denken",     word2: "grübeln",      level: 3 },
    { word1: "verstecken", word2: "verbergen",    level: 3 },
    { word1: "gewinnen",   word2: "siegen",       level: 3 },
    { word1: "ärgern",     word2: "nerven",       level: 3 },
    { word1: "fragen",     word2: "erkundigen",   level: 3 },
    { word1: "antworten",  word2: "erwidern",     level: 3 },
    { word1: "anziehen",   word2: "bekleiden",    level: 3 },
    { word1: "rechnen",    word2: "kalkulieren",  level: 3 },
    { word1: "staunen",    word2: "wundern",      level: 3 },
    { word1: "erklären",   word2: "erläutern",    level: 3 },
    { word1: "beenden",    word2: "abschließen",  level: 3 },
    { word1: "bemerken",   word2: "feststellen",  level: 3 },
    { word1: "retten",     word2: "befreien",     level: 3 },
    { word1: "begleiten",  word2: "mitgehen",     level: 3 },
    { word1: "verlieren",  word2: "verlegen",     level: 3 },
    { word1: "betrachten", word2: "anschauen",    level: 3 },
    { word1: "schreiten",  word2: "stolzieren",   level: 3 },

    // Adjektive
    { word1: "gescheit",   word2: "schlau",       level: 3 },
    { word1: "eifrig",     word2: "fleißig",      level: 3 },
    { word1: "aufmerksam", word2: "wachsam",      level: 3 },
    { word1: "gemütlich",  word2: "behaglich",    level: 3 },
    { word1: "wunderbar",  word2: "herrlich",     level: 3 },
    { word1: "prächtig",   word2: "glanzvoll",    level: 3 },
    { word1: "erschöpft",  word2: "kraftlos",     level: 3 },
    { word1: "ärgerlich",  word2: "empörend",     level: 3 },
    { word1: "seltsam",    word2: "merkwürdig",   level: 3 },
    { word1: "vorsichtig", word2: "behutsam",     level: 3 },
    { word1: "höflich",    word2: "zuvorkommend", level: 3 },
    { word1: "ehrlich",    word2: "aufrichtig",   level: 3 },
    { word1: "dauerhaft",  word2: "beständig",    level: 3 },
    { word1: "bedrückt",   word2: "bekümmert",    level: 3 },

    // Nomen
    { word1: "Geschenk",   word2: "Präsent",      level: 3 },
    { word1: "Reise",      word2: "Ausflug",      level: 3 },
    { word1: "Geheimnis",  word2: "Rätsel",       level: 3 },
    { word1: "Gefahr",     word2: "Bedrohung",    level: 3 },
    { word1: "Irrtum",     word2: "Fehler",       level: 3 },
    { word1: "Streit",     word2: "Zank",         level: 3 },
    { word1: "Märchen",    word2: "Sage",         level: 3 },
];
