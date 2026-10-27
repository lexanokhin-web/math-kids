import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { antonymsData } from '../utils/antonymsData';
import { synonymsData } from '../utils/synonymsData';
import { soundManager } from '../utils/soundManager';
import { trackMatchingGame } from '../utils/progressManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import type { WordPair } from '../utils/antonymsData';

/* ─── Constants ────────────────────────────────────────── */

const PAIRS_PER_ROUND = 5;

const LEVEL_META: Record<1 | 2 | 3, { name: string; emoji: string; desc: string; color: string; bg: string }> = {
    1: { name: 'Einfach',  emoji: '🌱', desc: 'Kurze, einfache Wörter', color: '#22c55e', bg: '#f0fdf4' },
    2: { name: 'Mittel',   emoji: '🚀', desc: 'Etwas kniffliger',       color: '#f59e0b', bg: '#fffbeb' },
    3: { name: 'Schwer',   emoji: '👑', desc: 'Für echte Profis!',      color: '#8b5cf6', bg: '#f5f3ff' },
};

type GamePhase = 'level-select' | 'playing';

/* ─── Component ────────────────────────────────────────── */

const MatchingGameView = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();

    const isSynonyms = type === 'synonyms';
    const allData: WordPair[] = isSynonyms ? synonymsData : antonymsData;

    const title = isSynonyms ? 'Gleiche Wörter finden' : 'Gegenteile finden';
    const subtitle = isSynonyms
        ? 'Verbinde Wörter mit der gleichen Bedeutung!'
        : 'Verbinde jedes Wort mit seinem Gegenteil!';
    const headerIcon = isSynonyms ? '📜' : '🎭';
    const accentColor = isSynonyms ? '#0ea5e9' : '#8b5cf6';

    /* ── State ──────────────────────────────────────── */
    const [phase, setPhase] = useState<GamePhase>('level-select');
    const [level, setLevel] = useState<1 | 2 | 3>(1);

    // left = word1 column, right = word2 column (shuffled independently)
    const [leftWords, setLeftWords] = useState<{ word: string; pairId: number }[]>([]);
    const [rightWords, setRightWords] = useState<{ word: string; pairId: number }[]>([]);

    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [selectedRight, setSelectedRight] = useState<number | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [wrongPair, setWrongPair] = useState<{ left: number; right: number } | null>(null);
    const [score, setScore] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);

    /* ── Filtered data ─────────────────────────────── */
    const levelData = useMemo(() => allData.filter(p => p.level === level), [allData, level]);

    /* ── Init game ─────────────────────────────────── */
    const initGame = useCallback(() => {
        const shuffled = [...levelData].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, PAIRS_PER_ROUND);

        const left = selected.map((p, i) => ({ word: p.word1, pairId: i }));
        const right = selected.map((p, i) => ({ word: p.word2, pairId: i }));

        setLeftWords(left.sort(() => 0.5 - Math.random()));
        setRightWords(right.sort(() => 0.5 - Math.random()));
        setMatchedPairs([]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongPair(null);
        setScore(0);
        setIsProcessing(false);
        setReward(null);
        setShowReward(false);
    }, [levelData]);

    useEffect(() => {
        if (phase === 'playing') {
            initGame();
        }
    }, [phase, level, initGame]);

    /* ── Select level ──────────────────────────────── */
    const handleLevelSelect = (l: 1 | 2 | 3) => {
        setLevel(l);
        setPhase('playing');
    };

    /* ── Click handlers ────────────────────────────── */
    const tryMatch = useCallback((leftIdx: number, rightIdx: number) => {
        if (isProcessing) return;
        setIsProcessing(true);

        const leftItem = leftWords[leftIdx];
        const rightItem = rightWords[rightIdx];

        if (leftItem.pairId === rightItem.pairId) {
            // Correct match!
            soundManager.playCorrect();
            setMatchedPairs(prev => [...prev, leftItem.pairId]);
            setSelectedLeft(null);
            setSelectedRight(null);
            setScore(s => s + 1);
            setIsProcessing(false);

            if (matchedPairs.length + 1 === PAIRS_PER_ROUND) {
                const result = trackMatchingGame(type as 'antonyms' | 'synonyms');
                setReward({
                    sticker: result.unlockedSticker,
                    achievement: result.unlockedAchievement,
                    leveledUp: result.leveledUp,
                });
                setTimeout(() => setShowReward(true), 600);
            }
        } else {
            // Wrong match
            soundManager.playIncorrect();
            setWrongPair({ left: leftIdx, right: rightIdx });
            setTimeout(() => {
                setSelectedLeft(null);
                setSelectedRight(null);
                setWrongPair(null);
                setIsProcessing(false);
            }, 700);
        }
    }, [isProcessing, leftWords, rightWords, matchedPairs, type]);

    const handleLeftClick = (index: number) => {
        if (isProcessing || matchedPairs.includes(leftWords[index].pairId) || showReward) return;
        soundManager.playClick();
        setSelectedLeft(index);

        if (selectedRight !== null) {
            tryMatch(index, selectedRight);
        }
    };

    const handleRightClick = (index: number) => {
        if (isProcessing || matchedPairs.includes(rightWords[index].pairId) || showReward) return;
        soundManager.playClick();
        setSelectedRight(index);

        if (selectedLeft !== null) {
            tryMatch(selectedLeft, index);
        }
    };

    /* ── Level selection screen ────────────────────── */
    if (phase === 'level-select') {
        return (
            <div className="game-view" style={{ justifyContent: 'center' }}>
                <div className="game-header" style={{ position: 'absolute', top: '20px', width: '100%', maxWidth: '500px' }}>
                    <button className="back-button" onClick={() => navigate('/')}>←</button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        width: '100%',
                        maxWidth: '460px',
                        padding: '0 16px',
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '12px' }}>{headerIcon}</div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e293b', margin: '0 0 8px' }}>{title}</h1>
                        <p style={{ color: '#64748b', fontWeight: 600, margin: 0, fontSize: '1rem' }}>Wähle einen Schwierigkeitsgrad</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {([1, 2, 3] as const).map(l => {
                            const meta = LEVEL_META[l];
                            const count = allData.filter(p => p.level === l).length;
                            return (
                                <motion.button
                                    key={l}
                                    onClick={() => handleLevelSelect(l)}
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '18px',
                                        padding: '20px 24px',
                                        borderRadius: '24px',
                                        border: `3px solid ${meta.color}30`,
                                        background: meta.bg,
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                                        textAlign: 'left',
                                    }}
                                >
                                    <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>{meta.emoji}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1e293b' }}>{meta.name}</div>
                                        <div style={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>{meta.desc}</div>
                                    </div>
                                    <div style={{
                                        background: meta.color,
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontWeight: 800,
                                        fontSize: '0.8rem',
                                        flexShrink: 0,
                                    }}>
                                        {count} Paare
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        );
    }

    /* ── Game screen ───────────────────────────────── */
    const meta = LEVEL_META[level];

    return (
        <div className="game-view matching-game">
            {/* Header */}
            <div className="game-header">
                <button className="back-button" onClick={() => setPhase('level-select')}>←</button>

                <button
                    onClick={() => setPhase('level-select')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: `${meta.color}18`,
                        padding: '6px 14px',
                        borderRadius: '16px',
                        border: `2px solid ${meta.color}40`,
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease',
                    }}
                    title="Schwierigkeit ändern"
                >
                    <span>{meta.emoji}</span>
                    <span style={{ fontWeight: 800, color: meta.color, fontSize: '0.9rem' }}>{meta.name}</span>
                    <span style={{ fontSize: '0.75rem', color: meta.color, opacity: 0.7 }}>▾</span>
                </button>

                <div className="score-display">
                    <span className="star">⭐</span>
                    <span>{score}/{PAIRS_PER_ROUND}</span>
                </div>

                <button className="reset-button" onClick={initGame}>🔄</button>
            </div>

            {/* Title */}
            <div style={{ textAlign: 'center', marginTop: '-8px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', margin: '0 0 4px' }}>
                    {headerIcon} {title}
                </h2>
                <p style={{ color: '#64748b', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>{subtitle}</p>
            </div>

            {/* Two-column matching area */}
            <div style={{
                display: 'flex',
                gap: '12px',
                width: '100%',
                maxWidth: '560px',
                padding: '0 8px',
                alignItems: 'flex-start',
            }}>
                {/* Left column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        color: accentColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '2px',
                    }}>
                        {isSynonyms ? 'Wort' : 'Wort'}
                    </div>
                    {leftWords.map((item, index) => {
                        const isMatched = matchedPairs.includes(item.pairId);
                        const isSelected = selectedLeft === index;
                        const isWrong = wrongPair?.left === index;

                        return (
                            <motion.button
                                key={`l-${item.pairId}-${item.word}`}
                                onClick={() => handleLeftClick(index)}
                                whileHover={!isMatched ? { scale: 1.04 } : {}}
                                whileTap={!isMatched ? { scale: 0.96 } : {}}
                                animate={isWrong ? { x: [-4, 4, -4, 4, 0] } : {}}
                                transition={isWrong ? { duration: 0.4 } : {}}
                                disabled={isMatched}
                                style={{
                                    padding: '12px 10px',
                                    borderRadius: '18px',
                                    border: `3px solid ${isWrong ? '#ef4444' : isSelected ? accentColor : isMatched ? '#22c55e' : '#e2e8f0'}`,
                                    background: isWrong ? '#fef2f2' : isSelected ? `${accentColor}12` : isMatched ? '#f0fdf4' : '#ffffff',
                                    cursor: isMatched ? 'default' : 'pointer',
                                    opacity: isMatched ? 0.6 : 1,
                                    boxShadow: isSelected ? `0 4px 16px ${accentColor}25` : '0 2px 8px rgba(0,0,0,0.04)',
                                    fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
                                    fontWeight: 800,
                                    fontFamily: 'var(--font-main)',
                                    color: isMatched ? '#16a34a' : '#1e293b',
                                    textAlign: 'center',
                                    position: 'relative',
                                    minHeight: '56px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    wordBreak: 'break-word',
                                    lineHeight: 1.2,
                                    transition: 'border-color 0.2s, background 0.2s, opacity 0.3s',
                                }}
                            >
                                {item.word}
                                {isMatched && <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>✅</span>}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Center connector line */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '28px',
                    gap: '0',
                    flexShrink: 0,
                    width: '24px',
                }}>
                    {leftWords.map((_, i) => (
                        <div key={i} style={{
                            width: '2px',
                            height: '55px',
                            background: i < matchedPairs.length ? '#22c55e' : '#e2e8f0',
                            transition: 'background 0.3s',
                        }} />
                    ))}
                </div>

                {/* Right column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        color: accentColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '2px',
                    }}>
                        {isSynonyms ? 'Bedeutung' : 'Gegenteil'}
                    </div>
                    {rightWords.map((item, index) => {
                        const isMatched = matchedPairs.includes(item.pairId);
                        const isSelected = selectedRight === index;
                        const isWrong = wrongPair?.right === index;

                        return (
                            <motion.button
                                key={`r-${item.pairId}-${item.word}`}
                                onClick={() => handleRightClick(index)}
                                whileHover={!isMatched ? { scale: 1.04 } : {}}
                                whileTap={!isMatched ? { scale: 0.96 } : {}}
                                animate={isWrong ? { x: [-4, 4, -4, 4, 0] } : {}}
                                transition={isWrong ? { duration: 0.4 } : {}}
                                disabled={isMatched}
                                style={{
                                    padding: '12px 10px',
                                    borderRadius: '18px',
                                    border: `3px solid ${isWrong ? '#ef4444' : isSelected ? accentColor : isMatched ? '#22c55e' : '#e2e8f0'}`,
                                    background: isWrong ? '#fef2f2' : isSelected ? `${accentColor}12` : isMatched ? '#f0fdf4' : '#ffffff',
                                    cursor: isMatched ? 'default' : 'pointer',
                                    opacity: isMatched ? 0.6 : 1,
                                    boxShadow: isSelected ? `0 4px 16px ${accentColor}25` : '0 2px 8px rgba(0,0,0,0.04)',
                                    fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
                                    fontWeight: 800,
                                    fontFamily: 'var(--font-main)',
                                    color: isMatched ? '#16a34a' : '#1e293b',
                                    textAlign: 'center',
                                    position: 'relative',
                                    minHeight: '56px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    wordBreak: 'break-word',
                                    lineHeight: 1.2,
                                    transition: 'border-color 0.2s, background 0.2s, opacity 0.3s',
                                }}
                            >
                                {item.word}
                                {isMatched && <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>✅</span>}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Progress indicator */}
            <div style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                marginTop: '8px',
            }}>
                {Array.from({ length: PAIRS_PER_ROUND }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={i < matchedPairs.length ? { scale: [1, 1.3, 1] } : {}}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: i < matchedPairs.length ? '#22c55e' : '#e2e8f0',
                            transition: 'background 0.3s',
                        }}
                    />
                ))}
            </div>

            <RewardCelebration
                show={showReward}
                onClose={initGame}
                reward={reward}
            />
        </div>
    );
};

export default MatchingGameView;
