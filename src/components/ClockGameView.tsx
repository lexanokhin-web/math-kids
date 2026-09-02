import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

export type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

export interface TimeTheme {
    key: TimeOfDay;
    nameDe: string;
    nameRu: string;
    icon: string;
    skyGradient: string;
    dialGradient: [string, string];
    dialBorder: string;
    bezelColor: string;
    cardBg: string;
    accentColor: string;
    badgeBg: string;
    badgeTextColor: string;
    numberColor: string;
    subtextColor: string;
}

export const getTimeTheme = (hour24: number): TimeTheme => {
    if (hour24 >= 6 && hour24 < 12) {
        // Morning (06:00 - 11:59) - Sunrise warmth
        return {
            key: 'morning',
            nameDe: 'Morgen',
            nameRu: 'Утро',
            icon: '🌅',
            skyGradient: 'linear-gradient(135deg, #fef08a 0%, #fed7aa 50%, #bae6fd 100%)',
            dialGradient: ['#ffffff', '#fef9c3'],
            dialBorder: '#facc15',
            bezelColor: '#f59e0b',
            cardBg: 'linear-gradient(145deg, rgba(254, 249, 195, 0.9), rgba(254, 215, 170, 0.85))',
            accentColor: '#d97706',
            badgeBg: '#fef3c7',
            badgeTextColor: '#92400e',
            numberColor: '#1e293b',
            subtextColor: '#78350f'
        };
    } else if (hour24 >= 12 && hour24 < 18) {
        // Day / Afternoon (12:00 - 17:59) - Bright sky cyan
        return {
            key: 'day',
            nameDe: 'Nachmittag',
            nameRu: 'День',
            icon: '☀️',
            skyGradient: 'linear-gradient(135deg, #38bdf8 0%, #7dd3fc 50%, #fef08a 100%)',
            dialGradient: ['#ffffff', '#f0f9ff'],
            dialBorder: '#38bdf8',
            bezelColor: '#0284c7',
            cardBg: 'linear-gradient(145deg, rgba(240, 249, 255, 0.95), rgba(224, 242, 254, 0.9))',
            accentColor: '#0284c7',
            badgeBg: '#e0f2fe',
            badgeTextColor: '#0369a1',
            numberColor: '#0f172a',
            subtextColor: '#0369a1'
        };
    } else if (hour24 >= 18 && hour24 < 22) {
        // Evening / Sunset (18:00 - 21:59) - Sunset pink & purple
        return {
            key: 'evening',
            nameDe: 'Abend',
            nameRu: 'Вечер',
            icon: '🌇',
            skyGradient: 'linear-gradient(135deg, #f43f5e 0%, #c084fc 60%, #6366f1 100%)',
            dialGradient: ['#fff1f2', '#fdf4ff'],
            dialBorder: '#ec4899',
            bezelColor: '#d946ef',
            cardBg: 'linear-gradient(145deg, rgba(253, 232, 242, 0.95), rgba(245, 208, 254, 0.9))',
            accentColor: '#c026d3',
            badgeBg: '#fce7f3',
            badgeTextColor: '#9d174d',
            numberColor: '#1e293b',
            subtextColor: '#831843'
        };
    } else {
        // Night (22:00 - 05:59) - Deep starry midnight
        return {
            key: 'night',
            nameDe: 'Nacht',
            nameRu: 'Ночь',
            icon: '🌙',
            skyGradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
            dialGradient: ['#1e293b', '#0f172a'],
            dialBorder: '#6366f1',
            bezelColor: '#4338ca',
            cardBg: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 27, 75, 0.95))',
            accentColor: '#818cf8',
            badgeBg: '#312e81',
            badgeTextColor: '#e0e7ff',
            numberColor: '#f8fafc',
            subtextColor: '#c7d2fe'
        };
    }
};

interface ClockProblem {
    hour24: number;      // 0 to 23
    hour12: number;      // 1 to 12
    minute: number;      // 0 to 59
    targetDigital: string; // "15:30"
    germanPhrase: string;
    options: string[];
    theme: TimeTheme;
}

