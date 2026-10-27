// Grundwortschatz Klasse 2 für Grundschulen in Deutschland
// Nomen mit Begleitern (der, die, das) und Wortarten (Nomen, Verben, Adjektive)

export type Gender = 'der' | 'die' | 'das';
export type Wortart = 'nomen' | 'verb' | 'adjektiv';
export type WortKategorie = 'schule' | 'tiere' | 'haus' | 'essen' | 'koerper' | 'natur' | 'alltag';

export interface ArtikelKlasse2Item {
    id: string;
    word: string;
    gender: Gender;
    emoji: string;
    plural: string;
    category: WortKategorie;
    level: 1 | 2 | 3;
    tip?: string;
}

export interface WortartKlasse2Item {
    id: string;
    word: string;
    type: Wortart;
    emoji: string;
    explanation: string;
    exampleSentence: string;
    level: 1 | 2 | 3;
    probe: string; // Kindgerechte Probe (z.B. "die Katze", "ich laufe", "wie ist es? bunt")
}

// ----------------------------------------------------
// 1. ARTIKEL-WÖRTER (DER, DIE, DAS) FÜR KLASSE 2
// ----------------------------------------------------
export const artikelKlasse2List: ArtikelKlasse2Item[] = [
    // 🏫 Schule & Lernen
    { id: 'a_buch', word: 'Buch', gender: 'das', emoji: '📖', plural: 'die Bücher', category: 'schule', level: 1, tip: 'Das Buch zum Lesen' },
    { id: 'a_heft', word: 'Heft', gender: 'das', emoji: '📒', plural: 'die Hefte', category: 'schule', level: 1, tip: 'Das Schreibheft' },
    { id: 'a_stift', word: 'Bleistift', gender: 'der', emoji: '✏️', plural: 'die Bleistifte', category: 'schule', level: 1, tip: 'Männlicher Begleiter: der' },
    { id: 'a_schere', word: 'Schere', gender: 'die', emoji: '✂️', plural: 'die Scheren', category: 'schule', level: 1, tip: 'Weiblicher Begleiter: die' },
    { id: 'a_lineal', word: 'Lineal', gender: 'das', emoji: '📏', plural: 'die Lineale', category: 'schule', level: 2, tip: 'Sächlicher Begleiter: das' },
    { id: 'a_tafel', word: 'Tafel', gender: 'die', emoji: '🧑‍🏫', plural: 'die Tafeln', category: 'schule', level: 1, tip: 'Die Kreidetafel' },
    { id: 'a_fueller', word: 'Füller', gender: 'der', emoji: '✒️', plural: 'die Füller', category: 'schule', level: 2, tip: 'Der Füller mit Tinte' },
    { id: 'a_gummi', word: 'Radiergummi', gender: 'der', emoji: '🧼', plural: 'die Radiergummis', category: 'schule', level: 2, tip: 'Der Gummi' },
    { id: 'a_ranzen', word: 'Schulranzen', gender: 'der', emoji: '🎒', plural: 'die Schulranzen', category: 'schule', level: 2, tip: 'Der Ranzen auf dem Rücken' },
    { id: 'a_pause', word: 'Pause', gender: 'die', emoji: '🔔', plural: 'die Pausen', category: 'schule', level: 1, tip: 'Die große Pause' },
    { id: 'a_schule', word: 'Schule', gender: 'die', emoji: '🏫', plural: 'die Schulen', category: 'schule', level: 1, tip: 'Unsere Grundschule' },
    { id: 'a_lehrer', word: 'Lehrer', gender: 'der', emoji: '👨‍🏫', plural: 'die Lehrer', category: 'schule', level: 1, tip: 'Männliche Person: der' },
    { id: 'a_lehrerin', word: 'Lehrerin', gender: 'die', emoji: '👩‍🏫', plural: 'die Lehrerinnen', category: 'schule', level: 1, tip: 'Weibliche Endung -in: immer die' },
    { id: 'a_klasse', word: 'Klasse', gender: 'die', emoji: '👥', plural: 'die Klassen', category: 'schule', level: 1, tip: 'Die 2. Klasse' },
    { id: 'a_spitzer', word: 'Spitzer', gender: 'der', emoji: '🔩', plural: 'die Spitzer', category: 'schule', level: 2, tip: 'Der Spitzer für Stifte' },
    { id: 'a_wort', word: 'Wort', gender: 'das', emoji: '💬', plural: 'die Wörter', category: 'schule', level: 2, tip: 'Das Zauberwort' },

    // 🐾 Tiere
    { id: 'a_hund', word: 'Hund', gender: 'der', emoji: '🐶', plural: 'die Hunde', category: 'tiere', level: 1, tip: 'Der treue Hund' },
    { id: 'a_katze', word: 'Katze', gender: 'die', emoji: '🐱', plural: 'die Katzen', category: 'tiere', level: 1, tip: 'Die schlaue Katze' },
    { id: 'a_pferd', word: 'Pferd', gender: 'das', emoji: '🐴', plural: 'die Pferde', category: 'tiere', level: 1, tip: 'Das schnelle Pferd' },
    { id: 'a_maus', word: 'Maus', gender: 'die', emoji: '🐭', plural: 'die Mäuse', category: 'tiere', level: 1, tip: 'Die kleine Maus' },
    { id: 'a_vogel', word: 'Vogel', gender: 'der', emoji: '🐦', plural: 'die Vögel', category: 'tiere', level: 1, tip: 'Der bunte Vogel' },
    { id: 'a_fisch', word: 'Fisch', gender: 'der', emoji: '🐟', plural: 'die Fische', category: 'tiere', level: 1, tip: 'Der Fisch im Wasser' },
    { id: 'a_frosch', word: 'Frosch', gender: 'der', emoji: '🐸', plural: 'die Frösche', category: 'tiere', level: 1, tip: 'Der grüne Frosch' },
    { id: 'a_schwein', word: 'Schwein', gender: 'das', emoji: '🐷', plural: 'die Schweine', category: 'tiere', level: 1, tip: 'Das Glücksschwein' },
    { id: 'a_schaf', word: 'Schaf', gender: 'das', emoji: '🐑', plural: 'die Schafe', category: 'tiere', level: 1, tip: 'Das weiße Schaf' },
    { id: 'a_kuh', word: 'Kuh', gender: 'die', emoji: '🐮', plural: 'die Kühe', category: 'tiere', level: 1, tip: 'Die bunte Kuh' },
    { id: 'a_hase', word: 'Hase', gender: 'der', emoji: '🐰', plural: 'die Hasen', category: 'tiere', level: 1, tip: 'Der flinke Osterhase' },
    { id: 'a_igel', word: 'Igel', gender: 'der', emoji: '🦔', plural: 'die Igel', category: 'tiere', level: 2, tip: 'Der Igel mit Stacheln' },
    { id: 'a_ente', word: 'Ente', gender: 'die', emoji: '🦆', plural: 'die Enten', category: 'tiere', level: 1, tip: 'Die Ente auf dem Teich' },
    { id: 'a_baer', word: 'Bär', gender: 'der', emoji: '🐻', plural: 'die Bären', category: 'tiere', level: 1, tip: 'Der große Braunbär' },
    { id: 'a_wolf', word: 'Wolf', gender: 'der', emoji: '🐺', plural: 'die Wölfe', category: 'tiere', level: 2, tip: 'Der graue Wolf' },
    { id: 'a_reh', word: 'Reh', gender: 'das', emoji: '🦌', plural: 'die Rehe', category: 'tiere', level: 2, tip: 'Das scheue Reh' },
    { id: 'a_biene', word: 'Biene', gender: 'die', emoji: '🐝', plural: 'die Bienen', category: 'tiere', level: 1, tip: 'Die fleißige Biene' },
    { id: 'a_loewe', word: 'Löwe', gender: 'der', emoji: '🦁', plural: 'die Löwen', category: 'tiere', level: 1, tip: 'Der König der Tiere' },
    { id: 'a_elefant', word: 'Elefant', gender: 'der', emoji: '🐘', plural: 'die Elefanten', category: 'tiere', level: 2, tip: 'Der riesige Elefant' },
    { id: 'a_kroko', word: 'Krokodil', gender: 'das', emoji: '🐊', plural: 'die Krokodile', category: 'tiere', level: 2, tip: 'Das grüne Krokodil' },
    { id: 'a_zebra', word: 'Zebra', gender: 'das', emoji: '🦓', plural: 'die Zebras', category: 'tiere', level: 2, tip: 'Das gestreifte Zebra' },
    { id: 'a_kroete', word: 'Schildkröte', gender: 'die', emoji: '🐢', plural: 'die Schildkröten', category: 'tiere', level: 3, tip: 'Die uralte Schildkröte' },
    { id: 'a_huhn', word: 'Huhn', gender: 'das', emoji: '🐔', plural: 'die Hühner', category: 'tiere', level: 1, tip: 'Das Huhn legt Eier' },
    { id: 'a_affe', word: 'Affe', gender: 'der', emoji: '🐒', plural: 'die Affen', category: 'tiere', level: 1, tip: 'Der lustige Affe' },

    // 🏡 Zuhause & Familie
    { id: 'a_haus', word: 'Haus', gender: 'das', emoji: '🏠', plural: 'die Häuser', category: 'haus', level: 1, tip: 'Das gemütliche Haus' },
    { id: 'a_tisch', word: 'Tisch', gender: 'der', emoji: '🪑', plural: 'die Tische', category: 'haus', level: 1, tip: 'Der Holztisch' },
    { id: 'a_stuhl', word: 'Stuhl', gender: 'der', emoji: '🪑', plural: 'die Stühle', category: 'haus', level: 1, tip: 'Der bequeme Stuhl' },
    { id: 'a_bett', word: 'Bett', gender: 'das', emoji: '🛏️', plural: 'die Betten', category: 'haus', level: 1, tip: 'Das weiche Bett' },
    { id: 'a_tuer', word: 'Tür', gender: 'die', emoji: '🚪', plural: 'die Türen', category: 'haus', level: 1, tip: 'Die Haustür' },
    { id: 'a_fenster', word: 'Fenster', gender: 'das', emoji: '🪟', plural: 'die Fenster', category: 'haus', level: 1, tip: 'Das helle Fenster' },
    { id: 'a_schrank', word: 'Schrank', gender: 'der', emoji: '🚪', plural: 'die Schränke', category: 'haus', level: 2, tip: 'Der Kleiderschrank' },
    { id: 'a_kueche', word: 'Küche', gender: 'die', emoji: '🍳', plural: 'die Küchen', category: 'haus', level: 2, tip: 'Die warme Küche' },
    { id: 'a_zimmer', word: 'Zimmer', gender: 'das', emoji: '🚪', plural: 'die Zimmer', category: 'haus', level: 2, tip: 'Mein Kinderzimmer' },
    { id: 'a_vater', word: 'Vater', gender: 'der', emoji: '👨', plural: 'die Väter', category: 'haus', level: 1, tip: 'Männliche Person: der' },
    { id: 'a_mutter', word: 'Mutter', gender: 'die', emoji: '👩', plural: 'die Mütter', category: 'haus', level: 1, tip: 'Weibliche Person: die' },
    { id: 'a_kind', word: 'Kind', gender: 'das', emoji: '🧒', plural: 'die Kinder', category: 'haus', level: 1, tip: 'Sächlich: das Kind' },
    { id: 'a_bruder', word: 'Bruder', gender: 'der', emoji: '👦', plural: 'die Brüder', category: 'haus', level: 1, tip: 'Der ältere Bruder' },
    { id: 'a_schwester', word: 'Schwester', gender: 'die', emoji: '👧', plural: 'die Schwestern', category: 'haus', level: 1, tip: 'Die kleine Schwester' },
    { id: 'a_baby', word: 'Baby', gender: 'das', emoji: '👶', plural: 'die Babys', category: 'haus', level: 1, tip: 'Das süße Baby' },
    { id: 'a_garten', word: 'Garten', gender: 'der', emoji: '🏡', plural: 'die Gärten', category: 'haus', level: 1, tip: 'Der grüne Garten' },
    { id: 'a_lampe', word: 'Lampe', gender: 'die', emoji: '💡', plural: 'die Lampen', category: 'haus', level: 1, tip: 'Die helle Lampe' },
    { id: 'a_spiegel', word: 'Spiegel', gender: 'der', emoji: '🪞', plural: 'die Spiegel', category: 'haus', level: 2, tip: 'Der Wandspiegel' },

    // 🍎 Essen & Trinken
    { id: 'a_apfel', word: 'Apfel', gender: 'der', emoji: '🍎', plural: 'die Äpfel', category: 'essen', level: 1, tip: 'Der rote Apfel' },
    { id: 'a_birne', word: 'Birne', gender: 'die', emoji: '🍐', plural: 'die Birnen', category: 'essen', level: 1, tip: 'Die saftige Birne' },
    { id: 'a_banane', word: 'Banane', gender: 'die', emoji: '🍌', plural: 'die Bananen', category: 'essen', level: 1, tip: 'Die gelbe Banane' },
    { id: 'a_brot', word: 'Brot', gender: 'das', emoji: '🍞', plural: 'die Brote', category: 'essen', level: 1, tip: 'Das frische Brot' },
    { id: 'a_broetchen', word: 'Brötchen', gender: 'das', emoji: '🥖', plural: 'die Brötchen', category: 'essen', level: 2, tip: 'Endung -chen ist immer das!' },
    { id: 'a_milch', word: 'Milch', gender: 'die', emoji: '🥛', plural: 'die Milch', category: 'essen', level: 1, tip: 'Die weiße Milch' },
    { id: 'a_wasser', word: 'Wasser', gender: 'das', emoji: '💧', plural: 'die Wasser', category: 'essen', level: 1, tip: 'Das kühle Wasser' },
    { id: 'a_saft', word: 'Saft', gender: 'der', emoji: '🧃', plural: 'die Säfte', category: 'essen', level: 1, tip: 'Der leckere Orangensaft' },
    { id: 'a_kaese', word: 'Käse', gender: 'der', emoji: '🧀', plural: 'die Käse', category: 'essen', level: 1, tip: 'Der gelbe Käse' },
    { id: 'a_wurst', word: 'Wurst', gender: 'die', emoji: '🌭', plural: 'die Würste', category: 'essen', level: 1, tip: 'Die Bratwurst' },
    { id: 'a_ei', word: 'Ei', gender: 'das', emoji: '🥚', plural: 'die Eier', category: 'essen', level: 1, tip: 'Das runde Osterei' },
    { id: 'a_eis', word: 'Eis', gender: 'das', emoji: '🍦', plural: 'die Eis', category: 'essen', level: 1, tip: 'Das süße Vanilleeis' },
    { id: 'a_kuchen', word: 'Kuchen', gender: 'der', emoji: '🍰', plural: 'die Kuchen', category: 'essen', level: 1, tip: 'Der Geburtstagskuchen' },
    { id: 'a_suppe', word: 'Suppe', gender: 'die', emoji: '🍲', plural: 'die Suppen', category: 'essen', level: 2, tip: 'Die heiße Gemüsesuppe' },
    { id: 'a_schoko', word: 'Schokolade', gender: 'die', emoji: '🍫', plural: 'die Schokoladen', category: 'essen', level: 2, tip: 'Die süße Schokolade' },
    { id: 'a_erdbeere', word: 'Erdbeere', gender: 'die', emoji: '🍓', plural: 'die Erdbeeren', category: 'essen', level: 2, tip: 'Die süße Erdbeere' },

    // 👕 Körper & Kleidung
    { id: 'a_kopf', word: 'Kopf', gender: 'der', emoji: '👤', plural: 'die Köpfe', category: 'koerper', level: 1, tip: 'Der kluge Kopf' },
    { id: 'a_nase', word: 'Nase', gender: 'die', emoji: '👃', plural: 'die Nasen', category: 'koerper', level: 1, tip: 'Die Stupsnase' },
    { id: 'a_auge', word: 'Auge', gender: 'das', emoji: '👁️', plural: 'die Augen', category: 'koerper', level: 1, tip: 'Das blaue Auge' },
    { id: 'a_ohr', word: 'Ohr', gender: 'das', emoji: '👂', plural: 'die Ohren', category: 'koerper', level: 1, tip: 'Das spitze Ohr' },
    { id: 'a_mund', word: 'Mund', gender: 'der', emoji: '👄', plural: 'die Münder', category: 'koerper', level: 1, tip: 'Der lachende Mund' },
    { id: 'a_hand', word: 'Hand', gender: 'die', emoji: '✋', plural: 'die Hände', category: 'koerper', level: 1, tip: 'Die rechte Hand' },
    { id: 'a_finger', word: 'Finger', gender: 'der', emoji: '☝️', plural: 'die Finger', category: 'koerper', level: 1, tip: 'Der Zeigefinger' },
    { id: 'a_fuss', word: 'Fuß', gender: 'der', emoji: '🦶', plural: 'die Füße', category: 'koerper', level: 1, tip: 'Der linke Fuß' },
    { id: 'a_bein', word: 'Bein', gender: 'das', emoji: '🦵', plural: 'die Beine', category: 'koerper', level: 1, tip: 'Das lange Bein' },
    { id: 'a_arm', word: 'Arm', gender: 'der', emoji: '💪', plural: 'die Arme', category: 'koerper', level: 1, tip: 'Der starke Arm' },
    { id: 'a_herz', word: 'Herz', gender: 'das', emoji: '❤️', plural: 'die Herzen', category: 'koerper', level: 2, tip: 'Das klopfende Herz' },
    { id: 'a_schuh', word: 'Schuh', gender: 'der', emoji: '👟', plural: 'die Schuhe', category: 'koerper', level: 1, tip: 'Der Turnschuh' },
    { id: 'a_hose', word: 'Hose', gender: 'die', emoji: '👖', plural: 'die Hosen', category: 'koerper', level: 1, tip: 'Die Jeanshose' },
    { id: 'a_jacke', word: 'Jacke', gender: 'die', emoji: '🧥', plural: 'die Jacken', category: 'koerper', level: 1, tip: 'Die warme Winterjacke' },
    { id: 'a_kleid', word: 'Kleid', gender: 'das', emoji: '👗', plural: 'die Kleider', category: 'koerper', level: 1, tip: 'Das bunte Sommerkleid' },
    { id: 'a_muetze', word: 'Mütze', gender: 'die', emoji: '🧢', plural: 'die Mützen', category: 'koerper', level: 2, tip: 'Die Wollmütze' },
    { id: 'a_schal', word: 'Schal', gender: 'der', emoji: '🧣', plural: 'die Schals', category: 'koerper', level: 2, tip: 'Der lange Schal' },

    // 🌳 Natur & Wetter
    { id: 'a_baum', word: 'Baum', gender: 'der', emoji: '🌳', plural: 'die Bäume', category: 'natur', level: 1, tip: 'Der alte Baum' },
    { id: 'a_blume', word: 'Blume', gender: 'die', emoji: '🌸', plural: 'die Blumen', category: 'natur', level: 1, tip: 'Die duftende Blume' },
    { id: 'a_sonne', word: 'Sonne', gender: 'die', emoji: '☀️', plural: 'die Sonnen', category: 'natur', level: 1, tip: 'Die helle Sonne' },
    { id: 'a_mond', word: 'Mond', gender: 'der', emoji: '🌙', plural: 'die Monde', category: 'natur', level: 1, tip: 'Der Mond am Nachthimmel' },
    { id: 'a_stern', word: 'Stern', gender: 'der', emoji: '⭐', plural: 'die Sterne', category: 'natur', level: 1, tip: 'Der leuchtende Stern' },
    { id: 'a_wolke', word: 'Wolke', gender: 'die', emoji: '☁️', plural: 'die Wolken', category: 'natur', level: 1, tip: 'Die weiße Wolke' },
    { id: 'a_regen', word: 'Regen', gender: 'der', emoji: '🌧️', plural: 'die Regen', category: 'natur', level: 1, tip: 'Der warme Sommerregen' },
    { id: 'a_schnee', word: 'Schnee', gender: 'der', emoji: '❄️', plural: 'die Schnee', category: 'natur', level: 1, tip: 'Der kalte Schnee' },
    { id: 'a_wind', word: 'Wind', gender: 'der', emoji: '💨', plural: 'die Winde', category: 'natur', level: 1, tip: 'Der stürmische Wind' },
    { id: 'a_wald', word: 'Wald', gender: 'der', emoji: '🌲', plural: 'die Wälder', category: 'natur', level: 1, tip: 'Der geheimnisvolle Wald' },
    { id: 'a_wiese', word: 'Wiese', gender: 'die', emoji: '🌱', plural: 'die Wiesen', category: 'natur', level: 2, tip: 'Die grüne Wiese' },
    { id: 'a_blatt', word: 'Blatt', gender: 'das', emoji: '🍃', plural: 'die Blätter', category: 'natur', level: 1, tip: 'Das herbstliche Blatt' },
    { id: 'a_fluss', word: 'Fluss', gender: 'der', emoji: '🌊', plural: 'die Flüsse', category: 'natur', level: 2, tip: 'Der breite Fluss' },
    { id: 'a_meer', word: 'Meer', gender: 'das', emoji: '🌊', plural: 'die Meere', category: 'natur', level: 2, tip: 'Das weite Meer' },
    { id: 'a_berg', word: 'Berg', gender: 'der', emoji: '⛰️', plural: 'die Berge', category: 'natur', level: 1, tip: 'Der hohe Berg' },
    { id: 'a_feuer', word: 'Feuer', gender: 'das', emoji: '🔥', plural: 'die Feuer', category: 'natur', level: 2, tip: 'Das warme Lagerfeuer' },
    { id: 'a_tag', word: 'Tag', gender: 'der', emoji: '🌅', plural: 'die Tage', category: 'natur', level: 1, tip: 'Der sonnige Tag' },
    { id: 'a_nacht', word: 'Nacht', gender: 'die', emoji: '🌃', plural: 'die Nächte', category: 'natur', level: 1, tip: 'Die dunkle Nacht' }
];

