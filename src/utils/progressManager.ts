import { STICKER_COLLECTIONS, RARITY_CONFIG } from './stickerData';
import type { Sticker, Rarity } from './stickerData';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    requiredScore: number;
    isUnlocked: boolean;
}
export interface Progress {
    totalCorrectAnswers: number;
    achievements: Achievement[];
    highScore: number;
    gamesPlayed: number;
    xp: number;
    level: number;
    readingCardsCount: number;
    matchingGamesCount: number;
    synonymsGamesCount: number;
    unlockedStickers: string[];
    streakCount: number;
    lastPracticeDate: string | null;

    // Game specific tracking
    artikelGamesCount: number;
    artikelLevel: number;
    syllableGamesCount: number;
    syllableLevel: number;
    comparisonGamesCount: number;
    comparisonLevel: number;
    rhymeGamesCount: number;
    rhymeLevel: number;
    sequenceGamesCount: number;
    sequenceLevel: number;
    gapGamesCount: number;
    gapLevel: number;
    unscrambleGamesCount: number;
    unscrambleLevel: number;

    bridgeGamesCount: number;
    bridgeLevel: number;
    imageMatchGamesCount: number;
    imageMatchLevel: number;
    sequenceMemoryGamesCount: number;
    sequenceMemoryLevel: number;
    matchingLevel: number;
    
    [key: string]: number | string | Achievement[] | string[] | boolean | null | undefined;
}

const defaultAchievements: Achievement[] = [
    { id: 'first_star', title: 'Erster Stern!', description: 'Beantworte deine erste Frage richtig', requiredScore: 1, isUnlocked: false },
    { id: 'math_rookie', title: 'Mathe-Anfänger', description: 'Beantworte 5 Fragen richtig', requiredScore: 5, isUnlocked: false },
    { id: 'math_explorer', title: 'Mathe-Entdecker', description: 'Beantworte 10 Fragen richtig', requiredScore: 10, isUnlocked: false },
    { id: 'math_master', title: 'Mathe-Meister', description: 'Beantworte 20 Fragen richtig', requiredScore: 20, isUnlocked: false },
    { id: 'math_genius', title: 'Mathe-Genie', description: 'Beantworte 50 Fragen richtig', requiredScore: 50, isUnlocked: false },
    { id: 'hundred_club', title: '100er Club', description: 'Beantworte 100 Fragen richtig', requiredScore: 100, isUnlocked: false },
    { id: 'first_game', title: 'Erstes Spiel', description: 'Beende dein erstes Spiel', requiredScore: 0, isUnlocked: false },
    { id: 'reading_start', title: 'Lese-Starter', description: 'Lies deine ersten 10 Karten', requiredScore: 0, isUnlocked: false },
    { id: 'reading_pro', title: 'Lese-Profi', description: 'Lies 100 Karten', requiredScore: 0, isUnlocked: false },
    { id: 'level_5', title: 'Level 5 erreicht!', description: 'Lerne weiter so!', requiredScore: 0, isUnlocked: false },
    { id: 'level_10', title: 'Level 10 Master!', description: 'Du bist großartig!', requiredScore: 0, isUnlocked: false },
    { id: 'matching_start', title: 'Paarsucher', description: 'Finde deine ersten 5 Gegenteile', requiredScore: 0, isUnlocked: false },
    { id: 'matching_pro', title: 'Antonym-Experte', description: 'Beende 10 Gegenteile-Spiele', requiredScore: 0, isUnlocked: false },
    { id: 'synonym_start', title: 'Wortakrobat', description: 'Finde deine ersten Synonyme', requiredScore: 0, isUnlocked: false },
    { id: 'synonym_pro', title: 'Sprach-Jongleur', description: 'Beende 10 Synonym-Spiele', requiredScore: 0, isUnlocked: false },
    { id: 'artikel_king', title: 'Artikel-König', description: 'Werde Meister der Artikel', requiredScore: 0, isUnlocked: false },
    { id: 'all_rounder', title: 'Всезнайка', description: 'Сыграй во все 10 новых игр', requiredScore: 0, isUnlocked: false },
];

const STORAGE_KEY = 'mathkids_progress';

