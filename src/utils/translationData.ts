import { basicTranslations } from './translations/basic';
import { elsaAnnaTranslations } from './translations/elsaAnna';
import { lolaTranslations } from './translations/lola';

const translations: Record<string, string> = {
    ...basicTranslations,
    ...elsaAnnaTranslations,
    ...lolaTranslations,
};

/**
 * Normalizes text for translation lookup by trimming and standardizing punctuation/casing
 */
const normalizeText = (text: string): string => {
    return text.trim().replace(/[.!?]$/, '').toLowerCase();
};

/**
 * Returns the Russian translation for a given German text.
 * @param germanText The German sentence or phrase to translate.
 * @returns The Russian translation or null if not found.
 */
export const getTranslation = (germanText: string): string | null => {
    if (!germanText) return null;

    const trimmedText = germanText.trim();
    
    // 1. Direct match (fastest)
    if (translations[trimmedText]) {
        return translations[trimmedText];
    }

    // 2. Normalized match (casing/punctuation)
    const searchKey = normalizeText(trimmedText);
    
    // We can pre-calculate this or just iterate. For ~1000 items, iteration is fine.
    for (const [key, value] of Object.entries(translations)) {
        if (normalizeText(key) === searchKey) {
            return value;
        }
    }

    // 3. Partial/Story match
    // Avoid matching very short strings to prevent false positives
    if (trimmedText.length > 10) {
        for (const [key, value] of Object.entries(translations)) {
            if (key.length > 10 && (key.includes(trimmedText) || trimmedText.includes(key))) {
                return value;
            }
        }
    }

    return null;
};

export default getTranslation;