// ----------------------------------------------------
// 2. WORTARTEN (NOMEN, VERBEN, ADJEKTIVE) FÜR KLASSE 2
// ----------------------------------------------------
export const wortartenKlasse2List: WortartKlasse2Item[] = [
    // === NOMEN (Namenwörter) - Immer großgeschrieben, Begleiter: der/die/das ===
    {
        id: 'w_hund',
        word: 'Hund',
        type: 'nomen',
        emoji: '🐶',
        explanation: 'Ein Nomen (Namenwort): Es ist ein Tier und wird großgeschrieben!',
        exampleSentence: 'Der Hund bellt fröhlich im Garten.',
        level: 1,
        probe: 'der Hund'
    },
    {
        id: 'w_katze',
        word: 'Katze',
        type: 'nomen',
        emoji: '🐱',
        explanation: 'Ein Nomen (Namenwort): Ein Tier, hat den Begleiter "die".',
        exampleSentence: 'Die Katze schnurrt auf dem Sofa.',
        level: 1,
        probe: 'die Katze'
    },
    {
        id: 'w_haus',
        word: 'Haus',
        type: 'nomen',
        emoji: '🏠',
        explanation: 'Ein Nomen (Namenwort): Ein Ding / Gebäude, immer großgeschrieben.',
        exampleSentence: 'Das rote Haus hat ein spitzes Dach.',
        level: 1,
        probe: 'das Haus'
    },
    {
        id: 'w_schule',
        word: 'Schule',
        type: 'nomen',
        emoji: '🏫',
        explanation: 'Ein Nomen (Namenwort): Ein Ort, an dem wir lernen.',
        exampleSentence: 'In der Schule treffen wir unsere Freunde.',
        level: 1,
        probe: 'die Schule'
    },
    {
        id: 'w_buch',
        word: 'Buch',
        type: 'nomen',
        emoji: '📖',
        explanation: 'Ein Nomen (Namenwort): Ein Gegenstand mit Seiten zum Lesen.',
        exampleSentence: 'Das spannende Buch liegt auf dem Tisch.',
        level: 1,
        probe: 'das Buch'
    },
    {
        id: 'w_baum',
        word: 'Baum',
        type: 'nomen',
        emoji: '🌳',
        explanation: 'Ein Nomen (Namenwort): Eine Pflanze, hat den Begleiter "der".',
        exampleSentence: 'Der hohe Baum trägt viele grüne Blätter.',
        level: 1,
        probe: 'der Baum'
    },
    {
        id: 'w_blume',
        word: 'Blume',
        type: 'nomen',
        emoji: '🌸',
        explanation: 'Ein Nomen (Namenwort): Eine Pflanze mit duftenden Blüten.',
        exampleSentence: 'Die bunte Blume wächst auf der Wiese.',
        level: 1,
        probe: 'die Blume'
    },
    {
        id: 'w_sonne',
        word: 'Sonne',
        type: 'nomen',
        emoji: '☀️',
        explanation: 'Ein Nomen (Namenwort): Unser Himmelskörper, immer groß.',
        exampleSentence: 'Die warme Sonne scheint den ganzen Tag.',
        level: 1,
        probe: 'die Sonne'
    },
    {
        id: 'w_kind',
        word: 'Kind',
        type: 'nomen',
        emoji: '🧒',
        explanation: 'Ein Nomen (Namenwort): Ein Mensch, hat den Begleiter "das".',
        exampleSentence: 'Das fröhliche Kind lacht laut.',
        level: 1,
        probe: 'das Kind'
    },
    {
        id: 'w_tisch',
        word: 'Tisch',
        type: 'nomen',
        emoji: '🪑',
        explanation: 'Ein Nomen (Namenwort): Ein Möbelstück / Gegenstand.',
        exampleSentence: 'Auf dem Tisch stehen Teller und Gläser.',
        level: 1,
        probe: 'der Tisch'
    },
    {
        id: 'w_ball',
        word: 'Ball',
        type: 'nomen',
        emoji: '⚽',
        explanation: 'Ein Nomen (Namenwort): Ein Spielzeug, immer groß.',
        exampleSentence: 'Der runde Ball rollt über das Spielfeld.',
        level: 1,
        probe: 'der Ball'
    },
    {
        id: 'w_schere',
        word: 'Schere',
        type: 'nomen',
        emoji: '✂️',
        explanation: 'Ein Nomen (Namenwort): Ein Werkzeug zum Basteln.',
        exampleSentence: 'Mit der Schere schneidet Tim das Papier.',
        level: 2,
        probe: 'die Schere'
    },
    {
        id: 'w_wasser',
        word: 'Wasser',
        type: 'nomen',
        emoji: '💧',
        explanation: 'Ein Nomen (Namenwort): Eine Flüssigkeit, Begleiter "das".',
        exampleSentence: 'Kühles Wasser erfrischt uns beim Sport.',
        level: 2,
        probe: 'das Wasser'
    },
    {
        id: 'w_apfel',
        word: 'Apfel',
        type: 'nomen',
        emoji: '🍎',
        explanation: 'Ein Nomen (Namenwort): Eine Frucht / Essen.',
        exampleSentence: 'Der süße Apfel schmeckt herrlich.',
        level: 2,
        probe: 'der Apfel'
    },
    {
        id: 'w_freund',
        word: 'Freund',
        type: 'nomen',
        emoji: '🤝',
        explanation: 'Ein Nomen (Namenwort): Eine Person / Mensch.',
        exampleSentence: 'Mein bester Freund hilft mir immer.',
        level: 2,
        probe: 'der Freund'
    },
    {
        id: 'w_stern',
        word: 'Stern',
        type: 'nomen',
        emoji: '⭐',
        explanation: 'Ein Nomen (Namenwort): Leuchtet in der Nacht am Himmel.',
        exampleSentence: 'Am Himmel funkelt ein kleiner Stern.',
        level: 2,
        probe: 'der Stern'
    },
    {
        id: 'w_traum',
        word: 'Traum',
        type: 'nomen',
        emoji: '💭',
        explanation: 'Ein Nomen (Namenwort): Man kann es denken und fühlen.',
        exampleSentence: 'Ich hatte einen wunderschönen Traum.',
        level: 3,
        probe: 'der Traum'
    },
    {
        id: 'w_freude',
        word: 'Freude',
        type: 'nomen',
        emoji: '🎉',
        explanation: 'Ein Nomen (Namenwort): Ein Gefühl, hat den Begleiter "die".',
        exampleSentence: 'Große Freude herrscht in der Klasse.',
        level: 3,
        probe: 'die Freude'
    },

    // === VERBEN (Tunwörter) - Was tut jemand? Immer kleingeschrieben! ===
    {
        id: 'w_spielen',
        word: 'spielen',
        type: 'verb',
        emoji: '🎮',
        explanation: 'Ein Verb (Tunwort): Etwas, das wir tun können! (ich spiele, du spielst)',
        exampleSentence: 'Die Kinder spielen fröhlich auf dem Hof.',
        level: 1,
        probe: 'wir spielen'
    },
    {
        id: 'w_laufen',
        word: 'laufen',
        type: 'verb',
        emoji: '🏃',
        explanation: 'Ein Verb (Tunwort): Zeigt eine Bewegung. (ich laufe, du läufst)',
        exampleSentence: 'Wir laufen schnell zum Sportplatz.',
        level: 1,
        probe: 'wir laufen'
    },
    {
        id: 'w_singen',
        word: 'singen',
        type: 'verb',
        emoji: '🎤',
        explanation: 'Ein Verb (Tunwort): Eine Handlung mit der Stimme. (ich singe)',
        exampleSentence: 'Alle singen ein lustiges Lied.',
        level: 1,
        probe: 'wir singen'
    },
    {
        id: 'w_lachen',
        word: 'lachen',
        type: 'verb',
        emoji: '😄',
        explanation: 'Ein Verb (Tunwort): Was tust du? Du lachst über den Witz!',
        exampleSentence: 'Sie lachen herzlich miteinander.',
        level: 1,
        probe: 'wir lachen'
    },
    {
        id: 'w_lesen',
        word: 'lesen',
        type: 'verb',
        emoji: '📖',
        explanation: 'Ein Verb (Tunwort): Was tut jemand? Ein Buch lesen!',
        exampleSentence: 'Ich lese jeden Abend eine Geschichte.',
        level: 1,
        probe: 'wir lesen'
    },
    {
        id: 'w_schreiben',
        word: 'schreiben',
        type: 'verb',
        emoji: '✍️',
        explanation: 'Ein Verb (Tunwort): Wörter mit dem Stift aufschreiben.',
        exampleSentence: 'Wir schreiben neue Wörter ins Heft.',
        level: 1,
        probe: 'wir schreiben'
    },
    {
        id: 'w_schlafen',
        word: 'schlafen',
        type: 'verb',
        emoji: '😴',
        explanation: 'Ein Verb (Tunwort): Was passiert in der Nacht? Schlafen!',
        exampleSentence: 'Die Katze schläft friedlich im Korb.',
        level: 1,
        probe: 'wir schlafen'
    },
    {
        id: 'w_malen',
        word: 'malen',
        type: 'verb',
        emoji: '🎨',
        explanation: 'Ein Verb (Tunwort): Ein Bild mit bunten Farben gestalten.',
        exampleSentence: 'Die Schüler malen eine bunte Frühlingswiese.',
        level: 1,
        probe: 'wir malen'
    },
    {
        id: 'w_springen',
        word: 'springen',
        type: 'verb',
        emoji: '🦘',
        explanation: 'Ein Verb (Tunwort): Eine sportliche Bewegung in die Höhe.',
        exampleSentence: 'Die Kinder springen über das Seil.',
        level: 1,
        probe: 'wir springen'
    },
    {
        id: 'w_schwimmen',
        word: 'schwimmen',
        type: 'verb',
        emoji: '🏊',
        explanation: 'Ein Verb (Tunwort): Bewegung im Wasser. (ich schwimme)',
        exampleSentence: 'Die Fische schwimmen munter im See.',
        level: 1,
        probe: 'wir schwimmen'
    },
    {
        id: 'w_essen',
        word: 'essen',
        type: 'verb',
        emoji: '🍽️',
        explanation: 'Ein Verb (Tunwort): Nahrung zu sich nehmen. (ich esse)',
        exampleSentence: 'Wir essen mittags leckere Nudeln.',
        level: 1,
        probe: 'wir essen'
    },
    {
        id: 'w_trinken',
        word: 'trinken',
        type: 'verb',
        emoji: '🥤',
        explanation: 'Ein Verb (Tunwort): Ein Glas Saft oder Wasser trinken.',
        exampleSentence: 'Nach dem Laufen trinken wir frisches Wasser.',
        level: 1,
        probe: 'wir trinken'
    },
    {
        id: 'w_fliegen',
        word: 'fliegen',
        type: 'verb',
        emoji: '🦅',
        explanation: 'Ein Verb (Tunwort): Mit Flügeln durch die Luft gleiten.',
        exampleSentence: 'Die Schwalben fliegen hoch am blauen Himmel.',
        level: 2,
        probe: 'wir fliegen'
    },
    {
        id: 'w_rufen',
        word: 'rufen',
        type: 'verb',
        emoji: '🗣️',
        explanation: 'Ein Verb (Tunwort): Laut mit der Stimme jemanden ansprechen.',
        exampleSentence: 'Die Mutter ruft die Kinder zum Abendessen.',
        level: 2,
        probe: 'wir rufen'
    },
    {
        id: 'w_kochen',
        word: 'kochen',
        type: 'verb',
        emoji: '🍳',
        explanation: 'Ein Verb (Tunwort): Eine Mahlzeit auf dem Herd zubereiten.',
        exampleSentence: 'Papa und Oma kochen heute eine warme Suppe.',
        level: 2,
        probe: 'wir kochen'
    },
    {
        id: 'w_huepfen',
        word: 'hüpfen',
        type: 'verb',
        emoji: '🐇',
        explanation: 'Ein Verb (Tunwort): Kleine Sprünge machen. (ich hüpfe)',
        exampleSentence: 'Kleine Hasen hüpfen fröhlich durchs Gras.',
        level: 2,
        probe: 'wir hüpfen'
    },
    {
        id: 'w_hoeren',
        word: 'hören',
        type: 'verb',
        emoji: '👂',
        explanation: 'Ein Verb (Tunwort): Mit den Ohren Geräusche wahrnehmen.',
        exampleSentence: 'Wir hören der spannenden Geschichte zu.',
        level: 2,
        probe: 'wir hören'
    },
    {
        id: 'w_klettern',
        word: 'klettern',
        type: 'verb',
        emoji: '🧗',
        explanation: 'Ein Verb (Tunwort): Auf einen Baum oder ein Gerüst steigen.',
        exampleSentence: 'Die mutigen Kinder klettern auf die Leiter.',
        level: 3,
        probe: 'wir klettern'
    },
    {
        id: 'w_helfen',
        word: 'helfen',
        type: 'verb',
        emoji: '🤝',
        explanation: 'Ein Verb (Tunwort): Jemandem zur Seite stehen. (ich helfe)',
        exampleSentence: 'Gute Freunde helfen einander bei den Aufgaben.',
        level: 3,
        probe: 'wir helfen'
    },

    // === ADJEKTIVE (Wie-Wörter) - Wie ist etwas? Immer kleingeschrieben! ===
    {
        id: 'w_schnell',
        word: 'schnell',
        type: 'adjektiv',
        emoji: '⚡',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie läuft das Kind? Schnell!',
        exampleSentence: 'Das rote Rennauto ist besonders schnell.',
        level: 1,
        probe: 'wie ist es? schnell'
    },
    {
        id: 'w_langsam',
        word: 'langsam',
        type: 'adjektiv',
        emoji: '🐢',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie kriecht die Schnecke? Langsam!',
        exampleSentence: 'Die alte Schildkröte bewegt sich langsam vorwärts.',
        level: 1,
        probe: 'wie ist es? langsam'
    },
    {
        id: 'w_bunt',
        word: 'bunt',
        type: 'adjektiv',
        emoji: '🌈',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist der Regenbogen? Bunt!',
        exampleSentence: 'Ein bunter Schmetterling sitzt auf der Blume.',
        level: 1,
        probe: 'wie ist es? bunt'
    },
    {
        id: 'w_gross',
        word: 'groß',
        type: 'adjektiv',
        emoji: '🦒',
        explanation: 'Ein Adjektiv (Wie-Wort): Beschreibt die Größe. Wie ist die Giraffe? Groß!',
        exampleSentence: 'Der Elefant ist ein sehr großes Tier.',
        level: 1,
        probe: 'wie ist es? groß'
    },
    {
        id: 'w_klein',
        word: 'klein',
        type: 'adjektiv',
        emoji: '🐜',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist die Ameise? Klein!',
        exampleSentence: 'Die kleine Maus huscht leise durchs Zimmer.',
        level: 1,
        probe: 'wie ist es? klein'
    },
    {
        id: 'w_lustig',
        word: 'lustig',
        type: 'adjektiv',
        emoji: '🤡',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist der Clown? Lustig!',
        exampleSentence: 'Der Clown erzählt einen lustigen Witz.',
        level: 1,
        probe: 'wie ist es? lustig'
    },
    {
        id: 'w_leise',
        word: 'leise',
        type: 'adjektiv',
        emoji: '🤫',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie sprechen wir in der Bibliothek? Leise!',
        exampleSentence: 'Im Leseraum ist es ganz leise.',
        level: 1,
        probe: 'wie ist es? leise'
    },
    {
        id: 'w_laut',
        word: 'laut',
        type: 'adjektiv',
        emoji: '📢',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist der Donner? Laut!',
        exampleSentence: 'Die Musik auf dem Schulfest spielt laut.',
        level: 1,
        probe: 'wie ist es? laut'
    },
    {
        id: 'w_warm',
        word: 'warm',
        type: 'adjektiv',
        emoji: '☀️',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist der Tee? Warm!',
        exampleSentence: 'An einem Sommertag ist es herrlich warm.',
        level: 1,
        probe: 'wie ist es? warm'
    },
    {
        id: 'w_kalt',
        word: 'kalt',
        type: 'adjektiv',
        emoji: '❄️',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie fühlt sich Schnee an? Kalt!',
        exampleSentence: 'Im Winter weht ein eiskalter Wind.',
        level: 1,
        probe: 'wie ist es? kalt'
    },
    {
        id: 'w_rund',
        word: 'rund',
        type: 'adjektiv',
        emoji: '⚽',
        explanation: 'Ein Adjektiv (Wie-Wort): Beschreibt die Form. Wie ist der Ball? Rund!',
        exampleSentence: 'Der runde Mond leuchtet am Himmel.',
        level: 1,
        probe: 'wie ist es? rund'
    },
    {
        id: 'w_suess',
        word: 'süß',
        type: 'adjektiv',
        emoji: '🍬',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie schmeckt die Schokolade? Süß!',
        exampleSentence: 'Die reifen Erdbeeren schmecken wunderbar süß.',
        level: 1,
        probe: 'wie ist es? süß'
    },
    {
        id: 'w_fleissig',
        word: 'fleißig',
        type: 'adjektiv',
        emoji: '🐝',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie arbeitet die Biene? Fleißig!',
        exampleSentence: 'Die fleißigen Schüler üben fleißig lesen.',
        level: 2,
        probe: 'wie ist es? fleißig'
    },
    {
        id: 'w_klug',
        word: 'klug',
        type: 'adjektiv',
        emoji: '🦉',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist die Eule? Klug!',
        exampleSentence: 'Ein kluger Fuchs findet immer einen Weg.',
        level: 2,
        probe: 'wie ist es? klug'
    },
    {
        id: 'w_mutig',
        word: 'mutig',
        type: 'adjektiv',
        emoji: '🦁',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist der Löwe? Mutig!',
        exampleSentence: 'Die mutige Retterin klettert auf den Baum.',
        level: 2,
        probe: 'wie ist es? mutig'
    },
    {
        id: 'w_traurig',
        word: 'traurig',
        type: 'adjektiv',
        emoji: '😢',
        explanation: 'Ein Adjektiv (Wie-Wort): Beschreibt ein Gefühl. Wie fühlt er sich? Traurig.',
        exampleSentence: 'Er war kurz traurig, aber lacht jetzt wieder.',
        level: 2,
        probe: 'wie ist es? traurig'
    },
    {
        id: 'w_hell',
        word: 'hell',
        type: 'adjektiv',
        emoji: '💡',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist das Zimmer? Hell!',
        exampleSentence: 'Die Morgensonne macht das ganze Zimmer hell.',
        level: 2,
        probe: 'wie ist es? hell'
    },
    {
        id: 'w_dunkel',
        word: 'dunkel',
        type: 'adjektiv',
        emoji: '🌑',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie ist die Nacht? Dunkel!',
        exampleSentence: 'Im dichten Wald wird es abends schnell dunkel.',
        level: 2,
        probe: 'wie ist es? dunkel'
    },
    {
        id: 'w_sauber',
        word: 'sauber',
        type: 'adjektiv',
        emoji: '🧼',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie sind die Hände nach dem Waschen? Sauber!',
        exampleSentence: 'Das frisch geputzte Klassenzimmer ist blitzblank sauber.',
        level: 3,
        probe: 'wie ist es? sauber'
    },
    {
        id: 'w_weich',
        word: 'weich',
        type: 'adjektiv',
        emoji: '🧸',
        explanation: 'Ein Adjektiv (Wie-Wort): Wie fühlt sich das Kissen an? Weich!',
        exampleSentence: 'Der Teddybär hat ein herrlich weiches Fell.',
        level: 3,
        probe: 'wie ist es? weich'
    }
];

// Hilfsfunktion: Hole Nomen für Der/Die/Das nach Kategorie und Stufe
export const getArtikelWords = (category: 'all' | WortKategorie, level: number = 1): ArtikelKlasse2Item[] => {
    let pool = artikelKlasse2List;
    if (category !== 'all') {
        pool = pool.filter(item => item.category === category);
    }
    // Filter nach Schwierigkeitsgrad (Level 1: level <= 1; Level 2: level <= 2; Level 3: alle)
    if (level === 1) {
        pool = pool.filter(item => item.level === 1);
    } else if (level === 2) {
        pool = pool.filter(item => item.level <= 2);
    }
    return pool;
};

// Hilfsfunktion: Hole Wortarten nach Stufe
export const getWortartenWords = (level: number = 1): WortartKlasse2Item[] => {
    let pool = wortartenKlasse2List;
    if (level === 1) {
        pool = pool.filter(item => item.level === 1);
    } else if (level === 2) {
        pool = pool.filter(item => item.level <= 2);
    }
    return pool;
};
