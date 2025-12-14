// Progress and achievements system ported from Swift ProgressModels.swift

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
}

const defaultAchievements: Achievement[] = [
    { id: 'first_star', title: 'First Star!', description: 'Get your first correct answer', requiredScore: 1, isUnlocked: false },
    { id: 'math_rookie', title: 'Math Rookie', description: 'Get 5 correct answers', requiredScore: 5, isUnlocked: false },
    { id: 'math_explorer', title: 'Math Explorer', description: 'Get 10 correct answers', requiredScore: 10, isUnlocked: false },
    { id: 'math_master', title: 'Math Master', description: 'Get 20 correct answers', requiredScore: 20, isUnlocked: false },
    { id: 'math_genius', title: 'Math Genius', description: 'Get 50 correct answers', requiredScore: 50, isUnlocked: false },
    { id: 'hundred_club', title: '100 Club', description: 'Get 100 correct answers', requiredScore: 100, isUnlocked: false },
    { id: 'two_hundred', title: '200 Answers!', description: 'Get 200 correct answers', requiredScore: 200, isUnlocked: false },
    { id: 'five_hundred', title: '500 Answers!', description: 'Get 500 correct answers', requiredScore: 500, isUnlocked: false },
    { id: 'thousand_club', title: '1000 Club', description: 'Get 1000 correct answers', requiredScore: 1000, isUnlocked: false },
    { id: 'first_game', title: 'First Game', description: 'Finish your first game', requiredScore: 0, isUnlocked: false },
    { id: 'ten_games', title: '10 Games', description: 'Play 10 games', requiredScore: 0, isUnlocked: false },
    { id: 'fifty_games', title: '50 Games', description: 'Play 50 games', requiredScore: 0, isUnlocked: false },
    { id: 'streak_3', title: 'Streak 3!', description: 'Get 3 correct answers in a row', requiredScore: 0, isUnlocked: false },
    { id: 'streak_5', title: 'Streak 5!', description: 'Get 5 correct answers in a row', requiredScore: 0, isUnlocked: false },
    { id: 'streak_10', title: 'Streak 10!', description: 'Get 10 correct answers in a row', requiredScore: 0, isUnlocked: false },
    { id: 'addition_pro', title: 'Addition Pro', description: 'Solve 100 addition problems', requiredScore: 0, isUnlocked: false },
    { id: 'subtraction_pro', title: 'Subtraction Pro', description: 'Solve 100 subtraction problems', requiredScore: 0, isUnlocked: false },
];

const STORAGE_KEY = 'mathkids_progress';

export const getEmptyProgress = (): Progress => ({
    totalCorrectAnswers: 0,
    achievements: defaultAchievements.map(a => ({ ...a })),
    highScore: 0,
    gamesPlayed: 0
});

export const loadProgress = (): Progress => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load progress', e);
    }
    return getEmptyProgress();
};

export const saveProgress = (progress: Progress): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.error('Failed to save progress', e);
    }
};

export const checkAchievements = (progress: Progress): Achievement | null => {
    for (const achievement of progress.achievements) {
        if (!achievement.isUnlocked) {
            if (achievement.requiredScore > 0 && progress.totalCorrectAnswers >= achievement.requiredScore) {
                achievement.isUnlocked = true;
                return achievement;
            }
            if (achievement.id === 'first_game' && progress.gamesPlayed >= 1) {
                achievement.isUnlocked = true;
                return achievement;
            }
            if (achievement.id === 'ten_games' && progress.gamesPlayed >= 10) {
                achievement.isUnlocked = true;
                return achievement;
            }
            if (achievement.id === 'fifty_games' && progress.gamesPlayed >= 50) {
                achievement.isUnlocked = true;
                return achievement;
            }
        }
    }
    return null;
};

export const resetProgress = (): Progress => {
    const empty = getEmptyProgress();
    saveProgress(empty);
    return empty;
};