const getGermanTimePhrase24 = (hour24: number, minutes: number): string => {
    const h12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const nextH12 = (h12 % 12) + 1;

    let basePhrase = '';
    if (minutes === 0) {
        basePhrase = `${h12} Uhr`;
    } else if (minutes === 15) {
        basePhrase = `Viertel nach ${h12}`;
    } else if (minutes === 30) {
        basePhrase = `Halb ${nextH12}`;
    } else if (minutes === 45) {
        basePhrase = `Viertel vor ${nextH12}`;
    } else if (minutes < 30) {
        basePhrase = `${minutes} nach ${h12}`;
    } else {
        basePhrase = `${60 - minutes} vor ${nextH12}`;
    }

    let timeContext = '';
    if (hour24 >= 6 && hour24 < 12) timeContext = 'am Morgen 🌅';
    else if (hour24 >= 12 && hour24 < 18) timeContext = 'am Nachmittag ☀️';
    else if (hour24 >= 18 && hour24 < 22) timeContext = 'am Abend 🌇';
    else timeContext = 'in der Nacht 🌙';

    const formatted24 = formatTime(hour24, minutes);
    return `${formatted24} Uhr (${basePhrase} ${timeContext})`;
};

const formatTime = (h: number, m: number): string => {
    const formattedH = h < 10 ? `0${h}` : `${h}`;
    const formattedM = m < 10 ? `0${m}` : `${m}`;
    return `${formattedH}:${formattedM}`;
};

