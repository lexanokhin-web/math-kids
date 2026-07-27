import { expandedArtikelData, expandedSyllableData } from './bigDataStore';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Sticker {
    id: string;
    emoji: string;
    name: string;
    rarity: Rarity;
    collectionId: string;
}

export interface Collection {
    id: string;
    name: string;
    description: string;
    bonusTitle: string;
    bonusDescription: string;
    icon: string;
    stickers: Sticker[];
}

export const RARITY_CONFIG = {
    common: { name: 'Gewöhnlich', color: '#4ade80', chance: 0.50 },
    uncommon: { name: 'Ungewöhnlich', color: '#3b82f6', chance: 0.30 },
    rare: { name: 'Selten', color: '#a855f7', chance: 0.12 },
    epic: { name: 'Episch', color: '#ec4899', chance: 0.06 },
    legendary: { name: 'Legendär', color: '#eab308', chance: 0.02 }
};

// --- BASE ORIGINAL COLLECTIONS ---
export const BASE_COLLECTIONS: Collection[] = [
    {
        id: 'zoo',
        name: 'Wildtiere',
        description: 'Sammle Tiere aus dem Dschungel!',
        bonusTitle: 'XP-Schub +2',
        bonusDescription: 'Jede Karte gibt +2 extra XP',
        icon: '🦁',
        stickers: [
            { id: 'lion', emoji: '🦁', name: 'Löwe', rarity: 'rare', collectionId: 'zoo' },
            { id: 'tiger', emoji: '🐯', name: 'Tiger', rarity: 'uncommon', collectionId: 'zoo' },
            { id: 'elephant', emoji: '🐘', name: 'Elefant', rarity: 'uncommon', collectionId: 'zoo' },
            { id: 'giraffe', emoji: '🦒', name: 'Giraffe', rarity: 'uncommon', collectionId: 'zoo' },
            { id: 'monkey', emoji: '🐒', name: 'Affe', rarity: 'common', collectionId: 'zoo' },
            { id: 'zebra', emoji: '🦓', name: 'Zebra', rarity: 'common', collectionId: 'zoo' }
        ]
    },
    {
        id: 'farm',
        name: 'Bauernhof',
        description: 'Alle Freunde vom Lande.',
        bonusTitle: 'Glücks-Hufeisen',
        bonusDescription: 'Höhere Chance auf seltene Sticker',
        icon: '🐮',
        stickers: [
            { id: 'cow', emoji: '🐮', name: 'Kuh', rarity: 'common', collectionId: 'farm' },
            { id: 'pig', emoji: '🐷', name: 'Schwein', rarity: 'common', collectionId: 'farm' },
            { id: 'chicken', emoji: '🐔', name: 'Huhn', rarity: 'common', collectionId: 'farm' },
            { id: 'sheep', emoji: '🐑', name: 'Schaf', rarity: 'uncommon', collectionId: 'farm' },
            { id: 'horse', emoji: '🐴', name: 'Pferd', rarity: 'rare', collectionId: 'farm' },
            { id: 'chick', emoji: '🐣', name: 'Küken', rarity: 'legendary', collectionId: 'farm' }
        ]
    },
    {
        id: 'pets',
        name: 'Haustiere',
        description: 'Beste Freunde für zu Hause.',
        bonusTitle: 'Treue-Bonus',
        bonusDescription: 'Längere Streak-Toleranz',
        icon: '🐶',
        stickers: [
            { id: 'dog', emoji: '🐶', name: 'Hund', rarity: 'common', collectionId: 'pets' },
            { id: 'cat', emoji: '🐱', name: 'Katze', rarity: 'common', collectionId: 'pets' },
            { id: 'rabbit', emoji: '🐰', name: 'Hase', rarity: 'uncommon', collectionId: 'pets' },
            { id: 'hamster', emoji: '🐹', name: 'Hamster', rarity: 'uncommon', collectionId: 'pets' },
            { id: 'parrot', emoji: '🦜', name: 'Papagei', rarity: 'rare', collectionId: 'pets' },
            { id: 'goldfish', emoji: '🐠', name: 'Goldfisch', rarity: 'epic', collectionId: 'pets' }
        ]
    },
    {
        id: 'ocean',
        name: 'Unterwasser',
        description: 'Geheimnisse der Tiefsee.',
        bonusTitle: 'Tiefen-Fokus',
        bonusDescription: 'Weniger Ablenkung beim Lesen',
        icon: '🐙',
        stickers: [
            { id: 'octopus', emoji: '🐙', name: 'Krake', rarity: 'uncommon', collectionId: 'ocean' },
            { id: 'whale', emoji: '🐋', name: 'Wal', rarity: 'rare', collectionId: 'ocean' },
            { id: 'shark', emoji: '🦈', name: 'Hai', rarity: 'epic', collectionId: 'ocean' },
            { id: 'crab', emoji: '🦀', name: 'Krabbe', rarity: 'common', collectionId: 'ocean' },
            { id: 'squid', emoji: '🦑', name: 'Tintenfisch', rarity: 'uncommon', collectionId: 'ocean' },
            { id: 'dolphin', emoji: '🐬', name: 'Delfin', rarity: 'legendary', collectionId: 'ocean' }
        ]
    },
    {
        id: 'birds',
        name: 'Vögel',
        description: 'Hoch in den Lüften.',
        bonusTitle: 'Leichtigkeit',
        bonusDescription: 'XP für Level-Up sinkt um 5%',
        icon: '🦜',
        stickers: [
            { id: 'owl', emoji: '🦉', name: 'Eule', rarity: 'rare', collectionId: 'birds' },
            { id: 'eagle', emoji: '🦅', name: 'Adler', rarity: 'epic', collectionId: 'birds' },
            { id: 'flamingo', emoji: '🦩', name: 'Flamingo', rarity: 'uncommon', collectionId: 'birds' },
            { id: 'peacock', emoji: '🦚', name: 'Pfau', rarity: 'legendary', collectionId: 'birds' },
            { id: 'toucan', emoji: '🦜', name: 'Tukan', rarity: 'common', collectionId: 'birds' },
            { id: 'penguin', emoji: '🐧', name: 'Pinguin', rarity: 'common', collectionId: 'birds' }
        ]
    },
    {
        id: 'fruits',
        name: 'Früchte & Beeren',
        description: 'Lecker und gesund!',
        bonusTitle: 'Vitamine',
        bonusDescription: '+15% Extra XP',
        icon: '🍓',
        stickers: [
            { id: 'strawberry', emoji: '🍓', name: 'Erdbeere', rarity: 'common', collectionId: 'fruits' },
            { id: 'apple', emoji: '🍎', name: 'Apfel', rarity: 'common', collectionId: 'fruits' },
            { id: 'banana', emoji: '🍌', name: 'Banane', rarity: 'common', collectionId: 'fruits' },
            { id: 'watermelon', emoji: '🍉', name: 'Wassermelone', rarity: 'uncommon', collectionId: 'fruits' },
            { id: 'cherry', emoji: '🍒', name: 'Kirsche', rarity: 'rare', collectionId: 'fruits' },
            { id: 'pineapple', emoji: '🍍', name: 'Ananas', rarity: 'epic', collectionId: 'fruits' }
        ]
    }
];

