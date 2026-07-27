import { useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { getAgeGroup } from '../styles/themes';

/**
 * Hook for text-to-speech using Web Speech API.
 * Auto-speaks for kids (grades 1-4), manual for older students.
 */
export function useSpeech() {
    const profile = useGameStore((s) => s.profile);
    const grade = profile.currentGrade;
    const lang = (profile.language === 'de' || profile.language === 'ru') ? profile.language : 'ru';
    const ageGroup = getAgeGroup(grade);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const speak = useCallback((text: string) => {
        if (!('speechSynthesis' in window)) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Strip emojis and special symbols so TTS reads only text
        const clean = text
            .replace(/[\u{1F600}-\u{1F64F}]/gu, '')   // emoticons
            .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')   // misc symbols & pictographs
            .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')   // transport & map
            .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '')   // flags
            .replace(/[\u{2600}-\u{26FF}]/gu, '')     // misc symbols
            .replace(/[\u{2700}-\u{27BF}]/gu, '')     // dingbats
            .replace(/[\u{FE00}-\u{FE0F}]/gu, '')     // variation selectors
            .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')   // supplemental symbols
            .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '')   // chess symbols
            .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '')   // symbols extended-A
            .replace(/[\u{200D}]/gu, '')               // zero width joiner
            .replace(/[\u{20E3}]/gu, '')               // combining enclosing keycap
            .replace(/[\u{E0020}-\u{E007F}]/gu, '')   // tags
            .replace(/[\u{2194}-\u{21AA}]/gu, '')     // arrows
            .replace(/[\u{231A}-\u{23F3}]/gu, '')     // misc technical
            .replace(/[\u{25A0}-\u{25FF}]/gu, '')     // geometric shapes
            .replace(/[\u{2B05}-\u{2B55}]/gu, '')     // misc symbols & arrows
            .replace(/\s{2,}/g, ' ')                   // collapse multiple spaces
            .trim();

        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = lang === 'de' ? 'de-DE' : 'ru-RU';

        const voices = window.speechSynthesis.getVoices();
        const ruVoices = voices.filter((v) => v.lang.startsWith('ru'));
        const deVoices = voices.filter((v) => v.lang.startsWith('de'));
        const targetVoices = lang === 'de' ? deVoices : ruVoices;

        const maleNames = ['pavel', 'dmitri', 'dmitry', 'maxim', 'yuri', 'andrey', 'aleksei', 'sergei', 'male', 'marcus', 'stefan', 'hans', 'klaus'];
        const femaleNames = ['irina', 'milena', 'marina', 'svetlana', 'female', 'woman', 'elena', 'natasha', 'anna', 'katja', 'julia', 'marlene'];

        // 1st priority: named male voice for target language
        let chosen = targetVoices.find((v) =>
            maleNames.some((name) => v.name.toLowerCase().includes(name))
        );
        // 2nd priority: any voice for target language that is NOT female-sounding
        if (!chosen) {
            chosen = targetVoices.find((v) =>
                !femaleNames.some((name) => v.name.toLowerCase().includes(name))
            );
        }
        // 3rd: first available voice for target language
        if (!chosen && targetVoices.length) chosen = targetVoices[0];
        if (chosen) utterance.voice = chosen;

        // Deep male voice settings per age group
        if (ageGroup === 'kids') {
            utterance.rate = 0.85;
            utterance.pitch = 0.9;   // Deep but friendly
        } else if (ageGroup === 'teen') {
            utterance.rate = 0.95;
            utterance.pitch = 0.85;
        } else {
            utterance.rate = 1.0;
            utterance.pitch = 0.8;   // Deepest for seniors
        }

        utterance.volume = 1.0;

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [ageGroup, lang]);

    const stop = useCallback(() => {
        window.speechSynthesis.cancel();
    }, []);

    // Auto-speak flag for kids
    const autoSpeak = ageGroup === 'kids';

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return { speak, stop, autoSpeak };
}