const generateClockProblem = (level: number, use24Hour: boolean): ClockProblem => {
    let hour24: number;
    if (use24Hour) {
        // Full 24 hours: 0 to 23
        hour24 = Math.floor(Math.random() * 24);
    } else {
        // 12 hour representation (1 to 12)
        hour24 = Math.floor(Math.random() * 12) + 1;
    }

    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
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

    const targetDigital = formatTime(hour24, minute);
    const germanPhrase = getGermanTimePhrase24(hour24, minute);
    const theme = getTimeTheme(hour24);

    // Generate 3 plausible wrong options
    const wrongOptions = new Set<string>();
    while (wrongOptions.size < 3) {
        let wrongH = hour24;
        let wrongM = minute;

        const variation = Math.floor(Math.random() * 4);
        if (variation === 0) {
            // Shift 12h (day vs night confusion, e.g. 14:00 vs 02:00)
            if (use24Hour) {
                wrongH = (hour24 + 12) % 24;
            } else {
                wrongH = ((hour24 + (Math.random() > 0.5 ? 1 : 11) - 1) % 12) + 1;
            }
        } else if (variation === 1) {
            // Shift 1 hour
            const maxH = use24Hour ? 24 : 12;
            const deltaH = Math.random() > 0.5 ? 1 : -1;
            wrongH = (hour24 + deltaH + maxH) % maxH;
            if (!use24Hour && wrongH === 0) wrongH = 12;
        } else if (variation === 2) {
            // Half hour or 15m shift
            wrongM = (minute + (Math.random() > 0.5 ? 30 : 15)) % 60;
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
        hour24,
        hour12,
        minute,
        targetDigital,
        germanPhrase,
        options,
        theme
    };
};

const ClockGameView: React.FC = () => {
    const navigate = useNavigate();
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState<number>(playerProgress.clockLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    // 24-Hour mode enabled by default
    const [is24Hour, setIs24Hour] = useState<boolean>(() => {
        const stored = localStorage.getItem('mathkids_clock_24h');
        return stored !== 'false';
    });

    const [problem, setProblem] = useState<ClockProblem>(() =>
        generateClockProblem(level, is24Hour)
    );
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
        setProblem(generateClockProblem(level, is24Hour));
    }, [level, is24Hour]);

    const handleToggle24Hour = () => {
        const nextVal = !is24Hour;
        setIs24Hour(nextVal);
        localStorage.setItem('mathkids_clock_24h', String(nextVal));
        setHourInput('');
        setMinuteInput('');
        setActiveField('hours');
        setFeedback(null);
        setShowGermanPhrase(false);
        setProblem(generateClockProblem(level, nextVal));
    };

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
        setProblem(generateClockProblem(newLevel, is24Hour));
    };

    const handleAnswerSubmit = (submittedTime: string) => {
        if (feedback !== null || showReward) return;

        soundManager.playClick();

        const [subH, subM] = submittedTime.split(':').map(Number);
        const [tarH, tarM] = problem.targetDigital.split(':').map(Number);

        let isCorrect = false;
        if (is24Hour) {
            isCorrect = subH === tarH && subM === tarM;
        } else {
            isCorrect = (subH % 12) === (tarH % 12) && subM === tarM;
        }

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
                }, 1300);
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
            const maxAllowed = is24Hour ? 23 : 12;

            if (!isNaN(num) && num <= maxAllowed) {
                setHourInput(nextVal);
                // Auto switch to minutes if 2 digits or first digit > 2 (e.g. 3-9 cannot have second digit for hours)
                if (nextVal.length === 2 || (is24Hour && num >= 3) || (!is24Hour && num >= 2)) {
                    setActiveField('minutes');
                }
            } else if (!isNaN(num) && num > maxAllowed) {
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
    const hourAngle = ((problem.hour12 % 12) + problem.minute / 60) * 30;
    const minuteAngle = problem.minute * 6;

    // 12-hour dial numbers
    const dialNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

    // 24-hour afternoon numbers corresponding to 1..12: (13..24/00)
    const dial24Numbers = [
        { n: 12, text: '00' },
        { n: 1, text: '13' },
        { n: 2, text: '14' },
        { n: 3, text: '15' },
        { n: 4, text: '16' },
        { n: 5, text: '17' },
        { n: 6, text: '18' },
        { n: 7, text: '19' },
        { n: 8, text: '20' },
        { n: 9, text: '21' },
        { n: 10, text: '22' },
        { n: 11, text: '23' }
    ];

    const currentTheme = problem.theme;

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

                {/* 24h vs 12h Toggle */}
                <button
                    type="button"
                    className={`clock-format-toggle ${is24Hour ? 'active' : ''}`}
                    onClick={handleToggle24Hour}
                    title="24-Stunden / 12-Stunden Modus wechseln"
                >
                    {is24Hour ? '24h' : '12h'}
                </button>

                {/* Input Mode Toggle */}
                <div className="header-mode-toggle">
                    <button
                        type="button"
                        className={`toggle-option ${inputMode === 'manual' ? 'active' : ''}`}
                        onClick={() => setInputMode('manual')}
                        title="Tippen"
                    >
                        ✍️
                    </button>
                    <button
                        type="button"
                        className={`toggle-option ${inputMode === 'choice' ? 'active' : ''}`}
                        onClick={() => setInputMode('choice')}
                        title="4 Optionen"
                    >
                        🔲
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="clock-progress-bar-container">
                <div className="clock-progress-bar" style={{ width: `${(round / 10) * 100}%` }} />
                <span className="round-counter">Aufgabe {round} / 10</span>
            </div>

            {/* Daytime Sky Banner (Утро / День / Вечер / Ночь) */}
            <motion.div
                className="daytime-sky-banner"
                style={{ background: currentTheme.skyGradient }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                key={`banner-${currentTheme.key}`}
            >
                <div className="sky-banner-content">
                    <span className="sky-icon-large">{currentTheme.icon}</span>
                    <div className="sky-text-stack">
                        <span className="sky-label-de">{currentTheme.nameDe}</span>
                        <span className="sky-label-ru">{currentTheme.nameRu} ({is24Hour ? (problem.hour24 >= 12 ? '12:00 – 23:59' : '00:00 – 11:59') : '12h'})</span>
                    </div>
                </div>
                {is24Hour && problem.hour24 >= 12 && (
                    <span className="badge-24h-indicator">24-Stunden-Format</span>
                )}
            </motion.div>

            {/* Dynamic Analog Clock Card */}
            <motion.div
                className="clock-card"
                style={{
                    background: currentTheme.cardBg,
                    borderColor: currentTheme.bezelColor,
                    boxShadow: `0 14px 32px rgba(0, 0, 0, 0.12), 0 0 0 2px ${currentTheme.bezelColor}33`
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <div className="clock-title-bar">
                    <h3 style={{ color: currentTheme.numberColor }}>
                        Wie spät ist es? {currentTheme.icon}
                    </h3>
                    <p className="clock-hint-sub" style={{ color: currentTheme.subtextColor }}>
                        Schau auf die Zeiger und die Tageszeit
                    </p>
                </div>

                {/* SVG Analog Clock with Daytime Colors */}
                <div className="clock-svg-wrapper">
                    <svg viewBox="0 0 300 300" className="analog-clock-svg" aria-label="Analoge Uhr">
                        <defs>
                            <radialGradient id="clockDialGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor={currentTheme.dialGradient[0]} />
                                <stop offset="100%" stopColor={currentTheme.dialGradient[1]} />
                            </radialGradient>
                            <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.25" />
                            </filter>
                        </defs>

                        {/* Outer Bezel (Adapts to daytime theme) */}
                        <circle cx="150" cy="150" r="144" fill="#ffffff" stroke={currentTheme.bezelColor} strokeWidth="4" />
                        <circle cx="150" cy="150" r="138" fill="url(#clockDialGrad)" stroke={currentTheme.dialBorder} strokeWidth="2.5" />

                        {/* Night Stars Background Effect if Night */}
                        {currentTheme.key === 'night' && (
                            <g opacity="0.6">
                                <circle cx="85" cy="70" r="1.5" fill="#fef08a" />
                                <circle cx="215" cy="75" r="1.5" fill="#fef08a" />
                                <circle cx="70" cy="180" r="1.5" fill="#fef08a" />
                                <circle cx="230" cy="190" r="1.5" fill="#fef08a" />
                                <circle cx="150" cy="60" r="2" fill="#ffffff" />
                            </g>
                        )}

                        {/* Outer Minute Hints (00, 05, 10, 15, ... 55) */}
                        {[
                            { n: 12, text: '00' },
                            { n: 1, text: '05' },
                            { n: 2, text: '10' },
                            { n: 3, text: '15' },
                            { n: 4, text: '20' },
                            { n: 5, text: '25' },
                            { n: 6, text: '30' },
                            { n: 7, text: '35' },
                            { n: 8, text: '40' },
                            { n: 9, text: '45' },
                            { n: 10, text: '50' },
                            { n: 11, text: '55' }
                        ].map(m => {
                            const angle = (m.n * 30 * Math.PI) / 180;
                            const r = 125;
                            const x = 150 + r * Math.sin(angle);
                            const y = 150 - r * Math.cos(angle);

                            return (
                                <g key={`min-badge-${m.n}`}>
                                    <rect
                                        x={x - 12}
                                        y={y - 8}
                                        width={24}
                                        height={16}
                                        rx={5}
                                        fill={currentTheme.key === 'night' ? '#1e1b4b' : '#eff6ff'}
                                        stroke={currentTheme.key === 'night' ? '#6366f1' : '#93c5fd'}
                                        strokeWidth={1.2}
                                    />
                                    <text
                                        x={x}
                                        y={y + 4}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fontWeight="900"
                                        fontFamily="var(--font-main)"
                                        fill={currentTheme.key === 'night' ? '#93c5fd' : '#1d4ed8'}
                                    >
                                        {m.text}
                                    </text>
                                </g>
                            );
                        })}

                        {/* 60 Minute Ticks */}
                        {Array.from({ length: 60 }).map((_, i) => {
                            const isMajor = i % 5 === 0;
                            const angle = (i * 6 * Math.PI) / 180;
                            const outerR = 113;
                            const innerR = isMajor ? 106 : 109;
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
                                    stroke={isMajor ? '#3b82f6' : (currentTheme.key === 'night' ? '#475569' : '#cbd5e1')}
                                    strokeWidth={isMajor ? 2.5 : 1.2}
                                    strokeLinecap="round"
                                />
                            );
                        })}

                        {/* Standard 1–12 Hour Numbers */}
                        {dialNumbers.map(n => {
                            const angle = (n * 30 * Math.PI) / 180;
                            const r = 88;
                            const x = 150 + r * Math.sin(angle);
                            const y = 150 - r * Math.cos(angle) + 7;

                            return (
                                <text
                                    key={n}
                                    x={x}
                                    y={y}
                                    className="clock-dial-number"
                                    textAnchor="middle"
                                    fontSize="21"
                                    fontWeight="900"
                                    fill={currentTheme.numberColor}
                                >
                                    {n}
                                </text>
                            );
                        })}

                        {/* 24-Hour Inner Numbers (13, 14, 15, ... 23, 00) */}
                        {is24Hour && dial24Numbers.map(m24 => {
                            const angle = (m24.n * 30 * Math.PI) / 180;
                            const r = 58;
                            const x = 150 + r * Math.sin(angle);
                            const y = 150 - r * Math.cos(angle);

                            const isTargetHour24 = problem.hour24 >= 12
                                ? (problem.hour24 === 0 && m24.n === 12) || (problem.hour24 === m24.n + 12)
                                : false;

                            return (
                                <g key={`h24-${m24.n}`}>
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={11}
                                        fill={isTargetHour24 ? '#ef4444' : (currentTheme.key === 'night' ? '#334155' : '#fef3c7')}
                                        stroke={isTargetHour24 ? '#ffffff' : (currentTheme.key === 'night' ? '#475569' : '#fde047')}
                                        strokeWidth={isTargetHour24 ? 2 : 1}
                                    />
                                    <text
                                        x={x}
                                        y={y + 3.5}
                                        textAnchor="middle"
                                        fontSize="9.5"
                                        fontWeight="900"
                                        fontFamily="var(--font-main)"
                                        fill={isTargetHour24 ? '#ffffff' : (currentTheme.key === 'night' ? '#e2e8f0' : '#b45309')}
                                    >
                                        {m24.text}
                                    </text>
                                </g>
                            );
                        })}

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

                {/* Hand & 24h Color Legend */}
                <div className="clock-hand-legend">
                    <span className="legend-chip hour-legend">
                        <span className="legend-dot red" />
                        <strong>Rot:</strong> Stunde {is24Hour ? '(0–23)' : '(1–12)'}
                    </span>
                    <span className="legend-chip minute-legend">
                        <span className="legend-dot blue" />
                        <strong>Blau:</strong> Minute (0–59)
                    </span>
                    {is24Hour && (
                        <span className="legend-chip hour24-legend">
                            <span className="legend-dot amber" />
                            <strong>Gelb:</strong> 13–24h
                        </span>
                    )}
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
                            <span className="slot-label">STUNDE {is24Hour ? '(0–23)' : '(1–12)'}</span>
                            <span className="slot-value">
                                {hourInput ? (hourInput.length === 1 ? `0${hourInput}` : hourInput) : '--'}
                            </span>
                        </div>

                        <span className="digital-colon">:</span>

                        <div
                            className={`digital-slot minute-slot ${activeField === 'minutes' ? 'active' : ''} ${feedback === 'incorrect' ? 'slot-error' : ''}`}
                            onClick={() => setActiveField('minutes')}
                        >
                            <span className="slot-label">MINUTE (0–59)</span>
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
                            <span className="choice-phrase">
                                {getGermanTimePhrase24(parseInt(opt.split(':')[0], 10), parseInt(opt.split(':')[1], 10))}
                            </span>
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
                        title="Uhren-Meister 24h ⏰"
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
