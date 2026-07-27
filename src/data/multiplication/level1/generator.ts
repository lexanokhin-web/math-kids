import type { MultiplicationExercise } from './types';

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

export function generateLevel1Exercise(index: number): MultiplicationExercise {
  // Level 1: Multiplication with 1-5, format "a × b = ?" with 4 choices
  const a = getRandomInt(1, 5);
  const b = getRandomInt(1, 5);
  const product = a * b;

  const wrong1 = Math.max(1, product + getRandomInt(1, 3));
  const wrong2 = Math.max(1, product - getRandomInt(1, 3) || product + 4);
  const wrong3 = Math.max(1, product + getRandomInt(4, 6));

  const rawOptions = Array.from(new Set([product, wrong1, wrong2, wrong3])).map(String);
  while (rawOptions.length < 4) {
    const extra = String(product + rawOptions.length + 1);
    if (!rawOptions.includes(extra)) rawOptions.push(extra);
  }
  const options = shuffleArray(rawOptions);
  const correctIndex = options.indexOf(String(product));

  return {
    id: `l1-${index}-${Date.now()}`,
    type: 'multiple-choice',
    difficulty: 'easy',
    question: {
      de: `${a} × ${b} = ?`,
      ru: `${a} × ${b} = ?`
    },
    options,
    correctIndex,
    hint: {
      de: `${a}-mal ${b} ist ${product}`,
      ru: `${a} умножить на ${b} = ${product}`
    }
  };
}

export function generateLevel1Exercises(count: number = 10): MultiplicationExercise[] {
  const exercises: MultiplicationExercise[] = [];
  for (let i = 0; i < count; i++) {
    exercises.push(generateLevel1Exercise(i));
  }
  return exercises;
}
