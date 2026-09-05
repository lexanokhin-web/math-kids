import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { trackGeneralGame, loadProgress } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import { speakGermanTime } from './ClockGameView';

export type PracticeMode = 'dualTime' | 'drawHand';

interface DualTimeProblem {
    hour12: number;        // 1 to 12 (e.g. 5)
    hour24: number;        // 13 to 24 (e.g. 17, or 24 for 12)
}

interface DrawHandProblem {
    targetHourDisplay: number; // e.g. 18 (or 11, 9, 4, 21, 2, 14)
    expectedHour12: number;    // e.g. 6 (or 11, 9, 4, 9, 2, 2)
}

const generateDualTimeProblem = (prevHour?: number): DualTimeProblem => {
    let hour12: number;
    do {
        hour12 = Math.floor(Math.random() * 12) + 1; // 1 to 12
    } while (hour12 === prevHour);

    const hour24 = hour12 === 12 ? 24 : hour12 + 12; // 1 -> 13, 2 -> 14, ..., 12 -> 24
    return { hour12, hour24 };
};

const generateDrawHandProblem = (prevDisplay?: number): DrawHandProblem => {
    // Generate a mix of 12h morning and 24h afternoon times (like textbook: 11 Uhr, 9 Uhr, 18 Uhr, 4 Uhr, 21 Uhr, 2 Uhr, 14 Uhr)
    const candidates: { display: number; expected: number }[] = [
        { display: 1, expected: 1 },
        { display: 2, expected: 2 },
        { display: 3, expected: 3 },
        { display: 4, expected: 4 },
        { display: 5, expected: 5 },
        { display: 6, expected: 6 },
        { display: 7, expected: 7 },
        { display: 8, expected: 8 },
        { display: 9, expected: 9 },
        { display: 10, expected: 10 },
        { display: 11, expected: 11 },
        { display: 12, expected: 12 },
        { display: 13, expected: 1 },
        { display: 14, expected: 2 },
        { display: 15, expected: 3 },
        { display: 16, expected: 4 },
        { display: 17, expected: 5 },
        { display: 18, expected: 6 },
        { display: 19, expected: 7 },
        { display: 20, expected: 8 },
        { display: 21, expected: 9 },
        { display: 22, expected: 10 },
        { display: 23, expected: 11 },
        { display: 24, expected: 12 }
    ];

    let picked: { display: number; expected: number };
    do {
        picked = candidates[Math.floor(Math.random() * candidates.length)];
    } while (picked.display === prevDisplay);

    return {
        targetHourDisplay: picked.display,
        expectedHour12: picked.expected
    };
};

