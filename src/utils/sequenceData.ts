export interface NumberSequence {
    sequence: (number | null)[];
    answer: number;
}

export const sequenceData: NumberSequence[] = [
    { sequence: [1, 2, 3, null, 5], answer: 4 },
    { sequence: [2, 4, 6, null, 10], answer: 8 },
    { sequence: [5, 10, 15, null, 25], answer: 20 },
    { sequence: [10, 9, 8, null, 6], answer: 7 },
    { sequence: [1, 3, 5, null, 9], answer: 7 },
    { sequence: [20, 18, 16, null, 12], answer: 14 },
    { sequence: [3, 6, 9, null, 15], answer: 12 },
    { sequence: [10, 20, 30, null, 50], answer: 40 },
    { sequence: [11, 22, 33, null, 55], answer: 44 },
    { sequence: [100, 90, 80, null, 60], answer: 70 }
];
