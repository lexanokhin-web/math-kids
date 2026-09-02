// Game logic ported from Swift GameModels.swift

export type GameMode =
    | 'addition'
    | 'subtraction'
    | 'verticalAddition'
    | 'verticalSubtraction'
    | 'manual'
    | 'manualAddition'
    | 'manualSubtraction';

export interface MathProblem {
    firstNumber: number;
    secondNumber: number;
    gameMode: GameMode;
    operation?: '+' | '-';
    options: number[];
    correctAnswer: number;
}

export const getSymbol = (mode: GameMode, problem?: MathProblem): string => {
    if (problem?.operation) return problem.operation;
    return mode.toLowerCase().includes('subtraction') ? '-' : '+';
};

export const isVertical = (mode: GameMode): boolean => {
    return mode.includes('vertical');
};

export const getModeTitle = (mode: GameMode): string => {
    const titles: Record<GameMode, string> = {
        addition: 'Plusrechnen',
        subtraction: 'Minusrechnen',
        verticalAddition: 'Schriftlich Plus',
        verticalSubtraction: 'Schriftlich Minus',
        manual: 'Selber tippen',
        manualAddition: 'Plus (Selber tippen)',
        manualSubtraction: 'Minus (Selber tippen)'
    };
    return titles[mode] || 'Mathematik';
};

export const generateProblem = (mode: GameMode, difficulty: number = 999): MathProblem => {
    let isAddition = true;
    if (mode === 'subtraction' || mode === 'verticalSubtraction' || mode === 'manualSubtraction') {
        isAddition = false;
    } else if (mode === 'manual') {
        isAddition = Math.random() > 0.5;
    } else {
        isAddition = true;
    }

    const avoidZero = Math.random() > 0.1; // 90% chance to avoid zeros if possible

    let first: number;
    let second: number;

    if (isAddition) {
        if (avoidZero && difficulty >= 2) {
            first = Math.floor(Math.random() * (difficulty - 1)) + 1; // 1 to difficulty - 1
            second = Math.floor(Math.random() * (difficulty - first)) + 1; // 1 to (difficulty - first)
        } else {
            first = Math.floor(Math.random() * (difficulty + 1));
            second = Math.floor(Math.random() * (difficulty - first + 1));
        }
    } else {
        if (avoidZero && difficulty >= 1) {
            first = Math.floor(Math.random() * difficulty) + 1; // 1 to difficulty
            second = Math.floor(Math.random() * first) + 1; // 1 to first
        } else {
            first = Math.floor(Math.random() * (difficulty + 1));
            second = Math.floor(Math.random() * (first + 1));
        }
    }

    const correctAnswer = isAddition ? first + second : first - second;

    // Generate wrong answers
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
        const offset = Math.floor(Math.random() * 5) + 1;
        const wrongAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
        if (wrongAnswer >= 0 && wrongAnswer <= difficulty * 2 && wrongAnswer !== correctAnswer) {
            wrongAnswers.add(wrongAnswer);
        }
    }

    const options = [...Array.from(wrongAnswers), correctAnswer];
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return {
        firstNumber: first,
        secondNumber: second,
        gameMode: mode,
        operation: isAddition ? '+' : '-',
        options,
        correctAnswer
    };
};