export const getEmptyProgress = (): Progress => ({
    totalCorrectAnswers: 0,
    achievements: defaultAchievements.map(a => ({ ...a })),
    highScore: 0,
    gamesPlayed: 0,
    xp: 0,
    level: 1,
    readingCardsCount: 0,
    matchingGamesCount: 0,
    synonymsGamesCount: 0,
    unlockedStickers: [],
    streakCount: 0,
    lastPracticeDate: null,
    artikelGamesCount: 0,
    artikelLevel: 1,
    syllableGamesCount: 0,
    syllableLevel: 1,
    comparisonGamesCount: 0,
    comparisonLevel: 1,
    rhymeGamesCount: 0,
    rhymeLevel: 1,
    sequenceGamesCount: 0,
    sequenceLevel: 1,
    gapGamesCount: 0,
    gapLevel: 1,
    unscrambleGamesCount: 0,
    unscrambleLevel: 1,

    bridgeGamesCount: 0,
    bridgeLevel: 1,
    imageMatchGamesCount: 0,
    imageMatchLevel: 1,
    sequenceMemoryGamesCount: 0,
    sequenceMemoryLevel: 1,
    matchingLevel: 1
});


export const loadProgress = (): Progress => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            
            // Check for broken streaks
            if (parsed.lastPracticeDate) {
                const last = new Date(parsed.lastPracticeDate);
                const today = new Date();
                const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 3600 * 24));
                
                if (diffDays > 1) { // Missed more than 1 day
                    parsed.streakCount = 0;
                }
            }
            
            return {
                ...getEmptyProgress(),
                ...parsed
            };
        }
    } catch (e) {
        console.error('Failed to load progress', e);
    }
    return getEmptyProgress();
};

export const updateStreak = (): { streak: number, newStreak: boolean } => {
    const progress = loadProgress();
    const today = new Date().toISOString().split('T')[0];
    
    if (progress.lastPracticeDate === today) {
        return { streak: progress.streakCount, newStreak: false };
    }
    
    let newStreak = false;
    if (progress.lastPracticeDate) {
        const lastDate = progress.lastPracticeDate;
        const last = new Date(lastDate);
        const nextDay = new Date(last);
        nextDay.setDate(nextDay.getDate() + 1);
        const tomorrow = nextDay.toISOString().split('T')[0];
        
        if (today === tomorrow) {
            progress.streakCount += 1;
            newStreak = true;
        } else {
            progress.streakCount = 1;
            newStreak = true;
        }
    } else {
        progress.streakCount = 1;
        newStreak = true;
    }
    
    progress.lastPracticeDate = today;
    saveProgress(progress);
    return { streak: progress.streakCount, newStreak };
};

export const saveProgress = (progress: Progress): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.error('Failed to save progress', e);
    }
};

export const XP_PER_LEVEL = 100;

export const addXP = (amount: number): { progress: Progress, leveledUp: boolean, unlockedAchievement: Achievement | null } => {
    const progress = loadProgress();
    
    // Check for level up bonus from collections
    const bonuses = getCollectionBonuses(progress);
    let finalAmount = amount;
    
    // XP Modifiers
    if (bonuses.includes('zoo')) finalAmount += 2; // Zoo: +2 fixed
    if (bonuses.includes('sea')) finalAmount = Math.ceil(finalAmount * 1.05); // Sea: +5%
    if (bonuses.includes('fruits')) finalAmount = Math.ceil(finalAmount * 1.15); // Fruits: +15%
    if (bonuses.includes('cosmos')) finalAmount += 5; // Cosmos: +5 logik fixed
    if (bonuses.includes('antonyms')) finalAmount *= 2; // Antonyms: x2 XP!
    if (bonuses.includes('synonyms')) finalAmount *= 2; // Synonyms: x2 XP!
    
    progress.xp += finalAmount;
    
    let leveledUp = false;
    // Level Up Speed Modifiers
    let xpNeeded = XP_PER_LEVEL;
    if (bonuses.includes('birds')) xpNeeded *= 0.95; // Birds: -5% cost
    if (bonuses.includes('sports')) xpNeeded *= 0.85; // Sports: -15% cost
    
    const newLevel = Math.floor(progress.xp / xpNeeded) + 1;
    
    if (newLevel > progress.level) {
        progress.level = newLevel;
        leveledUp = true;
    }
    
    const unlockedAchievement = checkAchievements(progress);
    saveProgress(progress);
    
    return { progress, leveledUp, unlockedAchievement };
};

