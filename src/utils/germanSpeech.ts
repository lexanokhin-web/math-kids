// Helper for kid-friendly German speech synthesis
export const speakGerman = (text: string, onEnd?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        if (onEnd) onEnd();
        return;
    }

    try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        // Slightly slower, clear pace perfect for primary school (2. Klasse)
        utterance.rate = 0.82;
        utterance.pitch = 1.05;

        // Try to pick a natural German voice if available
        const voices = window.speechSynthesis.getVoices();
        const deVoices = voices.filter(v => v.lang.startsWith('de'));
        const bestVoice = deVoices.find(v => 
            v.name.includes('Natural') || 
            v.name.includes('Google') || 
            v.name.includes('Hedda') || 
            v.name.includes('Katja') || 
            v.name.includes('Marlene') ||
            v.name.includes('Conrad')
        ) || deVoices[0];

        if (bestVoice) {
            utterance.voice = bestVoice;
        }

        if (onEnd) {
            utterance.onend = () => onEnd();
            utterance.onerror = () => onEnd();
        }

        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.warn('Speech synthesis error:', e);
        if (onEnd) onEnd();
    }
};
