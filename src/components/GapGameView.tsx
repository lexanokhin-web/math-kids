import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { expandedGapData, type GapItem } from '../utils/bigDataStore';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

const GapGameView = () => {
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState<GapItem | null>(null);
    const [activeItems, setActiveItems] = useState<GapItem[]>([]);
    const [rounds, setRounds] = useState(1);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [answer, setAnswer] = useState<string | null>(null);
    
    // Level State
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState(playerProgress.gapLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const generateRound = useCallback((index: number, currentActive: GapItem[] = activeItems) => {
        if (index >= currentActive.length) return;
        const next = currentActive[index];
        setCurrentItem({ ...next, options: [...next.options].sort(() => 0.5 - Math.random()) });
        setAnswer(null);
        setShowLevelPicks(false);
    }, [activeItems]);

    const startNextRound = useCallback(() => {
        if (rounds >= 10) {
            const res = trackGeneralGame('gap', 25, true);
            setReward({ sticker: res.unlockedSticker, achievement: res.unlockedAchievement, leveledUp: res.leveledUp, xp: 25 });
            setShowReward(true);
            setPlayerProgress(res.progress);
            return;
        }
        const nextIndex = rounds;
        setRounds(prev => prev + 1);
        generateRound(nextIndex);
    }, [rounds, generateRound]);

    const handleSelectLevel = useCallback((l: number) => {
        setLevel(l);
        setRounds(1);
        setShowReward(false);
        
        // Save level to progress
        const newProgress = setGameLevel('gap', l);
        setPlayerProgress(newProgress);
        const poolSize = l === 1 ? 30 : l === 2 ? 80 : expandedGapData.length;
        const pool = expandedGapData.slice(0, poolSize);
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const session = shuffled.slice(0, 10);
        setActiveItems(session);
        
        generateRound(0, session);
        setAnswer(null);
        setShowLevelPicks(false);
    }, [generateRound]);

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            setTimeout(() => {
                handleSelectLevel(level);
            }, 0);
        }
    }, [handleSelectLevel, level]);

    const handleSelect = (opt: string) => {
        if (answer || !currentItem || showReward) return;

        if (opt === currentItem.answer) {
            soundManager.playCorrect();
            setAnswer(opt);
            setTimeout(() => startNextRound(), 1500);
        } else {
            soundManager.playIncorrect();
        }
    };

const getDifficultyName = (l: number) => {
    if (l === 1) return 'Einfach';
    if (l === 2) return 'Mittel';
    return 'Schwer';
};

    return (
        <div className="game-view gap-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>{getDifficultyName(level)}</button>
                <div className="round-counter">Runde {rounds}/10</div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="gap"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => currentItem ? setShowLevelPicks(false) : navigate('/')}
                        icon="✍️"
                        title="Lücken-Füller"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && currentItem && (
                <div className="gap-content">
                    <h2 className="section-header center">Fülle die Lücke!</h2>
                    
                    <div className="sentence-display glass-card">
                        <span className="gap-emoji">{currentItem.emoji}</span>
                        <div className="words-wrap">
                            {currentItem.sentence.map((w: string, i: number) => {
                                const isGap = w === currentItem.answer;
                                return (
                                    <span key={i} className={`s-word ${isGap ? 'gap-active' : ''}`}>
                                        {isGap ? (
                                            <span className="filled-text">
                                                {answer || '______'}
                                            </span>
                                        ) : w}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div className="options-list">
                        {currentItem.options.map((opt: string, i: number) => (
                            <motion.button
                                key={`${opt}-${i}`}
                                className={`gap-opt-btn ${answer === opt ? 'correct' : ''}`}
                                onClick={() => handleSelect(opt)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {opt}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            <RewardCelebration 
                show={showReward}
                onClose={() => {
                    setShowReward(false);
                    setShowLevelPicks(true);
                }}
                reward={reward}
            />

            <style>{`
                .gap-game { padding: 20px; }
                .level-indicator-btn {
                    padding: 8px 16px; border-radius: 20px; background: #00b894;
                    color: white; border: none; font-weight: 800; cursor: pointer;
                }
                .gap-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 50px; }
                .sentence-display {
                    padding: 40px; border-radius: 40px; background: white;
                    display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100%; max-width: 600px;
                }
                .gap-emoji { font-size: 5rem; }
                .words-wrap {
                    display: flex; flex-wrap: wrap; gap: 12px; font-size: 2.2rem;
                    font-weight: 800; justify-content: center; color: #1e3a8a;
                }
                .s-word.gap-active { color: #3b82f6; border-bottom: 5px solid #3b82f6; min-width: 140px; text-align: center; }
                .filled-text { color: #16a34a; }

                .options-list { display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; }
                .gap-opt-btn {
                    padding: 15px 35px; background: white; border: 4px solid #3b82f6; border-radius: 24px;
                    font-size: 1.6rem; font-weight: 800; cursor: pointer; color: #1e3a8a;
                }
                .gap-opt-btn.correct { background: #16a34a; color: white; border-color: #15803d; }
            `}</style>
        </div>
    );
};

export default GapGameView;
