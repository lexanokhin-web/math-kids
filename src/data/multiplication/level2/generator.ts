import type { MultiplicationExerciseL2 } from './types';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateLevel2Exercise(index: number): MultiplicationExerciseL2 {
  // Level 2: Full multiplication table 1-10, format "a × b = ?" with 4 choices
  const a = getRandomInt(2, 10);
  const b = getRandomInt(2, 10);
  const product = a * b;

  const wrong1 = Math.max(1, product + (Math.random() > 0.5 ? a : -a) || product + 2);
  const wrong2 = Math.max(1, product + (Math.random() > 0.5 ? b : -b) || product - 3);
  const wrong3 = Math.max(1, product + getRandomInt(-6, 6));

  const rawOptions = Array.from(new Set([product, wrong1, wrong2, wrong3])).map(String);
  while (rawOptions.length < 4) {
    const extra = String(product + rawOptions.length * 2);
    if (!rawOptions.includes(extra)) rawOptions.push(extra);
  }
  const options = shuffleArray(rawOptions);
  const correctIndex = options.indexOf(String(product));

  return {
    id: `l2-${index}-${Date.now()}`,
    type: 'multiple-choice',
    difficulty: a >= 7 || b >= 7 ? 'hard' : 'medium',
    question: {
      de: `${a} × ${b} = ?`,
      ru: `${a} × ${b} = ?`
    },
    options,
    correctIndex,
    hint: {
      de: `${a} × ${b} = ${product}`,
      ru: `${a} × ${b} = ${product}`
    }
  };
}

export function generateLevel2Exercises(count: number = 10): MultiplicationExerciseL2[] {
  const exercises: MultiplicationExerciseL2[] = [];
  for (let i = 0; i < count; i++) {
    exercises.push(generateLevel2Exercise(i));
  }
  return exercises;
}
