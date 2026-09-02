import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

interface ClockProblem {
    hour: number;        // 1 to 12
    minute: number;      // 0 to 59
    targetDigital: string; // "03:30"
    germanPhrase: string;
    options: string[];
}

const getGermanTimePhrase = (hours: number, minutes: number): string => {
    const h = hours % 12 === 0 ? 12 : hours % 12;
    const nextH = (h % 12) + 1;

    if (minutes === 0) {
        return `${h} Uhr`;
    } else if (minutes === 15) {
        return `Viertel nach ${h}`;
    } else if (minutes === 30) {
        return `Halb ${nextH}`;
    } else if (minutes === 45) {
        return `Viertel vor ${nextH}`;
    } else if (minutes === 10) {
        return `10 nach ${h}`;
    } else if (minutes === 20) {
        return `20 nach ${h}`;
    } else if (minutes === 50) {
        return `10 vor ${nextH}`;
    } else if (minutes === 40) {
        return `20 vor ${nextH}`;
    } else if (minutes < 30) {
        return `${minutes} nach ${h}`;
    } else {
        return `${60 - minutes} vor ${nextH}`;
    }
};

const formatTime = (h: number, m: number): string => {
    const formattedH = h < 10 ? `0${h}` : `${h}`;
    const formattedM = m < 10 ? `0${m}` : `${m}`;
    return `${formattedH}:${formattedM}`;
};

const generateClockProblem = (level: number): ClockProblem => {
    const hour = Math.floor(Math.random() * 12) + 1; // 1 to 12
    let minute = 0;

    if (level === 1) {
        // Level 1: Full hours & half hours (:00, :30)
        minute = Math.random() > 0.5 ? 0 : 30;
    } else if (level === 2) {
        // Level 2: 5-minute steps
        const fiveMinSteps = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
        minute = fiveMinSteps[Math.floor(Math.random() * fiveMinSteps.length)];
    } else {
        // Level 3: Any minute
        minute = Math.floor(Math.random() * 60);
    }

    const targetDigital = formatTime(hour, minute);
    const germanPhrase = getGermanTimePhrase(hour, minute);

    // Generate 3 plausible wrong options
    const wrongOptions = new Set<string>();
    while (wrongOptions.size < 3) {
        let wrongH = hour;
        let wrongM = minute;

        const variation = Math.floor(Math.random() * 4);
        if (variation === 0) {
            // Hour changed
            wrongH = ((hour + (Math.random() > 0.5 ? 1 : 11) - 1) % 12) + 1;
        } else if (variation === 1) {
            // Half hour or 15m shift
            wrongM = (minute + (Math.random() > 0.5 ? 30 : 15)) % 60;
        } else if (variation === 2 && minute !== 0 && minute !== 30 && minute <= 12) {
            // Swap hour & minute (plausible confusion)
            wrongH = minute === 0 ? 12 : minute;
            wrongM = (hour * 5) % 60;
        } else {
            // Shift 5 or 10 min
            const delta = (Math.floor(Math.random() * 3) + 1) * 5;
            wrongM = (minute + (Math.random() > 0.5 ? delta : 60 - delta)) % 60;
        }

        const optStr = formatTime(wrongH, wrongM);
        if (optStr !== targetDigital) {
            wrongOptions.add(optStr);
        }
    }

    const options = [...Array.from(wrongOptions), targetDigital];
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return {
        hour,
        minute,
        targetDigital,
        germanPhrase,
        options
    };
};

