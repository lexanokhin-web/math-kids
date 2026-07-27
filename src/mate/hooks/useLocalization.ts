import { useGameStore } from '../store/useGameStore';
import { uiTranslations } from '../data/localization';
import type { LocalizedString } from '../data/types';

export function translate(text: LocalizedString | undefined, lang: 'de' | 'ru' = 'ru'): string {
    if (!text) return '';

    if (typeof text === 'object' && text !== null) {
        const obj = text as Record<string, string>;
        return obj[lang] || obj['ru'] || '';
    }

    const dict = uiTranslations[lang as keyof typeof uiTranslations] || uiTranslations['ru'];
    const key = text as keyof typeof dict;
    if (typeof text === 'string' && key in dict) {
        return (dict as Record<string, string>)[text];
    }

    return text as string;
}

export function useLocalization() {
    const { profile } = useGameStore();
    const currentLang = (profile?.language === 'de' || profile?.language === 'ru') ? profile.language : 'ru';

    return { 
        lang: currentLang, 
        t: (key: LocalizedString) => translate(key, currentLang)
    };
}