export const trackReading = (): { progress: Progress, unlockedSticker: Sticker | null } => {
    const progress = loadProgress();
    progress.readingCardsCount += 1;
    
    let unlockedSticker: Sticker | null = null;
    
    // Unlock a sticker every 5 cards
    if (progress.readingCardsCount % 5 === 0) {
        const allStickers = STICKER_COLLECTIONS.flatMap(c => c.stickers);
        const availableStickers = allStickers.filter(s => !progress.unlockedStickers.includes(s.id));
        
        if (availableStickers.length > 0) {
            // Pick rarity first
            const rand = Math.random();
            const bonuses = getCollectionBonuses(progress);
            const luckyBonus = bonuses.includes('treasures');
            
            const rarities: Rarity[] = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
            let chosenRarity: Rarity = 'common';
            let cumulativeChance = 0;
            
            for (const r of rarities) {
                let chance = RARITY_CONFIG[r].chance;
                
                // Treasures bonus: +2% for epic/legendary/rare
                if (luckyBonus && (r === 'legendary' || r === 'epic' || r === 'rare')) {
                    chance *= 1.5; // 50% more likely for rare tiers
                }
                
                cumulativeChance += chance;
                if (rand < cumulativeChance) {
                    chosenRarity = r;
                    break;
                }
            }
            
            // Filter available by rarity
            let sameRarityAvailable = availableStickers.filter(s => s.rarity === chosenRarity);
            
            // Fallback if no stickers of that rarity are available
            if (sameRarityAvailable.length === 0) {
                sameRarityAvailable = availableStickers;
            }
            
            const picked = sameRarityAvailable[Math.floor(Math.random() * sameRarityAvailable.length)];
            progress.unlockedStickers.push(picked.id);
            unlockedSticker = picked;
        }
    }
    
    saveProgress(progress);
    return { progress, unlockedSticker };
};

export const trackGeneralGame = (gameId: string, xpPoints: number = 10, wonAll: boolean = true): { progress: Progress, unlockedSticker: Sticker | null, leveledUp: boolean, unlockedAchievement: Achievement | null } => {
    const progress = loadProgress();
    const countKey = `${gameId}GamesCount`;
    const levelKey = `${gameId}Level`;
    const currentVal = (progress[countKey as keyof Progress] as number) || 0;
    progress[countKey] = currentVal + 1;
    
    // Level up logic (max 3)
    if (wonAll) {
        const currentLevel = (progress[levelKey as keyof Progress] as number) || 1;
        if (currentLevel < 3) {
            progress[levelKey] = currentLevel + 1;
        }
    }
    
    const xpResult = addXP(xpPoints);
    
    let unlockedSticker: Sticker | null = null;
    const totalGames = Object.keys(progress)
        .filter(k => k.endsWith('GamesCount'))
        .reduce((sum, k) => sum + ((progress[k as keyof Progress] as number) || 0), 0);


    if (totalGames % 3 === 0) {
        const allStickers = STICKER_COLLECTIONS.flatMap(c => c.stickers);
        const availableStickers = allStickers.filter(s => !progress.unlockedStickers.includes(s.id));
        
        if (availableStickers.length > 0) {
            const rand = Math.random();
            const bonuses = getCollectionBonuses(progress);
            const r: Rarity[] = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
            let chosenRarity: Rarity = 'common';
            let cum = 0;
            for (const rar of r) {
                let chance = RARITY_CONFIG[rar].chance;
                if (bonuses.includes('farm')) chance *= 1.2;
                cum += chance;
                if (rand < cum) { chosenRarity = rar; break; }
            }
            let avail = availableStickers.filter(s => s.rarity === chosenRarity);
            if (avail.length === 0) avail = availableStickers;
            const picked = avail[Math.floor(Math.random() * avail.length)];
            progress.unlockedStickers.push(picked.id);
            unlockedSticker = picked;
        }
    }
    
    saveProgress(progress);
    return { 
        progress, 
        unlockedSticker, 
        leveledUp: xpResult.leveledUp, 
        unlockedAchievement: xpResult.unlockedAchievement || checkAchievements(progress) 
    };
};

export const trackMatchingGame = (type: 'antonyms' | 'synonyms' = 'antonyms'): { progress: Progress, unlockedSticker: Sticker | null, leveledUp: boolean, unlockedAchievement: Achievement | null } => {
    const progress = loadProgress();
    if (type === 'synonyms') {
        progress.synonymsGamesCount += 1;
    } else {
        progress.matchingGamesCount += 1;
    }
    
    // Total matching games for logic check
    const totalMatching = (progress.matchingGamesCount || 0) + (progress.synonymsGamesCount || 0);

    // Add XP for completing a game
    const xpResult = addXP(10); // Standard reward + bonuses
    
    let unlockedSticker: Sticker | null = null;
    
    // Unlock a sticker every 3 matching games overall
    if (totalMatching % 3 === 0) {
        const allStickers = STICKER_COLLECTIONS.flatMap(c => c.stickers);
        const availableStickers = allStickers.filter(s => !progress.unlockedStickers.includes(s.id));
        
        if (availableStickers.length > 0) {
            // Higher luck in matching a bit (just for fun)
            const rand = Math.random();
            const bonuses = getCollectionBonuses(progress);
            const luckyBonus = bonuses.includes('farm') || bonuses.includes('fantasy'); 
            
            const rarities: Rarity[] = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
            let chosenRarity: Rarity = 'common';
            let cumulativeChance = 0;
            
            for (const r of rarities) {
                let chance = RARITY_CONFIG[r].chance;
                if (luckyBonus && (r === 'legendary' || r === 'epic' || r === 'rare')) {
                    chance *= 1.2;
                }
                
                cumulativeChance += chance;
                if (rand < cumulativeChance) {
                    chosenRarity = r;
                    break;
                }
            }
            
            let sameRarityAvailable = availableStickers.filter(s => s.rarity === chosenRarity);
            if (sameRarityAvailable.length === 0) sameRarityAvailable = availableStickers;
            
            const picked = sameRarityAvailable[Math.floor(Math.random() * sameRarityAvailable.length)];
            progress.unlockedStickers.push(picked.id);
            unlockedSticker = picked;
        }
    }
    
    saveProgress(progress);
    return { 
        progress, 
        unlockedSticker, 
        leveledUp: xpResult.leveledUp, 
        unlockedAchievement: xpResult.unlockedAchievement || checkAchievements(progress) 
    };
};

