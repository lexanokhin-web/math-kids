import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LevelProgress, PlayerProfile } from '../data/types';

/* ============ XP Level Thresholds ============ */
const XP_PER_LEVEL = 500;

function calcLevel(xp: number): number {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
}

function xpForNextLevel(xp: number): number {
    return XP_PER_LEVEL - (xp % XP_PER_LEVEL);
}

/* ============ Store Interface ============ */

interface GameState {
    profile: PlayerProfile;
    /* Actions */
    setGrade: (grade: number) => void;
    addXP: (amount: number) => void;
    updateLevelProgress: (levelId: string, progress: Partial<LevelProgress>) => void;
    getLevelProgress: (levelId: string) => LevelProgress | undefined;
    incrementStreak: () => void;
    resetStreak: () => void;
    addAchievement: (id: string) => void;
    getPlayerLevel: () => number;
    getXPForNext: () => number;
    getTotalStars: () => number;
    setLanguage: (lang: 'ru' | 'de') => void;
    resetProfile: () => void;
}

const defaultProfile: PlayerProfile = {
    name: 'Математик',
    avatar: '🧒',
    currentGrade: 1,
    xp: 0,
    level: 1,
    streak: 0,
    lastPlayDate: '',
    achievements: [],
    progress: {},
    language: 'ru',
};

/* ============ Zustand Store with Persistence ============ */

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            profile: { ...defaultProfile },

            setGrade: (grade) =>
                set((state) => ({
                    profile: { ...state.profile, currentGrade: grade },
                })),

            addXP: (amount) =>
                set((state) => {
                    const newXP = state.profile.xp + amount;
                    return {
                        profile: {
                            ...state.profile,
                            xp: newXP,
                            level: calcLevel(newXP),
                        },
                    };
                }),

            updateLevelProgress: (levelId, progress) =>
                set((state) => {
                    const existing = state.profile.progress[levelId] || {
                        levelId,
                        completed: false,
                        stars: 0,
                        bestScore: 0,
                        bestTime: Infinity,
                        attempts: 0,
                    };
                    return {
                        profile: {
                            ...state.profile,
                            progress: {
                                ...state.profile.progress,
                                [levelId]: { ...existing, ...progress },
                            },
                        },
                    };
                }),

            getLevelProgress: (levelId) => get().profile.progress[levelId],

            incrementStreak: () =>
                set((state) => ({
                    profile: {
                        ...state.profile,
                        streak: state.profile.streak + 1,
                        lastPlayDate: new Date().toISOString().slice(0, 10),
                    },
                })),

            resetStreak: () =>
                set((state) => ({
                    profile: { ...state.profile, streak: 0 },
                })),

            addAchievement: (id) =>
                set((state) => {
                    if (state.profile.achievements.includes(id)) return state;
                    return {
                        profile: {
                            ...state.profile,
                            achievements: [...state.profile.achievements, id],
                        },
                    };
                }),

            getPlayerLevel: () => calcLevel(get().profile.xp),
            getXPForNext: () => xpForNextLevel(get().profile.xp),

            getTotalStars: () => {
                const prog = get().profile.progress;
                return Object.values(prog).reduce((sum, p) => sum + p.stars, 0);
            },

            setLanguage: (lang) =>
                set((state) => ({
                    profile: { ...state.profile, language: lang },
                })),

            resetProfile: () => set({ profile: { ...defaultProfile } }),
        }),
        {
            name: 'math-olympiad-progress',
        }
    )
);
