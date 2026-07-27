import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleArray } from '../utils/syllablesData';
import { trackReading, addXP, loadProgress, updateStreak } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import { RARITY_CONFIG } from '../utils/stickerData';
import type { Sticker } from '../utils/stickerData';
import confetti from 'canvas-confetti';
import getTranslation from "../utils/translationData.ts";
import FontSizeSettings from './FontSizeSettings';

interface ReadingViewTemplateProps {
    data: string[];
    title: string;
    storageKey: string;
    defaultFontSize?: number;
    showStoriesMode?: boolean;
}

const ReadingViewTemplate = ({
    data,
    title,
    storageKey,
    defaultFontSize = 2.5,
    showStoriesMode = false
}: ReadingViewTemplateProps) => {
    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(() =>
        parseFloat(localStorage.getItem(storageKey) || defaultFontSize.toString())
    );
    const [elements, setElements] = useState(() => shuffleArray([...data]));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [newSticker, setNewSticker] = useState<Sticker | null>(null);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [sessionScore, setSessionScore] = useState(0);
    const [isLocked, setIsLocked] = useState(true);
    const isSpeakingRef = useRef(false);
    const lockTimerRef = useRef<number | null>(null);

    useEffect(() => {
        if (isLocked) {
            if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
            lockTimerRef.current = setTimeout(() => {
                setIsLocked(false);
            }, 5000);
        }

        return () => {
            if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
        };
    }, [isLocked, currentIndex]); // Lock timer triggered by isLocked or currentIndex change

    const updateFontSize = (size: number) => {
        setFontSize(size);
        localStorage.setItem(storageKey, size.toString());
    };

    const currentElement = elements[currentIndex % elements.length];

    const speak = useCallback((text: string, lang: string = 'de-DE', onEnd?: () => void) => {
        if (isSpeakingRef.current && lang === 'de-DE') return;

        isSpeakingRef.current = true;
        soundManager.playClick();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = lang === 'de-DE' ? 0.7 : 0.9;

        // Only explicitly pick a voice for non-default languages (like RU) 
        // to avoid overriding the optimized system default for the primary language (DE).
        const voices = window.speechSynthesis.getVoices();
        
        if (lang.startsWith('ru')) {
            // Find a Russian voice, prioritizing higher quality ones if possible
            const russianVoices = voices.filter(v => v.lang.startsWith('ru'));
            const bestRuVoice = russianVoices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || russianVoices[0];
            
            if (bestRuVoice) {
                utterance.voice = bestRuVoice;
            }
        }
        // For 'de-DE', we'll rely on the browser's default choice on a German device, 
        // as explicit selection sometimes picks a lower-quality legacy voice.

        if (lang === 'de-DE') {
            utterance.onboundary = (event) => {
                if (event.name === 'word') {
                    const charIndex = event.charIndex;
                    const textBefore = text.substring(0, charIndex);
                    const wordIndex = textBefore.trim() === '' ? 0 : textBefore.trim().split(/\s+/).length;
                    setHighlightIndex(wordIndex);
                }
            };
        }

        utterance.onend = () => {
            isSpeakingRef.current = false;
            setHighlightIndex(-1);
            if (onEnd) onEnd();
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }, []);

    const handleTap = useCallback(() => {
        if (isLocked) {
            speak("Lies bitte zuerst", 'de-DE');
            return;
        }

        speak(currentElement, 'de-DE', () => {
            setSessionScore(s => s + 1);

            // Gamification
            const { unlockedSticker } = trackReading();
            const { leveledUp, unlockedAchievement } = addXP(10);
            updateStreak();

            if (unlockedSticker) {
                setNewSticker(unlockedSticker);
                soundManager.playSticker();

                const rarityColor = RARITY_CONFIG[unlockedSticker.rarity].color;
                confetti({
                    particleCount: 250,
                    spread: 120,
                    origin: { y: 0.6 },
                    colors: [rarityColor, '#ffffff', '#ffd700']
                });
                setTimeout(() => setNewSticker(null), 5000);
            } else if (leveledUp) {
                setNotification(`Level Up! Level ${Math.floor(loadProgress().level)}`);
                soundManager.playLevelUp();
                confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
                setTimeout(() => setNotification(null), 3000);
            } else if (unlockedAchievement) {
                setNotification(`${unlockedAchievement.title}!`);
                soundManager.playSuccess();
                setTimeout(() => setNotification(null), 3000);
            }

            setCurrentIndex(i => (i + 1) % elements.length);
            setIsLocked(true);
        });
    }, [currentElement, elements.length, speak, isLocked]);

    const handleShuffle = () => {
        soundManager.playClick();
        setIsLocked(true);
        setElements(shuffleArray([...data]));
        setCurrentIndex(0);
    };

    const handleRepeat = () => {
        speak(currentElement, 'de-DE');
    };

    const handleTranslateRU = () => {
        const translation = getTranslation(currentElement);
        if (translation) {
            speak(translation, 'ru-RU');
        } else {
            speak("Übersetzung не найдена", 'de-DE');
        }
    };

    return (
        <div className="reading-view">
            <AnimatePresence>
                {notification && (
                    <motion.div
                        className="achievement-notification"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 20, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                    >
                        {notification}
                    </motion.div>
                )}

                {newSticker && (
                    <motion.div
                        className="sticker-reward-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setNewSticker(null)}
                        style={{ background: 'rgba(0,0,0,0.85)' }}
                    >
                        <motion.div
                            className="reward-card-container"
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            style={{
                                background: 'white',
                                padding: '40px',
                                borderRadius: '40px',
                                boxShadow: `0 0 50px ${RARITY_CONFIG[newSticker.rarity].color}`,
                                textAlign: 'center',
                                maxWidth: '350px',
                                width: '90%'
                            }}
                        >
                            <motion.h2
                                className="reward-title"
                                style={{ color: RARITY_CONFIG[newSticker.rarity].color, fontSize: '2.5rem', marginBottom: '10px' }}
                            >
                                NEUER STICKER!
                            </motion.h2>

                            <motion.div
                                className="reward-sticker"
                                style={{ fontSize: '10rem', margin: '20px 0' }}
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                {newSticker.emoji}
                            </motion.div>

                            <h3 style={{ fontSize: '1.8rem', margin: '0 0 10px 0' }}>{newSticker.name}</h3>
                            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '20px' }}>
                                Seltenheit: <span style={{ color: RARITY_CONFIG[newSticker.rarity].color, fontWeight: 'bold' }}>
                                    {RARITY_CONFIG[newSticker.rarity].name}
                                </span>
                            </p>

                            <button
                                className="reward-close-btn"
                                onClick={() => setNewSticker(null)}
                                style={{
                                    background: RARITY_CONFIG[newSticker.rarity].color,
                                    color: 'white',
                                    padding: '12px 30px',
                                    borderRadius: '15px',
                                    border: 'none',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Super! ✨
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="reading-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className="reading-title">{title}</h1>
                <div className="streak-container">
                    <div className="streak-indicator">
                        <span>🔥</span>
                        <span>{loadProgress().streakCount}</span>
                    </div>
                    <div className="streak-indicator session" style={{ background: 'var(--c-amber)', color: '#92400e' }}>
                        <span>⭐</span>
                        <span>{sessionScore}</span>
                    </div>
                </div>
            </div>

            <div className="reading-controls">
                <button className="control-button" onClick={handleShuffle}>
                    🔀 Mischen
                </button>
                <button className="control-button ru-btn" onClick={handleTranslateRU} title="Übersetzung (RU)">
                    RU
                </button>
                <button className="control-button" onClick={handleRepeat}>
                    🔁 Wiederholen
                </button>
            </div>

            <FontSizeSettings fontSize={fontSize} setFontSize={updateFontSize} />

            <motion.div
                className="word-card"
                onClick={handleTap}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                animate={{
                    scale: isPressed ? 0.96 : 1,
                    y: isPressed ? 2 : 0
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                    minHeight: showStoriesMode ? '300px' : '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: isLocked ? 0.9 : 1
                }}
            >
                {isLocked && (
                    <motion.div 
                        key={`lock-${currentIndex}`}
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: '6px',
                            background: 'var(--c-sky)',
                            zIndex: 2,
                            boxShadow: '0 0 10px var(--c-sky)'
                        }}
                    />
                )}
                <div className="phrase-text" style={{
                    fontSize: `${fontSize}rem`,
                    padding: '20px',
                    wordBreak: 'break-word',
                    lineHeight: '1.4',
                    textAlign: 'center'
                }}>
                    {currentElement.split(/\s+/).map((word, idx) => (
                        <span
                            key={idx}
                            style={{
                                color: highlightIndex === idx ? '#3b82f6' : 'inherit',
                                transition: 'color 0.1s',
                                display: 'inline-block',
                                marginRight: '0.25em'
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </motion.div>

            <p style={{ textAlign: 'center', color: '#666', marginTop: 16 }}>
                {showStoriesMode ? 'Tippe auf die Karte, um die Geschichte zu hören' : 'Tippe auf die Karte, um zuzuhören'}
            </p>
        </div>
    );
};

export default ReadingViewTemplate;