export const getCollectionBonuses = (progress: Progress): string[] => {
    const bonuses: string[] = [];
    for (const collection of STICKER_COLLECTIONS) {
        const hasAll = collection.stickers.every(s => progress.unlockedStickers.includes(s.id));
        if (hasAll) {
            bonuses.push(collection.id);
        }
    }
    return bonuses;
};

export const checkAchievements = (progress: Progress): Achievement | null => {
    for (const achievement of progress.achievements) {
        if (!achievement.isUnlocked) {
            if (achievement.requiredScore > 0 && progress.totalCorrectAnswers >= achievement.requiredScore) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'first_game' && progress.gamesPlayed >= 1) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'reading_start' && progress.readingCardsCount >= 10) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'reading_pro' && progress.readingCardsCount >= 100) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'level_5' && progress.level >= 5) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'level_10' && progress.level >= 10) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'matching_start' && progress.matchingGamesCount >= 1) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'matching_pro' && progress.matchingGamesCount >= 10) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'synonym_start' && progress.synonymsGamesCount >= 1) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'synonym_pro' && progress.synonymsGamesCount >= 10) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'artikel_king' && (progress.artikelGamesCount || 0) >= 10) {
                achievement.isUnlocked = true; return achievement;
            }
            if (achievement.id === 'all_rounder') {
                const games = ['matching', 'synonyms', 'artikel', 'syllable_train', 'comparison', 'rhyme', 'sequence', 'gap', 'unscramble', 'sequenceMemory'];
                const hasPlayedAll = games.every(g => {
                    const key = `${g}GamesCount` as keyof Progress;
                    const val = (progress[key] as number) || 0;
                    return val >= 1 || (g === 'matching' && progress.matchingGamesCount >= 1);
                });
                if (hasPlayedAll) { achievement.isUnlocked = true; return achievement; }
            }
        }
    }
    return null;
};

export const setGameLevel = (gameId: string, level: number): Progress => {
    const progress = loadProgress();
    const levelKey = `${gameId}Level`;
    if (level >= 1 && level <= 3) {
        progress[levelKey] = level;
        saveProgress(progress);
    }
    return progress;
};

export const resetProgress = (): Progress => {
    const empty = getEmptyProgress();
    saveProgress(empty);
    return empty;
};

export const trackMultiplicationAnswer = (): {
    progress: Progress;
    unlockedSticker: Sticker | null;
    leveledUp: boolean;
    unlockedAchievement: Achievement | null;
} => {
    const progress = loadProgress();
    progress.totalCorrectAnswers += 1;
    const currentMul = ((progress.multiplicationCorrectCount as number) || 0) + 1;
    progress.multiplicationCorrectCount = currentMul;

    const xpResult = addXP(10);
    let unlockedSticker: Sticker | null = null;

    if (currentMul % 5 === 0) {
        const allStickers = STICKER_COLLECTIONS.flatMap(c => c.stickers);
        const availableStickers = allStickers.filter(s => !progress.unlockedStickers.includes(s.id));
        if (availableStickers.length > 0) {
            const picked = availableStickers[Math.floor(Math.random() * availableStickers.length)];
            progress.unlockedStickers.push(picked.id);
            unlockedSticker = picked;
        }
    }

    const unlockedAchievement = checkAchievements(progress);
    saveProgress(progress);

    return {
        progress,
        unlockedSticker,
        leveledUp: xpResult.leveledUp,
        unlockedAchievement: unlockedAchievement || xpResult.unlockedAchievement
    };
};

