import type { GradeConfig } from '../../types';
import { countingTopic } from './counting';
import { additionTopic } from './addition';
import { subtractionTopic } from './subtraction';
import { comparisonTopic } from './comparison';
import { shapesToopic } from './shapes';
import { patternsTopic } from './patterns';
import { wordProblemsTopic } from './wordProblems';

const grade1: GradeConfig = {
    id: 1,
    label: { ru: '1 класс', de: '1. Klasse' },
    emoji: '🐣',
    description: { ru: 'Основы счёта, фигуры, логика, задачки', de: 'Grundlagen des Zählens, Formen, Logik und Aufgaben' },
    topics: [
        countingTopic,
        additionTopic,
        subtractionTopic,
        comparisonTopic,
        shapesToopic,
        patternsTopic,
        wordProblemsTopic,
    ],
};

export default grade1;