const ClockGameView: React.FC = () => {
    const navigate = useNavigate();
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState<number>(playerProgress.clockLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const [problem, setProblem] = useState<ClockProblem>(() => generateClockProblem(level));
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    // Input Mode: 'manual' (type hour & minute) vs 'choice' (choose from 4)
    const [inputMode, setInputMode] = useState<'manual' | 'choice'>('manual');

    // Manual input fields
    const [hourInput, setHourInput] = useState<string>('');
    const [minuteInput, setMinuteInput] = useState<string>('');
    const [activeField, setActiveField] = useState<'hours' | 'minutes'>('hours');

    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showGermanPhrase, setShowGermanPhrase] = useState(false);

    // Reward / Completion
    const [showReward, setShowReward] = useState(false);
    const [rewardData, setRewardData] = useState<Reward | null>(null);

    const nextRound = useCallback(() => {
        setHourInput('');
        setMinuteInput('');
        setActiveField('hours');
        setFeedback(null);
        setShowGermanPhrase(false);
        setProblem(generateClockProblem(level));
    }, [level]);

    const handleSelectLevel = (newLevel: number) => {
        setLevel(newLevel);
        const updatedProgress = setGameLevel('clock', newLevel);
        setPlayerProgress(updatedProgress);
        setShowLevelPicks(false);
        setRound(1);
        setScore(0);
        setStreak(0);
        setHourInput('');
        setMinuteInput('');
        setActiveField('hours');
        setFeedback(null);
        setShowGermanPhrase(false);
        setProblem(generateClockProblem(newLevel));
    };

    const handleAnswerSubmit = (submittedTime: string) => {
        if (feedback !== null || showReward) return;

        soundManager.playClick();

        const [subH, subM] = submittedTime.split(':').map(Number);
        const [tarH, tarM] = problem.targetDigital.split(':').map(Number);

        // Normalize 12 vs 0
        const isHourMatch = (subH % 12) === (tarH % 12);
        const isMinuteMatch = subM === tarM;
        const isCorrect = isHourMatch && isMinuteMatch;

        if (isCorrect) {
            soundManager.playCorrect();
            setFeedback('correct');
            setShowGermanPhrase(true);
            setScore(s => s + 10 + streak * 2);
            setStreak(st => st + 1);

            if ((streak + 1) % 5 === 0) {
                confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            }

            if (round >= 10) {
                // Completed game session
                const res = trackGeneralGame('clock', 25, true);
                setTimeout(() => {
                    setRewardData({
                        xp: 25,
                        leveledUp: res.leveledUp,
                        achievement: res.unlockedAchievement,
                        sticker: res.unlockedSticker
                    });
                    setShowReward(true);
                }, 900);
            } else {
                setRound(r => r + 1);
                setTimeout(() => {
                    nextRound();
                }, 1200);
            }
        } else {
            soundManager.playIncorrect();
            setFeedback('incorrect');
            setStreak(0);

            setTimeout(() => {
                setFeedback(null);
            }, 800);
        }
    };

    const handleNumpadDigit = (digit: string) => {
        soundManager.playClick();
        if (activeField === 'hours') {
            const nextVal = hourInput.length >= 2 ? digit : hourInput + digit;
            const num = parseInt(nextVal, 10);
            if (!isNaN(num) && num <= 12) {
                setHourInput(nextVal);
                if (nextVal.length === 2 || num >= 2) {
                    setActiveField('minutes');
                }
            } else if (!isNaN(num) && num > 12) {
                setHourInput(digit);
                setActiveField('minutes');
            }
        } else {
            const nextVal = minuteInput.length >= 2 ? digit : minuteInput + digit;
            const num = parseInt(nextVal, 10);
            if (!isNaN(num) && num < 60) {
                setMinuteInput(nextVal);
            }
        }
    };

    const handleNumpadBackspace = () => {
        soundManager.playClick();
        if (activeField === 'minutes') {
            if (minuteInput.length > 0) {
                setMinuteInput(prev => prev.slice(0, -1));
            } else {
                setActiveField('hours');
            }
        } else {
            setHourInput(prev => prev.slice(0, -1));
        }
    };

    const handleManualCheck = () => {
        if (!hourInput) {
            setActiveField('hours');
            return;
        }
        if (!minuteInput) {
            setActiveField('minutes');
            return;
        }
        const h = parseInt(hourInput, 10);
        const m = parseInt(minuteInput, 10);
        if (isNaN(h) || isNaN(m)) return;

        handleAnswerSubmit(formatTime(h, m));
    };

    // Keyboard support
    useEffect(() => {
        if (inputMode !== 'manual' || showReward) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
                handleNumpadDigit(e.key);
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                handleNumpadBackspace();
            } else if (e.key === ':' || e.key === 'Tab' || e.key === 'ArrowRight') {
                e.preventDefault();
                setActiveField('minutes');
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setActiveField('hours');
            } else if (e.key === 'Enter') {
                e.preventDefault();
                handleManualCheck();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setHourInput('');
                setMinuteInput('');
                setActiveField('hours');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    // Calculate Hand Angles
    const hourAngle = ((problem.hour % 12) + problem.minute / 60) * 30;
    const minuteAngle = problem.minute * 6;

    // Hour dial numbers (1 to 12)
    const dialNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className="game-view clock-game-view">
            {/* Header */}
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>

                <div className="clock-level-badge" onClick={() => setShowLevelPicks(true)}>
                    <span>{level === 1 ? '🌱 Einfach' : level === 2 ? '🚀 Mittel' : '👑 Schwer'}</span>
                    <span className="level-arrow">▼</span>
                </div>

                <div className="score-display">
                    <span className="star">⭐</span>
                    <span>{score}</span>
                </div>

                {/* Input Mode Toggle */}
                <div className="header-mode-toggle">
                    <button
                        type="button"
                        className={`toggle-option ${inputMode === 'manual' ? 'active' : ''}`}
                        onClick={() => setInputMode('manual')}
                        title="Tippen"
                    >
                        ✍️ Tippen
                    </button>
                    <button
                        type="button"
                        className={`toggle-option ${inputMode === 'choice' ? 'active' : ''}`}
                        onClick={() => setInputMode('choice')}
                        title="4 Optionen"
                    >
                        🔲 4
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="clock-progress-bar-container">
                <div className="clock-progress-bar" style={{ width: `${(round / 10) * 100}%` }} />
                <span className="round-counter">Aufgabe {round} / 10</span>
            </div>

            {/* Analog Clock Card */}
            <motion.div
                className="clock-card glass-card"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <div className="clock-title-bar">
                    <h3>Wie spät ist es? ⏰</h3>
                    <p className="clock-hint-sub">Schau auf die Zeiger und bestimme die Uhrzeit</p>
                </div>

                {/* SVG Analog Clock */}
                <div className="clock-svg-wrapper">
                    <svg viewBox="0 0 300 300" className="analog-clock-svg" aria-label="Analoge Uhr">
                        <defs>
                            <radialGradient id="clockDialGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="85%" stopColor="#f8fafc" />
                                <stop offset="100%" stopColor="#e2e8f0" />
                            </radialGradient>
                            <linearGradient id="hourHandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f87171" />
                                <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                            <linearGradient id="minHandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" />
                                <stop offset="100%" stopColor="#2563eb" />
                            </linearGradient>
                            <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.25" />
                            </filter>
                        </defs>

                        {/* Outer Bezel */}
                        <circle cx="150" cy="150" r="142" fill="#ffffff" stroke="#cbd5e1" strokeWidth="4" />
                        <circle cx="150" cy="150" r="136" fill="url(#clockDialGrad)" stroke="#94a3b8" strokeWidth="2" />

                        {/* Minute & Hour Ticks */}
                        {Array.from({ length: 60 }).map((_, i) => {
                            const angle = (i * 6 * Math.PI) / 180;
                            const isMajor = i % 5 === 0;
                            const outerR = 132;
                            const innerR = isMajor ? 120 : 126;
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
                                    stroke={isMajor ? '#475569' : '#cbd5e1'}
                                    strokeWidth={isMajor ? 3 : 1.5}
                                    strokeLinecap="round"
                                />
                            );
                        })}

                        {/* Dial Numbers 1-12 */}
                        {dialNumbers.map(n => {
                            const angle = (n * 30 * Math.PI) / 180;
                            const r = 100;
                            const x = 150 + r * Math.sin(angle);
                            const y = 150 - r * Math.cos(angle) + 7;

                            return (
                                <text
                                    key={n}
                                    x={x}
                                    y={y}
                                    className="clock-dial-number"
                                    textAnchor="middle"
                                    fontSize="22"
                                    fontWeight="800"
                                    fill="#1e293b"
                                >
                                    {n}
                                </text>
                            );
                        })}

                        {/* Level 1 Beginner Helper Labels */}
                        {level === 1 && (
                            <>
                                <text x="150" y="38" className="minute-helper-text" textAnchor="middle">:00</text>
                                <text x="150" y="272" className="minute-helper-text" textAnchor="middle">:30</text>
                            </>
                        )}

                        {/* Hour Hand (Rotated with smooth transition around center 150, 150) */}
                        <g
                            transform={`rotate(${hourAngle} 150 150)`}
                            style={{ transition: 'transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)' }}
                        >
                            {/* Hour Hand Body - Bold and vibrant red */}
                            <path
                                d="M 143 150 L 145 82 L 150 68 L 155 82 L 157 150 Z"
                                fill="#ef4444"
                                stroke="#b91c1c"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                            />
                            {/* Hour Hand Counter-tail */}
                            <path
                                d="M 144 150 L 144 168 A 6 6 0 0 0 156 168 L 156 150 Z"
                                fill="#ef4444"
                                stroke="#b91c1c"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                            />
                        </g>

                        {/* Minute Hand (Rotated with smooth transition around center 150, 150) */}
                        <g
                            transform={`rotate(${minuteAngle} 150 150)`}
                            style={{ transition: 'transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)' }}
                        >
                            {/* Minute Hand Body - Sleek and vibrant blue */}
                            <path
                                d="M 146 150 L 147.5 48 L 150 34 L 152.5 48 L 154 150 Z"
                                fill="#3b82f6"
                                stroke="#1d4ed8"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                            {/* Minute Hand Counter-tail */}
                            <path
                                d="M 146.5 150 L 146.5 174 A 3.5 3.5 0 0 0 153.5 174 L 153.5 150 Z"
                                fill="#3b82f6"
                                stroke="#1d4ed8"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        </g>

                        {/* Center Pin Hub */}
                        <circle cx="150" cy="150" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
                        <circle cx="150" cy="150" r="4" fill="#b45309" />
                    </svg>
                </div>

                {/* Hand Color Legend */}
                <div className="clock-hand-legend">
                    <span className="legend-chip hour-legend">
                        <span className="legend-dot red" />
                        <strong>Rot:</strong> Stunde
                    </span>
                    <span className="legend-chip minute-legend">
                        <span className="legend-dot blue" />
                        <strong>Blau:</strong> Minute
                    </span>
                </div>

                {/* German Phrase Bubble on Correct Answer */}
                <AnimatePresence>
                    {showGermanPhrase && (
                        <motion.div
                            className="german-phrase-bubble"
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <span className="speaker-icon">🗣️</span>
                            <span className="phrase-text">"{problem.germanPhrase}"</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Answer Input Area: Manual Digital Box vs 4 Choices */}
            {inputMode === 'manual' ? (
                <div className="clock-manual-container">
                    {/* Digital Time Inputs Display */}
                    <div className="digital-display-card">
                        <div
                            className={`digital-slot hour-slot ${activeField === 'hours' ? 'active' : ''} ${feedback === 'incorrect' ? 'slot-error' : ''}`}
                            onClick={() => setActiveField('hours')}
                        >
                            <span className="slot-label">STUNDE</span>
                            <span className="slot-value">
                                {hourInput ? (hourInput.length === 1 ? `0${hourInput}` : hourInput) : '--'}
                            </span>
                        </div>

                        <span className="digital-colon">:</span>

                        <div
                            className={`digital-slot minute-slot ${activeField === 'minutes' ? 'active' : ''} ${feedback === 'incorrect' ? 'slot-error' : ''}`}
                            onClick={() => setActiveField('minutes')}
                        >
                            <span className="slot-label">MINUTE</span>
                            <span className="slot-value">
                                {minuteInput ? (minuteInput.length === 1 ? `0${minuteInput}` : minuteInput) : '--'}
                            </span>
                        </div>
                    </div>

                    {/* Numpad */}
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
                            className={`numpad-btn numpad-action numpad-submit ${hourInput && minuteInput ? 'ready' : ''}`}
                            onClick={handleManualCheck}
                            disabled={!hourInput || !minuteInput}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                            aria-label="Prüfen"
                            title="Prüfen"
                        >
                            ✔️
                        </motion.button>
                    </div>
                </div>
            ) : (
                /* Choice Grid (4 Options) */
                <div className="clock-choices-grid">
                    {problem.options.map((opt, idx) => (
                        <motion.button
                            key={opt + '-' + idx}
                            className="clock-choice-card"
                            onClick={() => handleAnswerSubmit(opt)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="choice-digital">{opt}</span>
                            <span className="choice-phrase">{getGermanTimePhrase(parseInt(opt.split(':')[0], 10), parseInt(opt.split(':')[1], 10))}</span>
                        </motion.button>
                    ))}
                </div>
            )}

            {/* Level Selection Modal */}
            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay
                        gameId="clock"
                        currentLevel={level}
                        title="Uhren-Meister ⏰"
                        icon="⏰"
                        onSelectLevel={handleSelectLevel}
                        onClose={() => setShowLevelPicks(false)}
                    />
                )}
            </AnimatePresence>

            {/* Reward & Sticker Celebration Modal */}
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

export default ClockGameView;
