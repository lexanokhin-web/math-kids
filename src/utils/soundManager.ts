// Simple sound manager using Web Audio API for UI sounds
class SoundManager {
    private ctx: AudioContext | null = null;
    private enabled: boolean = true;

    constructor() {
        this.enabled = localStorage.getItem('mathkids_sound_enabled') !== 'false';
    }

    private getCtx() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            this.ctx = new AudioContextClass();
        }
        return this.ctx;
    }

    setEnabled(value: boolean) {
        this.enabled = value;
        localStorage.setItem('mathkids_sound_enabled', value.toString());
    }

    isEnabled() {
        return this.enabled;
    }

    playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) {
        if (!this.enabled) return;
        try {
            const ctx = this.getCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.error('Failed to play sound', e);
        }
    }

    playClick() {
        this.playTone(440, 0.1, 'sine', 0.1);
    }

    playCorrect() {
        this.playSuccess();
    }

    playSuccess() {
        this.playTone(523.25, 0.1, 'sine', 0.1); // C5
        setTimeout(() => this.playTone(659.25, 0.2, 'sine', 0.1), 100); // E5
    }

    playIncorrect() {
        this.playTone(220, 0.3, 'sawtooth', 0.1); // A3
    }

    playLevelUp() {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.3, 'triangle', 0.1), i * 150);
        });
    }

    playSticker() {
        this.playTone(880, 0.1, 'square', 0.05); // A5
        setTimeout(() => this.playTone(1760, 0.4, 'sine', 0.1), 100); // A6
    }
}

export const soundManager = new SoundManager();
