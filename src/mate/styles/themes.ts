/* ============ Grade & Age Group Helpers ============ */

export type AgeGroup = 'kids' | 'teen' | 'senior';

export function getAgeGroup(grade: number): AgeGroup {
    if (grade <= 4) return 'kids';
    if (grade <= 8) return 'teen';
    return 'senior';
}

export function getThemeForGrade(grade: number): string {
    const group = getAgeGroup(grade);
    if (group === 'kids') return ''; // default theme
    return group;
}

export function applyTheme(grade: number) {
    const theme = getThemeForGrade(grade);
    const container = document.querySelector('.mate-app-root');
    if (container) {
        if (theme) {
            container.setAttribute('data-theme', theme);
        } else {
            container.removeAttribute('data-theme');
        }
    }
}

/* ============ Theme Config Objects ============ */

export interface ThemeConfig {
    label: string;
    emoji: string;
    ageGroup: AgeGroup;
    particleColor: string;
    bgShapes: string[];
}

export const themeConfigs: Record<AgeGroup, ThemeConfig> = {
    kids: {
        label: 'Малыши',
        emoji: '🌈',
        ageGroup: 'kids',
        particleColor: '#ff6b9d',
        bgShapes: ['sphere', 'cube', 'cone', 'torus'],
    },
    teen: {
        label: 'Подростки',
        emoji: '🚀',
        ageGroup: 'teen',
        particleColor: '#00d4ff',
        bgShapes: ['dodecahedron', 'octahedron', 'icosahedron', 'torusKnot'],
    },
    senior: {
        label: 'Старшие',
        emoji: '🧠',
        ageGroup: 'senior',
        particleColor: '#a78bfa',
        bgShapes: ['icosahedron', 'torusKnot', 'dodecahedron'],
    },
};
