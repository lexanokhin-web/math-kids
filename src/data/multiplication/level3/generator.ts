import type { MultiplicationExerciseL3 } from './types';

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

export function generateLevel3Exercise(index: number): MultiplicationExerciseL3 {
  const mode = getRandomInt(1, 3);
  let questionStr = '';
  let product = 0;

  if (mode === 1) {
    // Tens e.g., 20 x 4, 30 x 3, 50 x 2
    const tens = getRandomInt(2, 9) * 10;
    const factor = getRandomInt(2, 6);
    product = tens * factor;
    questionStr = `${tens} × ${factor} = ?`;
  } else if (mode === 2) {
    // Two digit e.g., 12 x 4, 15 x 3, 14 x 5
    const a = getRandomInt(11, 19);
    const b = getRandomInt(2, 6);
    product = a * b;
    questionStr = `${a} × ${b} = ?`;
  } else {
    // 3 factors e.g. 2 x 3 x 4
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 5);
    const c = getRandomInt(2, 4);
    product = a * b * c;
    questionStr = `${a} × ${b} × ${c} = ?`;
  }

  const wrong1 = product + 10;
  const wrong2 = Math.max(2, product - 10 || product + 5);
  const wrong3 = product + getRandomInt(2, 6);

  const rawOptions = Array.from(new Set([product, wrong1, wrong2, wrong3])).map(String);
  while (rawOptions.length < 4) {
    const extra = String(product + rawOptions.length * 3);
    if (!rawOptions.includes(extra)) rawOptions.push(extra);
  }
  const options = shuffleArray(rawOptions);
  const correctIndex = options.indexOf(String(product));

  return {
    id: `l3-${index}-${Date.now()}`,
    type: 'multiple-choice',
    difficulty: 'hard',
    question: {
      de: questionStr,
      ru: questionStr
    },
    options,
    correctIndex,
    hint: {
      de: `Ergebnis: ${product}`,
      ru: `Результат: ${product}`
    }
  };
}

export function generateLevel3Exercises(count: number = 10): MultiplicationExerciseL3[] {
  const exercises: MultiplicationExerciseL3[] = [];
  for (let i = 0; i < count; i++) {
    exercises.push(generateLevel3Exercise(i));
  }
  return exercises;
}