const ClockPracticeDualView: React.FC = () => {
    const navigate = useNavigate();
    const [, setPlayerProgress] = useState(loadProgress());

    // Practice mode switcher: 'dualTime' (1 Uhr & 13 Uhr) vs 'drawHand' (Zeiger stellen)
    const [practiceMode, setPracticeMode] = useState<PracticeMode>('dualTime');

    // Hands color mode: 'bicolor' (🔴🔵) vs 'monochrome' (⚫⚫)
    const [handsColorMode, setHandsColorMode] = useState<'bicolor' | 'monochrome'>(() => {
        return (localStorage.getItem('mathkids_clock_hands_style') as 'bicolor' | 'monochrome') || 'bicolor';
    });

    const isMonochrome = handsColorMode === 'monochrome';
    const hourHandColor = isMonochrome ? '#1e293b' : '#ef4444';
    const hourHandStroke = isMonochrome ? '#0f172a' : '#b91c1c';
    const minuteHandColor = isMonochrome ? '#1e293b' : '#3b82f6';
    const minuteHandStroke = isMonochrome ? '#0f172a' : '#1d4ed8';

    const handleToggleHandsColor = () => {
        const nextMode = handsColorMode === 'bicolor' ? 'monochrome' : 'bicolor';
        setHandsColorMode(nextMode);
        localStorage.setItem('mathkids_clock_hands_style', nextMode);
    };

    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    // Mode 1: Dual Time State
    const [dualProblem, setDualProblem] = useState<DualTimeProblem>(() => generateDualTimeProblem());
    const [dayInput, setDayInput] = useState<string>('');
    const [nightInput, setNightInput] = useState<string>('');
    const [activeInputSlot, setActiveInputSlot] = useState<'day' | 'night'>('day');

    // Mode 2: Draw Hand State
    const [drawProblem, setDrawProblem] = useState<DrawHandProblem>(() => generateDrawHandProblem());
    const [selectedHourHand, setSelectedHourHand] = useState<number | null>(null);

    // Feedback & UI State
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showHelperDiagram, setShowHelperDiagram] = useState(false);
    const [showReward, setShowReward] = useState(false);
    const [rewardData, setRewardData] = useState<Reward | null>(null);

    const isSpeakingRef = useRef(false);

    const playVoice = useCallback((text: string) => {
        isSpeakingRef.current = true;
        speakGermanTime(text).finally(() => {
            isSpeakingRef.current = false;
        });
    }, []);

    const resetInputs = useCallback(() => {
        setDayInput('');
        setNightInput('');
        setActiveInputSlot('day');
        setSelectedHourHand(null);
        setFeedback(null);
    }, []);

    const handleSwitchMode = (newMode: PracticeMode) => {
        setPracticeMode(newMode);
        setRound(1);
        setScore(0);
        setStreak(0);
        resetInputs();
        if (newMode === 'dualTime') {
            setDualProblem(generateDualTimeProblem());
        } else {
            setDrawProblem(generateDrawHandProblem());
        }
    };

    const nextProblem = useCallback(() => {
        resetInputs();
        if (practiceMode === 'dualTime') {
            setDualProblem(prev => generateDualTimeProblem(prev.hour12));
        } else {
            setDrawProblem(prev => generateDrawHandProblem(prev.targetHourDisplay));
        }
    }, [practiceMode, resetInputs]);

    // Handle Numpad Digits for Dual Time mode
    const handleNumpadDigit = useCallback((digit: string) => {
        soundManager.playClick();
        if (activeInputSlot === 'day') {
            setDayInput(prev => (prev.length < 2 ? prev + digit : prev));
        } else {
            setNightInput(prev => (prev.length < 2 ? prev + digit : prev));
        }
    }, [activeInputSlot]);

    const handleNumpadBackspace = useCallback(() => {
        soundManager.playClick();
        if (activeInputSlot === 'day') {
            setDayInput(prev => prev.slice(0, -1));
        } else {
            setNightInput(prev => prev.slice(0, -1));
        }
    }, [activeInputSlot]);

    // Submit Dual Time Answer
    const handleSubmitDualTime = useCallback(() => {
        const valDay = parseInt(dayInput, 10);
        const valNight = parseInt(nightInput, 10);

        if (isNaN(valDay) || isNaN(valNight)) {
            // If day is filled but night is empty, switch to night slot
            if (!isNaN(valDay) && isNaN(valNight)) {
                setActiveInputSlot('night');
                return;
            }
            return;
        }

        const isDayCorrect = valDay === dualProblem.hour12;
        // Accept 24 or 0 for 12:00
        const isNightCorrect = dualProblem.hour12 === 12
            ? (valNight === 24 || valNight === 0)
            : valNight === dualProblem.hour24;

        if (isDayCorrect && isNightCorrect) {
            soundManager.playCorrect();
            setFeedback('correct');
            setScore(s => s + 1);
            setStreak(s => s + 1);

            playVoice(`Richtig! ${dualProblem.hour12} Uhr und ${dualProblem.hour24} Uhr.`);

            if ((streak + 1) % 5 === 0) {
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            }

            const res = trackGeneralGame('clockDual');
            setPlayerProgress(res.progress);

            if (round >= 10) {
                setTimeout(() => {
                    setRewardData({
                        xp: 40,
                        sticker: res.unlockedSticker,
                        achievement: res.unlockedAchievement,
                        leveledUp: res.leveledUp
                    });
                    setShowReward(true);
                }, 1300);
            } else {
                setTimeout(() => {
                    setRound(r => r + 1);
                    nextProblem();
                }, 1400);
            }
        } else {
            soundManager.playIncorrect();
            setFeedback('incorrect');
            setStreak(0);

            setTimeout(() => {
                setFeedback(null);
            }, 750);
        }
    }, [dayInput, nightInput, dualProblem, streak, round, playVoice, nextProblem]);

    // Handle Draw Hand click on a dial number
    const handleSelectDrawHour = (hourNum: number) => {
        soundManager.playClick();
        setSelectedHourHand(hourNum);

        const isCorrect = hourNum === drawProblem.expectedHour12;
        if (isCorrect) {
            soundManager.playCorrect();
            setFeedback('correct');
            setScore(s => s + 1);
            setStreak(s => s + 1);

            const displayStr = `${drawProblem.targetHourDisplay} Uhr`;
            playVoice(`Super! ${displayStr} zeigt auf die ${hourNum}.`);

            if ((streak + 1) % 5 === 0) {
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            }

            const res = trackGeneralGame('clockDual');
            setPlayerProgress(res.progress);

            if (round >= 10) {
                setTimeout(() => {
                    setRewardData({
                        xp: 40,
                        sticker: res.unlockedSticker,
                        achievement: res.unlockedAchievement,
                        leveledUp: res.leveledUp
                    });
                    setShowReward(true);
                }, 1300);
            } else {
                setTimeout(() => {
                    setRound(r => r + 1);
                    nextProblem();
                }, 1400);
            }
        } else {
            soundManager.playIncorrect();
            setFeedback('incorrect');
            setStreak(0);

            setTimeout(() => {
                setFeedback(null);
                setSelectedHourHand(null);
            }, 750);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (practiceMode === 'dualTime') {
                if (e.key >= '0' && e.key <= '9') {
                    handleNumpadDigit(e.key);
                } else if (e.key === 'Backspace') {
                    handleNumpadBackspace();
                } else if (e.key === 'Enter') {
                    handleSubmitDualTime();
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    setActiveInputSlot(prev => (prev === 'day' ? 'night' : 'day'));
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [practiceMode, handleNumpadDigit, handleNumpadBackspace, handleSubmitDualTime]);

    // Angles calculation
    // Dual Time: Hour hand at dualProblem.hour12 * 30 deg, Minute hand at 0 deg (12)
    const dualHourAngle = (dualProblem.hour12 % 12) * 30;

    // Draw Hand: Selected Hour hand (or none), Minute hand at 0 deg (12)
    const drawHourAngle = selectedHourHand !== null ? (selectedHourHand % 12) * 30 : null;

    const dialNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <div className="clock-game-view clock-dual-practice-view">
            {/* Header */}
            <div className="game-header">
                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate('/')}
                    aria-label="Zurück zum Hauptmenü"
                >
                    ←
                </button>

                {/* Mode Switcher Tabs */}
                <div className="header-mode-toggle dual-practice-mode-toggle">
                    <button
                        type="button"
                        className={`toggle-option ${practiceMode === 'dualTime' ? 'active' : ''}`}
                        onClick={() => handleSwitchMode('dualTime')}
                        title="1 & 13 Uhr (2 Uhrzeiten)"
                    >
                        ☀️🌙 2 Zeiten
                    </button>
                    <button
                        type="button"
                        className={`toggle-option ${practiceMode === 'drawHand' ? 'active' : ''}`}
                        onClick={() => handleSwitchMode('drawHand')}
                        title="Zeiger stellen"
                    >
                        ✏️ Zeiger
                    </button>
                </div>

                <div className="score-display">
                    <span className="star">⭐</span>
                    <span>{score}</span>
                </div>

                {/* Hand Color Toggle */}
                <button
                    type="button"
                    className={`clock-hands-toggle ${isMonochrome ? 'mono' : 'bicolor'}`}
                    onClick={handleToggleHandsColor}
                    title={isMonochrome ? 'Zeiger: Einfarbig (Klick für Rot/Blau)' : 'Zeiger: Rot/Blau (Klick für Einfarbig)'}
                    aria-label="Zeigerfarben wechseln"
                >
                    {isMonochrome ? '⚫⚫' : '🔴🔵'}
                </button>

                {/* Helper Mascot & 24h Diagram Button */}
                <button
                    type="button"
                    className="clock-info-btn mascot-diagram-btn"
                    onClick={() => setShowHelperDiagram(true)}
                    title="24-Stunden Rad (Hilfe)"
                    aria-label="24h Übersicht"
                >
                    💡 24h
                </button>
            </div>

            {/* Progress Bar */}
            <div className="clock-progress-bar-container">
                <div
                    className="clock-progress-bar"
                    style={{ width: `${(round / 10) * 100}%` }}
                />
                <span className="round-counter">Aufgabe {round} / 10</span>
            </div>

            {/* Main Interactive Card */}
            <motion.div
                className="clock-card dual-practice-card"
                key={`practice-card-${practiceMode}-${round}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
                {/* Title & Task Target Banner */}
                <div className="dual-practice-header-banner">
                    {practiceMode === 'dualTime' ? (
                        <div className="dual-instruction-group">
                            <span className="dual-sub-pill">☀️ Vormittag (1–12) & 🌙 Nachmittag (13–24)</span>
                            <h3 className="dual-main-title">Wie spät ist es? (2 Varianten)</h3>
                        </div>
                    ) : (
                        <div className="draw-instruction-group">
                            <div className="draw-task-sub">✏️ Zeichne den Zeiger ein für:</div>
                            <div className="draw-target-time-pill">
                                <span className="draw-target-icon">⏰</span>
                                <span className="draw-target-hour">{drawProblem.targetHourDisplay} Uhr</span>
                                <button
                                    type="button"
                                    className="draw-target-voice-btn"
                                    onClick={() => playVoice(`Stelle die Uhr auf ${drawProblem.targetHourDisplay} Uhr`)}
                                    title="Aufgabe vorlesen"
                                    aria-label="Aufgabe vorlesen"
                                >
                                    🔊
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Clock SVG with Authentic Textbook Styling */}
                <div className="clock-svg-wrapper dual-clock-svg-wrapper">
                    <svg viewBox="0 0 300 300" className="analog-clock-svg" aria-label="Lernuhr">
                        <defs>
                            <radialGradient id="dualDialGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#f8fafc" />
                            </radialGradient>
                            <filter id="dualHandShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.2" />
                            </filter>
                        </defs>

                        {/* Outer Bezel */}
                        <circle cx="150" cy="150" r="144" fill="#ffffff" stroke="#3b82f6" strokeWidth="4" />
                        <circle cx="150" cy="150" r="138" fill="url(#dualDialGrad)" stroke="#93c5fd" strokeWidth="2.5" />

                        {/* Top Marker: UHR (12) */}
                        <g transform="translate(150, 48)">
                            <rect x="-17" y="-8" width="34" height="15" rx="4.5" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
                            <text x="0" y="3" textAnchor="middle" fontSize="8.5" fontWeight="900" fontFamily="var(--font-main)" fill="#1d4ed8" letterSpacing="0.5px">
                                UHR
                            </text>
                        </g>

                        {/* 60 Minute Ticks */}
                        {Array.from({ length: 60 }).map((_, i) => {
                            const isMajor = i % 5 === 0;
                            const angle = (i * 6 * Math.PI) / 180;
                            const outerR = 135;
                            const innerR = isMajor ? 124 : 129;
                            const x1 = 150 + outerR * Math.sin(angle);
                            const y1 = 150 - outerR * Math.cos(angle);
                            const x2 = 150 + innerR * Math.sin(angle);
                            const y2 = 150 - innerR * Math.cos(angle);

                            return (
                                <line
                                    key={i}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={isMajor ? '#3b82f6' : '#cbd5e1'}
                                    strokeWidth={isMajor ? 2.5 : 1.2}
                                    strokeLinecap="round"
                                />
                            );
                        })}

                        {/* Standard 1–12 Hour Numbers (Clickable in Draw Hand mode!) */}
                        {dialNumbers.map(n => {
                            const angle = (n * 30 * Math.PI) / 180;
                            const r = 100;
                            const x = 150 + r * Math.sin(angle);
                            const y = 150 - r * Math.cos(angle);

                            const isSelected = practiceMode === 'drawHand' && selectedHourHand === n;

                            return (
                                <g
                                    key={`dial-num-${n}`}
                                    onClick={() => practiceMode === 'drawHand' && handleSelectDrawHour(n)}
                                    style={{ cursor: practiceMode === 'drawHand' ? 'pointer' : 'default' }}
                                    className={practiceMode === 'drawHand' ? 'interactive-hour-node' : ''}
                                >
                                    {/* Tap target circle in Draw Mode */}
                                    {practiceMode === 'drawHand' && (
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r={18}
                                            fill={isSelected ? '#fee2e2' : 'transparent'}
                                            stroke={isSelected ? '#ef4444' : 'rgba(59, 130, 246, 0.15)'}
                                            strokeWidth={isSelected ? 2 : 1}
                                        />
                                    )}
                                    <text
                                        x={x}
                                        y={y + 6.5}
                                        className="clock-dial-number"
                                        textAnchor="middle"
                                        fontSize="22"
                                        fontWeight="900"
                                        fill={isSelected ? '#ef4444' : '#1e293b'}
                                    >
                                        {n}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Blue Minute Hand (Fixed at 12: 00 min) */}
                        <g transform="rotate(0 150 150)">
                            <path
                                d="M 146 150 L 147.5 48 L 150 34 L 152.5 48 L 154 150 Z"
                                fill={minuteHandColor}
                                stroke={minuteHandStroke}
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M 146.5 150 L 146.5 174 A 3.5 3.5 0 0 0 153.5 174 L 153.5 150 Z"
                                fill={minuteHandColor}
                                stroke={minuteHandStroke}
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        </g>

                        {/* Red Hour Hand */}
                        {practiceMode === 'dualTime' && (
                            <g
                                transform={`rotate(${dualHourAngle} 150 150)`}
                                style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)' }}
                            >
                                <path
                                    d="M 143 150 L 145 82 L 150 68 L 155 82 L 157 150 Z"
                                    fill={hourHandColor}
                                    stroke={hourHandStroke}
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M 144 150 L 144 168 A 6 6 0 0 0 156 168 L 156 150 Z"
                                    fill={hourHandColor}
                                    stroke={hourHandStroke}
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                />
                            </g>
                        )}

                        {practiceMode === 'drawHand' && drawHourAngle !== null && (
                            <g
                                transform={`rotate(${drawHourAngle} 150 150)`}
                                style={{ transition: 'transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)' }}
                            >
                                <path
                                    d="M 143 150 L 145 82 L 150 68 L 155 82 L 157 150 Z"
                                    fill={hourHandColor}
                                    stroke={hourHandStroke}
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M 144 150 L 144 168 A 6 6 0 0 0 156 168 L 156 150 Z"
                                    fill={hourHandColor}
                                    stroke={hourHandStroke}
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                />
                            </g>
                        )}

                        {/* Center Pin Hub */}
                        <circle cx="150" cy="150" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
                        <circle cx="150" cy="150" r="4" fill="#b45309" />
                    </svg>
                </div>

                {/* MODE 1: Dual Time Textbook Lines: ☀️ __ Uhr and 🌙 __ Uhr */}
                {practiceMode === 'dualTime' && (
                    <div className="textbook-dual-lines-container">
                        {/* Day Line (Vormittag 1–12) */}
                        <div
                            className={`textbook-line-row ${activeInputSlot === 'day' ? 'slot-focused' : ''} ${feedback === 'incorrect' ? 'slot-error' : ''}`}
                            onClick={() => setActiveInputSlot('day')}
                        >
                            <span className="time-icon-tag">☀️ Vormittag:</span>
                            <div className="textbook-input-box">
                                <span className="input-value-text">{dayInput || '--'}</span>
                            </div>
                            <span className="uhr-suffix">Uhr</span>
                            {feedback === 'correct' && <span className="line-check">✔️</span>}
                        </div>

                        {/* Night Line (Nachmittag 13–24) */}
                        <div
                            className={`textbook-line-row ${activeInputSlot === 'night' ? 'slot-focused' : ''} ${feedback === 'incorrect' ? 'slot-error' : ''}`}
                            onClick={() => setActiveInputSlot('night')}
                        >
                            <span className="time-icon-tag">🌙 Nachmittag:</span>
                            <div className="textbook-input-box">
                                <span className="input-value-text">{nightInput || '--'}</span>
                            </div>
                            <span className="uhr-suffix">Uhr</span>
                            {feedback === 'correct' && <span className="line-check">✔️</span>}
                        </div>
                    </div>
                )}

                {/* MODE 2: Draw Hand Prompt Helper */}
                {practiceMode === 'drawHand' && (
                    <div className="draw-hand-prompt-box">
                        <span className="draw-prompt-icon">👉</span>
                        <span className="draw-prompt-text">
                            Tippe auf die <b>Zahl</b> auf der Uhr, wo der rote Zeiger hinzeigen soll!
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Kid Numpad for Dual Time Mode */}
            {practiceMode === 'dualTime' && (
                <div className="clock-dual-numpad-container">
                    <div className="numpad-grid clock-numpad">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <motion.button
                                key={num}
                                type="button"
                                className="numpad-btn"
                                onClick={() => handleNumpadDigit(String(num))}
                                whileTap={{ scale: 0.92 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {num}
                            </motion.button>
                        ))}
                        <motion.button
                            type="button"
                            className="numpad-btn numpad-action numpad-delete"
                            onClick={handleNumpadBackspace}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                            aria-label="Löschen"
                            title="Löschen"
                        >
                            ⌫
                        </motion.button>
                        <motion.button
                            type="button"
                            className="numpad-btn"
                            onClick={() => handleNumpadDigit('0')}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            0
                        </motion.button>
                        <motion.button
                            type="button"
                            className="numpad-btn numpad-action numpad-submit"
                            onClick={handleSubmitDualTime}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                            aria-label="Bestätigen"
                            title="Bestätigen"
                        >
                            ✔️
                        </motion.button>
                    </div>
                </div>
            )}

            {/* 24-Hour Textbook Helper Diagram Modal (1 ↔ 13 Uhr) */}
            <AnimatePresence>
                {showHelperDiagram && (
                    <motion.div
                        className="clock-info-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowHelperDiagram(false)}
                    >
                        <motion.div
                            className="clock-info-modal-card glass-card mascot-helper-modal"
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="info-modal-header">
                                <h4>💡 24-Stunden Übersicht (1 & 13 Uhr)</h4>
                                <button
                                    type="button"
                                    className="info-modal-close"
                                    onClick={() => setShowHelperDiagram(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Mascot speech bubble */}
                            <div className="mascot-speech-bubble">
                                <span className="mascot-icon">🐸</span>
                                <div className="speech-content">
                                    <strong>Tipp vom Uhren-Freund:</strong>
                                    <p>Am Nachmittag addieren wir einfach <b>+12 Stunden</b>!</p>
                                    <span className="bubble-example">1 Uhr + 12 = 13 Uhr • 5 Uhr + 12 = 17 Uhr</span>
                                </div>
                            </div>

                            {/* 24h Circular Reference Grid */}
                            <div className="helper-24h-grid">
                                {[
                                    { d: 1, n: 13 },
                                    { d: 2, n: 14 },
                                    { d: 3, n: 15 },
                                    { d: 4, n: 16 },
                                    { d: 5, n: 17 },
                                    { d: 6, n: 18 },
                                    { d: 7, n: 19 },
                                    { d: 8, n: 20 },
                                    { d: 9, n: 21 },
                                    { d: 10, n: 22 },
                                    { d: 11, n: 23 },
                                    { d: 12, n: '24 / 0' }
                                ].map(item => (
                                    <div key={item.d} className="helper-hour-chip">
                                        <span className="chip-day">☀️ {item.d} Uhr</span>
                                        <span className="chip-arrow">↔</span>
                                        <span className="chip-night">🌙 {item.n} Uhr</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="info-modal-ok-btn"
                                onClick={() => setShowHelperDiagram(false)}
                            >
                                Verstanden! 👍
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reward & Celebration */}
            <RewardCelebration
                show={showReward}
                reward={rewardData}
                onClose={() => {
                    setShowReward(false);
                    navigate('/');
                }}
            />
        </div>
    );
};

export default ClockPracticeDualView;