const raritiesList: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

// Helper to construct unique collections dynamically from bigDataStore vocabulary!
function generateBigDataCollections(): Collection[] {
  const allItems: { emoji: string; name: string }[] = [];
  const seenEmoji = new Set<string>();

  // Add items from expandedArtikelData
  for (const item of expandedArtikelData) {
    if (!seenEmoji.has(item.emoji)) {
      seenEmoji.add(item.emoji);
      allItems.push({ emoji: item.emoji, name: item.word });
    }
  }

  // Add items from expandedSyllableData
  for (const item of expandedSyllableData) {
    if (!seenEmoji.has(item.emoji)) {
      seenEmoji.add(item.emoji);
      allItems.push({ emoji: item.emoji, name: item.word });
    }
  }

  // Create chunked collections of 25 unique items each
  const collections: Collection[] = [];
  const chunkSize = 25;
  let catIndex = 1;

  for (let i = 0; i < allItems.length; i += chunkSize) {
    const chunk = allItems.slice(i, i + chunkSize);
    const colId = `bigdata_col_${catIndex}`;
    const collectionStickers: Sticker[] = chunk.map((item, idx) => ({
      id: `${colId}_${idx + 1}`,
      emoji: item.emoji,
      name: item.name,
      rarity: raritiesList[idx % raritiesList.length],
      collectionId: colId
    }));

    collections.push({
      id: colId,
      name: `Wortschatz-Sammlung ${catIndex}`,
      description: `Entdecke 25 einzigartige Wörter und Begriffe aus der Lernwelt!`,
      bonusTitle: 'Wortschatz-Bonus',
      bonusDescription: '+10 Extra XP für jede gelöste Aufgabe',
      icon: chunk[0]?.emoji || '📘',
      stickers: collectionStickers
    });

    catIndex++;
  }

  return collections;
}

export const BIG_DATA_COLLECTIONS: Collection[] = generateBigDataCollections();

export const STICKER_COLLECTIONS: Collection[] = [
  ...BASE_COLLECTIONS,
  ...BIG_DATA_COLLECTIONS
];
