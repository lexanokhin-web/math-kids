import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';
import {
    getTimeTheme,
    getSmartGermanTime,
    speakGermanTime,
    type TimeTheme,
    type GermanTimeInfo
} from './ClockGameView';

export interface ClockWordsOption {
    phrase: string;
    isCorrect: boolean;
    digitalHint?: string;
}

export interface ClockWordsProblem {
    hour24: number;
    hour12: number;
    minute: number;
    targetDigital: string;
    germanTime: GermanTimeInfo;
    options: ClockWordsOption[];
    theme: TimeTheme;
}

const formatTimeDigits = (h: number, m: number): string => {
    const formattedH = h < 10 ? `0${h}` : `${h}`;
    const formattedM = m < 10 ? `0${m}` : `${m}`;
    return `${formattedH}:${formattedM}`;
};

export const generateClockWordsProblem = (level: number, use24Hour: boolean): ClockWordsProblem => {
    let hour24: number;
    if (use24Hour) {
        hour24 = Math.floor(Math.random() * 24);
    } else {
        hour24 = Math.floor(Math.random() * 12) + 1;
    }

    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    let minute = 0;

    let candidateMinutes: number[];
    if (level === 1) {
        // Level 1: Nur volle Stunden (ohne Minuten: :00)
        candidateMinutes = [0];
    } else if (level === 2) {
        // Level 2: Leichte Minuten (15, 30, 45 Min & :00)
        candidateMinutes = [0, 15, 30, 45];
    } else {
        // Level 3: Alle 5-Minuten Schritte (5 vor halb, 5 nach halb, 10 nach, 20 vor, etc.)
        candidateMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    }

    minute = candidateMinutes[Math.floor(Math.random() * candidateMinutes.length)];

    const targetDigital = formatTimeDigits(hour24, minute);
    const germanTime = getSmartGermanTime(hour24, minute);
    const theme = getTimeTheme(hour24);

    const correctPhrase = germanTime.colloquialRule;

    // Generate 3 plausible distinct distractor phrases
    const usedPhrases = new Set<string>();
    usedPhrases.add(correctPhrase);

    const distractorOptions: ClockWordsOption[] = [];

    // Strategy 1: Targeted distractors based on level
    let attempts = 0;
    while (distractorOptions.length < 3 && attempts < 60) {
        attempts++;
        let candidateH = hour24;
        let candidateM = minute;

        if (level === 1) {
            // Level 1: Strictly different full hours (:00)
            const maxH = use24Hour ? 24 : 12;
            const hourOffset = (attempts % (maxH - 1)) + 1;
            if (use24Hour) {
                candidateH = (hour24 + (attempts % 2 === 0 ? hourOffset : -hourOffset) + 24) % 24;
            } else {
                candidateH = ((hour24 - 1 + (attempts % 2 === 0 ? hourOffset : -hourOffset) + 12) % 12) + 1;
            }
            candidateM = 0;
        } else {
            const variationType = Math.floor(Math.random() * 4);
            if (variationType === 0) {
                // Hour shift (+1 or -1) with same minute
                const delta = Math.random() > 0.5 ? 1 : -1;
                if (use24Hour) {
                    candidateH = (hour24 + delta + 24) % 24;
                } else {
                    candidateH = ((hour24 - 1 + delta + 12) % 12) + 1;
                }
            } else if (variationType === 1) {
                // Minute shift within the level's allowed pool
                const otherMinutes = candidateMinutes.filter(m => m !== minute);
                if (otherMinutes.length > 0) {
                    candidateM = otherMinutes[Math.floor(Math.random() * otherMinutes.length)];
                }
            } else if (variationType === 2) {
                // Opposite quarter or 5-min half shift
                if (minute === 15) candidateM = 45;
                else if (minute === 45) candidateM = 15;
                else if (minute === 25) candidateM = 35;
                else if (minute === 35) candidateM = 25;
                else if (minute === 0) candidateM = 30;
                else if (minute === 30) candidateM = 0;
                else {
                    const otherMinutes = candidateMinutes.filter(m => m !== minute);
                    candidateM = otherMinutes[Math.floor(Math.random() * otherMinutes.length)];
                }
            } else {
                // Random time within level pool
                if (use24Hour) {
                    candidateH = Math.floor(Math.random() * 24);
                } else {
                    candidateH = Math.floor(Math.random() * 12) + 1;
                }
                candidateM = candidateMinutes[Math.floor(Math.random() * candidateMinutes.length)];
            }
        }

        const candidateGerman = getSmartGermanTime(candidateH, candidateM);
        const phraseStr = candidateGerman.colloquialRule;

        if (!usedPhrases.has(phraseStr)) {
            usedPhrases.add(phraseStr);
            distractorOptions.push({
                phrase: phraseStr,
                isCorrect: false,
                digitalHint: formatTimeDigits(candidateH, candidateM)
            });
        }
    }

    // Fallback if needed
    while (distractorOptions.length < 3) {
        const delta = distractorOptions.length + 1;
        const randH = use24Hour ? (hour24 + delta) % 24 : ((hour24 - 1 + delta) % 12) + 1;
        const randM = candidateMinutes[(distractorOptions.length * 2) % candidateMinutes.length];
        const candidateGerman = getSmartGermanTime(randH, randM);
        const phraseStr = candidateGerman.colloquialRule;

        if (!usedPhrases.has(phraseStr)) {
            usedPhrases.add(phraseStr);
            distractorOptions.push({
                phrase: phraseStr,
                isCorrect: false,
                digitalHint: formatTimeDigits(randH, randM)
            });
        } else {
            const safeH = use24Hour ? (randH + 3) % 24 : ((randH + 2) % 12) + 1;
            const safeGerman = getSmartGermanTime(safeH, randM);
            distractorOptions.push({
                phrase: safeGerman.colloquialRule,
                isCorrect: false
            });
        }
    }

    // Combine correct option and distractors, then shuffle
    const allOptions: ClockWordsOption[] = [
        {
            phrase: correctPhrase,
            isCorrect: true,
            digitalHint: targetDigital
        },
        ...distractorOptions
    ];

    for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return {
        hour24,
        hour12,
        minute,
        targetDigital,
        germanTime,
        options: allOptions,
        theme
    };
};

