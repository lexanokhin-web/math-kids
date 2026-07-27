import type { GradeConfig } from './types';
import grade1 from './grades/grade1';
import grade2 from './grades/grade2';
import grade3 from './grades/grade3';
import grade4 from './grades/grade4';
import grade5 from './grades/grade5';
import grade6 from './grades/grade6';
import grade7 from './grades/grade7';
import grade8 from './grades/grade8';
import grade9 from './grades/grade9';
import grade10 from './grades/grade10';
import grade11 from './grades/grade11';
import grade12 from './grades/grade12';

export const allGrades: GradeConfig[] = [
    grade1, grade2, grade3, grade4,
    grade5, grade6, grade7, grade8,
    grade9, grade10, grade11, grade12,
];

export function getGradeConfig(gradeId: number): GradeConfig | undefined {
    return allGrades.find((g) => g.id === gradeId);
}
