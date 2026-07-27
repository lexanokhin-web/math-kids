export type LocalizedString = string | { ru: string; de: string };

/* ============ Core Data Types ============ */

export type ExerciseType = 'multiple-choice' | 'fill-blank' | 'drag-drop' | 'match-pairs' | 'true-false';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'olympiad';

export interface Exercise {
    id: string;
    type: ExerciseType;
    question: LocalizedString;
    /** For visual questions — image or formula */
    image?: string;
    /** Hint text shown after wrong answer */
    hint?: LocalizedString;
    /** Difficulty determines points and time */
    difficulty: Difficulty;
    /** Time limit in seconds (0 = no limit) */
    timeLimit: number;
    /** Points awarded */
    points: number;
}

export interface MultipleChoiceExercise extends Exercise {
    type: 'multiple-choice';
    options: LocalizedString[];
    correctIndex: number;
}

export interface FillBlankExercise extends Exercise {
    type: 'fill-blank';
    /** Template with ___ for blank, e.g. "5 + ___ = 12" */
    template: LocalizedString;
    correctAnswer: LocalizedString;
    /** Accept numeric tolerance */
    tolerance?: number;
}

export interface DragDropExercise extends Exercise {
    type: 'drag-drop';
    items: LocalizedString[];
    /** Correct order of items */
    correctOrder: LocalizedString[];
    /** Target labels/zones */
    zones?: LocalizedString[];
}

export interface MatchPairsExercise extends Exercise {
    type: 'match-pairs';
    pairs: { left: LocalizedString; right: LocalizedString }[];
}

export interface TrueFalseExercise extends Exercise {
    type: 'true-false';
    statement: LocalizedString;
    isTrue: boolean;
}

export type AnyExercise =
    | MultipleChoiceExercise
    | FillBlankExercise
    | DragDropExercise
    | MatchPairsExercise
    | TrueFalseExercise;

/* ============ Topic / Level / Grade ============ */

export interface Level {
    id: string;
    title: LocalizedString;
    description: LocalizedString;
    difficulty: Difficulty;
    /** Exercise IDs in order */
    exercises: AnyExercise[];
    /** Stars threshold: [1star, 2star, 3star] as % correct */
    starThresholds: [number, number, number];
    /** Required previous level ID or null for first */
    requiredLevel: string | null;
}

export interface Topic {
    id: string;
    title: LocalizedString;
    icon: string;
    description: LocalizedString;
    color: string;
    levels: Level[];
}

export interface GradeConfig {
    id: number;
    label: LocalizedString;
    emoji: string;
    description: LocalizedString;
    topics: Topic[];
}

/* ============ Progress / Gamification ============ */

export interface LevelProgress {
    levelId: string;
    completed: boolean;
    stars: number;       // 0-3
    bestScore: number;
    bestTime: number;    // seconds
    attempts: number;
}

export interface PlayerProfile {
    name: string;
    avatar: string;
    currentGrade: number;
    xp: number;
    level: number;
    streak: number;
    lastPlayDate: string;
    achievements: string[];
    progress: Record<string, LevelProgress>; // keyed by levelId
    language: 'ru' | 'de';
}