const ClockWordsGameView: React.FC = () => {
    const navigate = useNavigate();
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState<number>(playerProgress.clockWordsLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    // 24-Hour mode sync
    const [is24Hour, setIs24Hour] = useState<boolean>(() => {
        const stored = localStorage.getItem('mathkids_clock_24h');
        return stored !== 'false';
    });

    // Hands color mode: 'bicolor' (red/blue) vs 'monochrome' (same color)
    const [handsColorMode, setHandsColorMode] = useState<'bicolor' | 'monochrome'>(() => {
        return (localStorage.getItem('mathkids_clock_hands_style') as 'bicolor' | 'monochrome') || 'bicolor';
    });

    const handleToggleHandsColor = () => {
        const nextMode = handsColorMode === 'bicolor' ? 'monochrome' : 'bicolor';
        setHandsColorMode(nextMode);
        localStorage.setItem('mathkids_clock_hands_style', nextMode);
    };

    const [problem, setProblem] = useState<ClockWordsProblem>(() =>
        generateClockWordsProblem(level, is24Hour)
    );
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showGermanPhrase, setShowGermanPhrase] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);

    // Reward / Completion
    const [showReward, setShowReward] = useState(false);
    const [rewardData, setRewardData] = useState<Reward | null>(null);

    const isSpeakingRef = useRef(false);

    const playVoicePronunciation = useCallback((text?: string) => {
        const phraseToSpeak = text || problem.germanTime.spokenText;
        if (!phraseToSpeak) return;

        isSpeakingRef.current = true;
        setIsSpeaking(true);

        speakGermanTime(phraseToSpeak).finally(() => {
            isSpeakingRef.current = false;
            setIsSpeaking(false);
        });
    }, [problem.germanTime.spokenText]);

    const nextRound = useCallback(() => {
        setSelectedOption(null);
        setFeedback(null);
        setShowGermanPhrase(false);
        setProblem(generateClockWordsProblem(level, is24Hour));
    }, [level, is24Hour]);

    const handleToggle24Hour = () => {
        const nextVal = !is24Hour;
        setIs24Hour(nextVal);
        localStorage.setItem('mathkids_clock_24h', String(nextVal));
        setSelectedOption(null);
        setFeedback(null);
        setShowGermanPhrase(false);
        setProblem(generateClockWordsProblem(level, nextVal));
    };

    const handleSelectLevel = (newLevel: number) => {
        setLevel(newLevel);
        const updatedProgress = setGameLevel('clockWords', newLevel);
        setPlayerProgress(updatedProgress);
        setShowLevelPicks(false);
        setRound(1);
        setScore(0);
        setStreak(0);
        setSelectedOption(null);
        setFeedback(null);
        setShowGermanPhrase(false);
        setProblem(generateClockWordsProblem(newLevel, is24Hour));
    };

    const handleSelectOption = (opt: ClockWordsOption) => {
        if (feedback === 'correct') return; // Prevent double taps during transition

        setSelectedOption(opt.phrase);

        if (opt.isCorrect) {
            soundManager.playCorrect();
            setFeedback('correct');
            setShowGermanPhrase(true);
            setScore(s => s + 1);
            setStreak(s => s + 1);

            // Play clean German voiceover ONLY on correct answer
            playVoicePronunciation(problem.germanTime.spokenText);

            // Small confetti burst on streaks
            if ((streak + 1) % 5 === 0) {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.7 }
                });
            }

            // Track progress
            const res = trackGeneralGame('clockWords');
            setPlayerProgress(res.progress);

            if (round >= 10) {
                // Finish session
                setTimeout(() => {
                    setRewardData({
                        xp: 35,
                        sticker: res.unlockedSticker,
                        achievement: res.unlockedAchievement,
                        leveledUp: res.leveledUp
                    });
                    setShowReward(true);
                }, 1300);
            } else {
                setTimeout(() => {
                    setRound(r => r + 1);
                    nextRound();
                }, 1400);
            }
        } else {
            soundManager.playIncorrect();
            setFeedback('incorrect');
            setStreak(0);

            setTimeout(() => {
                setFeedback(null);
                setSelectedOption(null);
            }, 750);
        }
    };

    const currentTheme = problem.theme;

    // Hands Colors (Bicolor vs Monochrome)
    const isMonochrome = handsColorMode === 'monochrome';
    const hourHandFill = isMonochrome
        ? (currentTheme.key === 'night' ? '#f8fafc' : '#1e293b')
        : '#ef4444';
    const hourHandStroke = isMonochrome
        ? (currentTheme.key === 'night' ? '#cbd5e1' : '#0f172a')
        : '#b91c1c';

    const minuteHandFill = isMonochrome
        ? (currentTheme.key === 'night' ? '#f8fafc' : '#1e293b')
        : '#3b82f6';
    const minuteHandStroke = isMonochrome
        ? (currentTheme.key === 'night' ? '#cbd5e1' : '#0f172a')
        : '#1d4ed8';

    // Angles calculation:
    // Minute hand: minute * 6 deg
    // Hour hand: (hour12 % 12) * 30 deg + (minute / 60) * 30 deg
    const minuteAngle = problem.minute * 6;
    const hourAngle = (problem.hour12 % 12) * 30 + (problem.minute / 60) * 30;

    // Dial Numbers: 1 to 12
    const dialNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // 24-Hour Dial Numbers (Inner ring: 13, 14, 15, ... 23, 00)
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

    return (
        <div className="clock-game-view clock-words-mode">
            {/* Header with Nav, Level, Score & Controls */}
            <div className="game-header">
                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate('/')}
                    aria-label="Zurück zum Hauptmenü"
                >
                    ←
                </button>

                {/* Level Picker Pill */}
                <div
                    className="clock-level-badge"
                    onClick={() => setShowLevelPicks(true)}
                    role="button"
                    tabIndex={0}
                    title="Schwierigkeitsgrad wählen"
                >
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

                {/* Hands Color Mode Toggle (Bicolor 🔴🔵 vs Monochrome ⚫⚫) */}
                <button
                    type="button"
                    className={`clock-hands-toggle ${isMonochrome ? 'mono' : 'bicolor'}`}
                    onClick={handleToggleHandsColor}
                    title={isMonochrome ? 'Zeiger: Einfarbig (Klick für Rot/Blau)' : 'Zeiger: Rot/Blau (Klick für Einfarbig)'}
                    aria-label="Zeigerfarben wechseln"
                >
                    {isMonochrome ? '⚫⚫' : '🔴🔵'}
                </button>

                {/* Info Help Button */}
                <button
                    type="button"
                    className="clock-info-btn"
                    onClick={() => setShowInfoModal(true)}
                    title="Erklärung der Uhrzeiger & Regeln"
                    aria-label="Hilfe & Zeiger-Erklärung"
                >
                    ℹ️
                </button>
            </div>

            {/* Progress Bar */}
            <div className="clock-progress-bar-container">
                <div
                    className="clock-progress-bar"
                    style={{ width: `${(round / 10) * 100}%` }}
                />
                <span className="round-counter">Runde {round} / 10</span>
            </div>

            {/* Daytime Sky Banner (Morgen, Nachmittag, Abend, Nacht) */}
            <motion.div
                className="daytime-sky-banner"
                key={currentTheme.key}
                style={{ background: currentTheme.skyGradient }}
                initial={{ opacity: 0.8, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="sky-banner-content">
                    <span className="sky-icon-large">{currentTheme.icon}</span>
                    <div className="sky-text-stack">
                        <span className="sky-label-de">{currentTheme.nameDe}</span>
                        <span className="sky-label-ru">{currentTheme.nameRu}</span>
                    </div>
                </div>
                <div className="badge-24h-indicator">
                    {is24Hour ? '24-Stunden-Uhr' : '12-Stunden-Uhr'}
                </div>
            </motion.div>

            {/* Clock Dial Card */}
            <motion.div
                className="clock-card"
                key={`clock-card-${round}-${problem.targetDigital}`}
                style={{ background: currentTheme.cardBg }}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
                <div className="clock-title-bar">
                    <h3 style={{ color: currentTheme.numberColor }}>
                        Wie spät ist es? {currentTheme.icon}
                    </h3>
                    <p className="clock-hint-sub" style={{ color: currentTheme.subtextColor }}>
                        Wähle die richtige Uhrzeit in Worten
                    </p>
                </div>

                {/* SVG Analog Clock with Daytime Colors & Authentic Lernuhr Badges */}
                <div className="clock-svg-wrapper">
                    <svg viewBox="0 0 300 300" className="analog-clock-svg" aria-label="Analoge Uhr">
                        <defs>
                            <radialGradient id="clockWordsDialGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor={currentTheme.dialGradient[0]} />
                                <stop offset="100%" stopColor={currentTheme.dialGradient[1]} />
                            </radialGradient>
                            <filter id="handShadowWords" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.25" />
                            </filter>
                        </defs>

                        {/* Outer Bezel */}
                        <circle cx="150" cy="150" r="144" fill="#ffffff" stroke={currentTheme.bezelColor} strokeWidth="4" />
                        <circle cx="150" cy="150" r="138" fill="url(#clockWordsDialGrad)" stroke={currentTheme.dialBorder} strokeWidth="2.5" />

                        {/* Subtle Left (VOR) and Right (NACH) Zone Halves */}
                        <path
                            d="M 150 14 A 136 136 0 0 1 150 286 Z"
                            fill={currentTheme.key === 'night' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.04)'}
                        />
                        <path
                            d="M 150 14 A 136 136 0 0 0 150 286 Z"
                            fill={currentTheme.key === 'night' ? 'rgba(244, 63, 94, 0.08)' : 'rgba(244, 63, 94, 0.04)'}
                        />

                        {/* Center Dashed Dividing Axis Line */}
                        <line
                            x1="150"
                            y1="22"
                            x2="150"
                            y2="278"
                            stroke={currentTheme.key === 'night' ? '#475569' : '#cbd5e1'}
                            strokeWidth="1"
                            strokeDasharray="3 3"
                            opacity="0.65"
                        />

                        {/* Top Marker: UHR (at 12) */}
                        <g transform="translate(150, 48)">
                            <rect
                                x="-17"
                                y="-8"
                                width="34"
                                height="15"
                                rx="4.5"
                                fill={currentTheme.key === 'night' ? '#1e293b' : '#f1f5f9'}
                                stroke={currentTheme.key === 'night' ? '#475569' : '#cbd5e1'}
                                strokeWidth="1"
                            />
                            <text
                                x="0"
                                y="3"
                                textAnchor="middle"
                                fontSize="8.5"
                                fontWeight="900"
                                fontFamily="var(--font-main)"
                                fill={currentTheme.key === 'night' ? '#cbd5e1' : '#475569'}
                                letterSpacing="0.5px"
                            >
                                UHR
                            </text>
                        </g>

                        {/* Bottom Marker: HALB (at 6) */}
                        <g transform="translate(150, 252)">
                            <rect
                                x="-19"
                                y="-8"
                                width="38"
                                height="15"
                                rx="4.5"
                                fill={currentTheme.key === 'night' ? '#451a03' : '#fef3c7'}
                                stroke={currentTheme.key === 'night' ? '#d97706' : '#fcd34d'}
                                strokeWidth="1"
                            />
                            <text
                                x="0"
                                y="3"
                                textAnchor="middle"
                                fontSize="8.5"
                                fontWeight="900"
                                fontFamily="var(--font-main)"
                                fill={currentTheme.key === 'night' ? '#fde68a' : '#b45309'}
                                letterSpacing="0.5px"
                            >
                                HALB
                            </text>
                        </g>

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

                        {/* Outer Minute Hints with compact German VOR/NACH tags */}
                        {[
                            { n: 12, text: '00' },
                            { n: 1, text: '05' },
                            { n: 2, text: '10' },
                            { n: 3, text: '15', sub: 'nach', subW: 28, isSpecial: true, specialType: 'nach', subDy: 14 },
                            { n: 4, text: '20' },
                            { n: 5, text: '25', sub: 'vor halb', subW: 46, isSpecial: true, specialType: 'vor', subDy: 14 },
                            { n: 6, text: '30' },
                            { n: 7, text: '35', sub: 'nach halb', subW: 50, isSpecial: true, specialType: 'nach', subDy: 14 },
                            { n: 8, text: '40' },
                            { n: 9, text: '45', sub: 'vor', subW: 25, isSpecial: true, specialType: 'vor', subDy: 14 },
                            { n: 10, text: '50' },
                            { n: 11, text: '55' }
                        ].map(m => {
                            const angle = (m.n * 30 * Math.PI) / 180;
                            const r = 125;
                            const x = 150 + r * Math.sin(angle);
                            const y = 150 - r * Math.cos(angle);

                            const badgeFill = m.isSpecial
                                ? (m.specialType === 'vor'
                                    ? (currentTheme.key === 'night' ? '#450a0a' : '#fee2e2')
                                    : (currentTheme.key === 'night' ? '#172554' : '#dbeafe'))
                                : (currentTheme.key === 'night' ? '#1e1b4b' : '#eff6ff');

                            const badgeStroke = m.isSpecial
                                ? (m.specialType === 'vor'
                                    ? (currentTheme.key === 'night' ? '#ef4444' : '#f87171')
                                    : (currentTheme.key === 'night' ? '#3b82f6' : '#60a5fa'))
                                : (currentTheme.key === 'night' ? '#6366f1' : '#93c5fd');

                            const textColor = m.isSpecial
                                ? (m.specialType === 'vor'
                                    ? (currentTheme.key === 'night' ? '#fca5a5' : '#dc2626')
                                    : (currentTheme.key === 'night' ? '#93c5fd' : '#2563eb'))
                                : (currentTheme.key === 'night' ? '#93c5fd' : '#1d4ed8');

                            const subWidth = m.subW || 34;

                            return (
                                <g key={`words-min-badge-${m.n}`}>
                                    <rect
                                        x={x - 12}
                                        y={y - 8}
                                        width={24}
                                        height={16}
                                        rx={5}
                                        fill={badgeFill}
                                        stroke={badgeStroke}
                                        strokeWidth={m.isSpecial ? 1.6 : 1.2}
                                    />
                                    <text
                                        x={x}
                                        y={y + 4}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fontWeight="900"
                                        fontFamily="var(--font-main)"
                                        fill={textColor}
                                    >
                                        {m.text}
                                    </text>

                                    {/* Compact sub-labels (nach at 15, vor at 45, vor halb at 25, nach halb at 35) */}
                                    {m.sub && (
                                        <g>
                                            <rect
                                                x={x - subWidth / 2}
                                                y={y + (m.subDy || 13) - 5.5}
                                                width={subWidth}
                                                height={11}
                                                rx={3.5}
                                                fill={badgeFill}
                                                stroke={badgeStroke}
                                                strokeWidth={0.8}
                                            />
                                            <text
                                                x={x}
                                                y={y + (m.subDy || 13) + 2.5}
                                                textAnchor="middle"
                                                fontSize="6.8"
                                                fontWeight="900"
                                                fontFamily="var(--font-main)"
                                                fill={textColor}
                                                letterSpacing="0.2px"
                                            >
                                                {m.sub}
                                            </text>
                                        </g>
                                    )}
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
                                <g key={`words-h24-${m24.n}`}>
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

                        {/* Hour Hand (Rotated around 150, 150) */}
                        <g
                            transform={`rotate(${hourAngle} 150 150)`}
                            style={{ transition: 'transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)' }}
                        >
                            <path
                                d="M 143 150 L 145 82 L 150 68 L 155 82 L 157 150 Z"
                                fill={hourHandFill}
                                stroke={hourHandStroke}
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M 144 150 L 144 168 A 6 6 0 0 0 156 168 L 156 150 Z"
                                fill={hourHandFill}
                                stroke={hourHandStroke}
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                            />
                        </g>

                        {/* Minute Hand (Rotated around 150, 150) */}
                        <g
                            transform={`rotate(${minuteAngle} 150 150)`}
                            style={{ transition: 'transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)' }}
                        >
                            <path
                                d="M 146 150 L 147.5 48 L 150 34 L 152.5 48 L 154 150 Z"
                                fill={minuteHandFill}
                                stroke={minuteHandStroke}
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M 146.5 150 L 146.5 174 A 3.5 3.5 0 0 0 153.5 174 L 153.5 150 Z"
                                fill={minuteHandFill}
                                stroke={minuteHandStroke}
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        </g>

                        {/* Center Pin Hub */}
                        <circle cx="150" cy="150" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
                        <circle cx="150" cy="150" r="4" fill="#b45309" />
                    </svg>
                </div>

                {/* German Phrase Bubble on Correct Answer with Audio Button */}
                <AnimatePresence>
                    {showGermanPhrase && (
                        <motion.div
                            className={`german-phrase-bubble ${isSpeaking ? 'bubble-speaking' : ''}`}
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={() => playVoicePronunciation()}
                            title="Nochmal auf Deutsch anhören 🗣️"
                        >
                            <span className="speaker-icon">{isSpeaking ? '🔊' : '🗣️'}</span>
                            <div className="phrase-text-group">
                                <span className="phrase-colloquial">"{problem.germanTime.colloquialRule}"</span>
                                <span className="phrase-detail">{problem.germanTime.formal24}</span>
                            </div>
                            <span className="repeat-icon">🔄</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* 4 Choices in German Words (Wortkarten) */}
            <div className="clock-words-choice-container">
                <div className="clock-words-grid">
                    {problem.options.map((opt, idx) => {
                        const isSelected = selectedOption === opt.phrase;
                        let cardStateClass = '';
                        if (isSelected) {
                            cardStateClass = opt.isCorrect ? 'word-card-correct' : 'word-card-incorrect';
                        }

                        return (
                            <motion.button
                                key={opt.phrase + '-' + idx}
                                type="button"
                                className={`clock-word-card ${cardStateClass}`}
                                onClick={() => handleSelectOption(opt)}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={feedback === 'correct'}
                            >
                                <span className="word-card-bullet">
                                    {isSelected ? (opt.isCorrect ? '✔️' : '❌') : '💬'}
                                </span>
                                <span className="word-card-text">{opt.phrase}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Level Selection Modal */}
            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay
                        gameId="clockWords"
                        currentLevel={level}
                        title="Uhrzeit auf Deutsch (Worte) ⏰"
                        icon="⏰"
                        onSelectLevel={handleSelectLevel}
                        onClose={() => setShowLevelPicks(false)}
                    />
                )}
            </AnimatePresence>

            {/* Info Legend Modal (Zeiger & 24h Erklärung) */}
            <AnimatePresence>
                {showInfoModal && (
                    <motion.div
                        className="clock-info-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowInfoModal(false)}
                    >
                        <motion.div
                            className="clock-info-modal-card glass-card"
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="info-modal-header">
                                <h4>💡 Wie liest man die Uhr?</h4>
                                <button
                                    type="button"
                                    className="info-modal-close"
                                    onClick={() => setShowInfoModal(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="info-chips-list">
                                <div className="info-chip-row">
                                    <span className="legend-dot red" />
                                    <div className="info-row-text">
                                        <strong>Roter Zeiger (Stunde):</strong>
                                        <p>Zeigt die <b>Stunde</b> {is24Hour ? '(0 bis 23 Uhr)' : '(1 bis 12 Uhr)'}.</p>
                                    </div>
                                </div>

                                <div className="info-chip-row">
                                    <span className="legend-dot blue" />
                                    <div className="info-row-text">
                                        <strong>Blauer Zeiger (Minute):</strong>
                                        <p>Zeigt die <b>Minute</b> (0 bis 59 auf den blauen Feldern).</p>
                                    </div>
                                </div>

                                <div className="info-chip-row">
                                    <span className="legend-dot green" style={{ background: '#10b981' }} />
                                    <div className="info-row-text">
                                        <strong>Deutsche Besonderheit (Halb):</strong>
                                        <p>• <b>25 min</b> = 5 vor halb ⏳<br />• <b>30 min</b> = halb ⚡<br />• <b>35 min</b> = 5 nach halb ⏳</p>
                                    </div>
                                </div>

                                {is24Hour && (
                                    <div className="info-chip-row">
                                        <span className="legend-dot amber" />
                                        <div className="info-row-text">
                                            <strong>Gelbe Zahlen (13–24h):</strong>
                                            <p>Für Nachmittag & Abend (z.B. 2 Uhr nachmittags = 14:00 Uhr).</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                className="info-modal-ok-btn"
                                onClick={() => setShowInfoModal(false)}
                            >
                                Alles klar! 👍
                            </button>
                        </motion.div>
                    </motion.div>
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

export default ClockWordsGameView;
