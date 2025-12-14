// Sound manager for audio feedback

class SoundManager {
    private static instance: SoundManager;
    private enabled: boolean = true;

    private constructor() {
        const stored = localStorage.getItem('mathkids_sound');
        this.enabled = stored !== 'false';
    }

    static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        localStorage.setItem('mathkids_sound', String(enabled));
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    playCorrect(): void {
        if (!this.enabled) return;
        this.playTone(523.25, 0.15); // C5
        setTimeout(() => this.playTone(659.25, 0.15), 100); // E5
        setTimeout(() => this.playTone(783.99, 0.2), 200); // G5
    }

    playIncorrect(): void {
        if (!this.enabled) return;
        this.playTone(200, 0.3, 'sawtooth');
    }

    playClick(): void {
        if (!this.enabled) return;
        this.playTone(800, 0.05);
    }

    private playTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.error('Audio playback failed', e);
        }
    }
}

export const soundManager = SoundManager.getInstance();
